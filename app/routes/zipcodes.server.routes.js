'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var zipcodes = require('../../app/controllers/zipcodes.server.controller');

	// Zipcodes Routes
	app.route('/zipcodes')
		.get(zipcodes.list)
		.post(users.requiresLogin, zipcodes.create);

	app.route('/zipcodes/:zipcodeId')
		.get(zipcodes.read)
		.put(users.requiresLogin, zipcodes.hasAuthorization, zipcodes.update)
		.delete(users.requiresLogin, zipcodes.hasAuthorization, zipcodes.delete);

	// Finish by binding the Zipcode middleware
	app.param('zipcodeId', zipcodes.zipcodeByID);
};
