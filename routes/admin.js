var chargeService = require('../src/service/ChargeService');
exports.console = function(req, res){
    res.render('admin');
};

exports.addCharge = function(req, res){
    //res.render('admin');
    chargeService.addCharge(req.body['insertData[]'],function(data){
        res.render('admin');
    });
};

exports.getAllCharges = function(req,res){
    chargeService.queryAllCharges(function(chargesInfo){
        res.json(chargesInfo);
    });
}