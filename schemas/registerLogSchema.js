var mongoose = require('../public/javascripts/dbConnect.js');

var registerLogSchema = mongoose.Schema({
    userAccount: String, // 用户注册的账号
    userPassword: String, // 用户注册的密码
    registerTime: String, // 注册时间
    registerLocation: String // 注册地址
});

module.exports = registerLogSchema;