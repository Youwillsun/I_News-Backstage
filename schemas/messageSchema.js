var mongoose = require('../public/javascripts/dbConnect.js');
var moment = require('moment');

var messageSchema = mongoose.Schema({
    messageContent: String, // 消息内容
    messageTime: {
        type:String,
        default:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, // 消息发布时间
    messageIdentify: { // 消息是否已读，0未读 1已读
        type: Number,
        default: 0
    },
    isDel: { // 是否删除
        type: Number,
        default: 0
    }
});

module.exports = messageSchema;