'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Committee Schema
 * Add new properties to the Mongoose Schema in app/models/module-name.server.model.js
 * Then add new properties to the angular-formly array properties in public/modules/module-name/services/module-name.form.client.service.js
 * Then add new columns for the new properties in the HTML table in public/modules/module-name/views/list-module-name.client.view.html
 */
var CommitteeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Committee name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Committee', CommitteeSchema);
