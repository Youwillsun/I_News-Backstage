var mongoose = require('../public/javascripts/dbConnect.js');
var moment = require('moment');

var newsPraised = mongoose.Schema({
    userId: String,
    newsId: String,
    commentId: String,
    likeTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    isDel: {
        type: Number,
        default: 0
    }
});

module.exports = newsPraised;