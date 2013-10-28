//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/queries',					{ templateUrl: 'views/queries/index.html'})
		.when('/queries/:id',				{ templateUrl: 'views/queries/show.html'})
		.when('/', 							{ templateUrl: 'views/index.html'})
		.otherwise(							{ redirectTo: '/' });
}]);





//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);