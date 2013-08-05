
/**
 * Module dependencies.
 */

var  fs = require('fs'),
	env = process.env.NODE_ENV || 'development',
	config = require(__dirname + "/../../config/config")[env]

exports.index = function (req, res) {
	console.log("__dirname = " + __dirname);

	console.log("config.app.configFilePath = " + config.app.configFilePath);
	fs.readFile(config.app.configFilePath, 'ascii', function (err, data) {
		if (err) throw err;
		var queryString = data.split("filter.track=")[1];
		console.log("query String = %j", queryString);
		console.log("type of query = " + typeof queryString);

		var responseQueryJson = {};
		responseQueryJson.query = queryString;
		res.json(responseQueryJson);
	});
}