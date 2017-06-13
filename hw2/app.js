

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port     = process.env.PORT || 8080;

var hw2 = require('./hw2');
var hw1 = require('../hw1/hw1')

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/hw1',hw1);
app.use('/hw2',hw2);


app.listen(port);
console.log('The magic happens on port ' + port);
