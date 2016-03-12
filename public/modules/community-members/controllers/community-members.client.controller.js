'use strict';

// Community members controller
angular.module('community-members').controller('CommunityMembersController', ['$scope', '$stateParams', '$location', 'Authentication', 'CommunityMembers', 'TableSettings', 'CommunityMembersForm',
	function($scope, $stateParams, $location, Authentication, CommunityMembers, TableSettings, CommunityMembersForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(CommunityMembers);
		$scope.communityMember = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = CommunityMembersForm.getFormFields(disabled);
		};


		// Create new Community member
		$scope.create = function() {
			var communityMember = new CommunityMembers($scope.communityMember);

			// Redirect after save
			communityMember.$save(function(response) {
				$location.path('community-members/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Community member
		$scope.remove = function(communityMember) {

			if ( communityMember ) {
				communityMember = CommunityMembers.get({communityMemberId:communityMember._id}, function() {
					communityMember.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.communityMember.$remove(function() {
					$location.path('communityMembers');
				});
			}

		};

		// Update existing Community member
		$scope.update = function() {
			var communityMember = $scope.communityMember;

			communityMember.$update(function() {
				$location.path('community-members/' + communityMember._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewCommunityMember = function() {
			$scope.communityMember = CommunityMembers.get( {communityMemberId: $stateParams.communityMemberId} );
			$scope.setFormFields(true);
		};

		$scope.toEditCommunityMember = function() {
			$scope.communityMember = CommunityMembers.get( {communityMemberId: $stateParams.communityMemberId} );
			$scope.setFormFields(false);
		};
		var committeeList = ['L_D',  'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L', 'Mu', 'Agape', 'MS', 'Ref', 'p72hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'Clnup', 'PP_Tech'];
		var frontHallList = ['L_D',  'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L'];
		var backHallList = ['Mu', 'Agape', 'MS', 'Ref', 'p72hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'Clnup', 'PP_Tech'];
		var talkList = [ 'PER', 'MG', 'PG', 'OG', 'SG', 'JG',  'PRI', 'FD', 'PHB', 'PIE', 'S', 'CA', 'DISC', 'CW', 'BC'];

		$scope.backHallCount = function(thisPerson) {

			var keys = Object.keys(thisPerson);
			var overAllCount = 0;
			for (var i = 0; i < backHallList.length; i++) {
				if ( keys.indexOf(backHallList[i]) > -1 ) {
					var colValue = thisPerson[backHallList[i]];
					var arrayColValue = colValue.split('-');
					overAllCount += arrayColValue.length;
				}
			}
			return overAllCount;
		};
		$scope.frontHallCount = function(thisPerson) {

			var keys = Object.keys(thisPerson);
			var overAllCount = 0;
			for (var i = 0; i < frontHallList.length; i++) {
				if ( keys.indexOf(frontHallList[i]) > -1 ) {
					var colValue = thisPerson[frontHallList[i]];
					var arrayColValue = colValue.split('-');
					overAllCount += arrayColValue.length;
				}
			}
			return overAllCount;
		};
		$scope.talkCount = function(thisPerson) {

			var keys = Object.keys(thisPerson);
			var overAllCount = 0;
			for (var i = 0; i < talkList.length; i++) {
				if ( keys.indexOf(talkList[i]) > -1 ) {
					var colValue = thisPerson[talkList[i]];
					var arrayColValue = colValue.split('-');
					overAllCount += arrayColValue.length;
				}
			}
			return overAllCount;
		};

		$scope.selectedForTeam = function(thisPerson) {
			console.log("checkbox");
			var communityMember = thisPerson;
			CommunityMembers.update({communityMemberId:thisPerson._id},thisPerson);
			//CommunityMembers.update({communityMemberId:thisPerson._id},thisPerson).$promise.then(function() {
			//	$location.path('community-members-count/');
			//}, function(errorResponse) {
			//	$scope.error = errorResponse.data.message;
			//});

		};


	}

]);
