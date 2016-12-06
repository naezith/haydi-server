var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var utils = require('./routes/custom_utils.js');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();


var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'unclesam1',
	database: 'haydi_session'
};

var sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session',
	secret: 'h4YD1',
	store: sessionStore,
	resave: true,
	saveUninitialized: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
var RateLimit = require('express-rate-limit');
app.use(new RateLimit({
  windowMs: 60*1000, // 1 minute
  max: 2000, // limit each IP to 2000 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
}));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.se

//MYSQL
var mysql = require('mysql');
var dbConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'unclesam1',
	database: 'haydi_db'
});

app.use('/login', 			require('./routes/login')(dbConnection));
app.use('/filterUsers', 	require('./routes/filterUsers')(dbConnection));
app.use('/getActivities', 	require('./routes/getActivities')(dbConnection));
app.use('/submitActivity', 	require('./routes/submitActivity')(dbConnection));
app.use('/answerActivity', 	require('./routes/answerActivity')(dbConnection));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
	console.log(err);
    res.status(err.status || 500);
	res.send(utils.respondMSG.CONNECTION_FAILED);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	console.log(err);
    res.status(err.status || 500);
	res.send(utils.respondMSG.CONNECTION_FAILED);
});


module.exports = app;
