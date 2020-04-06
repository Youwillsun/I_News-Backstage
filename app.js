var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 登录注册
var loginAndRegisterRouter = require('./routes/loginAndRegister.js');
// 获取所有新闻
var getAllNewsRouter = require('./routes/getAllNews.js');
// 获取新闻详情
var getNewsDetailRouter = require('./routes/getNewsDetail.js');
// 获取新闻分类
var getNewsClassRouter = require('./routes/getNewsClass.js');
// 获取此类别新闻数据
var classAllNewsRouter = require('./routes/classAllNews.js');
// 获取每一类新闻的数量
var newsStatDataRouter = require('./routes/newsStatData.js');
// 发布新闻
var releaseNewsRouter = require('./routes/releaseNews.js');
// 获取个人信息
var getUserInfoRouter = require('./routes/getUserInfo.js');
// 修改用户信息
var updateUserInfoRouter = require('./routes/updateUserInfo.js');
// 找回密码
var updatedPwdRouter = require('./routes/updatedPwd.js');
// 获取消息通知数据
var getMessageInfoRouter = require('./routes/getMessageInfo.js');
// 修改消息通知标识
var updateMsgIdentifyRouter = require('./routes/updateMsgIdentify.js');
// 发布消息
var releaseMsgRouter = require('./routes/releaseMsg.js');
// 发表评论
var publishCommentRouter = require('./routes/publishComment.js');
// 获取用户指定评论的id
var getUserThisCommentRouter = require('./routes/getUserThisComment.js');
// 收藏新闻
var collectNewsRouter = require('./routes/collectNews.js');
// 获取用户收藏的新闻
var getUserCollectNewsRouter = require('./routes/getUserCollectNews.js');
// 点赞新闻
var thumbUpNewsRouter = require('./routes/thumbUpNews.js');
// 获取指定新闻的用户点赞的评论
var getUserLikeCommentRouter = require('./routes/getUserLikeComment.js');

var app = express();

// 配置全局跨域问题
app.all('*', function (req, res, next) {
  //设为指定的域
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// 禁用x-powered-by信息
app.set('x-powered-by', false)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录注册
app.use('/loginAndRegister', loginAndRegisterRouter);
// 获取所有新闻
app.use('/getAllNews', getAllNewsRouter);
// 获取新闻详情
app.use('/getNewsDetail', getNewsDetailRouter);
// 获取新闻分类
app.use('/getNewsClass', getNewsClassRouter);
// 获取此类别新闻数据
app.use('/classAllNews', classAllNewsRouter);
// 获取每一类新闻的数量 
app.use('/newsStatData', newsStatDataRouter);
// 发布新闻
app.use('/releaseNews', releaseNewsRouter);
// 获取个人信息
app.use('/getuserInfo', getUserInfoRouter);
// 修改个人信息
app.use('/updateUserInfo', updateUserInfoRouter);
// 找回密码
app.use('/updatedPwd', updatedPwdRouter);
// 获取最新未读消息数
app.use('/getMessageInfo', getMessageInfoRouter);
// 获取所有消息通知
app.use('/getMessageInfo/getAllMessage', getMessageInfoRouter);
// 修改消息通知标识
app.use('/updateMsgIdentify', updateMsgIdentifyRouter);
// 发布消息
app.use('/releaseMsg', releaseMsgRouter);
// 发表评论
app.use('/publishComment', publishCommentRouter);
// 获取用户指定评论的id
app.use('/getUserThisComment', getUserThisCommentRouter);
// 收藏新闻
app.use('/collectNews', collectNewsRouter);
// 取消收藏新闻
app.use('/collectNews/cancelCollectNews', collectNewsRouter);
// 获取用户收藏的新闻
app.use('/getUserCollectNews', getUserCollectNewsRouter);
// 点赞新闻评论
app.use('/thumbUpNews', thumbUpNewsRouter);
// 取消评论点赞
app.use('/thumbUpNews/cancelThumbUp', thumbUpNewsRouter);
// 获取指定新闻的用户点赞的评论
app.use('/getUserLikeComment', getUserLikeCommentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;