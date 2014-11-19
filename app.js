
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var charts = require('./routes/chart.js');
var admin = require('./routes/admin.js');
var bodyParser = require('body-parser')
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({ extended: false }));


// all Route
app.get('/', routes.index);
app.post('/getChargeInfoByChargeType', routes.showWithChargeType);
app.post('/searchChargeForIndex', routes.searchChargeForIndex);
app.get('/test', routes.test);
app.get('/chart', charts.showChart);
app.get('/admin', admin.console);
app.post('/getChargeType', routes.getChargeType);
app.post('/getUserInForm', routes.getUserInForm);

app.post('/addCharge',admin.addCharge);
app.post('/updateCharge',admin.updateCharge);
app.post('/deleteCharge',admin.deleteCharge);
app.post('/batchDeleteCharge',admin.batchDeleteCharge);
app.post('/getAllChargeInfo',admin.getAllCharges);
app.post('/searchCharge',admin.getQueryCharges);


//app.post('/test',function(req,res){
//  console.log("---");
//  console.log(req.body.amount);
//
//});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
