//Articles service used for articles REST endpoint

angular.module('MEAN.articles')
	.factory("Query", function($resource){
		return $resource('/api/queries/:id', 
			{id:'@id'}, 
			{
				update: {method: 'PUT'},
				query:  {method: "GET", isArray:false}
			}
		);
	})
	.factory("Stream", function($resource){
		return $resource('/api/stream', {},
			{
				restart: {method: "POST"},
				show: {method: "GET"}
			}
		);
	});