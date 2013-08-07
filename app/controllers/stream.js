
/**
 * Module dependencies.
 */

var  fs = require('fs'),
	_ = require('underscore'),
	env = process.env.NODE_ENV || 'development',
	config = require(__dirname + "/../../config/config")[env];

function readConfigFile(callback){
	fs.readFile(config.app.configFilePath, 'ascii', function (err, data) {
		callback(err, data);
	});
}

function splitConfig(callback){
	readConfigFile( function (err, data) {
		if (err) throw err;
		var configSettings = _.chain(data.split("\n"))
			.map(function(line){ return line.split("=")})
			.object()
			.value();

		console.log("config settings = ", configSettings);

		callback(err, configSettings);
	});
}

function configIntoString(configSettings){
	return _.chain(configSettings)
		.pairs()
		.map(function(settingPair){ return settingPair.join("=")})
		.value()
		.join("\n");
}

exports.show = function(req, res){
	splitConfig(function(err, configSettings){
		res.json(configSettings);
	});
}

exports.restart = function(req, res){
	var configQuery = req.body.terms.join(",");

	console.log("restart was pressed");
	console.log("data is %j", req.body);
	splitConfig(function (err, configSettings) {
		if (err) throw err;
		configSettings["filter.track"] = configQuery;
		console.log("setting file = " + configIntoString(configSettings));

		fs.writeFile(config.app.configFilePath, configIntoString(configSettings), function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");


				var exec = require('child_process').exec,
					stream = exec(config.app.streamCommandPath + " restart", function(error, stdout, stderr){
					console.log('stdout: ' + stdout);
					console.log('stderr: ' + stderr);
					if (error !== null) {
						console.log('exec error: ' + error);
					}

				});
				res.json(configSettings);
			}
		});
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