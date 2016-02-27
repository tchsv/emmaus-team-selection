'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Committee = mongoose.model('Committee'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, committee;

/**
 * Committee routes tests
 */
describe('Committee CRUD tests', function() {
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

		// Save a user to the test db and create new Committee
		user.save(function() {
			committee = {
				name: 'Committee Name'
			};

			done();
		});
	});

	it('should be able to save Committee instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Committee
				agent.post('/committees')
					.send(committee)
					.expect(200)
					.end(function(committeeSaveErr, committeeSaveRes) {
						// Handle Committee save error
						if (committeeSaveErr) done(committeeSaveErr);

						// Get a list of Committees
						agent.get('/committees')
							.end(function(committeesGetErr, committeesGetRes) {
								// Handle Committee save error
								if (committeesGetErr) done(committeesGetErr);

								// Get Committees list
								var committees = committeesGetRes.body;

								// Set assertions
								(committees[0].user._id).should.equal(userId);
								(committees[0].name).should.match('Committee Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Committee instance if not logged in', function(done) {
		agent.post('/committees')
			.send(committee)
			.expect(401)
			.end(function(committeeSaveErr, committeeSaveRes) {
				// Call the assertion callback
				done(committeeSaveErr);
			});
	});

	it('should not be able to save Committee instance if no name is provided', function(done) {
		// Invalidate name field
		committee.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Committee
				agent.post('/committees')
					.send(committee)
					.expect(400)
					.end(function(committeeSaveErr, committeeSaveRes) {
						// Set message assertion
						(committeeSaveRes.body.message).should.match('Please fill Committee name');
						
						// Handle Committee save error
						done(committeeSaveErr);
					});
			});
	});

	it('should be able to update Committee instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Committee
				agent.post('/committees')
					.send(committee)
					.expect(200)
					.end(function(committeeSaveErr, committeeSaveRes) {
						// Handle Committee save error
						if (committeeSaveErr) done(committeeSaveErr);

						// Update Committee name
						committee.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Committee
						agent.put('/committees/' + committeeSaveRes.body._id)
							.send(committee)
							.expect(200)
							.end(function(committeeUpdateErr, committeeUpdateRes) {
								// Handle Committee update error
								if (committeeUpdateErr) done(committeeUpdateErr);

								// Set assertions
								(committeeUpdateRes.body._id).should.equal(committeeSaveRes.body._id);
								(committeeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Committees if not signed in', function(done) {
		// Create new Committee model instance
		var committeeObj = new Committee(committee);

		// Save the Committee
		committeeObj.save(function() {
			// Request Committees
			request(app).get('/committees')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Committee if not signed in', function(done) {
		// Create new Committee model instance
		var committeeObj = new Committee(committee);

		// Save the Committee
		committeeObj.save(function() {
			request(app).get('/committees/' + committeeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', committee.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Committee instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Committee
				agent.post('/committees')
					.send(committee)
					.expect(200)
					.end(function(committeeSaveErr, committeeSaveRes) {
						// Handle Committee save error
						if (committeeSaveErr) done(committeeSaveErr);

						// Delete existing Committee
						agent.delete('/committees/' + committeeSaveRes.body._id)
							.send(committee)
							.expect(200)
							.end(function(committeeDeleteErr, committeeDeleteRes) {
								// Handle Committee error error
								if (committeeDeleteErr) done(committeeDeleteErr);

								// Set assertions
								(committeeDeleteRes.body._id).should.equal(committeeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Committee instance if not signed in', function(done) {
		// Set Committee user 
		committee.user = user;

		// Create new Committee model instance
		var committeeObj = new Committee(committee);

		// Save the Committee
		committeeObj.save(function() {
			// Try deleting Committee
			request(app).delete('/committees/' + committeeObj._id)
			.expect(401)
			.end(function(committeeDeleteErr, committeeDeleteRes) {
				// Set message assertion
				(committeeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Committee error error
				done(committeeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Committee.remove().exec(function(){
				done();
			});	
		});
	});
});
