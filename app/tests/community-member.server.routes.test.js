'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CommunityMember = mongoose.model('CommunityMember'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, communityMember;

/**
 * Community member routes tests
 */
describe('Community member CRUD tests', function() {
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

		// Save a user to the test db and create new Community member
		user.save(function() {
			communityMember = {
				name: 'Community member Name'
			};

			done();
		});
	});

	it('should be able to save Community member instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community member
				agent.post('/community-members')
					.send(communityMember)
					.expect(200)
					.end(function(communityMemberSaveErr, communityMemberSaveRes) {
						// Handle Community member save error
						if (communityMemberSaveErr) done(communityMemberSaveErr);

						// Get a list of Community members
						agent.get('/community-members')
							.end(function(communityMembersGetErr, communityMembersGetRes) {
								// Handle Community member save error
								if (communityMembersGetErr) done(communityMembersGetErr);

								// Get Community members list
								var communityMembers = communityMembersGetRes.body;

								// Set assertions
								(communityMembers[0].user._id).should.equal(userId);
								(communityMembers[0].name).should.match('Community member Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Community member instance if not logged in', function(done) {
		agent.post('/community-members')
			.send(communityMember)
			.expect(401)
			.end(function(communityMemberSaveErr, communityMemberSaveRes) {
				// Call the assertion callback
				done(communityMemberSaveErr);
			});
	});

	it('should not be able to save Community member instance if no name is provided', function(done) {
		// Invalidate name field
		communityMember.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community member
				agent.post('/community-members')
					.send(communityMember)
					.expect(400)
					.end(function(communityMemberSaveErr, communityMemberSaveRes) {
						// Set message assertion
						(communityMemberSaveRes.body.message).should.match('Please fill Community member name');
						
						// Handle Community member save error
						done(communityMemberSaveErr);
					});
			});
	});

	it('should be able to update Community member instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community member
				agent.post('/community-members')
					.send(communityMember)
					.expect(200)
					.end(function(communityMemberSaveErr, communityMemberSaveRes) {
						// Handle Community member save error
						if (communityMemberSaveErr) done(communityMemberSaveErr);

						// Update Community member name
						communityMember.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Community member
						agent.put('/community-members/' + communityMemberSaveRes.body._id)
							.send(communityMember)
							.expect(200)
							.end(function(communityMemberUpdateErr, communityMemberUpdateRes) {
								// Handle Community member update error
								if (communityMemberUpdateErr) done(communityMemberUpdateErr);

								// Set assertions
								(communityMemberUpdateRes.body._id).should.equal(communityMemberSaveRes.body._id);
								(communityMemberUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Community members if not signed in', function(done) {
		// Create new Community member model instance
		var communityMemberObj = new CommunityMember(communityMember);

		// Save the Community member
		communityMemberObj.save(function() {
			// Request Community members
			request(app).get('/community-members')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Community member if not signed in', function(done) {
		// Create new Community member model instance
		var communityMemberObj = new CommunityMember(communityMember);

		// Save the Community member
		communityMemberObj.save(function() {
			request(app).get('/community-members/' + communityMemberObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', communityMember.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Community member instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community member
				agent.post('/community-members')
					.send(communityMember)
					.expect(200)
					.end(function(communityMemberSaveErr, communityMemberSaveRes) {
						// Handle Community member save error
						if (communityMemberSaveErr) done(communityMemberSaveErr);

						// Delete existing Community member
						agent.delete('/community-members/' + communityMemberSaveRes.body._id)
							.send(communityMember)
							.expect(200)
							.end(function(communityMemberDeleteErr, communityMemberDeleteRes) {
								// Handle Community member error error
								if (communityMemberDeleteErr) done(communityMemberDeleteErr);

								// Set assertions
								(communityMemberDeleteRes.body._id).should.equal(communityMemberSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Community member instance if not signed in', function(done) {
		// Set Community member user 
		communityMember.user = user;

		// Create new Community member model instance
		var communityMemberObj = new CommunityMember(communityMember);

		// Save the Community member
		communityMemberObj.save(function() {
			// Try deleting Community member
			request(app).delete('/community-members/' + communityMemberObj._id)
			.expect(401)
			.end(function(communityMemberDeleteErr, communityMemberDeleteRes) {
				// Set message assertion
				(communityMemberDeleteRes.body.message).should.match('User is not logged in');

				// Handle Community member error error
				done(communityMemberDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			CommunityMember.remove().exec(function(){
				done();
			});	
		});
	});
});
