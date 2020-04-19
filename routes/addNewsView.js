var express = require('express');
var router = express.Router();
var news = require('../model/newsModel.js');

router.post('/', function (req, res) {
    // 如果没有传输过来的数据
    if (!req.body.newsId) {
        res.send({
            status: "error",
            data: {
                msg: "错误新闻标识"
            }
        });
    } else {
        news.findById(req.body.newsId, function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "错误新闻标识"
                    }
                });
            } else {
                if (doc === null) {
                    res.send({
                        status: "error",
                        data: {
                            msg: "错误新闻标识"
                        }
                    });
                } else {
                    var newsView = doc.newsViewNum + 1;
                    news.updateOne({
                        _id: req.body.newsId,
                        isDel: 0
                    }, {
                        $set: {
                            newsViewNum: newsView
                        }
                    }, function (err) {
                        if (err) {
                            res.send({
                                status: "error",
                                data: {
                                    msg: "新闻浏览量修改失败"
                                }
                            });
                        } else {
                            res.send({
                                status: "success",
                                data: {
                                    newsViewNum: newsView
                                }
                            })
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;