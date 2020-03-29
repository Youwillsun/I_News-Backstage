var express = require('express');
var router = express.Router();
var comment = require('../model/commentModel.js');

router.post('/', function (req, res) {
    if (!req.body.commentUserId || !req.body.commentNewsId) {
        res.send({
            status: "error",
            data: {
                msg: "评论失败"
            }
        })
    } else {
        comment.create(req.body, function (err) {
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
        });
    }

});

module.exports = router;