'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Talk = mongoose.model('Talk'),
	_ = require('lodash');

/**
 * Create a Talk
 */
exports.create = function(req, res) {
	var talk = new Talk(req.body);
	talk.user = req.user;

	talk.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(talk);
		}
	});
};

/**
 * Show the current Talk
 */
exports.read = function(req, res) {
	res.jsonp(req.talk);
};

/**
 * Update a Talk
 */
exports.update = function(req, res) {
	var talk = req.talk ;

	talk = _.extend(talk , req.body);

	talk.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(talk);
		}
	});
};

/**
 * Delete an Talk
 */
exports.delete = function(req, res) {
	var talk = req.talk ;

	talk.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(talk);
		}
	});
};

/**
 * List of Talks
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


	Talk
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, talks){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(talks);
			}
		});

};

/**
 * Talk middleware
 */
exports.talkByID = function(req, res, next, id) {
	Talk.findById(id).populate('user', 'displayName').exec(function(err, talk) {
		if (err) return next(err);
		if (! talk) return next(new Error('Failed to load Talk ' + id));
		req.talk = talk ;
		next();
	});
};

/**
 * Talk authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.talk.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
