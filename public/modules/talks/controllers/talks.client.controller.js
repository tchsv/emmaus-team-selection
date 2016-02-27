'use strict';

// Talks controller
angular.module('talks').controller('TalksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Talks', 'TableSettings', 'TalksForm',
	function($scope, $stateParams, $location, Authentication, Talks, TableSettings, TalksForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Talks);
		$scope.talk = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = TalksForm.getFormFields(disabled);
		};


		// Create new Talk
		$scope.create = function() {
			var talk = new Talks($scope.talk);

			// Redirect after save
			talk.$save(function(response) {
				$location.path('talks/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Talk
		$scope.remove = function(talk) {

			if ( talk ) {
				talk = Talks.get({talkId:talk._id}, function() {
					talk.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.talk.$remove(function() {
					$location.path('talks');
				});
			}

		};

		// Update existing Talk
		$scope.update = function() {
			var talk = $scope.talk;

			talk.$update(function() {
				$location.path('talks/' + talk._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewTalk = function() {
			$scope.talk = Talks.get( {talkId: $stateParams.talkId} );
			$scope.setFormFields(true);
		};

		$scope.toEditTalk = function() {
			$scope.talk = Talks.get( {talkId: $stateParams.talkId} );
			$scope.setFormFields(false);
		};

	}

]);
