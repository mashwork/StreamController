
/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
	Query = mongoose.model('Query');

function sendJsonToClient(res, err, paramName, objJson, errorJson){
	if(err){
		res.status(404).json(errorJson);
	}else{
		clientParams = {};
		clientParams[paramName] = objJson;
		res.json(clientParams);
	}
}

// Create an query
exports.create = function (req, res) {
	Query.create(req.body, function(err, query){
		sendJsonToClient(res, err, "query", query, false);
	});
}

exports.update = function (req, res) {
	console.log("update called");
	console.log("the body is %j", req.body);
	Query.findByIdAndUpdate(
		req.params.queryId, 
		{ $set: req.body}, 
		function (err, query) {
			sendJsonToClient(res, err, "query", query, false);
		}
	)
}

// show 
exports.one = function (req, res) {
	Query.findOne({_id: req.params.queryId}, function(err, query){
		console.log("")
		sendJsonToClient(res, err, "query", query, false);
	});
}

exports.all = function (req, res) {
	Query.find({}, function (err, query) {
		sendJsonToClient(res, err, "query", query, false);
	});
}

// Delete a 
exports.destroy = function(req, res){
	console.log("delete called");
	Query.remove({ _id: req.params.queryId }, function(err){
		sendJsonToClient(res, err, "query", true, false);
	});
}

exports.query = function (req, res, next, id) {
	Query
		.findOne({ _id : id })
		.exec(function (err, query) {
			if (err) {return next(err); }
			if (!query) {return next(new Error('Failed to load query ' + id)); }
			req.query = query;
			next();
		});
}