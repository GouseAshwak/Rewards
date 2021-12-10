require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const app = express()
const initMongo = require('./config/mongo')
const appInfo = require('./settings.json')
const path = require('path')
const cookieParser = require("cookie-parser");

global.appInfo = appInfo
// Setup express server port from ENV, default: 4000
//app.set('port', appInfo.PORT || 4000)

app.set('port', (process.env.PORT));

// for parsing json
app.use(
  bodyParser.json({
    limit: '100mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true
  })
)

// Init all other stuff
app.use(cors())
// app.use(passport.initialize())
app.use(compression())
app.use(cookieParser());
app.use(helmet())
app.get('/', function(req, res) {
	res.send('Welcome to Rewards backend application!!!');
});
app.use(require('./app/routes'))
app.listen(app.get('port'))

// Init MongoDB
initMongo()

module.exports = app // for testing
