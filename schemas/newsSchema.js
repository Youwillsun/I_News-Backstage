var mongoose = require('../public/javascripts/dbConnect.js');

var newsSchema = mongoose.Schema({
    newsTile: String, // 新闻标题
    newsSummary: String, // 新闻简介
    newsSource: String, // 新闻来源
    newsTime: String, // 新闻发布时间
    newsThumbnail: String, // 新闻缩略图
    newsContent: String, // 新闻内容
    newsClassId: String, // 新闻类别Id
    newsViewNum: Number, // 新闻浏览量
    newsCollectNum: Number, // 新闻收藏量
    commentId: Array, // 评论id
    isDel: { // 是否删除
        type: Number,
        default: 0
    }
});

module.exports = newsSchema;