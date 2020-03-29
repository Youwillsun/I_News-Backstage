var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/i-news',{useNewUrlParser:true});

mongoose.connection.once('open',function(err){
    if(!err){
        console.log('数据库连接成功');
    }
});

module.exports = mongoose;