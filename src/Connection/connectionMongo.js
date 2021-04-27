const mongoose = require('mongoose');
const config = require('./../../config')

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology:true});

module.exports = mongoose