'use strict';

// Committees controller
angular.module('committees').controller('CommitteesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Committees', 'TableSettings', 'CommitteesForm',
	function($scope, $stateParams, $location, Authentication, Committees, TableSettings, CommitteesForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Committees);
		$scope.committee = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = CommitteesForm.getFormFields(disabled);
		};


		// Create new Committee
		$scope.create = function() {
			var committee = new Committees($scope.committee);

			// Redirect after save
			committee.$save(function(response) {
				$location.path('committees/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Committee
		$scope.remove = function(committee) {

			if ( committee ) {
				committee = Committees.get({committeeId:committee._id}, function() {
					committee.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.committee.$remove(function() {
					$location.path('committees');
				});
			}

		};

		// Update existing Committee
		$scope.update = function() {
			var committee = $scope.committee;

			committee.$update(function() {
				$location.path('committees/' + committee._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewCommittee = function() {
			$scope.committee = Committees.get( {committeeId: $stateParams.committeeId} );
			$scope.setFormFields(true);
		};

		$scope.toEditCommittee = function() {
			$scope.committee = Committees.get( {committeeId: $stateParams.committeeId} );
			$scope.setFormFields(false);
		};

	}

]);
