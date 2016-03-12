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
			TeamMembers.update({communityMemberId:thisPerson._id},thisPerson);
			//CommunityMembers.update({communityMemberId:thisPerson._id},thisPerson).$promise.then(function() {
			//	$location.path('community-members-count/');
			//}, function(errorResponse) {
			//	$scope.error = errorResponse.data.message;
			//});

		};




	}

]);
