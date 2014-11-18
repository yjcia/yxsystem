var chargeService = require('../src/service/ChargeService');
exports.console = function(req, res){
    res.render('admin');
};

exports.addCharge = function(req, res){
    //res.render('admin');
    console.log(req.body['insertData[]']);
    chargeService.addCharge(req.body['insertData[]'],function(data){
        res.json(data);
    });
};

exports.updateCharge = function(req, res){
    //res.render('admin');
    chargeService.updateCharge(req.body['updateData[]'],req.body['conditionData[]'],function(data){
        res.json(data);
    });
};

exports.deleteCharge = function(req, res){
    //res.render('admin');
    chargeService.deleteCharge(req.body['conditionData[]'],function(data){
        res.json(data);
    });
};

exports.batchDeleteCharge = function(req, res){
    //res.render('admin');
    chargeService.batchDeleteCharge(req.body['conditionData[]'],function(data){
        res.json(data);
    });
};

exports.getAllCharges = function(req,res){
    chargeService.queryAllCharges(function(chargesInfo){
        res.json(chargesInfo);
    });
}

exports.getQueryCharges = function(req,res){

    chargeService.queryChargesByCondition(req.body['condition'],req.body['conditionValue'],
        req.body['dateFrom'],req.body['dateTo'],req.body['isFilterDate'],function(chargesInfo){
        res.json(chargesInfo);
    });
}