var mongoose = require('mongoose');

var registerLogSchema = require('../schemas/registerLogSchema.js');

var registerLog = mongoose.model('registerLog', registerLogSchema);

module.exports = registerLog;