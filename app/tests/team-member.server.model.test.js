'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TeamMember = mongoose.model('TeamMember');

/**
 * Globals
 */
var user, teamMember;

/**
 * Unit tests
 */
describe('Team member Model Unit Tests:', function() {
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
			teamMember = new TeamMember({
				name: 'Team member Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return teamMember.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			teamMember.name = '';

			return teamMember.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		TeamMember.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
