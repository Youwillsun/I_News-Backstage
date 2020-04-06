var express = require('express');
var router = express.Router();
var user = require('../model/userModel.js');

router.post('/', function (req, res) {
    // 如果传输的账号和密码为空
    if (!req.body.account && !req.body.password) {
        res.send({
            status: "error",
            data: {
                msg: "密码修改失败"
            }
        });
    } else {
        user.findOne({
            account: req.body.account,
            isDel: 0
        }, "account password", function (err, doc) {
            // 查找错误
            if (err) {
                res.send({
                    status: "error",
                    data: {
                        msg: "账号不存在"
                    }
                });
            } else {
                // 如果没有查找到这个账号
                if (doc === null) {
                    res.send({
                        status: "error",
                        data: {
                            msg: "修改失败，该账号不存在！"
                        }
                    });
                } else {
                    // 修改密码
                    user.update({
                        account: req.body.account,
                        password: doc.password,
                        isDel: 0
                    }, {
                        $set: {
                            password: req.body.password
                        }
                    }, function (err) {
                        if (err) {
                            res.send({
                                status: "error",
                                data: {
                                    msg: "密码修改失败"
                                }
                            });
                        } else {
                            res.send({
                                status: "success",
                                data: {
                                    msg: "密码修改成功"
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;