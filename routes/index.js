var chargeService = require('../src/service/ChargeService');

exports.index = function(req, res){

    res.render('index', {title: 'Express'});
};

exports.showWithChargeType = function (req, res) {
    //console.log(req.body['chargeType']);
    var chargeType = req.body['chargeType'];
    var condition = "charge_cate";
    if(chargeType == 8){
        chargeType = "";
        condition = "";
    }
    chargeService.queryChargesByCondition(condition,chargeType,
        "","",false,function (chargeTypeData) {
        //console.log(chargeTypeData);
        res.json(chargeTypeData);
    })
};

exports.test = function(req, res){
    res.render('test');
};

exports.getChargeType = function(req, res){
    chargeService.queryAllChargeType(function(chargeTypeData){
        //console.log(chargeTypeData);
        res.json(chargeTypeData);
    })
};

exports.getUserInForm = function(req,res){
    chargeService.queryUserForAddCharge(function(chargeUserData){
        //console.log(chargeUserData);
        res.json(chargeUserData);
    })
}

exports.searchChargeForIndex = function(req,res){
    var queryParamObject = {
        uid:req.body["userId"],
        chargeCate:req.body["chargeCate"],
        amountFrom:req.body["amountFrom"],
        amountTo:req.body["amountTo"],
        dateFrom:req.body["dateFrom"],
        dateTo:req.body["dateTo"]
    }
    chargeService.queryIndexChargesByCondition(queryParamObject,function(chargesInfo){
            res.json(chargesInfo);
        });
}