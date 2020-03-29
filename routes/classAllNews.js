var express = require('express');
var router = express.Router();
var newsClass = require('../model/newsclassModel.js');
var news = require('../model/newsModel.js');

router.post('/', function (req, res) {
    // 如果没有传输id
    if (!req.body.id) {
        res.send({
            status: "error",
            data: {
                msg: "数据获取失败"
            }
        })
    } else {
        // 存储查询出来的新闻数据
        var newsArray = [];
        // 根据传输的id查询newsclass数据
        newsClass.find({
            _id: req.body.id,
            isDel: 0
        }, function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "数据获取失败"
                    }
                });
            } else {
                doc.forEach((item, index) => {
                    item.newsId.forEach(el => {
                        // 根据新闻id查询新闻数据
                        news.findById(el, function (err, data) {
                            if (err) {
                                res.send({
                                    status: 'error',
                                    data: {
                                        msg: '新闻获取失败'
                                    }
                                });
                            } else {
                                // 如果没有数据
                                if (data === null) {
                                    res.send({
                                        status: 'success',
                                        data: newsArray
                                    });
                                } else {
                                    // 信息不是删除状态
                                    if (data.isDel === 0) {
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
                                                status: 'success',
                                                data: newsArray
                                            });
                                        }
                                    } else {
                                        console.log(data._id, "此新闻已删除");
                                    }
                                }
                            }
                        });
                    });
                });
            }
        });
    }
});

module.exports = router;