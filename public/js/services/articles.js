//Articles service used for articles REST endpoint

window.app.factory("Query", function($resource){
	return $resource('api/query/:queryId', 
		{articleId:'@_id'}, 
		{
			update: {method: 'PUT'},
			query:  {method: "GET", isArray:false}
		}
	);
});