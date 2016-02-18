'use strict';

// Community raw members controller
angular.module('community-raw-members').controller('CommunityRawMembersController', ['$scope', '$stateParams', '$location', 'Authentication', 'CommunityRawMembers', 'TableSettings', 'CommunityRawMembersForm',
	function($scope, $stateParams, $location, Authentication, CommunityRawMembers, TableSettings, CommunityRawMembersForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(CommunityRawMembers);
		$scope.communityRawMember = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = CommunityRawMembersForm.getFormFields(disabled);
		};


		// Create new Community raw member
		$scope.create = function() {
			var communityRawMember = new CommunityRawMembers($scope.communityRawMember);

			// Redirect after save
			communityRawMember.$save(function(response) {
				$location.path('community-raw-members/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Community raw member
		$scope.remove = function(communityRawMember) {

			if ( communityRawMember ) {
				communityRawMember = CommunityRawMembers.get({communityRawMemberId:communityRawMember._id}, function() {
					communityRawMember.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.communityRawMember.$remove(function() {
					$location.path('communityRawMembers');
				});
			}

		};

		// Update existing Community raw member
		$scope.update = function() {
			var communityRawMember = $scope.communityRawMember;

			communityRawMember.$update(function() {
				$location.path('community-raw-members/' + communityRawMember._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewCommunityRawMember = function() {
			$scope.communityRawMember = CommunityRawMembers.get( {communityRawMemberId: $stateParams.communityRawMemberId} );
			$scope.setFormFields(true);
		};

		$scope.toEditCommunityRawMember = function() {
			$scope.communityRawMember = CommunityRawMembers.get( {communityRawMemberId: $stateParams.communityRawMemberId} );
			$scope.setFormFields(false);
		};

	}

]);
