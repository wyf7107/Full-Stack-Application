var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'cs591niceee'
var request = require('request');


router.post('/users',function (req,res,next) {
	// body...
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;
	if(req.body.username ==null||req.body.username==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email==''){
		res.json({success:false,message:"All fields are required!"})
	}else{
		user.save(function (err) {
			if(err){
				res.json({success:false,message:"Username or email already exists"})
			}else{
				res.json({success:true,message:"User created!"})
			}
		});
	}
});


router.post('/authenticate',function (req,res) {
	User.findOne({username:req.body.username}).select('email username password').exec(function (err,user) {
		if(err) throw err;

		if(!user){
			res.json({success:false, message:'Could not authenticate user'});
		} else if(user){
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({success:false,message:"could not authenticate password"})
			}else{
				var token = jwt.sign({username:user.username, email:user.email},secret,{expiresIn:'24h'});
				res.json({success:true,message:"User Loged in!",token:token})
			}
		}
	});
});


router.get('/search/:locationEntered/:radiusEntered/:selectedName',function (req,res) {
	var address = req.params.locationEntered;
	var radius = req.params.radiusEntered;
	var selectedName = req.params.selectedName;
	var lat = ''
	var lng = ''
	const options = {  
    	url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDHkXXRD8kO1yymxwwwcxTXDZnwOUNE7vw',
    	method: 'GET',
    	headers: {
        	'Accept': 'application/json',
       		'Accept-Charset': 'utf-8',
        	'User-Agent': 'my-reddit-client'
    	}	
	};

	request(options, function(err, respond, body) {  
    	let json = JSON.parse(body);
    	lat = json.results[0].geometry.viewport.northeast.lat;
    	lng = json.results[0].geometry.viewport.northeast.lng;
	});

	setTimeout(function () {
		const options = {  
    		url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&radius='+radius+'&type='+selectedName+'&keyword=cruise&key=AIzaSyDHkXXRD8kO1yymxwwwcxTXDZnwOUNE7vw',
    		method: 'GET',
    		headers: {
        		'Accept': 'application/json',
       			'Accept-Charset': 'utf-8',
        		'User-Agent': 'my-reddit-client'
    		}	
		};
			request(options, function(err, respond, body) {  
    		let json = JSON.parse(body);
    		if(json.status == 'ZERO_RESULTS'){
    			console.log("0 results");
    			res.send(JSON.stringify([{name:'no result'}]))
    		}else{
    			res.send(JSON.stringify(json.results));
    		}
    		
		});

	},3000)


})


router.use(function (req,res,next) {
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if(token){
		jwt.verify(token,secret,function (err,decoded) {
			if(err){
				res.json({success:false,message:"token not valid"});
			}else{
				req.decoded = decoded;
				next();
			}
		})
	}else{
		res.json({success:false,message:"no token provided"})
	}
})


router.post('/me',function (req,res) {
	res.send(req.decoded);
})


module.exports = router;