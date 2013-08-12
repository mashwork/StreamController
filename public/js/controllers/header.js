function HeaderController($scope, $location, Global) {
	$scope.global = Global;
	$scope.menu = [
		{
			"title": "Queries",
			"link": "queries"
		}
	];

	$scope.init = function() {

	};
}