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

exports.queryAllDataByTable = function(columnNamesArr,tablename,callback) {
    var querySql = "select " + splitColumnName(columnNamesArr) + " from " + tablename;
    var options = {sql: querySql};
    connection.query(options, function (err, results) {
        if(err){
            console.log(err);
        }
        else {
            //console.log(results);
            callback(results);
        }

    });
}


exports.insertDataByTable = function(columnNamesArr,tablename,columnData,callback){
    var insertSql = "insert into "+ tablename + "("
        +splitColumnName(columnNamesArr) + ") values("+countInsertParam(columnNamesArr)+")" ;
    var insertData = columnData;

    connection.beginTransaction(function (err) {
        if(err){
            throw err;
        }
        connection.query(insertSql,insertData,function (err, results) {
            console.log(insertSql);
            if(err){
                console.log(err);
                connection.rollback();
            }else{
                connection.commit(function(err){
                    if(err) {
                        connection.rollback(function () {
                            console.error(err);
                        });
                    }
                    else{
                        callback(1);
                    }
                });
            }
        });
    });
}

exports.queryByJoinSql = function(callback){
    var querySql = " select a.id as id , a.u_id, a.charge_cate , b.username as username," +
        "c.name as chargedesc,a.amount,a.date,a.type " +
        "from t_charge a inner join t_user b on a.u_id = b.id " +
        "inner join t_charge_cate c on a.charge_cate = c.id and a.is_void = 0;";
    var options = {sql: querySql,nestTables: false};
    connection.query(options, function (err, results) {
        if(err){
            console.log(err);
        }
        else {
            //console.log(results);
            callback(results);
        }

    });
}

exports.queryWithCondition = function (columnNamesArr, filterColumnNames, filterData, tablename, isBatch, callback) {
    var queryConditionPartStr = "";
    if (isBatch) {
        queryConditionPartStr = splitInFilterColumnWithOutData(filterColumnNames);
    }
    else {
        queryConditionPartStr = splitEqualsFilterColumn(filterColumnNames);
    }
    var querySql = "select " + splitColumnName(columnNamesArr) + " from " + tablename +
        " where " + queryConditionPartStr;
    if (tablename.equals("t_charge")) {
        querySql += " and is_void = 0";
    }
    connection.query(querySql, filterData, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(results);
            callback(results);
        }

    });
}

exports.updateByCondition = function(columnNamesArr,filterColumnNames,tablename,updateData,conditionData,callback) {
    var updateSql = "update " + tablename + " set " +  splitUpdateColumn(columnNamesArr) +
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
                    }else{
                        callback(1);
                    }
                });

            }

        });
    })
}

exports.deleteByCondition = function(filterColumnNames,tablename,conditionData,callback) {
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
                    }else{
                        callback(1);
                    }
                });

            }

        });
    })
}

exports.deleteBatchByCondition = function(filterColumnNames,tablename,conditionData,callback) {
    var deleteSql = "update " + tablename  + " set is_void = 1"+
        " where " + splitInFilterColumn(filterColumnNames,conditionData);
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
                    }else{
                        callback(1);
                    }
                });

            }

        });
    })
}

function splitColumnName(columnNames){
    var columnStr = "";
    for(var column in columnNames){
        columnStr += (columnNames[column] + ",");
    }
    return columnStr.substr(0,columnStr.length-1);
}

function countInsertParam(columnNamesArr){
    var paraStr = "";
    for(var column in columnNamesArr){
        paraStr += ("?,");
    }
    return paraStr.substr(0,paraStr.length-1);
}

function splitUpdateColumn(updateColumnNamesArr){
    var paraStr = "";
    for(var index in updateColumnNamesArr){
        paraStr += (updateColumnNamesArr[index] +" = ?,");
    }
    return paraStr.substr(0,paraStr.length-1);
}

function splitEqualsFilterColumn(filterColumnNamesArr){
    var paraStr = "";
    for(var index in filterColumnNamesArr){
        paraStr += (filterColumnNamesArr[index] +" = ? and ");
    }
    return paraStr.substr(0,paraStr.length-(paraStr.lastIndexOf("and")-2));
}


function splitInFilterColumn(filterColumnNamesArr,conditionData){
    var sqlInStr = filterColumnNamesArr + " in (";
    var paramStr = "";
    for(var index in conditionData){
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