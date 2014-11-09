/**
 * Created by yanjun on 11/1/14.
 */
var mysqlUtil = require('../util/MysqlUtil');
exports.queryAllChargeType = function(callback) {
    var columnNames = new Array("id","name");
    var tableName = "t_charge_cate";
    mysqlUtil.queryAllDataByTable(columnNames,tableName,function(data){
        callback(data);
    });
}

exports.queryUserForAddCharge = function(callback){
    var columnNames = new Array("id","username");
    var tableName = "t_user";
    mysqlUtil.queryAllDataByTable(columnNames,tableName,function(data){
        callback(data);
    });
}

exports.addCharge = function(columnData,callback){
    var columnNames = new Array("u_id","charge_cate","amount","type","date");
    var tableName = "t_charge";
    mysqlUtil.insertDataByTable(columnNames,tableName,columnData,function(data){
        callback(data);
    });
}

exports.updateCharge = function(columnData,conditionData,callback){
    var columnNames = new Array("u_id","charge_cate","amount","type","date");
    var filterColumnNames = new Array("id");
    var tableName = "t_charge";
    mysqlUtil.updateByCondition(columnNames,filterColumnNames,tableName,columnData,conditionData,function(data){
        callback(data);
    });
}

exports.queryAllCharges = function(callback){
    mysqlUtil.queryByJoinSql(function(data){
        callback(data);
    });
}