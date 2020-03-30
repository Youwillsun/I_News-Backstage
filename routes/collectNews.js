var express = require('express');
var router = express.Router();
var newsCollection = require('../model/newsCollectionModel.js');
var news = require('../model/newsModel.js');

// 收藏新闻
router.post('/', function (req, res) {
    // 如果没有传值
    if (!req.body.newsId || !req.body.userId) {
        res.send({
            status: "error",
            data: {
                msg: "收藏失败"
            }
        })
    } else {
        // 查询数据库中是否有这条数据
        newsCollection.find({
            userId: req.body.userId,
            newsId: req.body.newsId,
            isDel: 0
        }, function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "收藏失败"
                    }
                });
            } else {
                // 如果查询数据成功,且找到了符合的数据
                if (doc.length !== 0) {
                    res.send({
                        status: "error",
                        data: {
                            msg: "此新闻已收藏"
                        }
                    })
                } else {
                    // 创建这条记录
                    newsCollection.create(req.body, function (err) {
                        if (err) {
                            res.send({
                                status: "error",
                                data: {
                                    msg: "收藏失败"
                                }
                            })
                        } else {
                            // 让收藏量+1
                            news.findById(req.body.newsId, function (err, doc) {
                                if (err) {
                                    res.send({
                                        status: "error",
                                        data: {
                                            msg: "收藏失败"
                                        }
                                    })
                                } else {
                                    // 让收藏量+1
                                    var collectNum = doc.newsCollectNum + 1;
                                    news.updateOne({
                                        _id: req.body.newsId
                                    }, {
                                        $set: {
                                            newsCollectNum: collectNum
                                        }
                                    }, function (err) {
                                        if (err) {
                                            res.send({
                                                status: "error",
                                                data: {
                                                    msg: "收藏失败"
                                                }
                                            })
                                        } else {
                                            // 创建成功则返回成功信息
                                            res.send({
                                                status: "success",
                                                data: {
                                                    msg: "收藏成功"
                                                }
                                            });
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            }
        });
    }
});

// 取消新闻的收藏
router.post('/cancelCollectNews', function (req, res) {
    // 如果没有传值
    if (!req.body.newsId || !req.body.userId) {
        res.send({
            status: "error",
            data: {
                msg: "收藏取消失败"
            }
        })
    } else {
        newsCollection.findOne({
            userId: req.body.userId,
            newsId: req.body.newsId,
            isDel: 0
        }, function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "收藏取消失败"
                    }
                })
            } else {
                // 如果获取到的是空数据
                if (doc === null) {
                    res.send({
                        status: "error",
                        data: {
                            msg: "用户未收藏此新闻"
                        }
                    })
                } else {
                    // 取消这个新闻的收藏
                    newsCollection.updateOne({
                        userId: req.body.userId,
                        newsId: req.body.newsId,
                        isDel: 0
                    }, {
                        $set: {
                            isDel: 1
                        }
                    }, function (err) {
                        if (err) {
                            res.send({
                                status: "error",
                                data: {
                                    msg: "收藏取消失败"
                                }
                            })
                        } else {
                            // 修改这个新闻的收藏量
                            news.findOne({
                                _id: req.body.newsId
                            }, function (err, data) {
                                if (err) {
                                    res.send({
                                        status: "error",
                                        data: {
                                            msg: "收藏取消失败"
                                        }
                                    })
                                } else {
                                    if (data !== null) {
                                        // 收藏量-1
                                        var ncNum = data.newsCollectNum - 1;
                                        news.updateOne({
                                            _id: req.body.newsId
                                        }, {
                                            $set: {
                                                newsCollectNum: ncNum
                                            }
                                        }, function (err) {
                                            if (err) {
                                                res.send({
                                                    status: "error",
                                                    data: {
                                                        msg: "收藏取消失败"
                                                    }
                                                })
                                            } else {
                                                res.send({
                                                    status: "success",
                                                    data: {
                                                        msg: "收藏取消成功"
                                                    }
                                                })
                                            }
                                        });
                                    } else {

                                    }
                                }
                            });

                        }
                    });
                }
            }
        });
    }
});

module.exports = router;