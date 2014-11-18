/**
 * Created by yanjun on 11/1/14.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'yxsystem'
});

connection.connect();

exports.queryAllDataByTable = function (columnNamesArr, tablename, callback) {
    var querySql = "select " + splitColumnName(columnNamesArr) + " from " + tablename;
    var options = {sql: querySql};
    connection.query(options, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(results);
            callback(results);
        }

    });
}

exports.insertDataByTable = function (columnNamesArr, tablename, columnData, callback) {
    var insertSql = "insert into " + tablename + "("
        + splitColumnName(columnNamesArr) + ") values(" + countInsertParam(columnNamesArr) + ")";
    var insertData = columnData;

    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        connection.query(insertSql, insertData, function (err, results) {
            console.log(insertSql);
            if (err) {
                console.log(err);
                connection.rollback();
            } else {
                connection.commit(function (err) {
                    if (err) {
                        connection.rollback(function () {
                            console.error(err);
                        });
                    }
                    else {
                        callback(1);
                    }
                });
            }
        });
    });
}

exports.queryByJoinSql = function (columnNamesArr, joinColumns, callback) {
    var querySql = generateJoinSqlPart(columnNamesArr, joinColumns);
    querySql = querySql + " and t_charge.is_void = 0 order by t_charge.date desc";
    console.log(querySql);
    var options = {sql: querySql, nestTables: false};
    connection.query(options, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(results);
            callback(results);
        }

    });
}

exports.queryChargesWithCondition = function (columnNamesArr, joinColumns, filterColumnNames, filterData, tablename,
                                              isBatch, dateFrom, dateTo, IsFilterDate, callback) {
    var queryConditionPartStr = splitQueryFilterColumn(tablename, filterColumnNames, filterData, dateFrom, dateTo, IsFilterDate);
    var querySql = generateJoinSqlPart(columnNamesArr, joinColumns);
    querySql = querySql + " and " + queryConditionPartStr + " and t_charge.is_void = 0 order by t_charge.date desc";
    var queryConditionData = splitQueryFilterData(filterData, dateFrom, dateTo, IsFilterDate);
    console.log(queryConditionData);
    console.log(querySql);
    connection.query(querySql, queryConditionData, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(results);
            callback(results);
        }

    });
}

exports.updateByCondition = function (columnNamesArr, filterColumnNames, tablename, updateData, conditionData, callback) {
    var updateSql = "update " + tablename + " set " + splitUpdateColumn(columnNamesArr) +
        " where " + splitEqualsFilterColumn(filterColumnNames);
    var updateData = updateData.concat(conditionData);
    //console.log(updateSql);
    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        connection.query(updateSql, updateData, function (err, result) {
            if (err) {
                console.error(err);
                connection.rollback();
            }
            else {
                connection.commit(function (err) {
                    if (err) {
                        connection.rollback(function () {
                            console.error(err);
                        })
                    } else {
                        callback(1);
                    }
                });

            }

        });
    })
}

exports.deleteByCondition = function (filterColumnNames, tablename, conditionData, callback) {
    var deleteSql = "update " + tablename + " set is_void = 1 " +
        " where " + splitEqualsFilterColumn(filterColumnNames);
    console.log(deleteSql);
    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        connection.query(deleteSql, conditionData, function (err, result) {
            if (err) {
                console.error(err);
                connection.rollback();
            }
            else {
                connection.commit(function (err) {
                    if (err) {
                        connection.rollback(function () {
                            console.error(err);
                        })
                    } else {
                        callback(1);
                    }
                });

            }

        });
    })
}

exports.deleteBatchByCondition = function (filterColumnNames, tablename, conditionData, callback) {
    var deleteSql = "update " + tablename + " set is_void = 1" +
        " where " + splitInFilterColumn(filterColumnNames, conditionData);
    console.log(deleteSql);
    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        connection.query(deleteSql, conditionData, function (err, result) {
            if (err) {
                console.error(err);
                connection.rollback();
            }
            else {
                connection.commit(function (err) {
                    if (err) {
                        connection.rollback(function () {
                            console.error(err);
                        })
                    } else {
                        callback(1);
                    }
                });

            }

        });
    })
}
function splitQueryFilterData(filterData, dateFrom, dateTo, IsFilterDate) {
    var afterSplitData = filterData.split(":");
    if (IsFilterDate) {
        if (dateFrom != "" && dateTo != "") {
            afterSplitData.push(dateFrom);
            afterSplitData.push(dateTo);
        }
        else if (dateFrom != "" && dateTo == "") {
            afterSplitData.push(dateFrom);
        }
        else if (dateFrom == "" && dateTo != "") {
            afterSplitData.push(dateTo);
        }

    }
    return afterSplitData;

}
function splitQueryFilterColumn(tablename, filterColumnNamesArr, filterData, dateFrom, dateTo, IsFilterDate) {
    var paraStr = "";
    var filterColumnName = filterColumnNamesArr;
        if (filterColumnName == "id") {
            paraStr += (tablename + "." + filterColumnName + " = ? and ");
        }
        else if (filterColumnName == "charge_cate") {
            paraStr += (tablename + "." + filterColumnName + " = ? and ");
        }
        else if (filterColumnName == "amount") {
            var afterSpliAmount = filterData.split(":");
            if (afterSpliAmount[0] != "" && afterSpliAmount[1] != "") {
                paraStr += (tablename + "." + filterColumnName + " >= ? and " + tablename + "." + filterColumnName + " <= ? and ");
            }
            else if (afterSpliAmount[0] != "" && afterSpliAmount[1] == "") {
                paraStr += (tablename + "." + filterColumnName + " >= ? and ");
            }
            else if (afterSpliAmount[0] == "" && afterSpliAmount[1] != "") {
                paraStr += (tablename + "." + filterColumnName + " <= ? and ");
            }
        }
    if (IsFilterDate) {
        if (dateFrom != "" && dateTo != "") {
            paraStr += ("date >= ? and date <= ? and ");
        }
        else if (dateFrom != "" && dateTo == "") {
            paraStr += ("date >= ? and ");
        }
        else if (dateFrom == "" && dateTo != "") {
            paraStr += ("date <= ? and ");
        }

    }
    console.log("paraStr -->" + paraStr);
    return paraStr.substr(0, paraStr.length - 4);
}

function splitColumnName(columnNames) {
    var columnStr = "";
    for (var column in columnNames) {
        columnStr += (columnNames[column] + ",");
    }
    return columnStr.substr(0, columnStr.length - 1);
}

function countInsertParam(columnNamesArr) {
    var paraStr = "";
    for (var column in columnNamesArr) {
        paraStr += ("?,");
    }
    return paraStr.substr(0, paraStr.length - 1);
}

function splitUpdateColumn(updateColumnNamesArr) {
    var paraStr = "";
    for (var index in updateColumnNamesArr) {
        paraStr += (updateColumnNamesArr[index] + " = ?,");
    }
    return paraStr.substr(0, paraStr.length - 1);
}

function splitEqualsFilterColumn(filterColumnNamesArr) {
    var paraStr = "";
    for (var index in filterColumnNamesArr) {
        paraStr += (filterColumnNamesArr[index] + " = ? and ");
    }
    return paraStr.substr(0, paraStr.length - (paraStr.lastIndexOf("and") - 2));
}

function splitInFilterColumn(filterColumnNamesArr, conditionData) {
    var sqlInStr = filterColumnNamesArr + " in (";
    var paramStr = "";
    for (var index in conditionData) {
        paramStr += "?,";
    }
    paramStr = paramStr.substr(0, paramStr.length - 1) + ")";
    return (sqlInStr + paramStr);
}

function splitInFilterColumnWithOutData(filterColumnNamesArr) {
    var sqlInStr = filterColumnNamesArr + " in (";
    var paramStr = "";
    for (var index in conditionData) {
        paramStr += "?,";
    }
    paramStr = paramStr.substr(0, paramStr.length - 1) + ")";
    return (sqlInStr + paramStr);
}

function generateJoinSqlPart(columnNamesArr, joinColumns) {
    var allColumnPart = "";
    var allJoinPart = "";
    var allFromTables = "";
    for (var index in columnNamesArr) {
        var tableName = columnNamesArr[index].tableName;
        var columns = columnNamesArr[index].column;
        var colStr = "";
        allFromTables += (tableName + ",");
        for (var columnIndex in columns) {
            var currentName = columns[columnIndex];
            colStr += (tableName + "." + currentName + ",");

        }
        allColumnPart += colStr;
    }
    for (var index in joinColumns) {
        var joinTable = joinColumns[index].joinTable;
        var joinColumn = joinColumns[index].joinColumn;
        var tableNames = joinTable.split(":");
        var columnNames = joinColumn.split(":");
        for (var tableIndex = 0; tableIndex < tableNames.length - 1; tableIndex++) {

            var left = tableNames[tableIndex] + "." + columnNames[tableIndex];
            var right = tableNames[tableIndex + 1] + "." + columnNames[tableIndex + 1];
            var joinPart = left + " = " + right + " and ";
            //console.log(joinPart);
            allJoinPart += joinPart;
        }

    }
    return ("select " + allColumnPart.substring(0, allColumnPart.length - 1) +
    " from " + allFromTables.substring(0, allFromTables.length - 1) + " where "
    + allJoinPart.substring(0, allJoinPart.length - 4));
}