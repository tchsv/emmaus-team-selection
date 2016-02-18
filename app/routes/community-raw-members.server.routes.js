'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var communityRawMembers = require('../../app/controllers/community-raw-members.server.controller');

	// Community raw members Routes
	app.route('/community-raw-members')
		.get(communityRawMembers.list)
		.post(users.requiresLogin, communityRawMembers.create);

	app.route('/community-raw-members/:communityRawMemberId')
		.get(communityRawMembers.read)
		.put(users.requiresLogin, communityRawMembers.hasAuthorization, communityRawMembers.update)
		.delete(users.requiresLogin, communityRawMembers.hasAuthorization, communityRawMembers.delete);

	// Finish by binding the Community raw member middleware
	app.param('communityRawMemberId', communityRawMembers.communityRawMemberByID);
};
