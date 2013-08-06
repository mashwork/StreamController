
/**
 * Module dependencies.
 */

var  fs = require('fs'),
	env = process.env.NODE_ENV || 'development',
	config = require(__dirname + "/../../config/config")[env]

function readConfigFile(callback){
	fs.readFile(config.app.configFilePath, 'ascii', function (err, data) {
		callback(err, data);
	});
}

exports.index = function (req, res) {
	console.log("__dirname = " + __dirname);

	console.log("config.app.configFilePath = " + config.app.configFilePath);
	readConfigFile( function (err, data) {
		if (err) throw err;
		var queryString = data.split("filter.track=")[1];
		console.log("query String = %j", queryString);

		res.json({query: queryString});
	});
}

exports.save = function (req, res) {
	console.log("__dirname = " + __dirname);

	console.log("config.app.configFilePath = " + config.app.configFilePath);
	readConfigFile( function (err, data) {
		if (err) throw err;
		var splitPortion = "filter.track=";

		var splitQueryString = data.split(splitPortion);

		var otherFilePart = splitQueryString[0] + splitPortion;
		var query = req.body.query;

		console.log("the query string is: " + query);

		fs.writeFile(config.app.configFilePath, otherFilePart + query, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
				res.json({query: otherFilePart + query});
			}
		});
	});
}