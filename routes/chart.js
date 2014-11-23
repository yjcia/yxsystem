
var chartService = require('../src/service/ChartsService');
exports.showChart = function(req, res){
    res.render('charts', { title: 'Express' });
};

exports.sumAmountByMonth = function(req,res){
    chartService.querySumAmountByMonth(function(data){
       res.json(data);
    });
};

exports.sumAmountByTypeYear = function(req,res){
    chartService.sumAmountByTypeYear(function(data){
        res.json(data);
    });
};

exports.sumAmountByUserYear = function(req,res){
    chartService.sumAmountByUserYear(function(data){
        res.json(data);
    });
};

exports.sumAmountByCateYear = function(req,res){
    chartService.sumAmountByCateYear(function(data){
        res.json(data);
    });
}

