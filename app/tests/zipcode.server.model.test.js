'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Zipcode = mongoose.model('Zipcode');

/**
 * Globals
 */
var user, zipcode;

/**
 * Unit tests
 */
describe('Zipcode Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			zipcode = new Zipcode({
				name: 'Zipcode Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return zipcode.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			zipcode.name = '';

			return zipcode.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Zipcode.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
