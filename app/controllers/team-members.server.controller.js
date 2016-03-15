'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	TeamMember = mongoose.model('TeamMember'),
	_ = require('lodash');

/**
 * Create a Team member
 */
exports.create = function(req, res) {
	var teamMember = new TeamMember(req.body);
	teamMember.user = req.user;

	teamMember.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teamMember);
		}
	});
};

/**
 * Show the current Team member
 */
exports.read = function(req, res) {
	res.jsonp(req.teamMember);
};

/**
 * Update a Team member
 */
exports.update = function(req, res) {
	var teamMember = req.teamMember ;

	teamMember = _.extend(teamMember , req.body);

	teamMember.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teamMember);
		}
	});
};

/**
 * Delete an Team member
 */
exports.delete = function(req, res) {
	var teamMember = req.teamMember ;

	teamMember.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teamMember);
		}
	});
};

/**
 * List of Team members
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


	TeamMember
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, teamMembers){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(teamMembers);
			}
		});

};

/**
 * Team member middleware
 */
exports.teamMemberByID = function(req, res, next, id) {
	TeamMember.findById(id).populate('user', 'displayName').exec(function(err, teamMember) {
		if (err) return next(err);
		if (! teamMember) return next(new Error('Failed to load Team member ' + id));
		req.teamMember = teamMember ;
		next();
	});
};

/**
 * Team member authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	//if (req.teamMember.user.id !== req.user.id) {
	//	return res.status(403).send('User is not authorized');
	//}
	next();
};
