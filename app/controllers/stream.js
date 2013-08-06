
/**
 * Module dependencies.
 */

var  fs = require('fs'),
	env = process.env.NODE_ENV || 'development',
	config = require(__dirname + "/../../config/config")[env];

exports.restart = function(req, res){
	var exec = require('child_process').exec,
		stream = exec(config.app.streamCommandPath + " restart", function(error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}

		});
	res.json({});
}