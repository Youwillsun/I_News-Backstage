var express = require('express');
var router = express.Router();
var os = require('os');
var http = require('http');
var util = require('util');
var user = require('../model/userModel.js');
var loginLog = require('../model/loginLogModel.js');
var registerLog = require('../model/registerLogModel.js');

// 登录接口接口逻辑
router.post('/login', function (req, res) {
    // 如果没有传输值
    if (!req.body.account) {
        res.send({
            status: "error",
            data: {
                msg: "登录失败"
            }
        })
    } else {
        // 把账号和密码与数据库中的对比
        user.findOne({
            account: req.body.account
        }, function (err, doc) {
            if (err) {
                res.send({
                    status: 'error',
                    data: {
                        msg: '登录失败'
                    }
                });
            } else {
                // 如果没有查询到此用户
                if (doc === null) {
                    res.send({
                        status: 'error',
                        data: {
                            msg: '此账号未注册'
                        }
                    });
                } else {
                    // 获取本机ip
                    let remoteIp = getIPAdress();
                    // 判断账号和密码与数据库中的是否相同
                    if (doc.account === req.body.account && doc.password === req.body.password) {
                        var loginInfo = {
                            userId: doc._id, // 用户id
                            loginLocation: remoteIp, // 登录地点
                        }
                        loginLog.create(loginInfo, function (err) {
                            if (err) {
                                res.send({
                                    status: 'error',
                                    data: {
                                        msg: '登录失败'
                                    }
                                })
                            } else {
                                res.send({
                                    status: 'success',
                                    data: {
                                        id: doc._id,
                                        account: req.body.account,
                                        password: req.body.password
                                    }
                                });
                            }
                        })
                    } else {
                        res.send({
                            status: 'error',
                            data: {
                                msg: '账号或密码错误'
                            }
                        });
                    }
                }
            }
        });
    }
});

// 注册接口逻辑
router.post('/register', function (req, res) {
    // 如果没有传输账号和密码
    if (!req.body.account || !req.body.password) {
        res.send({
            status: "error",
            data: {
                msg: "注册失败"
            }
        })
    } else {
        // 获取本机ip
        let remoteIp = getIPAdress();
        // 账号判断是否合法
        var phoneRegExp = new RegExp('^[0-9]{11}$');
        // 密码判断是否合法
        var pwdRegExp = new RegExp('^[A-Za-z0-9]{6,12}$');
        // 如果密码判断通过
        if (phoneRegExp.test(req.body.account) && pwdRegExp.test(req.body.password)) {
            // 获取信息
            var registerInfo = {
                userAccount: req.body.account,
                userPassword: req.body.password,
                registerLocation: remoteIp
            }

            // 查询数据库中是否有此账号
            user.findOne({
                account: req.body.account
            }, function (err, doc) {
                if (err) {
                    res.send({
                        status: 'error',
                        data: {
                            msg: '注册失败'
                        }
                    });
                } else {
                    // 如果存在此用户的账号
                    if (doc !== null) {
                        // 如果此用户不在删除状态
                        if (doc.isDel === 0) {
                            res.send({
                                status: 'error',
                                data: {
                                    msg: '此账号已注册'
                                }
                            });
                        } else {
                            // 如果当前在删除状态的账号,则重新创建
                            registerLog.create(registerInfo, function (err) {
                                if (err) {
                                    res.send({
                                        status: 'error',
                                        data: {
                                            msg: '注册失败'
                                        }
                                    })
                                } else {
                                    user.create(req.body, function (err) {
                                        if (err) {
                                            res.send({
                                                status: 'error',
                                                data: {
                                                    msg: '注册失败'
                                                }
                                            })
                                        } else {
                                            res.send({
                                                status: 'success',
                                                data: {
                                                    msg: '注册成功'
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        registerLog.create(registerInfo, function (err) {
                            if (err) {
                                res.send({
                                    status: 'error',
                                    data: {
                                        msg: '注册失败'
                                    }
                                })
                            } else {
                                // 否则创建此用户账号
                                user.create(req.body, function (err) {
                                    if (err) {
                                        res.send({
                                            status: 'error',
                                            data: {
                                                msg: '注册失败'
                                            }
                                        });
                                    } else {
                                        res.send({
                                            status: 'success',
                                            data: {
                                                msg: '注册成功'
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            })
        } else {
            res.send({
                status: 'error',
                data: {
                    msg: '账号或密码不合法'
                }
            });
        }
    }
});

// 获取本机ip
function getIPAdress() {
    var interfaces = os.networkInterfaces();

    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = router;