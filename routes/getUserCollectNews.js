var express = require('express');
var router = express.Router();
var newsCollection = require('../model/newsCollectionModel.js');
var news = require('../model/newsModel.js');

router.post('/', function (req, res) {
    // 如果传值为空
    if (!req.body.userId) {
        res.send({
            status: "error",
            data: {
                msg: "数据获取失败"
            }
        })
    } else {
        newsCollection.find({
            userId: req.body.userId,
            isDel: 0
        }, "newsId -_id", function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "数据获取失败"
                    }
                })
            } else {
                // 遍历数组，获取新闻id
                doc.forEach((item, index) => {
                    // 根据Id查询新闻数据
                    news.findById(item.newsId, function (err, data) {
                        if (err) {
                            res.send({
                                status: "error",
                                data: {
                                    msg: "数据获取失败"
                                }
                            })
                        } else {
                            // 存储新闻数据
                            var newsArray = [];
                            newsArray.push({
                                newsId: data._id,
                                newsTile: data.newsTile, // 新闻标题
                                newsSummary: data.newsSummary, // 新闻简介
                                newsSource: data.newsSource, // 新闻来源
                                newsTime: data.newsTime, // 新闻发布时间
                                newsThumbnail: data.newsThumbnail, // 新闻缩略图
                            });
                            // 如果是最后一次循环
                            if (index + 1 === doc.length) {
                                res.send({
                                    status: "success",
                                    data: newsArray
                                })
                            }
                        }
                    });
                });
            }
        });
    }
});

module.exports = router;