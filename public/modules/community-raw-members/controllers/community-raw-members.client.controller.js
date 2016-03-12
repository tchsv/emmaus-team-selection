'use strict';

// Community raw members controller
angular.module('community-raw-members').controller('CommunityRawMembersController', ['$scope', '$stateParams', '$location'
	, 'Authentication', 'CommunityRawMembers', 'TableSettings', 'CommunityRawMembersForm', 'CommunityMembers', '$log','$resource','ngProgressFactory',
	function($scope, $stateParams, $location, Authentication, CommunityRawMembers,
			 TableSettings, CommunityRawMembersForm, communityMembers, $log, $resource , ngProgressFactory) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(CommunityRawMembers);
		$scope.communityRawMember = {};

		var localRawData = {};
		var committeeList = ['L_D',  'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L', 'Mu', 'Agape', 'MS', 'Ref', 'p72hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'Clnup', 'PP_Tech'];
		var talkList = [ 'PER', 'MG', 'PG', 'OG', 'SG', 'JG',  'PRI', 'FD', 'PHB', 'PIE', 'S', 'CA', 'DISC', 'CW', 'BC'];
		$scope.parseCommunityRaw = function(rawData){
			var nowRawList = $resource('/community-raw-members?count=99999&page=1');
			var answer = nowRawList.get(function () {
				localRawData = answer;
				var nowCommunityList = $resource('/community-members?count=99999&page=1');
				nowCommunityList.get().$promise.then(successCurrentData, failCurrentData);
			});
		};

		var successCurrentData = function(currentData) {
			//compared the received data with each.
			var communityMembersSet = [];
			$scope.progressbar = ngProgressFactory.createInstance();
			$scope.progressbar.setColor('firebrick');
			$scope.progressbar.setHeight('15px');
			$scope.progressbar.start();
			for ( var i = 0 ; i < localRawData.total; i++) {
				var localRaw = localRawData.results[i]
				var foundCurrent = false;
				var currentOffset = 0;
				for (currentOffset = 0; currentOffset < currentData.total; currentOffset++) {
					var currentRecord = currentData.results[currentOffset];
					if ( keyMasterEqual(localRaw,currentRecord)) {
						foundCurrent = true;
						break;
					}
				}
				if (!foundCurrent) {
					// put found....
					var modLocalRaw = localRaw;
					modLocalRaw.COMBO_KEY = getComboKey(modLocalRaw);
					delete modLocalRaw._id ;
					delete modLocalRaw.user ;
					delete modLocalRaw.created ;
					communityMembersSet.push(modLocalRaw);
					currentData.results.push(modLocalRaw);
					currentData.total++;
				}
				else {
					for (var ii = 0; ii < committeeList.length; ii++) {
						// check for committee in this recored and append
						if (localRaw[committeeList[ii]]){
							if (currentData.results[currentOffset][committeeList[ii]]) {
								currentData.results[currentOffset][committeeList[ii]] += '-' + localRaw[committeeList[ii]];
							}
							else {
								currentData.results[currentOffset][committeeList[ii]] = localRaw[committeeList[ii]];
							}
						}
					}
					for (var ii = 0; ii < talkList.length; ii++) {
						// check for talk in this recored and append
						if (localRaw[talkList[ii]]){
							if (currentData.results[currentOffset][talkList[ii]]) {
								currentData.results[currentOffset][talkList[ii]] += '-' + localRaw[talkList[ii]];
							}
							else {
								currentData.results[currentOffset][talkList[ii]] = localRaw[talkList[ii]];
							}
						}
					}

				}
				$scope.progressbar.set(Math.round((i/localRawData.total)*100));
			}
			$scope.progressbar.complete();
			updateTheCommunityDB(communityMembersSet);
		};
		var globalCommunitMembersSet;
		var globalSizeIs;
		var globalCurrentIs;
		var communityMembersLocal;
		var updateTheCommunityDB = function (dataToUpload) {
			globalSizeIs = dataToUpload.length;
			globalCurrentIs = 0;
			globalCommunitMembersSet = dataToUpload;
			$scope.progressbar = ngProgressFactory.createInstance();
			$scope.progressbar.setColor('firebrick');
			$scope.progressbar.setHeight('15px');
			$scope.progressbar.start();
			communityMembersLocal = $resource('/community-members');
			communityMembersLocal.save({},globalCommunitMembersSet[globalCurrentIs++]).$promise.then(successUpdateCommunity,failUpdateCommunity);

		};
		var successUpdateCommunity = function() {
			if (globalCurrentIs < globalSizeIs) {
				communityMembersLocal.save({},globalCommunitMembersSet[globalCurrentIs++]).$promise.then(successUpdateCommunity,failUpdateCommunity);
				$scope.progressbar.set(Math.round((globalCurrentIs/globalSizeIs)*100));
			}
			else {
				$scope.progressbar.complete();

			}
		};
		var failUpdateCommunity = function() {
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
