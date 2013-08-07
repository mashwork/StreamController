function QueriesIndexController($scope, $http, Query, Stream){


	function refreshQueries(){
		Query.query({}, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			$scope.queries = twitterQueryData.query;
		});
	}
	
	refreshQueries();

	$scope.addQuery = function(){
		Query.save({}, function(){
			refreshQueries();
		});
	}
}