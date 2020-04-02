var mongoose = require('../public/javascripts/dbConnect.js');
var moment = require('moment');

var loginLogSchema = mongoose.Schema({
    userId:String,// 用户id
    loginTime:{
        type:String,
        default:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, // 登录时间
    loginLocation:String, // 登录地点
});

module.exports = loginLogSchema;