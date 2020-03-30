var express = require('express');
var router = express.Router();
var comment = require('../model/commentModel.js');
var news = require('../model/newsModel.js');

router.post('/', function (req, res) {
    if (!req.body.commentUserId || !req.body.commentNewsId) {
        res.send({
            status: "error",
            data: {
                msg: "评论失败"
            }
        })
    } else {
        // 创建这条评论数据
        comment.create(req.body, function (err) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "评论失败"
                    }
                })
            } else {
                // 从评论数据里找到这个条评论
                comment.findOne({
                    commentUserId: req.body.commentUserId,
                    commentNewsId: req.body.commentNewsId,
                    commentContent: req.body.commentContent,
                    isDel: 0
                }, function (err, doc) {
                    if (err) {
                        res.send({
                            status: "error",
                            data: {
                                msg: "评论失败"
                            }
                        })
                    } else {
                        // 把评论的id设置到news表里，$addToSet 数据不重复
                        news.updateOne({
                            _id: req.body.commentNewsId,
                            isDel: 0
                        }, {
                            $push: {
                                commentId: doc._id
                            }
                        }, function (err) {
                            if (err) {
                                res.send({
                                    status: "error",
                                    data: {
                                        msg: "评论失败"
                                    }
                                })
                            } else {
                                res.send({
                                    status: "success",
                                    data: {
                                        msg: "评论成功"
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    }

});

module.exports = router;