function QueriesIndexController($scope, $http, Query, Stream){


	function refreshQueries(callback){
		Query.query({}, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			$scope.queries = twitterQueryData.query;
			if(callback !== undefined){ callback(); } 
		});
	}

	function getConfigSettings(callback){
		Stream.show({}, function(configSettings){
			$scope.settings = configSettings;
			$scope.settingsDataPairs = _.pairs(configSettings);
			if(callback !== undefined){ callback(); } 
		});
	}
	
	refreshQueries();
	getConfigSettings();

	$scope.addQuery = function(){
		Query.save({}, function(){
			refreshQueries();
		});
	}

	$scope.restartStream = function(query){
		Stream.restart({terms: query.terms}, function(){
			console.log("stream response received");
			refreshQueries(function(){
				getConfigSettings();
			});
		});
	}
}