//Articles service used for articles REST endpoint

window.app.factory("Query", function($resource){
	return $resource('/api/queries/:id', 
		{id:'@id'}, 
		{
			update: {method: 'PUT'},
			query:  {method: "GET", isArray:false}
		}
	);
});

window.app.factory("Stream", function($resource){
	return $resource('/api/stream', {},
		{
			restart: {method: "POST"},
			show: {method: "GET"}
		}
	);
});