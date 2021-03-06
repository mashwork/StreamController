angular.module('MEAN.articles').controller("QueriesShowController", function QueriesShowController($scope, $http, $routeParams, Query, Stream){

	$scope.editMode = false;

	function formattedQuery(query){
		var formattedQuery = {};
		_.pluck(query.terms, "string")
		formattedQuery.terms = _.select(
			_.pluck(query.terms, "string").join(",").split(","),
			function(term){return term.trim().length > 0}
		);
			
		formattedQuery.createdAt = query.createdAt;
		formattedQuery.lastRun = query.lastRun;
		formattedQuery.title = query.title;
		console.log("$scope.query = %j", query);
		console.log("formattedQuery = %j", formattedQuery);
		return formattedQuery;
	}

	function refreshQuery(){
		console.log("in the QueryIndexController");
		console.log("$routeParams.id " + $routeParams.id);
		Query.get({id: $routeParams.id}, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			$scope.query = twitterQueryData.query;


			if($scope.query.terms === undefined){$scope.query.terms = []; }
			$scope.query.terms = _.map($scope.query.terms, function(term) {return {string: term, editMode: false}})

			$scope.numberOfTerms = _.pluck(twitterQueryData.query.terms, "string").join(" ").split(" ").length;

			$scope.editMode = false;
		});
	}
	
	refreshQuery();

	$scope.submitQuery = function(){
		console.log("query = %j", $scope.query);
		Query.update({id: $routeParams.id}, formattedQuery($scope.query), function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			refreshQuery();
		});
	}

	$scope.restartStream = function(){
		console.log("stream request sent");
		Stream.restart({terms: formattedQuery($scope.query).terms}, function(){
			Query.update({id: $routeParams.id}, {lastRun: Date.now()}, function(twitterQueryData){
				refreshQuery();
			});
		});
	}

	$scope.editTitle = function(){
		$scope.query.title_edit = true;
		$scope.editMode = true;
	}

	$scope.editTerm = function(term){
		term.string_edit = true;
		$scope.editMode = true;
	}

	$scope.addTerm = function(){
		$scope.query.terms.unshift({string: "", string_edit: true});
		$scope.editMode = true;
	}

	$scope.deleteTerm = function(term){
		$scope.query.terms = _.without($scope.query.terms, term);
		$scope.editMode = true;
	}
})