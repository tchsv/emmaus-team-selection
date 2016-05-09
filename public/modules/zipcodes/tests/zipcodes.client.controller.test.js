'use strict';

(function() {
	// Zipcodes Controller Spec
	describe('Zipcodes Controller Tests', function() {
		// Initialize global variables
		var ZipcodesController,
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

			// Initialize the Zipcodes controller.
			ZipcodesController = $controller('ZipcodesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Zipcode object fetched from XHR', inject(function(Zipcodes) {
			// Create sample Zipcode using the Zipcodes service
			var sampleZipcode = new Zipcodes({
				name: 'New Zipcode'
			});

			// Create a sample Zipcodes array that includes the new Zipcode
			var sampleZipcodes = [sampleZipcode];

			// Set GET response
			$httpBackend.expectGET('zipcodes').respond(sampleZipcodes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.zipcodes).toEqualData(sampleZipcodes);
		}));

		it('$scope.findOne() should create an array with one Zipcode object fetched from XHR using a zipcodeId URL parameter', inject(function(Zipcodes) {
			// Define a sample Zipcode object
			var sampleZipcode = new Zipcodes({
				name: 'New Zipcode'
			});

			// Set the URL parameter
			$stateParams.zipcodeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/zipcodes\/([0-9a-fA-F]{24})$/).respond(sampleZipcode);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.zipcode).toEqualData(sampleZipcode);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Zipcodes) {
			// Create a sample Zipcode object
			var sampleZipcodePostData = new Zipcodes({
				name: 'New Zipcode'
			});

			// Create a sample Zipcode response
			var sampleZipcodeResponse = new Zipcodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Zipcode'
			});

			// Fixture mock form input values
			scope.name = 'New Zipcode';

			// Set POST response
			$httpBackend.expectPOST('zipcodes', sampleZipcodePostData).respond(sampleZipcodeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Zipcode was created
			expect($location.path()).toBe('/zipcodes/' + sampleZipcodeResponse._id);
		}));

		it('$scope.update() should update a valid Zipcode', inject(function(Zipcodes) {
			// Define a sample Zipcode put data
			var sampleZipcodePutData = new Zipcodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Zipcode'
			});

			// Mock Zipcode in scope
			scope.zipcode = sampleZipcodePutData;

			// Set PUT response
			$httpBackend.expectPUT(/zipcodes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/zipcodes/' + sampleZipcodePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid zipcodeId and remove the Zipcode from the scope', inject(function(Zipcodes) {
			// Create new Zipcode object
			var sampleZipcode = new Zipcodes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Zipcodes array and include the Zipcode
			scope.zipcodes = [sampleZipcode];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/zipcodes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleZipcode);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.zipcodes.length).toBe(0);
		}));
	});
}());