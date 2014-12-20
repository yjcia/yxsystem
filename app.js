
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var charts = require('./routes/chart.js');
var admin = require('./routes/admin.js');
var user = require('./routes/user.js');
var bodyParser = require('body-parser');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser({keepExtension:true,uploadDir:'./public/import'}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/export"));


// all Route
app.get('/', routes.index);
app.post('/getChargeInfoByChargeType', routes.showWithChargeType);
app.post('/searchChargeForIndex', routes.searchChargeForIndex);
app.get('/test', routes.test);
app.get('/chart', charts.showChart);
app.get('/admin', admin.console);
app.post('/getChargeType', routes.getChargeType);
app.post('/getUserInForm', routes.getUserInForm);

app.post('/sumAmountByMonth', charts.sumAmountByMonth);
app.post('/sumAmountByTypeYear', charts.sumAmountByTypeYear);
app.post('/sumAmountByUserYear', charts.sumAmountByUserYear);
app.post('/sumAmountByCateYear', charts.sumAmountByCateYear);

app.post('/addCharge',admin.addCharge);
app.post('/updateCharge',admin.updateCharge);
app.post('/deleteCharge',admin.deleteCharge);
app.post('/batchDeleteCharge',admin.batchDeleteCharge);
app.post('/getAllChargeInfo',admin.getAllCharges);
app.post('/searchCharge',admin.getQueryCharges);

app.post('/submitComment',user.doComment);
app.post('/getCommentById',user.getComment);

app.post('/batchExportCharge', admin.exportCharges);

app.get('/download', function (req, res) {
  //console.log(req.query.file);
  //res.download("public/export/"+ req.query.file);
  res.download(req.query.file);
});


//app.post('/uploadCharge', multipartMiddleware, function(req, res) {
//
//  //console.log(req.files.uploadChargeFile.path);
//  //var tmpFile = req.files.uploadChargeFile.path;
//  //fs.readFile(tmpFile,"utf-8",function(err,data){
//  //  console.log(data.split("\n")[0]);
//  //  fs.unlink(tmpFile,function(err){
//  //
//  //  });
//  //  res.redirect("/admin");
//  //})
//});
app.post('/uploadCharge', multipartMiddleware, admin.importCharge);

//app.post('/test',function(req,res){
//  console.log("---");
//  console.log(req.body.amount);
//
//});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
