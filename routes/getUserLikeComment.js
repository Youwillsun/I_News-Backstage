var express = require('express');
var router = express.Router();
var newsPraised = require('../model/newsPraisedModel.js');

router.post('/', function (req, res) {
    // 如果传值为空
    if (!req.body.userId || !req.body.newsId) {
        res.send({
            status: "error",
            data: {
                msg: "数据获取失败"
            }
        })
    } else {
        newsPraised.find({
            userId: req.body.userId,
            newsId: req.body.newsId,
            isDel: 0
        }, "commentId -_id", function (err, doc) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "数据获取失败"
                    }
                })
            } else {
                res.send({
                    status: "success",
                    data: doc
                })
            }
        });
    }
});

module.exports = router;