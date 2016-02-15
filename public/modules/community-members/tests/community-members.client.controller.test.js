'use strict';

(function() {
	// Community members Controller Spec
	describe('Community members Controller Tests', function() {
		// Initialize global variables
		var CommunityMembersController,
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

			// Initialize the Community members controller.
			CommunityMembersController = $controller('CommunityMembersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Community member object fetched from XHR', inject(function(CommunityMembers) {
			// Create sample Community member using the Community members service
			var sampleCommunityMember = new CommunityMembers({
				name: 'New Community member'
			});

			// Create a sample Community members array that includes the new Community member
			var sampleCommunityMembers = [sampleCommunityMember];

			// Set GET response
			$httpBackend.expectGET('community-members').respond(sampleCommunityMembers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.communityMembers).toEqualData(sampleCommunityMembers);
		}));

		it('$scope.findOne() should create an array with one Community member object fetched from XHR using a communityMemberId URL parameter', inject(function(CommunityMembers) {
			// Define a sample Community member object
			var sampleCommunityMember = new CommunityMembers({
				name: 'New Community member'
			});

			// Set the URL parameter
			$stateParams.communityMemberId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/community-members\/([0-9a-fA-F]{24})$/).respond(sampleCommunityMember);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.communityMember).toEqualData(sampleCommunityMember);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CommunityMembers) {
			// Create a sample Community member object
			var sampleCommunityMemberPostData = new CommunityMembers({
				name: 'New Community member'
			});

			// Create a sample Community member response
			var sampleCommunityMemberResponse = new CommunityMembers({
				_id: '525cf20451979dea2c000001',
				name: 'New Community member'
			});

			// Fixture mock form input values
			scope.name = 'New Community member';

			// Set POST response
			$httpBackend.expectPOST('community-members', sampleCommunityMemberPostData).respond(sampleCommunityMemberResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Community member was created
			expect($location.path()).toBe('/community-members/' + sampleCommunityMemberResponse._id);
		}));

		it('$scope.update() should update a valid Community member', inject(function(CommunityMembers) {
			// Define a sample Community member put data
			var sampleCommunityMemberPutData = new CommunityMembers({
				_id: '525cf20451979dea2c000001',
				name: 'New Community member'
			});

			// Mock Community member in scope
			scope.communityMember = sampleCommunityMemberPutData;

			// Set PUT response
			$httpBackend.expectPUT(/community-members\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/community-members/' + sampleCommunityMemberPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid communityMemberId and remove the Community member from the scope', inject(function(CommunityMembers) {
			// Create new Community member object
			var sampleCommunityMember = new CommunityMembers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Community members array and include the Community member
			scope.communityMembers = [sampleCommunityMember];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/community-members\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCommunityMember);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.communityMembers.length).toBe(0);
		}));
	});
}());