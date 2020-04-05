var express = require('express');
var router = express.Router();
var message = require('../model/messageModel.js');

// 获取未读消息数量
router.get('/', function (req, res) {
    message.find({
        isDel: 0,
        messageIdentify: 0
    }, "-_id -isDel -messageIdentify", function (err, doc) {
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
                data: doc.length
            })
        }
    });
});
// 获取所有消息
router.get('/getAllMessage', function (req, res) {
    message.find({}, "-_id -isDel -messageIdentify", function (err, doc) {
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
            });
        }
    });
});

module.exports = router;