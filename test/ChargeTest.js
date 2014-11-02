/**
 * Created by yanjun on 11/1/14.
 */
var mysqlUtil = require('../src/util/MysqlUtil');
//var columnNames = new Array("id","username");
//var tableName = "t_user";
//mysqlUtil.queryAllDataByTable(columnNames,tableName,function(data){
//    console.log(data);
//});

//var columnNames = new Array("u_id","charge_cate","amount","type","date");
//var tableName = "t_charge";
//var columnData = [1,1,1212,0,'2014-11-01'];
//mysqlUtil.insertDataByTable(columnNames,tableName,columnData,function(data){
//    //callback(data);
//});

mysqlUtil.queryByJoinSql(function(data){
    //callback(data);
});
