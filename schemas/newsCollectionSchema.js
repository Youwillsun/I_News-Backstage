var mongoose = require('../public/javascripts/dbConnect.js');
var moment = require('moment');

var newsCollection = mongoose.Schema({
    userId: String, // 用户id
    newsId: String, // 此用户收藏的新闻
    collectTime: { // 收藏时间
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    isDel: {
        type: Number,
        default: 0
    }
});

module.exports = newsCollection;