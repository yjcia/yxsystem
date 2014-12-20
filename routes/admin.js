var chargeService = require('../src/service/ChargeService');
var fs = require('fs');
var moment = require('moment');
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
};

exports.getQueryCharges = function(req,res){

    chargeService.queryChargesByCondition(req.body['condition'],req.body['conditionValue'],
        req.body['dateFrom'],req.body['dateTo'],req.body['isFilterDate'],function(chargesInfo){
        res.json(chargesInfo);
    });
};

exports.exportCharges = function (req, res) {
    chargeService.exportChargesByIds(req.body['conditionData'], function (chargesInfo) {
        var currentTime = moment().format("YYYY-MM-DD_HHmmss");
        var content = "";
        var fileName = "public/export/" + currentTime + ".txt";
        for (var i in chargesInfo) {
            content += (chargesInfo[i].u_id + " " + chargesInfo[i].amount + " " + chargesInfo[i].date + "\n");
        }
        fs.writeFileSync(fileName, content);
        fs.exists(fileName, function (exists) {
            console.log(content);
            if (exists) {
                //res.setHeader('Content-disposition', 'attachment; filename=' + currentTime+".txt");
                //res.setHeader('Content-type', "text/xml");
                //
                //var file = "/home/yanjun/download/" + currentTime+".txt";
                //var filestream = fs.createReadStream(fileName);
                //filestream.pipe(res);
                res.json(fileName);
                //res.redirect("/download?file=" + currentTime+".txt");

            }
        });
    });
};
exports.importCharge = function (req, res) {
    var tmpFile = req.files.uploadChargeFile.path;
    fs.readFile(tmpFile, "utf-8", function (err, fileData) {
        var fileDataArr = fileData.split("\n");
        for (var index in fileDataArr) {
            if (fileDataArr[index] != "") {
                chargeService.uploadCharge(fileDataArr[0], function (data) {


                });
            }
        }

        //fs.unlink(tmpFile,function(err){
        //
        //});
        res.redirect("/admin");

    })
};