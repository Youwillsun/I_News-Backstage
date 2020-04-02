var mongoose = require('../public/javascripts/dbConnect.js');
var moment = require('moment');

var registerLogSchema = mongoose.Schema({
    userAccount: String, // 用户注册的账号
    userPassword: String, // 用户注册的密码
    registerTime: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, // 注册时间
    registerLocation: String // 注册地址
});

module.exports = registerLogSchema;