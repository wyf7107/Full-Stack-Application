angular.module('userApp',['appRoutes','userControllers','userServices','mainController','authServices','newPlaceController'])

.config(function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});
