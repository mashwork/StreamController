angular.module('MEAN.articles').controller("QueriesIndexController", function QueriesIndexController($scope, $http, Query, Stream){
	console.log("in Queries IndexController");
	function refreshQueries(callback){
		Query.query({}, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			$scope.queries = twitterQueryData.query;

			var latestQuery = _.max($scope.queries, function(query){ return Date.parse(query.lastRun); });
			if(latestQuery !== undefined){
				latestQuery.lastRunning = true;
			}
			console.log("lastestQuery = " + latestQuery);

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

	$scope.submitQuery = function(){
		console.log("new query =  %j", $scope.newQuery);
		Query.save($scope.newQuery, function(){
			refreshQueries();
			$scope.newQuery = undefined;
		});
	}

	$scope.addQuery = function(){
		$scope.newQuery = {title: "", terms: []};
	}

	$scope.restartStream = function(query){
		Stream.restart({terms: query.terms}, function(){
			Query.update({id: query._id}, {lastRun: Date.now()}, function(twitterQueryData){
				console.log("stream response received");
				refreshQueries(function(){
					getConfigSettings();
				});
			});
			
		});
	}

	$scope.deleteQuery = function(query){
		Query.delete({id: query._id}, function(){
			console.log("deleted")
			refreshQueries();
		});
	}
})