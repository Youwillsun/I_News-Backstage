var express = require('express');
var router = express.Router();
var comment = require('../model/commentModel.js');

router.post('/', function (req, res) {
    // 如果传输值为空
    if (!req.body.commentUserId || !req.body.commentNewsId || !req.body.commentContent) {
        res.send({
            status: "error",
            data: {
                msg: "获取失败"
            }
        })
    } else {
        // 获取评论的id
        comment.findOne({
            commentUserId: req.body.commentUserId,
            commentNewsId: req.body.commentNewsId,
            commentContent: req.body.commentContent,
            isDel: 0
        }, "_id", function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "获取失败"
                    }
                })
            } else {
                res.send({
                    status: "success",
                    data: doc._id
                })
            }
        });
    }
});

module.exports = router;