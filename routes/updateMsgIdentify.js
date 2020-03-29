var express = require('express');
var router = express.Router();
var message = require('../model/messageModel.js');

router.post('/', function (req, res) {
    message.updateMany({
        messageIdentify: 0
    }, {
        $set: {
            messageIdentify: 1
        }
    },function(err){
        if(err){
            res.send({
                status:"error",
                data:{
                    msg:"消息标识修改失败"
                }
            })
        } else {
            res.send({
                status:"success",
                data:{
                    msg:"消息标识修改成功"
                }
            })
        }
    });
});

module.exports = router;