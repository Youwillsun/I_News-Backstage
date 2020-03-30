var express = require('express');
var router = express.Router();
var user = require('../model/userModel.js')

router.post('/', function (req, res) {
  // 如果传输的id为空
  if (!req.body.id) {
    res.send({
      status: "error",
      data: {
        msg: "数据获取失败"
      }
    })
  } else {
    user.findById(req.body.id, "-isDel -password -account -_id", function (err, doc) {
      if (err) {
        res.send({
          status: "error",
          data: {
            msg: "数据获取失败"
          }
        })
      } else {
        if (doc !== null) {
          res.send({
            status: "success",
            data: doc
          });
        } else {
          res.send({
            status: "error",
            data: {
              msg:"请完善信息"
            }
          });
        }

      }
    });
  }
});

module.exports = router;