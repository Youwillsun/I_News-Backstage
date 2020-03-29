var express = require('express');
var router = express.Router();
var newsClass = require('../model/newsclassModel.js');

router.get('/', function (req, res) {
    newsClass.find({
        isDel: 0
    }, function (err, doc) {
        if (err) {
            res.send({
                status: "error",
                data: {
                    msg: "数据获取失败"
                }
            })
        } else {
            var statData = [];
            // 获取此类新闻的名称和这类新闻的newsID的数量（即新闻的数量）
            if (doc.length === 0) {
                res.send({
                    status: "success",
                    data: {
                        msg: "暂无新闻分类数据"
                    }
                })
            } else {
                doc.forEach((item, index) => {
                    statData.push({
                        className: item.newsClassName,
                        count: item.newsId.length
                    });

                    // 如果是最后一次循环
                    if (index + 1 === doc.length) {
                        res.send({
                            status: "success",
                            data: statData
                        })
                    }
                });
            }
        }
    });
});

module.exports = router;