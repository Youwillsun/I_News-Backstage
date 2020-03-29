var mongoose = require('mongoose');

var loginLogSchema = require('../schemas/loginLogSchema.js');

var loginLog = mongoose.model('loginLog', loginLogSchema);

module.exports = loginLog;