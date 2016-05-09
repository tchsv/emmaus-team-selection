'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Zipcode Schema
 * Add new properties to the Mongoose Schema in app/models/module-name.server.model.js
 * Then add new properties to the angular-formly array properties in public/modules/module-name/services/module-name.form.client.service.js
 * Then add new columns for the new properties in the HTML table in public/modules/module-name/views/list-module-name.client.view.html

 var zipLoc = db.zipcodes.findOne({ "_id": "60661" })
 var results = db.zipcodes.find({
    "loc": {
         "$near": zipLoc.loc,
         "$maxDistance": 5*(1/69)
      }
})

 db.zipcodes.find({
     "loc": {
         "$near": [ -87.68, 41.83 ],
         "$maxDistance": 5*(1/69)
      },
      "_id": { "$gte": "60630", "$lte": "60680"}
 })

 */
var ZipcodeSchema = new Schema({
	city: {
		type: String,
		default: '',
		required: 'City',
		trim: true
	},
	state: {
		type: String,
		default: '',
		required: 'State',
		trim: true
	},
	pop: {
		type: Number,
		default: '',
		required: 'City',
		trim: true
	},
	loc: [],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Zipcode', ZipcodeSchema);
