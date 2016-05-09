'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Zipcode = mongoose.model('Zipcode'),
	_ = require('lodash');

/**
 * Create a Zipcode
 */
exports.create = function(req, res) {
	var zipcode = new Zipcode(req.body);
	zipcode.user = req.user;

	zipcode.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(zipcode);
		}
	});
};

/**
 * Show the current Zipcode
 */
exports.read = function(req, res) {
	res.jsonp(req.zipcode);
};

/**
 * Update a Zipcode
 */
exports.update = function(req, res) {
	var zipcode = req.zipcode ;

	zipcode = _.extend(zipcode , req.body);

	zipcode.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(zipcode);
		}
	});
};

/**
 * Delete an Zipcode
 */
exports.delete = function(req, res) {
	var zipcode = req.zipcode ;

	zipcode.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(zipcode);
		}
	});
};

/**
 * List of Zipcodes
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Zipcode
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, zipcodes){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(zipcodes);
			}
		});

};

/**
 * Zipcode middleware
 */
exports.zipcodeByID = function(req, res, next, id) {
	Zipcode.findById(id).populate('user', 'displayName').exec(function(err, zipcode) {
		if (err) return next(err);
		if (! zipcode) return next(new Error('Failed to load Zipcode ' + id));
		req.zipcode = zipcode ;
		next();
	});
};

/**
 * Zipcode authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.zipcode.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
