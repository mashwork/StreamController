angular.module('MEAN.articles').controller("QueriesIndexController", function QueriesIndexController($scope, $http, Query, Stream){
	console.log("in Queries IndexController");
	function refreshQueries(callback){
		Query.query({}, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			$scope.queries = _.sortBy(twitterQueryData.query, function (query) {return query.title.toLowerCase()});



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
		console.log("new query =  %j", $scope.isNewQuery);
		Query.save($scope.isNewQuery, function(){
			refreshQueries();
			$scope.isNewQuery = undefined;
		});
	}

	$scope.newQuery = function(){
		$scope.isNewQuery = {title: "", terms: []};
	}

	$scope.addQuery = function(){
		$scope.selectedQueryTerms = _.chain($scope.queries)
			.filter(function(query){return query.checked === true;})
			.pluck("terms")
			.flatten()
			.uniq()
			.value();

		$scope.numTerms = _.chain($scope.selectedQueryTerms).map(function (term) {return term.split(" "); }).flatten().value().length;

		console.log("$scope.selectedQueryTerms = %j", $scope.selectedQueryTerms);
	}

	$scope.restartStream = function(){
		Stream.restart({terms: $scope.selectedQueryTerms}, function(){
			console.log("stream response received");
			getConfigSettings();
			
		});
	}

	$scope.deleteQuery = function(query){
		Query.delete({id: query._id}, function(){
			console.log("deleted")
			refreshQueries();
		});
	}
})