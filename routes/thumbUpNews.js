var express = require('express');
var router = express.Router();
var newsPraised = require('../model/newsPraisedModel.js');
var comment = require('../model/commentModel.js');

// 评论点赞
router.post('/', function (req, res) {
    // 如果传输的值为空
    if (!req.body.userId || !req.body.newsId || !req.body.commentId) {
        res.send({
            status: "error",
            data: {
                msg: "点赞失败"
            }
        })
    } else {
        newsPraised.find({
            userId: req.body.userId,
            newsId: req.body.newsId,
            commentId: req.body.commentId,
            isDel: 0
        }, function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "点赞失败"
                    }
                })
            } else {
                // 如果数据库中不存在这条数据，证明这点评论此用户没点赞过
                if (doc.length === 0) {
                    // 创建记录
                    newsPraised.create(req.body, function (err) {
                        if (err) {
                            res.send({
                                status: "error",
                                data: {
                                    msg: "点赞失败"
                                }
                            })
                        } else {
                            // 让这条新闻评论的点赞+1
                            comment.findById(req.body.commentId, function (err, doc) {
                                if (err) {
                                    res.send({
                                        status: "error",
                                        data: {
                                            msg: "点赞失败"
                                        }
                                    })
                                } else {
                                    var likeNum = doc.commentLikeNum + 1;
                                    // 修改点赞数量
                                    comment.updateOne({
                                        _id: req.body.commentId
                                    }, {
                                        $set: {
                                            commentLikeNum: likeNum
                                        }
                                    }, function (err) {
                                        if (err) {
                                            res.send({
                                                status: "error",
                                                data: {
                                                    msg: "点赞失败"
                                                }
                                            })
                                        } else {
                                            // 修改成功
                                            res.send({
                                                status: "success",
                                                data: {
                                                    msg: "点赞成功"
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.send({
                        status: "success",
                        data: {
                            msg: "此用户已点赞此评论"
                        }
                    })
                }
            }
        });
    }
});

// 取消点赞
router.post('/cancelThumbUp', function (req, res) {
    // 如果传输的值为空
    if (!req.body.userId || !req.body.newsId || !req.body.commentId) {
        res.send({
            status: "error",
            data: {
                msg: "点赞取消失败"
            }
        })
    } else {
        newsPraised.findOne({
            userId: req.body.userId,
            newsId: req.body.newsId,
            commentId: req.body.commentId,
            isDel: 0
        }, function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "点赞取消失败"
                    }
                })
            } else {
                // 如果数据库中没有用户点赞这条评论的数据
                if (doc === null) {
                    res.send({
                        status: "error",
                        data: {
                            msg: "用户未点赞过此评论"
                        }
                    })
                } else {
                    // 查找到这条数据
                    newsPraised.updateOne({
                        userId: req.body.userId,
                        newsId: req.body.newsId,
                        commentId: req.body.commentId,
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
                                    msg: "点赞取消失败"
                                }
                            })
                        } else {
                            // 让这个评论的点赞量-1
                            comment.findOne({
                                _id: req.body.commentId
                            }, function (err, data) {
                                if (err) {
                                    res.send({
                                        status: "error",
                                        data: {
                                            msg: "点赞取消失败"
                                        }
                                    })
                                } else {
                                    // 修改数据
                                    var clNum = data.commentLikeNum - 1;
                                    comment.updateOne({
                                        _id: req.body.commentId
                                    }, {
                                        $set: {
                                            commentLikeNum: clNum
                                        }
                                    }, function (err) {
                                        if (err) {
                                            res.send({
                                                status: "error",
                                                data: {
                                                    msg: "点赞取消失败"
                                                }
                                            })
                                        } else {
                                            res.send({
                                                status: "success",
                                                data: {
                                                    msg: "点赞取消成功"
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            }
        });
    }
});

module.exports = router;