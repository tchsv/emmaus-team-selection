'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	CommunityRawMember = mongoose.model('CommunityRawMember'),
	_ = require('lodash');

/**
 * Create a Community raw member
 */
exports.create = function(req, res) {
	var communityRawMember = new CommunityRawMember(req.body);
	communityRawMember.user = req.user;

	communityRawMember.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(communityRawMember);
		}
	});
};

/**
 * Show the current Community raw member
 */
exports.read = function(req, res) {
	res.jsonp(req.communityRawMember);
};

/**
 * Update a Community raw member
 */
exports.update = function(req, res) {
	var communityRawMember = req.communityRawMember ;

	communityRawMember = _.extend(communityRawMember , req.body);

	communityRawMember.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(communityRawMember);
		}
	});
};

/**
 * Delete an Community raw member
 */
exports.delete = function(req, res) {
	var communityRawMember = req.communityRawMember ;

	communityRawMember.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(communityRawMember);
		}
	});
};

/**
 * List of Community raw members
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


	CommunityRawMember
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, communityRawMembers){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(communityRawMembers);
			}
		});

};

/**
 * Community raw member middleware
 */
exports.communityRawMemberByID = function(req, res, next, id) {
	CommunityRawMember.findById(id).populate('user', 'displayName').exec(function(err, communityRawMember) {
		if (err) return next(err);
		if (! communityRawMember) return next(new Error('Failed to load Community raw member ' + id));
		req.communityRawMember = communityRawMember ;
		next();
	});
};

/**
 * Community raw member authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.communityRawMember.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
