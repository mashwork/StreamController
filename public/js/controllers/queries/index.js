function QueriesIndexController($scope, $http, Query, Stream){


	function refreshQueries(){
		Query.query({}, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			$scope.queries = twitterQueryData.query;
		});
	}

	function getConfigSettings(){
		Stream.show({}, function(configSettings){
			$scope.settings = configSettings;
			$scope.settingsDataPairs = _.pairs(configSettings);
		});
	}
	
	refreshQueries();
	getConfigSettings();

	$scope.addQuery = function(){
		Query.save({}, function(){
			refreshQueries();
		});
	}
}