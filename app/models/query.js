var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, crypto = require('crypto')
	, _ = require('underscore');

/**
 * User Schema
 */

var QuerySchema = new Schema({
	title: {type : String, required: true, unique: true, trim : true},
	terms: [String],
	lastRun: {type : Date}, 
	createdAt  : {type : Date, default : Date.now}
});

mongoose.model('Query', QuerySchema)