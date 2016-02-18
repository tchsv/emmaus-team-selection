'use strict';

(function() {
	// Community raw members Controller Spec
	describe('Community raw members Controller Tests', function() {
		// Initialize global variables
		var CommunityRawMembersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Community raw members controller.
			CommunityRawMembersController = $controller('CommunityRawMembersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Community raw member object fetched from XHR', inject(function(CommunityRawMembers) {
			// Create sample Community raw member using the Community raw members service
			var sampleCommunityRawMember = new CommunityRawMembers({
				name: 'New Community raw member'
			});

			// Create a sample Community raw members array that includes the new Community raw member
			var sampleCommunityRawMembers = [sampleCommunityRawMember];

			// Set GET response
			$httpBackend.expectGET('community-raw-members').respond(sampleCommunityRawMembers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.communityRawMembers).toEqualData(sampleCommunityRawMembers);
		}));

		it('$scope.findOne() should create an array with one Community raw member object fetched from XHR using a communityRawMemberId URL parameter', inject(function(CommunityRawMembers) {
			// Define a sample Community raw member object
			var sampleCommunityRawMember = new CommunityRawMembers({
				name: 'New Community raw member'
			});

			// Set the URL parameter
			$stateParams.communityRawMemberId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/community-raw-members\/([0-9a-fA-F]{24})$/).respond(sampleCommunityRawMember);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.communityRawMember).toEqualData(sampleCommunityRawMember);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CommunityRawMembers) {
			// Create a sample Community raw member object
			var sampleCommunityRawMemberPostData = new CommunityRawMembers({
				name: 'New Community raw member'
			});

			// Create a sample Community raw member response
			var sampleCommunityRawMemberResponse = new CommunityRawMembers({
				_id: '525cf20451979dea2c000001',
				name: 'New Community raw member'
			});

			// Fixture mock form input values
			scope.name = 'New Community raw member';

			// Set POST response
			$httpBackend.expectPOST('community-raw-members', sampleCommunityRawMemberPostData).respond(sampleCommunityRawMemberResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Community raw member was created
			expect($location.path()).toBe('/community-raw-members/' + sampleCommunityRawMemberResponse._id);
		}));

		it('$scope.update() should update a valid Community raw member', inject(function(CommunityRawMembers) {
			// Define a sample Community raw member put data
			var sampleCommunityRawMemberPutData = new CommunityRawMembers({
				_id: '525cf20451979dea2c000001',
				name: 'New Community raw member'
			});

			// Mock Community raw member in scope
			scope.communityRawMember = sampleCommunityRawMemberPutData;

			// Set PUT response
			$httpBackend.expectPUT(/community-raw-members\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/community-raw-members/' + sampleCommunityRawMemberPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid communityRawMemberId and remove the Community raw member from the scope', inject(function(CommunityRawMembers) {
			// Create new Community raw member object
			var sampleCommunityRawMember = new CommunityRawMembers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Community raw members array and include the Community raw member
			scope.communityRawMembers = [sampleCommunityRawMember];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/community-raw-members\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCommunityRawMember);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.communityRawMembers.length).toBe(0);
		}));
	});
}());