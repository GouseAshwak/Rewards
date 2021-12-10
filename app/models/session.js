const appInfo = require('../../settings.json')
const DB_URL = appInfo.MONGO_URI
//models/index.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;