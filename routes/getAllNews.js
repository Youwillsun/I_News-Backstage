var express = require('express');
var router = express.Router();
var news = require('../model/newsModel.js');

// 获取所有的新闻数据
router.get('/', function (req, res) {
  news.find({
    isDel: 0
  }, function (err, doc) {
    if (err) {
      res.send({
        status: 'error',
        data: {
          msg: '新闻获取失败'
        }
      });
    } else {
      if (doc.length === 0) {
        res.send({
          status: 'success',
          data: {
            msg: '暂无新闻数据'
          }
        });
      } else {
        var newsArray = [];
        doc.forEach(item => {
          newsArray.push({
            newsId: item._id,
            newsTile: item.newsTile, // 新闻标题
            newsSummary: item.newsSummary, // 新闻简介
            newsSource: item.newsSource, // 新闻来源
            newsTime: item.newsTime, // 新闻发布时间
            newsThumbnail: item.newsThumbnail, // 新闻缩略图
          });
        });
        res.send({
          status: 'success',
          data: {
            newsArray
          }
        });
      }
    }
  });
});

module.exports = router;