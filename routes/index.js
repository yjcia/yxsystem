var chargeService = require('../src/service/ChargeService');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
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