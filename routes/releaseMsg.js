var express = require('express');
var router = express.Router();
var message = require('../model/messageModel.js');

router.post('/', function (req, res) {
    // 如果传输的值为空
    if (!req.body.messageContent) {
        res.send({
            status: "error",
            data: {
                msg: "不能发布空消息"
            }
        })
    } else {
        message.create(req.body, function (err) {
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "消息通知发布失败"
                    }
                })
            } else {
                res.send({
                    status: "error",
                    data: {
                        msg: "消息通知发布成功"
                    }
                })
            }
        });
    }
});

module.exports = router;