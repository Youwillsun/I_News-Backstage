var express = require('express');
var router = express.Router();
var news = require('../model/newsModel.js');
var newsClass = require('../model/newsclassModel.js');

router.post('/', function (req, res) {
    // 如果这些传输的值为空
    if (!req.body.newsTile || !req.body.newsSummary || !req.body.newsSource || !req.body.newsContent || !req.body.newsClassId) {
        res.send({
            status: "error",
            data: {
                msg: "新闻发布失败"
            }
        })
    } else {
        news.create(req.body, function (err) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "新闻发布失败"
                    }
                })
            } else {
                // 把发布成功新闻id插入到新闻分类表
                news.findOne({
                    newsTile: req.body.newsTile,
                    newsSummary: req.body.newsSummary,
                    newsSource: req.body.newsSource,
                    newsContent: req.body.newsContent,
                    newsClassId: req.body.newsClassId,
                    isDel: 0
                }, "_id", function (err, doc) {
                    if (err) {
                        res.send({
                            status: "error",
                            data: {
                                msg: "新闻发布失败"
                            }
                        })
                    } else {
                        // 插入数据
                        newsClass.updateOne({
                            _id: req.body.newsClassId,
                            isDel: 0
                        }, {
                            $push: {
                                newsId: doc._id
                            }
                        }, function (err) {
                            if (err) {
                                res.send({
                                    status: "error",
                                    data: {
                                        msg: "新闻发布失败"
                                    }
                                })
                            } else {
                                res.send({
                                    status: "success",
                                    data: {
                                        msg: "新闻发布成功"
                                    }
                                })
                            }
                        })
                    }
                });
            }
        });
    }
});

module.exports = router;