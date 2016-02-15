'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	CommunityMember = mongoose.model('CommunityMember'),
	_ = require('lodash');

/**
 * Create a Community member
 */
exports.create = function(req, res) {
	var communityMember = new CommunityMember(req.body);
	communityMember.user = req.user;

	communityMember.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(communityMember);
		}
	});
};

/**
 * Show the current Community member
 */
exports.read = function(req, res) {
	res.jsonp(req.communityMember);
};

/**
 * Update a Community member
 */
exports.update = function(req, res) {
	var communityMember = req.communityMember ;

	communityMember = _.extend(communityMember , req.body);

	communityMember.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(communityMember);
		}
	});
};

/**
 * Delete an Community member
 */
exports.delete = function(req, res) {
	var communityMember = req.communityMember ;

	communityMember.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(communityMember);
		}
	});
};

/**
 * List of Community members
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


	CommunityMember
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, communityMembers){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(communityMembers);
			}
		});

};

/**
 * Community member middleware
 */
exports.communityMemberByID = function(req, res, next, id) {
	CommunityMember.findById(id).populate('user', 'displayName').exec(function(err, communityMember) {
		if (err) return next(err);
		if (! communityMember) return next(new Error('Failed to load Community member ' + id));
		req.communityMember = communityMember ;
		next();
	});
};

/**
 * Community member authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.communityMember.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
