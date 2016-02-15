'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var communityMembers = require('../../app/controllers/community-members.server.controller');

	// Community members Routes
	app.route('/community-members')
		.get(communityMembers.list)
		.post(users.requiresLogin, communityMembers.create);

	app.route('/community-members/:communityMemberId')
		.get(communityMembers.read)
		.put(users.requiresLogin, communityMembers.hasAuthorization, communityMembers.update)
		.delete(users.requiresLogin, communityMembers.hasAuthorization, communityMembers.delete);

	// Finish by binding the Community member middleware
	app.param('communityMemberId', communityMembers.communityMemberByID);
};
