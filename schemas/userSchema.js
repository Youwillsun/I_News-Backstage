var mongoose = require('../public/javascripts/dbConnect.js');

var userSchema = mongoose.Schema({
    account: String, // 账号
    password: String, // 密码
    nickName: String, // 昵称
    realName: String, // 真实姓名
    qqNumber: String, // QQ号
    weChatNumber: String, // 微信号
    phone: String, // 手机号
    birthday: String, // 出生日期
    personalityLabel: { // 个性标签
        type: String,
        default: '发呆'
    },
    introduction: String, // 个人简介
    userPhoto: { // 用户头像
        type: String,
        default: 'https://s2.ax1x.com/2020/03/03/34B4cF.png'
    },
    isDel: { // 用户是否删除，默认为0，未删除
        type: Number,
        default: 0
    }
});

module.exports = userSchema;