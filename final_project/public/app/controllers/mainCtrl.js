var app = angular.module('mainController',['authServices'])

.controller('mainCtrl',function (Auth,$timeout,$location,$rootScope,$window) {
	var app = this;

	app.loadme = false;

	$rootScope.$on('$routeChangeStart',function () {
		if(Auth.isLoggedIn()){
			app.isLoggedin = true;
			Auth.getUser().then(function (data) {
				app.username = data.data.username;
				app.email = data.data.email;
				app.loadme = true;
			})
		}else{
			app.isLoggedin = false;
			app.username = '';
			app.loadme = true;
		}

		if($location.hash() == '_=_')  $location.hash(null);
	})

		
	this.facebook = function () {
		$window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
	}



	this.doLogin = function (loginData) {
		app.loading = true;
		app.errorMsg = false;
		// body...
		Auth.login(app.loginData).then(function (data) {
			if(data.data.success){
				app.loading = false;
				app.successMsg = data.data.message+'......Redirecting to home page';
				$timeout(function () {
					// body...
					$location.path('/about');
					app.loginData = '';
					app.successMsg = false;
				},2000)
				

			}else{
				app.loading=false;
				app.errorMsg = data.data.message;
			}
		})
	};

	this.logout = function () {
		Auth.logout();
		$location.path('/logout');
		$timeout(function () {
			$location.path('/');
		},2000);
	}





})

app.run(['$rootScope','Auth','$location',function ($rootScope,Auth,$location) {
	$rootScope.$on('$routeChangeStart',function (event,next,current) {
		if(next.$$route.authenticated == true){
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}

		} else if (next.$$route.authenticated == false){
			if(Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}
		}
	});
}]);