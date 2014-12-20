/**
 * Created by yanjun on 11/23/14.
 */
var mysqlUtil = require('../util/MysqlUtil');
exports.querySumAmountByMonth = function(callback) {
    var lineData = new Array();
    mysqlUtil.querySumAmountForRevByMonth(function(revData){
        lineData[0] = revData;
        mysqlUtil.querySumAmountForCostByMonth(function(costData){
            lineData[1] = costData;

            callback(lineData);

        })
    });

};

exports.sumAmountByTypeYear = function(callback){
    mysqlUtil.querySumAmountByTypeYear(function(data){
        callback(data);
    })
};

exports.sumAmountByUserYear = function(callback){
    mysqlUtil.querySumAmountByUserYear(function(data){
        callback(data);
    })
};

exports.sumAmountByCateYear = function(callback){
    mysqlUtil.querySumAmountByCateYear(function(data){
        callback(data);
    })
};

