var mysqlUtil = require('../util/MysqlUtil');
exports.submitComment = function(columnData,callback) {
    var columnNames = new Array("u_id","charge_id","text","date");
    var tableName = "t_comment";
    console.log(columnData)
    mysqlUtil.insertDataByTable(columnNames,tableName,columnData,function(data){
        callback(data);
    });
};

exports.getCommentById = function(columnData,callback){
    mysqlUtil.queryCommentById(columnData,function(data){
        callback(data);
    });
};
