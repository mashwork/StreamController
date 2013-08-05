function QueryIndexController($scope, $http, Query){

	console.log("in the QueryIndexController");
	Query.query({}, function(twitterQueryData){
		console.log("twitterQueryData = %j", twitterQueryData);
		$scope.queryTerms = twitterQueryData.query.split(",");
	});

}