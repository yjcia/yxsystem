/**
 * Created by yanjun on 11/1/14.
 */
var mysqlUtil = require('../src/util/MysqlUtil');

//mysqlUtil.queryAllDataByTable(columnNames,tableName,function(data){
//    //console.log(data);
//});

//var columnNames = new Array("u_id","charge_cate","amount","type","date");
//var tableName = "t_charge";
//var columnData = [1,1,1212,0,'2014-11-01'];
//mysqlUtil.insertDataByTable(columnNames,tableName,columnData,function(data){
//    //callback(data);
//});
var columnNamesCharge = {
    "tableName": "t_charge",
    "column": new Array("id", "u_id", "charge_cate", "amount", "type", "date")
};
var columnNamesChargeCate = {
    "tableName": "t_charge_cate",
    "column": new Array("name")
};
var columnNamesUser = {
    "tableName": "t_user",
    "column": new Array("username")
};
var joinType = "inner join";
var joinColumns = [{"joinTable": "t_charge:t_charge_cate", "joinColumn": "charge_cate:id"}
    , {"joinTable": "t_charge:t_user", "joinColumn": "u_id:id"}];

var columnNamesArr = new Array(columnNamesCharge, columnNamesChargeCate, columnNamesUser);
//columnNamesArr.push(columnNamesChargeCate);
//columnNamesArr.push(columnNamesUser);
//mysqlUtil.queryByJoinSql(columnNamesArr,joinColumns,function(data){
//    console.log(data);
//});

//var allColumnPart = "";
//var allJoinPart = "";
////console.log(columnNamesArr);
//for(var index in columnNamesArr){
//    var tableName = columnNamesArr[index].tableName;
//    var columns = columnNamesArr[index].column;
//    var colStr = "";
//
//    for(var columnIndex in columns){
//        var currentName = columns[columnIndex];
//        colStr += (tableName+"."+currentName + ",");
//
//    }
//    allColumnPart += colStr;
//}
//for(var index in joinColumns){
//    var joinTable = joinColumns[index].joinTable;
//    var joinColumn = joinColumns[index].joinColumn;
//    var tableNames = joinTable.split(":");
//    var columnNames = joinColumn.split(":");
//    for(var tableIndex =0;tableIndex<tableNames.length-1;tableIndex++ ){
//
//        var left = tableNames[tableIndex] + "." + columnNames[tableIndex];
//        var right = tableNames[tableIndex+1] + "." + columnNames[tableIndex+1];
//        var joinPart = left + " = " + right + " and ";
//        //console.log(joinPart);
//        allJoinPart += joinPart;
//    }
//
//}
//console.log("select " + allColumnPart.substring(0,allColumnPart.length - 1) + " where "
//+ allJoinPart.substring(0,allJoinPart.length - 4 ));
//console.log(allJoinPart);

//var columnNames = new Array("u_id","charge_cate","amount","type","date");
//var filterColumnNames = new Array("id");
//var columnData = [1,3,10,1,'2014-11-09'];
//var conditionData = [11];
//var tableName = "t_charge";
//mysqlUtil.updateByCondition(columnNames,filterColumnNames,tableName,columnData,conditionData,function(data){
//    callback(data);
//});


//var filterColumnNames = new Array("id");
//var conditionData = [11];
//var tableName = "t_charge";
//mysqlUtil.deleteByCondition(filterColumnNames,tableName,conditionData,function(data){
//    //callback(data);
//});

//var conditionData = [9,10];
//var filterColumnNames = new Array("id");
//var tableName = "t_charge";
//mysqlUtil.deleteBatchByCondition(filterColumnNames,tableName,conditionData,function(data){
//    //callback(data);
//});
var filterData = "1";
var dateFrom = "2014-11-11";
var dateTo = "2014-11-13";
var IsFilterDate = false;
var filterColumnNames = new Array("charge_cate");
var tableName = "t_charge";
mysqlUtil.queryChargesWithCondition(columnNamesArr, joinColumns, filterColumnNames, filterData, tableName, 0,
    dateFrom,dateTo,IsFilterDate,function(data){
    console.log(data);
})


