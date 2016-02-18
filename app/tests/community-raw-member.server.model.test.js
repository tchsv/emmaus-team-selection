'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CommunityRawMember = mongoose.model('CommunityRawMember');

/**
 * Globals
 */
var user, communityRawMember;

/**
 * Unit tests
 */
describe('Community raw member Model Unit Tests:', function() {
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
			communityRawMember = new CommunityRawMember({
				name: 'Community raw member Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return communityRawMember.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			communityRawMember.name = '';

			return communityRawMember.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		CommunityRawMember.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
