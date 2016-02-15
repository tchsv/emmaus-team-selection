'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CommunityMember = mongoose.model('CommunityMember');

/**
 * Globals
 */
var user, communityMember;

/**
 * Unit tests
 */
describe('Community member Model Unit Tests:', function() {
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
			communityMember = new CommunityMember({
				name: 'Community member Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return communityMember.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			communityMember.name = '';

			return communityMember.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		CommunityMember.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
