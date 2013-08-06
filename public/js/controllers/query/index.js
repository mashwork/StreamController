function QueryIndexController($scope, $http, Query, Stream){

	$scope.editMode = false;

	function refreshQuery(){
		console.log("in the QueryIndexController");
		Query.query({}, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			$scope.queryTerms = _.map(twitterQueryData.query.split(","), function(term){ return {string: term}});
			$scope.numberOfTerms = twitterQueryData.query.split(",").join(" ").split(" ").length;
			$scope.editMode = false;
		});
	}
	
	refreshQuery();

	$scope.submitQuery = function(){

		var returnedTermsString = _.chain($scope.queryTerms)
			.pluck("string")
			.select(function(termString){ return termString !== undefined && termString.length > 0})
			.uniq()
			.value()
			.join(",");

		Query.save({query: returnedTermsString }, function(twitterQueryData){
			console.log("twitterQueryData = %j", twitterQueryData);
			refreshQuery();
		});
	}

	$scope.restartStream = function(){
		console.log("stream request sent");
		Stream.restart({}, function(){
			console.log("stream response received");
		});
	}

	$scope.editTerm = function(term){
		term.string_edit = true;
		$scope.editMode = true;
	}

	$scope.addTerm = function(){
		$scope.queryTerms.unshift({string: "", string_edit: true});
		$scope.editMode = true;
	}

	$scope.deleteTerm = function(term){
		$scope.queryTerms = _.without($scope.queryTerms, term);
		$scope.editMode = true;
	}


}