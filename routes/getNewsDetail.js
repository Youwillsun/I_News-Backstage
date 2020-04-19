var express = require('express');
var router = express.Router();
var news = require('../model/newsModel.js');
var comment = require('../model/commentModel.js');
var user = require('../model/userModel.js');

// 获取新闻详细数据
router.post('/', function (req, res) {
    // 如果传输的值为空
    if (!req.body.newsId) {
        res.send({
            status: "error",
            data: {
                msg: "数据获取失败"
            }
        })
    } else {
        // 存储新闻详细数据
        var newsDetail = {
            newsInfo: [],
            commentInfo: []
        };
        news.findById(req.body.newsId, "-isDel", function (err, doc) {
            if (err) {
                res.send({
                    status: 'error',
                    data: {
                        msg: '数据获取失败'
                    }
                });
            } else {
                // 如果拿到的了空的数据
                if (doc === null) {
                    res.send({
                        status: "error",
                        data: {
                            msg: "暂无新闻数据"
                        }
                    })
                } else {
                    // 把获取的信息转成普通的object
                    var docObj = doc.toObject();
                    // 删除新闻中的评论用户id
                    delete docObj.commentId;
                    // 删除新闻中的浏览量，浏览量有单独的接口
                    delete docObj.newsViewNum;
                    // 存储信息
                    newsDetail.newsInfo = docObj;
                    // 如果没有评论用户的id数据
                    if (doc.commentId.length === 0) {
                        res.send({
                            status: 'success',
                            data: newsDetail
                        });
                    } else {
                        // 获取用户的评论数据 数组
                        var commentId = doc.commentId;
                        commentId.forEach((item, index) => {
                            // 根据id获取评论数据
                            comment.findById({
                                _id: item,
                                isDel: 0
                            }, "-isDel", function (err, com) {
                                if (err) {
                                    res.send({
                                        status: 'error',
                                        data: {
                                            msg: '数据获取失败'
                                        }
                                    })
                                } else {
                                    // 如果这条新闻的id和评论表里存储的新闻id一致
                                    if (com.commentNewsId === doc._id.toString()) {
                                        // 获取这个评论用户的信息
                                        user.findById(com.commentUserId, function (err, data) {
                                            if (err) {
                                                res.send({
                                                    status: 'error',
                                                    data: {
                                                        msg: '数据获取失败'
                                                    }
                                                })
                                            } else {
                                                // 组合评论数据
                                                var commentObj = {
                                                    id: com._id,
                                                    commentLikeNum: com.commentLikeNum,
                                                    commentContent: com.commentContent,
                                                    commentTime: com.commentTime,
                                                    nickName: data.nickName,
                                                    userPhoto: data.userPhoto
                                                };
                                                // 把数据放到数组里
                                                newsDetail.commentInfo.push(commentObj);

                                                if (index + 1 === commentId.length) {
                                                    res.send({
                                                        status: 'success',
                                                        data: newsDetail
                                                    });
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                        });
                    }
                }
            }
        });
    }
});

module.exports = router;