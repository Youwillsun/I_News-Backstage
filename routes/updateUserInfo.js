var express = require('express');
var router = express.Router();
var user = require('../model/userModel.js');

router.post('/', function (req, res) {
    // 如果没有传输值
    if (!req.body.id) {
        res.send({
            status: "error",
            data: {
                msg: "修改失败"
            }
        })
    } else {
        user.updateOne({
            _id: req.body.id
        }, {
            $set: req.body.data
        }, function (err) {
            if (err) {
                res.send({
                    status: 'error',
                    data: {
                        msg: "修改失败"
                    }
                })
            } else {
                res.send({
                    status: 'success',
                    data: {
                        msg: "修改成功"
                    }
                })
            }
        });
    }
});

module.exports = router;