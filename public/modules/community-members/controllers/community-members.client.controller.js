'use strict';

// Community members controller
angular.module('community-members').controller('CommunityMembersController', ['$scope', '$stateParams', '$location','$resource', 'Authentication', 'CommunityMembers', 'TableSettings', 'CommunityMembersForm','ngProgressFactory',
	function($scope, $stateParams, $location, $resource, Authentication, CommunityMembers, TableSettings, CommunityMembersForm,ngProgressFactory ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(CommunityMembers);
		$scope.communityMember = {};
		var communityData = {};

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
		var committeeList = ['L_D',  'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L', 'Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'Clnup', 'PP_Tech'];
		var frontHallList = ['L_D',  'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L'];
		var backHallList = ['Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'Clnup', 'PP_Tech'];
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

		};

		/**
		 * Update team listing
		 * @param thisPerson
         */
		$scope.updateTeamListing = function (thisPerson) {
			var nowRawList = $resource('/community-members?count=99999&page=1');
			var answer = nowRawList.get(function () {
				communityData = answer;
				var nowCommunityList = $resource('/team-members?count=99999&page=1');
				nowCommunityList.get().$promise.then(successCurrentData, failCurrentData);
			});
		};


		var successCurrentData = function(teamData) {
			//compared the received data with each.
			var newTeamMembers = [];
			var updateTeamMembers = [];

			$scope.progressbar = ngProgressFactory.createInstance();
			$scope.progressbar.setColor('firebrick');
			$scope.progressbar.setHeight('15px');
			$scope.progressbar.start();
			for ( var i = 0 ; i < communityData.total; i++) {
				var currentCommunityPerson = communityData.results[i];
				if (currentCommunityPerson.Selected) {
					var foundCurrent = false;
					var currentOffset = 0;
					for (currentOffset = 0; currentOffset < teamData.total; currentOffset++) {
						var currentRecord = teamData.results[currentOffset];
						if (keyMasterEqual(currentCommunityPerson, currentRecord)) {
							foundCurrent = true;
							break;
						}
					}
					if (!foundCurrent) {
						// put found....
						var modLocalRaw = currentCommunityPerson;
						delete modLocalRaw._id;
						delete modLocalRaw.user;
						delete modLocalRaw.created;
						newTeamMembers.push(modLocalRaw);
						teamData.results.push(modLocalRaw);
						teamData.total++;
					}
					else {
						var needsUpdate = false;
						for (var ii = 0; ii < committeeList.length; ii++) {
							// check for committee in this record and append
							if (currentCommunityPerson[committeeList[ii]]){
								var localRawValue = currentCommunityPerson[committeeList[ii]];
								// check for recored alread in place
								var currentDataRecord = teamData.results[currentOffset];
								if (teamData.results[currentOffset][committeeList[ii]]) {
									// this member has a record in place now see if we already have this walk.
									var currentCommittee = teamData.results[currentOffset][committeeList[ii]];
									if ( currentCommittee.indexOf(currentCommunityPerson[committeeList[ii]]) === -1) {
										// this is new add to recored
										teamData.results[currentOffset][committeeList[ii]] += '-' + currentCommunityPerson[committeeList[ii]];
										needsUpdate = true;
									}
								}
								else {
									teamData.results[currentOffset][committeeList[ii]] = currentCommunityPerson[committeeList[ii]];
									needsUpdate = true;
								}
							}
						}
						for (var ii = 0; ii < talkList.length; ii++) {
							// check for talk in this recored and append
							if (currentCommunityPerson[talkList[ii]]){
								if (teamData.results[currentOffset][talkList[ii]]) {
									var currentTalk = teamData.results[currentOffset][talkList[ii]];
									if ( currentTalk.indexOf(currentCommunityPerson[talkList[ii]]) === -1) {
										teamData.results[currentOffset][talkList[ii]] += '-' + currentCommunityPerson[talkList[ii]];
										needsUpdate = true;
									}
								}
								else {
									teamData.results[currentOffset][talkList[ii]] = currentCommunityPerson[talkList[ii]];
									needsUpdate = true;
								}
							}
						}
						// need to create an update array
						// first check to see if this is in the
						if (needsUpdate) {
							if (teamData.results[currentOffset]._id) {
								updateTeamMembers.push(teamData.results[currentOffset]);
							}
						}
					}

				}
				$scope.progressbar.set(Math.round((i/communityData.total)*100));
			}
			$scope.progressbar.complete();
			if (updateTeamMembers.length > 0 ) {
				updateTheTeamDB(updateTeamMembers);
			}
			if (newTeamMembers.length > 0 ) {
				createTheTeamDB(newTeamMembers);
			}
		};
		var globalTeamMembersSet;
		var globalSizeIs;
		var globalCurrentIs;
		var teamMembersLocal;
		var createTheTeamDB = function (dataToUpload) {
			globalSizeIs = dataToUpload.length;
			globalCurrentIs = 0;
			globalTeamMembersSet = dataToUpload;
			$scope.progressbar = ngProgressFactory.createInstance();
			$scope.progressbar.setColor('firebrick');
			$scope.progressbar.setHeight('15px');
			$scope.progressbar.start();
			teamMembersLocal = $resource('/team-members');
			teamMembersLocal.save({},globalTeamMembersSet[globalCurrentIs++]).$promise.then(successUpdateCommunity,failUpdateCommunity);

		};
		var successUpdateCommunity = function() {
			if (globalCurrentIs < globalSizeIs) {
				teamMembersLocal.save({},globalTeamMembersSet[globalCurrentIs++]).$promise.then(successUpdateCommunity,failUpdateCommunity);
				$scope.progressbar.set(Math.round((globalCurrentIs/globalSizeIs)*100));
			}
			else {
				$scope.progressbar.complete();

			}
		};
		var failUpdateCommunity = function() {
			$socpe.progressbar.complete();
		};


		var globalUpdateSet;
		var updateSizeIs;
		var updateCountIs;
		var updateTeamMembersResource;
		var updateTheTeamDB = function (dataToUpload) {
			updateSizeIs = dataToUpload.length;
			updateCountIs = 0;
			globalUpdateSet = dataToUpload;
			$scope.progressbar = ngProgressFactory.createInstance();
			$scope.progressbar.setColor('firebrick');
			$scope.progressbar.setHeight('15px');
			$scope.progressbar.start();
			updateTeamMembersResource = $resource('/team-members/:id',null,
				{
					'update': { method:'PUT' }
				});
			updateTeamMembersResource.update({id:globalUpdateSet[updateCountIs]._id},globalUpdateSet[updateCountIs]).$promise.then(successCreateCommunity,failCreateCommunity);

		};
		var successCreateCommunity = function() {
			updateCountIs++;
			if (updateCountIs < updateSizeIs) {
				updateTeamMembersResource.update({id:globalUpdateSet[updateCountIs]._id},globalUpdateSet[updateCountIs]).$promise.then(successCreateCommunity,failCreateCommunity);
				$scope.progressbar.set(Math.round((updateCountIs/updateSizeIs)*100));
			}
			else {
				$scope.progressbar.complete();

			}
		};
		var failCreateCommunity = function() {
			$socpe.progressbar.complete();
		};







		var getComboKey = function(one) {
			return (one.LAST_NAME + '-' + one.FIRST_NAME + '-' + one.Original_Walk);
		}
		var keyMasterEqual= function(one, two) {
			if (one.LAST_NAME === two.LAST_NAME) {
				if ( one.FIRST_NAME === two.FIRST_NAME) {
					if ( one.Original_Walk === two.Original_Walk) {
						return true;
					}
				}
			}
			return false;
		}
		var failCurrentData = function(err) {
			$log.error(err);
		}

	}

]);
