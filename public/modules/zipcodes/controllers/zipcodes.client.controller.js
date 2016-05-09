'use strict';

// Zipcodes controller
angular.module('zipcodes').controller('ZipcodesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Zipcodes', 'TableSettings', 'ZipcodesForm',
	function($scope, $stateParams, $location, Authentication, Zipcodes, TableSettings, ZipcodesForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Zipcodes);
		$scope.zipcode = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = ZipcodesForm.getFormFields(disabled);
		};


		// Create new Zipcode
		$scope.create = function() {
			var zipcode = new Zipcodes($scope.zipcode);

			// Redirect after save
			zipcode.$save(function(response) {
				$location.path('zipcodes/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Zipcode
		$scope.remove = function(zipcode) {

			if ( zipcode ) {
				zipcode = Zipcodes.get({zipcodeId:zipcode._id}, function() {
					zipcode.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.zipcode.$remove(function() {
					$location.path('zipcodes');
				});
			}

		};

		// Update existing Zipcode
		$scope.update = function() {
			var zipcode = $scope.zipcode;

			zipcode.$update(function() {
				$location.path('zipcodes/' + zipcode._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewZipcode = function() {
			$scope.zipcode = Zipcodes.get( {zipcodeId: $stateParams.zipcodeId} );
			$scope.setFormFields(true);
		};

		$scope.toEditZipcode = function() {
			$scope.zipcode = Zipcodes.get( {zipcodeId: $stateParams.zipcodeId} );
			$scope.setFormFields(false);
		};

	}

]);
