//Setting up route
window.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/queries',		{ templateUrl: '/partials/queries/index',	controller: QueriesIndexController })
		.when('/queries/:id',	{ templateUrl: '/partials/queries/show',	controller: QueriesShowController })
		.otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);