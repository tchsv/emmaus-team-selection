'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CommunityRawMember = mongoose.model('CommunityRawMember'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, communityRawMember;

/**
 * Community raw member routes tests
 */
describe('Community raw member CRUD tests', function() {
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

		// Save a user to the test db and create new Community raw member
		user.save(function() {
			communityRawMember = {
				name: 'Community raw member Name'
			};

			done();
		});
	});

	it('should be able to save Community raw member instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community raw member
				agent.post('/community-raw-members')
					.send(communityRawMember)
					.expect(200)
					.end(function(communityRawMemberSaveErr, communityRawMemberSaveRes) {
						// Handle Community raw member save error
						if (communityRawMemberSaveErr) done(communityRawMemberSaveErr);

						// Get a list of Community raw members
						agent.get('/community-raw-members')
							.end(function(communityRawMembersGetErr, communityRawMembersGetRes) {
								// Handle Community raw member save error
								if (communityRawMembersGetErr) done(communityRawMembersGetErr);

								// Get Community raw members list
								var communityRawMembers = communityRawMembersGetRes.body;

								// Set assertions
								(communityRawMembers[0].user._id).should.equal(userId);
								(communityRawMembers[0].name).should.match('Community raw member Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Community raw member instance if not logged in', function(done) {
		agent.post('/community-raw-members')
			.send(communityRawMember)
			.expect(401)
			.end(function(communityRawMemberSaveErr, communityRawMemberSaveRes) {
				// Call the assertion callback
				done(communityRawMemberSaveErr);
			});
	});

	it('should not be able to save Community raw member instance if no name is provided', function(done) {
		// Invalidate name field
		communityRawMember.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community raw member
				agent.post('/community-raw-members')
					.send(communityRawMember)
					.expect(400)
					.end(function(communityRawMemberSaveErr, communityRawMemberSaveRes) {
						// Set message assertion
						(communityRawMemberSaveRes.body.message).should.match('Please fill Community raw member name');
						
						// Handle Community raw member save error
						done(communityRawMemberSaveErr);
					});
			});
	});

	it('should be able to update Community raw member instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community raw member
				agent.post('/community-raw-members')
					.send(communityRawMember)
					.expect(200)
					.end(function(communityRawMemberSaveErr, communityRawMemberSaveRes) {
						// Handle Community raw member save error
						if (communityRawMemberSaveErr) done(communityRawMemberSaveErr);

						// Update Community raw member name
						communityRawMember.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Community raw member
						agent.put('/community-raw-members/' + communityRawMemberSaveRes.body._id)
							.send(communityRawMember)
							.expect(200)
							.end(function(communityRawMemberUpdateErr, communityRawMemberUpdateRes) {
								// Handle Community raw member update error
								if (communityRawMemberUpdateErr) done(communityRawMemberUpdateErr);

								// Set assertions
								(communityRawMemberUpdateRes.body._id).should.equal(communityRawMemberSaveRes.body._id);
								(communityRawMemberUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Community raw members if not signed in', function(done) {
		// Create new Community raw member model instance
		var communityRawMemberObj = new CommunityRawMember(communityRawMember);

		// Save the Community raw member
		communityRawMemberObj.save(function() {
			// Request Community raw members
			request(app).get('/community-raw-members')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Community raw member if not signed in', function(done) {
		// Create new Community raw member model instance
		var communityRawMemberObj = new CommunityRawMember(communityRawMember);

		// Save the Community raw member
		communityRawMemberObj.save(function() {
			request(app).get('/community-raw-members/' + communityRawMemberObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', communityRawMember.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Community raw member instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community raw member
				agent.post('/community-raw-members')
					.send(communityRawMember)
					.expect(200)
					.end(function(communityRawMemberSaveErr, communityRawMemberSaveRes) {
						// Handle Community raw member save error
						if (communityRawMemberSaveErr) done(communityRawMemberSaveErr);

						// Delete existing Community raw member
						agent.delete('/community-raw-members/' + communityRawMemberSaveRes.body._id)
							.send(communityRawMember)
							.expect(200)
							.end(function(communityRawMemberDeleteErr, communityRawMemberDeleteRes) {
								// Handle Community raw member error error
								if (communityRawMemberDeleteErr) done(communityRawMemberDeleteErr);

								// Set assertions
								(communityRawMemberDeleteRes.body._id).should.equal(communityRawMemberSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Community raw member instance if not signed in', function(done) {
		// Set Community raw member user 
		communityRawMember.user = user;

		// Create new Community raw member model instance
		var communityRawMemberObj = new CommunityRawMember(communityRawMember);

		// Save the Community raw member
		communityRawMemberObj.save(function() {
			// Try deleting Community raw member
			request(app).delete('/community-raw-members/' + communityRawMemberObj._id)
			.expect(401)
			.end(function(communityRawMemberDeleteErr, communityRawMemberDeleteRes) {
				// Set message assertion
				(communityRawMemberDeleteRes.body.message).should.match('User is not logged in');

				// Handle Community raw member error error
				done(communityRawMemberDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			CommunityRawMember.remove().exec(function(){
				done();
			});	
		});
	});
});
