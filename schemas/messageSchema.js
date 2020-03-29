var mongoose = require('../public/javascripts/dbConnect.js');

var messageSchema = mongoose.Schema({
    messageContent: String, // 消息内容
    messageTime: String, // 消息发布时间
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