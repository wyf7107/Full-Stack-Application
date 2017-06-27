var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var createuser = require('./app/routes/createuser');
var passport = require('passport');
var social = require('./app/passport/passport.js')(app,passport);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use('/api',createuser);


mongoose.connect('mongodb://localhost/cs591', function (err) {
	if (err){
		console.log("Not connected " + err);
	}else{
		console.log("Connected!");
	}
})

app.get('*',function (req,res) {
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'))
})

app.listen(port,function () {
	console.log("running on port " + port);	
})
