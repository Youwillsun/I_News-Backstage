var mongoose = require('../public/javascripts/dbConnect.js');

var loginLogSchema = mongoose.Schema({
    userId:String,// 用户id
    loginTime:String, // 登录时间
    loginLocation:String, // 登录地点
});

module.exports = loginLogSchema;