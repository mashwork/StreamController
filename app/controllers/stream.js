
/**
 * Module dependencies.
 */

var  fs = require('fs'),
	env = process.env.NODE_ENV || 'development',
	config = require(__dirname + "/../../config/config")[env];

exports.restart = function(req, res){
	// var spawn = require('child_process').spawn,
	// 	stream = spawn(config.app.streamCommandPath, ['restart']);

	console.log("stream restarted");
}