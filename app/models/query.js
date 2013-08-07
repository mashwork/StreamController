var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, crypto = require('crypto')
	, _ = require('underscore');

/**
 * User Schema
 */

var QuerySchema = new Schema({
	terms: [String], 
	createdAt  : {type : Date, default : Date.now}
});

mongoose.model('Query', QuerySchema)