var express = require('express');
var router = express.Router();
var message = require('../model/messageModel.js');

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
                data: doc
            })
        }
    });
});

module.exports = router;