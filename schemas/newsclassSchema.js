var mongoose = require('../public/javascripts/dbConnect.js');

var newsclassSchema = mongoose.Schema({
    newsClassName: String, // 类别名称
    newsClassThumbnai: String, // 类别缩略图
    newsId: Array, // 此类新闻id
    isDel: { // 是否删除
        type: Number,
        default: 0
    }
});

module.exports = newsclassSchema;