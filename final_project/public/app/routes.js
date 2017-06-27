angular.module('appRoutes',['ngRoute'])

.config(function ($routeProvider,$locationProvider) {
	// body...
	$routeProvider.when('/',{
		templateUrl:'app/views/pages/home.html'
	})

	.when('/about',{
		templateUrl:'app/views/pages/about.html'
	})

	.when('/register',{
		templateUrl:'app/views/pages/users/register.html',
		controller:'regCtrl',
		controllerAs:'register',
		authenticated:false
	})

	.when('/login',{
		templateUrl:'app/views/pages/users/login.html',
		authenticated:false
	})

	.when('/logout',{
		templateUrl:'app/views/pages/users/logout.html',
		authenticated:true
	})
	
	.when('/profile',{
		templateUrl:'app/views/pages/users/profile.html',
		authenticated:true
	})

	.when('/facebook/:token',{
		templateUrl:'app/views/pages/users/social/social.html',
		controller:'facebookCtrl',
		controllerAs:'facebook'
	})

	.when('/facebookerror',{
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook'

	})

	.when('/locationsearch',{
		templateUrl: 'app/views/pages/locations/locationsearch.html',
		controller: 'newPlaceCtrl',
		controllerAs: 'newPlace',
		authenticated:true
	})

	.otherwise({redirectTo:'/'});

	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});
});