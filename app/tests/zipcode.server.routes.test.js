'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Zipcode = mongoose.model('Zipcode'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, zipcode;

/**
 * Zipcode routes tests
 */
describe('Zipcode CRUD tests', function() {
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

		// Save a user to the test db and create new Zipcode
		user.save(function() {
			zipcode = {
				name: 'Zipcode Name'
			};

			done();
		});
	});

	it('should be able to save Zipcode instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Zipcode
				agent.post('/zipcodes')
					.send(zipcode)
					.expect(200)
					.end(function(zipcodeSaveErr, zipcodeSaveRes) {
						// Handle Zipcode save error
						if (zipcodeSaveErr) done(zipcodeSaveErr);

						// Get a list of Zipcodes
						agent.get('/zipcodes')
							.end(function(zipcodesGetErr, zipcodesGetRes) {
								// Handle Zipcode save error
								if (zipcodesGetErr) done(zipcodesGetErr);

								// Get Zipcodes list
								var zipcodes = zipcodesGetRes.body;

								// Set assertions
								(zipcodes[0].user._id).should.equal(userId);
								(zipcodes[0].name).should.match('Zipcode Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Zipcode instance if not logged in', function(done) {
		agent.post('/zipcodes')
			.send(zipcode)
			.expect(401)
			.end(function(zipcodeSaveErr, zipcodeSaveRes) {
				// Call the assertion callback
				done(zipcodeSaveErr);
			});
	});

	it('should not be able to save Zipcode instance if no name is provided', function(done) {
		// Invalidate name field
		zipcode.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Zipcode
				agent.post('/zipcodes')
					.send(zipcode)
					.expect(400)
					.end(function(zipcodeSaveErr, zipcodeSaveRes) {
						// Set message assertion
						(zipcodeSaveRes.body.message).should.match('Please fill Zipcode name');
						
						// Handle Zipcode save error
						done(zipcodeSaveErr);
					});
			});
	});

	it('should be able to update Zipcode instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Zipcode
				agent.post('/zipcodes')
					.send(zipcode)
					.expect(200)
					.end(function(zipcodeSaveErr, zipcodeSaveRes) {
						// Handle Zipcode save error
						if (zipcodeSaveErr) done(zipcodeSaveErr);

						// Update Zipcode name
						zipcode.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Zipcode
						agent.put('/zipcodes/' + zipcodeSaveRes.body._id)
							.send(zipcode)
							.expect(200)
							.end(function(zipcodeUpdateErr, zipcodeUpdateRes) {
								// Handle Zipcode update error
								if (zipcodeUpdateErr) done(zipcodeUpdateErr);

								// Set assertions
								(zipcodeUpdateRes.body._id).should.equal(zipcodeSaveRes.body._id);
								(zipcodeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Zipcodes if not signed in', function(done) {
		// Create new Zipcode model instance
		var zipcodeObj = new Zipcode(zipcode);

		// Save the Zipcode
		zipcodeObj.save(function() {
			// Request Zipcodes
			request(app).get('/zipcodes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Zipcode if not signed in', function(done) {
		// Create new Zipcode model instance
		var zipcodeObj = new Zipcode(zipcode);

		// Save the Zipcode
		zipcodeObj.save(function() {
			request(app).get('/zipcodes/' + zipcodeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', zipcode.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Zipcode instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Zipcode
				agent.post('/zipcodes')
					.send(zipcode)
					.expect(200)
					.end(function(zipcodeSaveErr, zipcodeSaveRes) {
						// Handle Zipcode save error
						if (zipcodeSaveErr) done(zipcodeSaveErr);

						// Delete existing Zipcode
						agent.delete('/zipcodes/' + zipcodeSaveRes.body._id)
							.send(zipcode)
							.expect(200)
							.end(function(zipcodeDeleteErr, zipcodeDeleteRes) {
								// Handle Zipcode error error
								if (zipcodeDeleteErr) done(zipcodeDeleteErr);

								// Set assertions
								(zipcodeDeleteRes.body._id).should.equal(zipcodeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Zipcode instance if not signed in', function(done) {
		// Set Zipcode user 
		zipcode.user = user;

		// Create new Zipcode model instance
		var zipcodeObj = new Zipcode(zipcode);

		// Save the Zipcode
		zipcodeObj.save(function() {
			// Try deleting Zipcode
			request(app).delete('/zipcodes/' + zipcodeObj._id)
			.expect(401)
			.end(function(zipcodeDeleteErr, zipcodeDeleteRes) {
				// Set message assertion
				(zipcodeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Zipcode error error
				done(zipcodeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Zipcode.remove().exec(function(){
				done();
			});	
		});
	});
});
