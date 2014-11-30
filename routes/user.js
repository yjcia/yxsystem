var moment = require('moment');
var userService = require('../src/service/UserService');
exports.doComment = function(req, res){
    req.setEncoding("utf8");
    var insertData = req.body['insertData[]'];
    insertData.push(moment().format("YYYY-MM-DD HH:mm"));
    userService.submitComment(insertData,function(data){
        res.json(data);
    })
};

exports.getComment = function(req,res){
    userService.getCommentById(req.body['cid'],function(data){
        res.json(data);
    })
}
