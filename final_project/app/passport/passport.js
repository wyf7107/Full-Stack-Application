var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'cs591niceee'




module.exports = function (app,passport) {

	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true,cookie: { secure: true }}))

	passport.serializeUser(function(user, done) {
		token = jwt.sign({username:user.username, email:user.email},secret,{expiresIn:'24h'});
    	done(null, user.id); // Return user object
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
            clientID: '1927084107567722', // Replace with your Facebook Developer App client ID
            clientSecret: '70755a559627fc12995b7543e9a8655f', // Replace with your Facebook Developer client secret
            callbackURL: "http://localhost:8080/auth/facebook/callback", // Replace with your Facebook Developer App callback URL
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ email: profile._json.email }).select('username active password email').exec(function(err, user) {
                if (err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                	
                	done(null, user);
                    
                }
                
            });
        }
    ));

	app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/facebookerror' }),function (req,res) {
		res.redirect('/facebook/' + token);
	});
	

	app.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email' }));

	return passport;
}