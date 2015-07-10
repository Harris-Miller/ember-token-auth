const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(config.database);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.set('json spaces', 2);
app.set('json replacer', function(key, value) {
	if (value instanceof Date) {
		return value.toISOString();
	}

	return value;
});

// auth route
app.use(require('./routes/auth'));

// require all api routes
app.use(require('./routes/api'));





// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});



// error handling
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: err
	});
});


module.exports = app;
