var express = require('express');
var router = express.Router();
var newsClass = require('../model/newsclassModel.js');

router.get('/', function (req, res) {
    // 查询所有的新闻分类
    newsClass.find({
        isDel: 0
    }, "-isDel -__v -newsId", function (err, doc) {
        if (err) {
            res.send({
                status: "error",
                data: {
                    msg: "数据获取失败"
                }
            });
        } else {
            res.send({
                status: "success",
                data: doc
            })
        }
    });
});

module.exports = router;