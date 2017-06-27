angular.module('userControllers',['userServices'])

.controller('regCtrl',function ($http,$location,$timeout,User) {
	// body...
	var app = this;

	this.regUser = function (regData) {
		app.loading = true;
		app.errorMsg = false;
		// body...
		User.create(app.regData).then(function (data) {
			if(data.data.success){
				app.loading = false;
				app.successMsg = data.data.message+'......Redirecting to login page';
				$timeout(function () {
					// body...
					$location.path('/login');
				},2000)
				

			}else{
				app.loading=false;
				app.errorMsg = data.data.message;
			}
		})
	};
})

.controller('facebookCtrl',function ($routeParams,Auth,$location,$window) {
	var app = this;

	if($window.location.pathname == '/facebookerror'){
		app.errorMsg = 'Facebook email not found in database';
	}else{
		Auth.facebook($routeParams.token);
		$location.path('/');
	}
		
});