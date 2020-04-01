var mongoose = require('../public/javascripts/dbConnect.js');
var moment = require('moment');

var newsSchema = mongoose.Schema({
    newsTile: String, // 新闻标题
    newsSummary: String, // 新闻简介
    newsSource: String, // 新闻来源
    newsTime: { // 新闻发布时间
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD')
    },
    newsThumbnail: String, // 新闻缩略图
    newsContent: String, // 新闻内容
    newsClassId: String, // 新闻类别Id
    newsViewNum: { // 新闻浏览量
        type: Number,
        default: 0
    },
    newsCollectNum: { // 新闻收藏量
        type: Number,
        default: 0
    },
    commentId: { // 评论id
        type: Array,
        default: []
    },
    isDel: { // 是否删除
        type: Number,
        default: 0
    }
});

module.exports = newsSchema;