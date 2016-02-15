'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var teamMembers = require('../../app/controllers/team-members.server.controller');

	// Team members Routes
	app.route('/team-members')
		.get(teamMembers.list)
		.post(users.requiresLogin, teamMembers.create);

	app.route('/team-members/:teamMemberId')
		.get(teamMembers.read)
		.put(users.requiresLogin, teamMembers.hasAuthorization, teamMembers.update)
		.delete(users.requiresLogin, teamMembers.hasAuthorization, teamMembers.delete);

	// Finish by binding the Team member middleware
	app.param('teamMemberId', teamMembers.teamMemberByID);
};
