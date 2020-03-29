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
                // 把浏览量+1
                doc.newsViewNum = doc.newsViewNum + 1;
                // 把修改的浏览量设置到数据库
                news.updateOne({
                    _id: req.body.newsId
                }, {
                    $set: {
                        newsViewNum: doc.newsViewNum
                    }
                });
                // 把获取的信息转成普通的object
                var docObj = doc.toObject();
                // 删除新闻中的评论用户id
                delete docObj.commentUserId;
                // 存储信息
                newsDetail.newsInfo = docObj;

                // 获取用户的评论数据 数组
                var commentUserId = doc.commentUserId;
                commentUserId.forEach(item => {
                    // 根据id获取评论数据
                    comment.find({}, "-isDel", function (err, com) {
                        if (err) {
                            res.send({
                                status: 'error',
                                data: {
                                    msg: '数据获取失败'
                                }
                            })
                        } else {
                            // 遍历获取的评论数据
                            com.forEach((el, index) => {
                                // 如果这条新闻的id和评论表里存储的新闻id一致
                                if (el.commentNewsId === doc._id.toString()) {
                                    // 获取这个评论用户的信息
                                    user.findById(el.commentUserId, function (err, data) {
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
                                                id: el._id,
                                                commentLikeNum: el.commentLikeNum,
                                                commentContent: el.commentContent,
                                                commentTime: el.commentTime,
                                                nickName: data.nickName,
                                                userPhoto: data.userPhoto
                                            };
                                            // 把数据放到数组里
                                            newsDetail.commentInfo.push(commentObj);

                                            if (index + 1 === com.length && data !== null) {
                                                res.send({
                                                    status: 'success',
                                                    data: newsDetail
                                                });
                                            }
                                        }
                                    })
                                }
                            });
                        }
                    });
                });
            }
        });
    }
});

module.exports = router;