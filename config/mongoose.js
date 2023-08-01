const mongoose = require('mongoose');
const env = require('./environment')

mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

const db = mongoose.connection;

module.exports = db;