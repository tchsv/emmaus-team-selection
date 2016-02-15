'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TeamMember = mongoose.model('TeamMember'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, teamMember;

/**
 * Team member routes tests
 */
describe('Team member CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Team member
		user.save(function() {
			teamMember = {
				name: 'Team member Name'
			};

			done();
		});
	});

	it('should be able to save Team member instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team member
				agent.post('/team-members')
					.send(teamMember)
					.expect(200)
					.end(function(teamMemberSaveErr, teamMemberSaveRes) {
						// Handle Team member save error
						if (teamMemberSaveErr) done(teamMemberSaveErr);

						// Get a list of Team members
						agent.get('/team-members')
							.end(function(teamMembersGetErr, teamMembersGetRes) {
								// Handle Team member save error
								if (teamMembersGetErr) done(teamMembersGetErr);

								// Get Team members list
								var teamMembers = teamMembersGetRes.body;

								// Set assertions
								(teamMembers[0].user._id).should.equal(userId);
								(teamMembers[0].name).should.match('Team member Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Team member instance if not logged in', function(done) {
		agent.post('/team-members')
			.send(teamMember)
			.expect(401)
			.end(function(teamMemberSaveErr, teamMemberSaveRes) {
				// Call the assertion callback
				done(teamMemberSaveErr);
			});
	});

	it('should not be able to save Team member instance if no name is provided', function(done) {
		// Invalidate name field
		teamMember.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team member
				agent.post('/team-members')
					.send(teamMember)
					.expect(400)
					.end(function(teamMemberSaveErr, teamMemberSaveRes) {
						// Set message assertion
						(teamMemberSaveRes.body.message).should.match('Please fill Team member name');
						
						// Handle Team member save error
						done(teamMemberSaveErr);
					});
			});
	});

	it('should be able to update Team member instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team member
				agent.post('/team-members')
					.send(teamMember)
					.expect(200)
					.end(function(teamMemberSaveErr, teamMemberSaveRes) {
						// Handle Team member save error
						if (teamMemberSaveErr) done(teamMemberSaveErr);

						// Update Team member name
						teamMember.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Team member
						agent.put('/team-members/' + teamMemberSaveRes.body._id)
							.send(teamMember)
							.expect(200)
							.end(function(teamMemberUpdateErr, teamMemberUpdateRes) {
								// Handle Team member update error
								if (teamMemberUpdateErr) done(teamMemberUpdateErr);

								// Set assertions
								(teamMemberUpdateRes.body._id).should.equal(teamMemberSaveRes.body._id);
								(teamMemberUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Team members if not signed in', function(done) {
		// Create new Team member model instance
		var teamMemberObj = new TeamMember(teamMember);

		// Save the Team member
		teamMemberObj.save(function() {
			// Request Team members
			request(app).get('/team-members')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Team member if not signed in', function(done) {
		// Create new Team member model instance
		var teamMemberObj = new TeamMember(teamMember);

		// Save the Team member
		teamMemberObj.save(function() {
			request(app).get('/team-members/' + teamMemberObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', teamMember.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Team member instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team member
				agent.post('/team-members')
					.send(teamMember)
					.expect(200)
					.end(function(teamMemberSaveErr, teamMemberSaveRes) {
						// Handle Team member save error
						if (teamMemberSaveErr) done(teamMemberSaveErr);

						// Delete existing Team member
						agent.delete('/team-members/' + teamMemberSaveRes.body._id)
							.send(teamMember)
							.expect(200)
							.end(function(teamMemberDeleteErr, teamMemberDeleteRes) {
								// Handle Team member error error
								if (teamMemberDeleteErr) done(teamMemberDeleteErr);

								// Set assertions
								(teamMemberDeleteRes.body._id).should.equal(teamMemberSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Team member instance if not signed in', function(done) {
		// Set Team member user 
		teamMember.user = user;

		// Create new Team member model instance
		var teamMemberObj = new TeamMember(teamMember);

		// Save the Team member
		teamMemberObj.save(function() {
			// Try deleting Team member
			request(app).delete('/team-members/' + teamMemberObj._id)
			.expect(401)
			.end(function(teamMemberDeleteErr, teamMemberDeleteRes) {
				// Set message assertion
				(teamMemberDeleteRes.body.message).should.match('User is not logged in');

				// Handle Team member error error
				done(teamMemberDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			TeamMember.remove().exec(function(){
				done();
			});	
		});
	});
});
