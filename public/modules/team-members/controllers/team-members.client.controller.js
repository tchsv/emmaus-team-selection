'use strict';

// Team members controller
angular.module('team-members').controller('TeamMembersController', ['$scope', '$stateParams', '$location', 'Authentication', 'TeamMembers', 'TableSettings', 'TeamMembersForm',
	function($scope, $stateParams, $location, Authentication, TeamMembers, TableSettings, TeamMembersForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(TeamMembers);
		$scope.teamMember = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = TeamMembersForm.getFormFields(disabled);
		};


		// Create new Team member
		$scope.create = function() {
			var teamMember = new TeamMembers($scope.teamMember);

			// Redirect after save
			teamMember.$save(function(response) {
				$location.path('team-members/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Team member
		$scope.remove = function(teamMember) {

			if ( teamMember ) {
				teamMember = TeamMembers.get({teamMemberId:teamMember._id}, function() {
					teamMember.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.teamMember.$remove(function() {
					$location.path('teamMembers');
				});
			}

		};

		// Update existing Team member
		$scope.update = function() {
			var teamMember = $scope.teamMember;

			teamMember.$update(function() {
				$location.path('team-members/' + teamMember._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewTeamMember = function() {
			$scope.teamMember = TeamMembers.get( {teamMemberId: $stateParams.teamMemberId} );
			$scope.setFormFields(true);
		};

		$scope.toEditTeamMember = function() {
			$scope.teamMember = TeamMembers.get( {teamMemberId: $stateParams.teamMemberId} );
			$scope.setFormFields(false);
		};

	}

]);
