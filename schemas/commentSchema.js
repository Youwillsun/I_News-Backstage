var mongoose = require('../public/javascripts/dbConnect.js');
// 引入日期格式化组件
var moment = require('moment');

var commentSchema = mongoose.Schema({
    commentUserId: String, // 评论用户id
    commentNewsId: String, // 评论新闻id
    commentLikeNum: { // 评论点赞数量
        type: Number,
        default: 0
    },
    commentContent: String, // 评论内容
    commentTime: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, // 评论时间
    isDel: { // 是否删除
        type: Number,
        default: 0
    }
});

module.exports = commentSchema;