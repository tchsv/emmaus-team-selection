'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'emmaus-team-selection';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'ngTable', 'formly', 'formlyBootstrap', 'ngCsv'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('committees', ['core']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('community-members', ['core']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('community-raw-members', ['core','ngProgress']);

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('talks', ['core']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('team-members', ['core']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('users');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('zipcodes', ['core']);

'use strict';

// Configuring the new module
angular.module('committees').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbarAdmin', 'Committees', 'committees', 'dropdown', '/committees(/create)?');
		Menus.addSubMenuItem('topbarAdmin', 'committees', 'List Committees', 'committees');
		Menus.addSubMenuItem('topbarAdmin', 'committees', 'New Committee', 'committees/create');
	}
]);

'use strict';

//Setting up route
angular.module('committees').config(['$stateProvider',
	function($stateProvider) {
		// Committees state routing
		$stateProvider.
		state('listCommittees', {
			url: '/committees',
			templateUrl: 'modules/committees/views/list-committees.client.view.html'
		}).
		state('createCommittee', {
			url: '/committees/create',
			templateUrl: 'modules/committees/views/create-committee.client.view.html'
		}).
		state('viewCommittee', {
			url: '/committees/:committeeId',
			templateUrl: 'modules/committees/views/view-committee.client.view.html'
		}).
		state('editCommittee', {
			url: '/committees/:committeeId/edit',
			templateUrl: 'modules/committees/views/edit-committee.client.view.html'
		});
	}
]);
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

'use strict';

//Committees service used to communicate Committees REST endpoints
angular.module('committees').factory('Committees', ['$resource',
	function($resource) {
		return $resource('committees/:committeeId', { committeeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function () {
    'use strict';

    angular
        .module('committees')
        .factory('CommitteesForm', factory);

    function factory() {

        var getFormFields = function (disabled) {

            var fields = [
//Add new properties to the angular-formly array properties in public/modules/module-name/services/module-name.form.client.service.js
//Then add new columns for the new properties in the HTML table in public/modules/module-name/views/list-module-name.client.view.html
                //LAST_NAME: {type: String},
                {
                    key: 'LAST_NAME',
                    type: 'input',
                    templateOptions: {
                        label: 'LAST_NAME:',
                        disabled: disabled
                    }
                },
                //FIRST_NAME: {type: String},
                {
                    key: 'FIRST_NAME',
                    type: 'input',
                    templateOptions: {
                        label: 'FIRST_NAME:',
                        disabled: disabled
                    }
                },
                //Original_Walk: {type: String},
                {
                    key: 'Original_Walk',
                    type: 'input',
                    templateOptions: {
                        label: 'Original_Walk:',
                        disabled: disabled
                    }
                },
                //Walk_Number: {type:String},
                {
                    key: 'Walk_Number',
                    type: 'input',
                    templateOptions: {
                        label: 'Walk_Number:',
                        disabled: disabled
                    }
                },
                //Committee: {type:String},
                {
                    key: 'Committee',
                    type: 'input',
                    templateOptions: {
                        label: 'Committee:',
                        disabled: disabled
                    }
                },

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();

'use strict';

// Configuring the new module
angular.module('community-members').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Community members', 'community-members', 'dropdown', '/community-members(/create)?');
		Menus.addSubMenuItem('topbar', 'community-members', 'List Community members', 'community-members');
		Menus.addSubMenuItem('topbar', 'community-members', 'List Community members (with Count)', 'community-members-count');
		Menus.addSubMenuItem('topbar', 'community-members', 'New Community member', 'community-members/create');
	}
]);

'use strict';

//Setting up route
angular.module('community-members').config(['$stateProvider',
	function($stateProvider) {
		// Community members state routing
		$stateProvider.
		state('listCommunityMembers', {
			url: '/community-members',
			templateUrl: 'modules/community-members/views/list-community-members.client.view.html'
		}).
		state('listCommunityMembersCount', {
			url: '/community-members-count',
			templateUrl: 'modules/community-members/views/list-community-members-count.client.view.html'
		}).
		state('createCommunityMember', {
			url: '/community-members/create',
			templateUrl: 'modules/community-members/views/create-community-member.client.view.html'
		}).
		state('viewCommunityMember', {
			url: '/community-members/:communityMemberId',
			templateUrl: 'modules/community-members/views/view-community-member.client.view.html'
		}).
		state('editCommunityMember', {
			url: '/community-members/:communityMemberId/edit',
			templateUrl: 'modules/community-members/views/edit-community-member.client.view.html'
		});
	}
]);

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

/**
 * Created by trcotton on 3/2/16.
 */
app = angular.module('community-members')

app.directive('fixedTableHeaders', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $timeout(function() {
                container = element.parentsUntil(attrs.fixedTableHeaders);
                element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });
            }, 0);
        }
    }
}]);

'use strict';

//Community members service used to communicate Community members REST endpoints
angular.module('community-members').factory('CommunityMembers', ['$resource',
	function($resource) {
		return $resource('community-members/:communityMemberId', { communityMemberId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
			,
			set: {
				method: 'POST'
			}
		});
	}
]);

(function() {
    'use strict';

    angular
        .module('community-members')
        .factory('CommunityMembersForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
            { key: 'COMBO_KEY',
                type: 'input',
                templateOptions: {
                    label: 'key:',
                    disabled: disabled
                }},
            { key: 'Selected',
                type: 'input',
                templateOptions: {
                    label: 'Selected:',
                    disabled: disabled
                }},
            { key: 'LAST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'Last Name:',
                    disabled: disabled
                }},
            { key: 'FIRST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'First Name:',
                    disabled: disabled
                }},
            { key: 'AC',
                type: 'input',
                templateOptions: {
                    label: 'AC:',
                    disabled: disabled
                }},
            { key: 'PHONE',
                type: 'input',
                templateOptions: {
                    label: 'Phone:',
                    disabled: disabled
                }},
            { key: 'STREET_ADDRESS',
                type: 'input',
                templateOptions: {
                    label: 'Street Address:',
                    disabled: disabled
                }},
            { key: 'CITY',
                type: 'input',
                templateOptions: {
                    label: 'City:',
                    disabled: disabled
                }},
            { key: 'ST',
                type: 'input',
                templateOptions: {
                    label: 'ST:',
                    disabled: disabled
                }},
            { key: 'ZIP',
                type: 'input',
                templateOptions: {
                    label: 'Zip:',
                    disabled: disabled
                }},
            { key: 'Original_Walk',
                type: 'input',
                templateOptions: {
                    label: 'Original Walk:',
                    disabled: disabled
                }},
            { key: 'L_D',
                type: 'input',
                templateOptions: {
                    label: 'Lay Dir:',
                    disabled: disabled
                }},
            { key: 'S_D',
                type: 'input',
                templateOptions: {
                    label: 'Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'A_L_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'A_S_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'Mu',
                type: 'input',
                templateOptions: {
                    label: 'Music:',
                    disabled: disabled
                }},
            { key: 'A_T_L',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'T_L',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'Agape',
                type: 'input',
                templateOptions: {
                    label: 'Agape:',
                    disabled: disabled
                }},
            { key: 'M_S',
                type: 'input',
                templateOptions: {
                    label: 'M S:',
                    disabled: disabled
                }},
            { key: 'Ref',
                type: 'input',
                templateOptions: {
                    label: 'Refreshments:',
                    disabled: disabled
                }},
            { key: 'p72_hr',
                type: 'input',
                templateOptions: {
                    label: '72hr:',
                    disabled: disabled
                }},
            { key: 'Hous',
                type: 'input',
                templateOptions: {
                    label: 'Housing:',
                    disabled: disabled
                }},
            { key: 'Cnd_Lite',
                type: 'input',
                templateOptions: {
                    label: 'Candle Light:',
                    disabled: disabled
                }},
            { key: 'Clo',
                type: 'input',
                templateOptions: {
                    label: 'Closing:',
                    disabled: disabled
                }},
            { key: 'Ent',
                type: 'input',
                templateOptions: {
                    label: 'Entertainment:',
                    disabled: disabled
                }},
            { key: 'S_Pray',
                type: 'input',
                templateOptions: {
                    label: 'Speakers Prayer Chap:',
                    disabled: disabled
                }},
            { key: 'Spo_Hr',
                type: 'input',
                templateOptions: {
                    label: 'Sponsers Hour:',
                    disabled: disabled
                }},
            { key: 'Wor',
                type: 'input',
                templateOptions: {
                    label: 'Worship:',
                    disabled: disabled
                }},
            { key: 'Goph',
                type: 'input',
                templateOptions: {
                    label: 'Goph:',
                    disabled: disabled
                }},
            { key: 'ClnUp',
                type: 'input',
                templateOptions: {
                    label: 'Clean Up:',
                    disabled: disabled
                }},
            { key: 'PP_Tech',
                type: 'input',
                templateOptions: {
                    label: 'Tech:',
                    disabled: disabled
                }},
          { key: 'PRI',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PER',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PHB',
                type: 'input',
                templateOptions: {
                    label: 'Presithood of Beleivers:',
                    disabled: disabled
                }},
            { key: 'PIE',
                type: 'input',
                templateOptions: {
                    label: 'Life of Piety:',
                    disabled: disabled
                }},
            { key: 'S',
                type: 'input',
                templateOptions: {
                    label: 'S:',
                    disabled: disabled
                }},
            { key: 'CA',
                type: 'input',
                templateOptions: {
                    label: 'CA:',
                    disabled: disabled
                }},
            { key: 'DISC',
                type: 'input',
                templateOptions: {
                    label: 'DISC:',
                    disabled: disabled
                }},
            { key: 'CW',
                type: 'input',
                templateOptions: {
                    label: 'CW:',
                    disabled: disabled
                }},
            { key: 'BC',
                type: 'input',
                templateOptions: {
                    label: 'BC:',
                    disabled: disabled
                }},
            { key: 'P',
                type: 'input',
                templateOptions: {
                    label: 'P:',
                    disabled: disabled
                }},
            { key: 'FD',
                type: 'input',
                templateOptions: {
                    label: 'FD:',
                    disabled: disabled
                }},
            { key: 'PG',
                type: 'input',
                templateOptions: {
                    label: 'PG:',
                    disabled: disabled
                }},
            { key: 'OG',
                type: 'input',
                templateOptions: {
                    label: 'OG:',
                    disabled: disabled
                }},
            { key: 'SG',
                type: 'input',
                templateOptions: {
                    label: 'SC:',
                    disabled: disabled
                }},
            { key: 'JG',
                type: 'input',
                templateOptions: {
                    label: 'JG:',
                    disabled: disabled
                }},
            { key: 'MG',
                type: 'input',
                templateOptions: {
                    label: 'MG:',
                    disabled: disabled
                }},



  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();

'use strict';

// Configuring the new module
angular.module('community-raw-members').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Community raw members', 'community-raw-members', 'dropdown', '/community-raw-members(/create)?');
		Menus.addSubMenuItem('topbar', 'community-raw-members', 'List Community raw members', 'community-raw-members');
		Menus.addSubMenuItem('topbar', 'community-raw-members', 'New Community raw member', 'community-raw-members/create');
	}
]);

'use strict';

//Setting up route
angular.module('community-raw-members').config(['$stateProvider',
	function($stateProvider) {
		// Community raw members state routing
		$stateProvider.
		state('listCommunityRawMembers', {
			url: '/community-raw-members',
			templateUrl: 'modules/community-raw-members/views/list-community-raw-members.client.view.html'
		}).
		state('createCommunityRawMember', {
			url: '/community-raw-members/create',
			templateUrl: 'modules/community-raw-members/views/create-community-raw-member.client.view.html'
		}).
		state('viewCommunityRawMember', {
			url: '/community-raw-members/:communityRawMemberId',
			templateUrl: 'modules/community-raw-members/views/view-community-raw-member.client.view.html'
		}).
		state('editCommunityRawMember', {
			url: '/community-raw-members/:communityRawMemberId/edit',
			templateUrl: 'modules/community-raw-members/views/edit-community-raw-member.client.view.html'
		});
	}
]);
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
		var committeeList = ['L_D',  'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L', 'Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'Clnup', 'PP_Tech'];
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
            var updateCommunityMembersSet = [];
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
                    var needsUpdate = false;
					for (var ii = 0; ii < committeeList.length; ii++) {
						// check for committee in this record and append
						if (localRaw[committeeList[ii]]){
                            var localRawValue = localRaw[committeeList[ii]];
                            // check for recored alread in place
                            var currentDataRecord = currentData.results[currentOffset];
							if (currentData.results[currentOffset][committeeList[ii]]) {
                                // this member has a record in place now see if we already have this walk.
								var currentCommittee = currentData.results[currentOffset][committeeList[ii]];
								if ( currentCommittee.indexOf(localRaw[committeeList[ii]]) === -1) {
                                    // this is new add to recored
									currentData.results[currentOffset][committeeList[ii]] += '-' + localRaw[committeeList[ii]];
                                    needsUpdate = true;
								}
							}
							else {
								currentData.results[currentOffset][committeeList[ii]] = localRaw[committeeList[ii]];
                                needsUpdate = true;
							}
						}
					}
					for (var ii = 0; ii < talkList.length; ii++) {
						// check for talk in this recored and append
						if (localRaw[talkList[ii]]){
							if (currentData.results[currentOffset][talkList[ii]]) {
								var currentTalk = currentData.results[currentOffset][talkList[ii]];
								if ( currentTalk.indexOf(localRaw[talkList[ii]]) === -1) {
									currentData.results[currentOffset][talkList[ii]] += '-' + localRaw[talkList[ii]];
                                    needsUpdate = true;
								}
							}
							else {
								currentData.results[currentOffset][talkList[ii]] = localRaw[talkList[ii]];
                                needsUpdate = true;
							}
						}
					}
                    // need to create an update array
                    // first check to see if this is in the
                    if (needsUpdate) {
                        if (currentData.results[currentOffset]._id) {
                            updateCommunityMembersSet.push(currentData.results[currentOffset]);
                        }
                    }
				}
				$scope.progressbar.set(Math.round((i/localRawData.total)*100));
			}
			$scope.progressbar.complete();
            if ( updateCommunityMembersSet.length > 0) {
                updateTheCommunityDB(updateCommunityMembersSet);
            }
            if ( communityMembersSet.length > 0 ) {
                createTheCommunityDB(communityMembersSet);
            }
		};
		var globalCommunitMembersSet;
		var globalSizeIs;
		var globalCurrentIs;
		var communityMembersLocal;
		var createTheCommunityDB = function (dataToUpload) {
			globalSizeIs = dataToUpload.length;
			globalCurrentIs = 0;
			globalCommunitMembersSet = dataToUpload;
			$scope.progressbar = ngProgressFactory.createInstance();
			$scope.progressbar.setColor('firebrick');
			$scope.progressbar.setHeight('15px');
			$scope.progressbar.start();
			communityMembersLocal = $resource('/community-members');
			communityMembersLocal.save({},globalCommunitMembersSet[globalCurrentIs++]).$promise.then(successCreateCommunity,failCreateCommunity);

		};
		var successCreateCommunity = function() {
			if (globalCurrentIs < globalSizeIs) {
				communityMembersLocal.save({},globalCommunitMembersSet[globalCurrentIs++]).$promise.then(successCreateCommunity,failCreateCommunity);
				$scope.progressbar.set(Math.round((globalCurrentIs/globalSizeIs)*100));
			}
			else {
				$scope.progressbar.complete();

			}
		};
		var failCreateCommunity = function() {
			$socpe.progressbar.complete();
		};

        var globalUpdateSet;
        var updateSizeIs;
        var updateCountIs;
        var updateCommunityMembers;
        var updateTheCommunityDB = function (dataToUpload) {
            updateSizeIs = dataToUpload.length;
            updateCountIs = 0;
            globalUpdateSet = dataToUpload;
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.setColor('firebrick');
            $scope.progressbar.setHeight('15px');
            $scope.progressbar.start();
            updateCommunityMembers = $resource('/community-members/:id',null,
                {
                    'update': { method:'PUT' }
                });
            updateCommunityMembers.update({id:globalUpdateSet[updateCountIs]._id},globalUpdateSet[updateCountIs]).$promise.then(successCreateCommunity,failCreateCommunity);

        };
        var successCreateCommunity = function() {
            updateCountIs++;
            if (updateCountIs < updateSizeIs) {
                updateCommunityMembers.update({id:globalUpdateSet[updateCountIs]._id},globalUpdateSet[updateCountIs]).$promise.then(successCreateCommunity,failCreateCommunity);
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

'use strict';

//Community raw members service used to communicate Community raw members REST endpoints
angular.module('community-raw-members').factory('CommunityRawMembers', ['$resource',
	function($resource) {
		return $resource('community-raw-members/:communityRawMemberId', { communityRawMemberId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function() {
    'use strict';

    angular
        .module('community-raw-members')
        .factory('CommunityRawMembersForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
            { key: 'LAST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'Last Name:',
                    disabled: disabled
                }},
            { key: '    FIRST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'First Name:',
                    disabled: disabled
                }},
            { key: 'AC',
                type: 'input',
                templateOptions: {
                    label: 'AC:',
                    disabled: disabled
                }},
            { key: 'PHONE',
                type: 'input',
                templateOptions: {
                    label: 'Phone:',
                    disabled: disabled
                }},
            { key: 'STREET_ADDRESS',
                type: 'input',
                templateOptions: {
                    label: 'Street Address:',
                    disabled: disabled
                }},
            { key: 'CITY',
                type: 'input',
                templateOptions: {
                    label: 'City:',
                    disabled: disabled
                }},
            { key: 'ST',
                type: 'input',
                templateOptions: {
                    label: 'ST:',
                    disabled: disabled
                }},
            { key: 'ZIP',
                type: 'input',
                templateOptions: {
                    label: 'Zip:',
                    disabled: disabled
                }},
            { key: 'Original_Walk',
                type: 'input',
                templateOptions: {
                    label: 'Original Walk:',
                    disabled: disabled
                }},
            { key: 'L_D',
                type: 'input',
                templateOptions: {
                    label: 'Lay Dir:',
                    disabled: disabled
                }},
            { key: 'S_D',
                type: 'input',
                templateOptions: {
                    label: 'Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'A_L_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'A_S_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'Mu',
                type: 'input',
                templateOptions: {
                    label: 'Music:',
                    disabled: disabled
                }},
            { key: 'A_T_L',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'T_L',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'Agape',
                type: 'input',
                templateOptions: {
                    label: 'Agape:',
                    disabled: disabled
                }},
            { key: 'M_S',
                type: 'input',
                templateOptions: {
                    label: 'M S:',
                    disabled: disabled
                }},
            { key: 'Ref',
                type: 'input',
                templateOptions: {
                    label: 'Refreshments:',
                    disabled: disabled
                }},
            { key: 'p72_hr',
                type: 'input',
                templateOptions: {
                    label: '72hr:',
                    disabled: disabled
                }},
            { key: 'Hous',
                type: 'input',
                templateOptions: {
                    label: 'Housing:',
                    disabled: disabled
                }},
            { key: 'Cnd_Lite',
                type: 'input',
                templateOptions: {
                    label: 'Candle Light:',
                    disabled: disabled
                }},
            { key: 'Clo',
                type: 'input',
                templateOptions: {
                    label: 'Closing:',
                    disabled: disabled
                }},
            { key: 'Ent',
                type: 'input',
                templateOptions: {
                    label: 'Entertainment:',
                    disabled: disabled
                }},
            { key: 'S_Pray',
                type: 'input',
                templateOptions: {
                    label: 'Speakers Prayer Chap:',
                    disabled: disabled
                }},
            { key: 'Spo_Hr',
                type: 'input',
                templateOptions: {
                    label: 'Sponsers Hour:',
                    disabled: disabled
                }},
            { key: 'Wor',
                type: 'input',
                templateOptions: {
                    label: 'Worship:',
                    disabled: disabled
                }},
            { key: 'Goph',
                type: 'input',
                templateOptions: {
                    label: 'Goph:',
                    disabled: disabled
                }},
            { key: 'ClnUp',
                type: 'input',
                templateOptions: {
                    label: 'Clean Up:',
                    disabled: disabled
                }},
            { key: 'PP_Tech',
                type: 'input',
                templateOptions: {
                    label: 'Tech:',
                    disabled: disabled
                }},
            { key: 'PRI',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PER',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PHB',
                type: 'input',
                templateOptions: {
                    label: 'Presithood of Beleivers:',
                    disabled: disabled
                }},
            { key: 'PIE',
                type: 'input',
                templateOptions: {
                    label: 'Life of Piety:',
                    disabled: disabled
                }},
            { key: 'S',
                type: 'input',
                templateOptions: {
                    label: 'S:',
                    disabled: disabled
                }},
            { key: 'CA',
                type: 'input',
                templateOptions: {
                    label: 'CA:',
                    disabled: disabled
                }},
            { key: 'DISC',
                type: 'input',
                templateOptions: {
                    label: 'DISC:',
                    disabled: disabled
                }},
            { key: 'CW',
                type: 'input',
                templateOptions: {
                    label: 'CW:',
                    disabled: disabled
                }},
            { key: 'BC',
                type: 'input',
                templateOptions: {
                    label: 'BC:',
                    disabled: disabled
                }},
            { key: 'P',
                type: 'input',
                templateOptions: {
                    label: 'P:',
                    disabled: disabled
                }},
            { key: 'FD',
                type: 'input',
                templateOptions: {
                    label: 'FD:',
                    disabled: disabled
                }},
            { key: 'PG',
                type: 'input',
                templateOptions: {
                    label: 'PG:',
                    disabled: disabled
                }},
            { key: 'OG',
                type: 'input',
                templateOptions: {
                    label: 'OG:',
                    disabled: disabled
                }},
            { key: 'SG',
                type: 'input',
                templateOptions: {
                    label: 'SC:',
                    disabled: disabled
                }},
            { key: 'JG',
                type: 'input',
                templateOptions: {
                    label: 'JG:',
                    disabled: disabled
                }},
            { key: 'MG',
                type: 'input',
                templateOptions: {
                    label: 'MG:',
                    disabled: disabled
                }},

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','$window', '$resource',
	function($scope, Authentication, $window, $resource) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        var allTheData = [];
        var countOfTheData = 1;
        var allTheDataPost;

        $scope.refreshCommunityDataFromExcel = function () {
            var reader = new FileReader();
            var file = document.querySelector('input[type=file]').files[0];
            if (file.name) {
                var name = file.name;
            } else {
                return;
            }
//            var xlsFile = $window.XLSX.readFile(name);
            removeCurrentData();
            var data;
            reader.onloadend = function () {
                data = reader.result;
                var workbook = $window.XLSX.read(data, {type: 'binary'});

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];

                var headerIs = [];
                //var address_of_cell = 'A';
                var oddStuff = $window.XLSX.utils.sheet_to_json(worksheet);
                allTheData = oddStuff
                var nowWholeList = $resource('/community-raw-members?count=99999&page=1');
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    var holeList = $resource('/community-raw-members/', null,
                        {
                            'set': {method: 'POST'}
                        });
                    allTheDataPost = holeList;
                    countOfTheData = 0;
                    var adjData = adjustTheColumns(allTheData[countOfTheData]);
                    allTheDataPost.set(adjData).$promise.then(successSent, failSent);

                    //   for (var j = 0; j < oddStuff.length; j++) {
                    //       holeList.set(oddStuff[j]);
                    //   }

                });


            };

            //reader.re
            reader.readAsBinaryString(file);

        }

        var adjustmentList = {
            'MS': 'M_S',
            'p72hr': 'p72_hr',
            'Clnup': 'ClnUp'
        };
        /**
         * Read the row of Data.
         * If row has column key that needs to be translated then
         * create new key/value and delete old.
         * @param rowOfData
         */
        var adjustTheColumns = function (rowOfData) {
            if (rowOfData) {
                var keys = Object.keys(adjustmentList);
                for (var i = 0; i < keys.length; i++) {
                    var rowOfDataKeys = Object.keys(rowOfData);
                    if (rowOfDataKeys.indexOf(keys[i]) > -1) {
                        rowOfData[adjustmentList[keys[i]]] = rowOfData[keys[i]];
                        delete rowOfData[keys[i]];
                    }
                }
            }
            return rowOfData;
        }
        var successSent = function () {
            if (countOfTheData < allTheData.length) {
                countOfTheData++;
                var adjData = adjustTheColumns(allTheData[countOfTheData]);
                allTheDataPost.set(adjData).$promise.then(successSent, failSent);
            }
        }
        var failSent = function (err) {
            console.log(err);
        }

        var localOldDataResource;
        var localOldData = [];
        var localOldDataCount = 0;
        var localOldDataLength = 0;
        var removeCurrentData = function() {
            var nowRawList = $resource('/community-raw-members?count=99999&page=1');
            var answer = nowRawList.get(function () {
                localOldDataResource = $resource('/community-raw-members/:id',{id:'@id'})
                localOldData = answer.results;;
                localOldDataLength = localOldData.length;
                localOldDataCount = 0
                removeSuccess();
            });
        };

        var removeSuccess = function() {
            if (localOldDataCount <= localOldDataLength) {
                localOldDataResource.delete({id: localOldData[localOldDataCount++]._id}).$promise.then(removeSuccess,removeFail);
            }
        };

        var removeFail = function(err) {
            console.log("Failed:" + err);
        };

    }]);

'use strict';

angular.module('core')
  .directive('ngReallyClick', ['$modal',
    function($modal) {

      var ModalInstanceCtrl = ["$scope", "$modalInstance", function($scope, $modalInstance) {
        $scope.ok = function() {
          $modalInstance.close();
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }];

      return {
        restrict: 'A',
        scope: {
          ngReallyClick: '&'
        },
        link: function(scope, element, attrs) {

          element.bind('click', function() {
            var message = attrs.ngReallyMessage || 'Are you sure ?';

            var modalHtml = '<div class="modal-body">' + message + '</div>';
            modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';

            var modalInstance = $modal.open({
              template: modalHtml,
              controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function() {
              scope.ngReallyClick();
            }, function() {
              //Modal dismissed
            });

          });

        }

      };

    }

  ]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
		this.addMenu('topbarAdmin');
	}
]);

(function() {
    'use strict';

    angular
        .module('core')
        .factory('TableSettings', factory);

    factory.$inject = ['ngTableParams'];

    function factory(ngTableParams) {

      var getData = function(Entity) {
        return function($defer, params) {
  				Entity.get(params.url(), function(response) {
  					params.total(response.total);
  					$defer.resolve(response.results);
  				});
  			};

      };

      var params = {
        page: 1,
        count: 250
      };

      var settings = {
        total: 0,
        counts: [5, 10, 15,250,500, 999],
        filterDelay: 0,
      };

      /* jshint ignore:start */
      var tableParams = new ngTableParams(params, settings);
      /* jshint ignore:end */

      var getParams = function(Entity) {
        tableParams.settings({getData: getData(Entity)});
        return tableParams;
      };

      var service = {
        getParams: getParams
      };

      return service;

  }

})();

'use strict';

// Configuring the new module
angular.module('talks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbarAdmin', 'Talks', 'talks', 'dropdown', '/talks(/create)?');
		Menus.addSubMenuItem('topbarAdmin', 'talks', 'List Talks', 'talks');
		Menus.addSubMenuItem('topbarAdmin', 'talks', 'New Talk', 'talks/create');
	}
]);

'use strict';

//Setting up route
angular.module('talks').config(['$stateProvider',
	function($stateProvider) {
		// Talks state routing
		$stateProvider.
		state('listTalks', {
			url: '/talks',
			templateUrl: 'modules/talks/views/list-talks.client.view.html'
		}).
		state('createTalk', {
			url: '/talks/create',
			templateUrl: 'modules/talks/views/create-talk.client.view.html'
		}).
		state('viewTalk', {
			url: '/talks/:talkId',
			templateUrl: 'modules/talks/views/view-talk.client.view.html'
		}).
		state('editTalk', {
			url: '/talks/:talkId/edit',
			templateUrl: 'modules/talks/views/edit-talk.client.view.html'
		});
	}
]);
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

'use strict';

//Talks service used to communicate Talks REST endpoints
angular.module('talks').factory('Talks', ['$resource',
	function($resource) {
		return $resource('talks/:talkId', { talkId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function() {
    'use strict';
    angular
        .module('talks')
        .factory('TalksForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
//Add new properties to the angular-formly array properties in public/modules/module-name/services/module-name.form.client.service.js
//Then add new columns for the new properties in the HTML table in public/modules/module-name/views/list-module-name.client.view.html
            //  LAST_NAME: {type: String},
            {
                key: 'LAST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'LAST_NAME:',
                    disabled: disabled
                }
            },
            //FIRST_NAME: {type: String},
            {
                key: 'FIRST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'FIRST_NAME:',
                    disabled: disabled
                }
            },
            //Original_Walk: {type: String},
            {
                key: 'Original_Walk',
                type: 'input',
                templateOptions: {
                    label: 'Original_Walk:',
                    disabled: disabled
                }
            },
            //Walk_Number: {type:String},
            {
                key: 'Walk_Number',
                type: 'input',
                templateOptions: {
                    label: 'Walk_Number:',
                    disabled: disabled
                }
            },
            //Talk: {type:String},
            {
                key: 'Talk',
                type: 'input',
                templateOptions: {
                    label: 'Talk:',
                    disabled: disabled
                }
            }

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();

'use strict';

// Configuring the new module
angular.module('team-members').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Team members', 'team-members', 'dropdown', '/team-members(/create)?');
		Menus.addSubMenuItem('topbar', 'team-members', 'List Team members', 'team-members');
		Menus.addSubMenuItem('topbar', 'team-members', 'List Team members summary', 'team-members-summary');
		Menus.addSubMenuItem('topbar', 'team-members', 'New Team member', 'team-members/create');
	}
]);

'use strict';

//Setting up route
angular.module('team-members').config(['$stateProvider',
	function($stateProvider) {
		// Team members state routing
		$stateProvider.
		state('listTeamMembers', {
			url: '/team-members',
			templateUrl: 'modules/team-members/views/list-team-members.client.view.html'
		}).
		state('listTeamMembersSummary', {
			url: '/team-members-summary',
			templateUrl: 'modules/team-members/views/list-team-members-summary.client.view.html'
		}).
		state('createTeamMember', {
			url: '/team-members/create',
			templateUrl: 'modules/team-members/views/create-team-member.client.view.html'
		}).
		state('viewTeamMember', {
			url: '/team-members/:teamMemberId',
			templateUrl: 'modules/team-members/views/view-team-member.client.view.html'
		}).
		state('editTeamMember', {
			url: '/team-members/:teamMemberId/edit',
			templateUrl: 'modules/team-members/views/edit-team-member.client.view.html'
		});
	}
]);

'use strict';

// Team members controller
angular.module('team-members').controller('TeamMembersController', ['$scope', '$q', '$resource', '$stateParams', '$location', 'Authentication', 'TeamMembers', 'TableSettings', 'TeamMembersForm',
    function ($scope, $q, $resource, $stateParams, $location, Authentication, TeamMembers, TableSettings, TeamMembersForm) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(TeamMembers);
        $scope.teamMember = {};

        $scope.setFormFields = function (disabled) {
            $scope.formFields = TeamMembersForm.getFormFields(disabled);
        };


        // Create new Team member
        $scope.create = function () {
            var teamMember = new TeamMembers($scope.teamMember);

            // Redirect after save
            teamMember.$save(function (response) {
                $location.path('team-members/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Team member
        $scope.remove = function (teamMember) {

            if (teamMember) {
                teamMember = TeamMembers.get({teamMemberId: teamMember._id}, function () {
                    teamMember.$remove();
                    $scope.tableParams.reload();
                });

            } else {
                $scope.teamMember.$remove(function () {
                    $location.path('teamMembers');
                });
            }

        };

        // Update existing Team member
        $scope.update = function () {
            var teamMember = $scope.teamMember;

            teamMember.$update(function () {
                $location.path('team-members/' + teamMember._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.toViewTeamMember = function () {
            $scope.teamMember = TeamMembers.get({teamMemberId: $stateParams.teamMemberId});
            $scope.setFormFields(true);
        };

        $scope.toEditTeamMember = function () {
            $scope.teamMember = TeamMembers.get({teamMemberId: $stateParams.teamMemberId});
            $scope.setFormFields(false);
        };

        $scope.confRoomHideRows = true;
        $scope.talksHideRows = true;
        $scope.backHallHideRows = true;
//var title for output FirstName LastName OrgWalk totalWalks confRoom Talks (prioty or 4th day)
        var committeeList = ['L_D', 'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L', 'Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'ClnUp', 'PP_Tech','P'];
        var frontHallList = ['L_D', 'S_D', 'A_S_D', 'A_L_D', 'A_T_L', 'T_L'];
        var backHallList = ['Mu', 'Agape', 'M_S', 'Ref', 'p72_hr', 'Hous', 'Cnd_Lite', 'Clo', 'Wor', 'Fo_Up','Foto', 'S_Pray', 'Spo_Hr', 'Ent', 'Goph', 'ClnUp', 'PP_Tech','P'];
        //var selectFrontHallList = ['sL_D', 'sS_D', 'sA_S_D', 'sA_L_D', 'sA_T_L', 'sT_L', 'sMCR'];
        var selectFrontHallList = ['sL_D', 'sS_D', 'sA_S_D','sA_S_Da','sA_S_De', 'sA_L_D','sA_L_Da','sA_L_De', 'sA_T_L','sA_T_La','sA_T_Le', 'sT_L','sT_La','sT_Le', 'sMCR'];
        var selectFrontHallTitle = {'sL_D':'Lay Director', 'sS_D':'Spirtual Director', 'sA_S_D':'Asst. Spirtual Director'
            ,'sA_S_Da':'Alternate','sA_S_De':'Extra', 'sA_L_D':'Asst. Lay Director','sA_L_Da':'Alternate','sA_L_De':'Extra'
            , 'sA_T_L':'Asst. Table Leader','sA_T_La':'Alternate','sA_T_Le':'Extra', 'sT_L':'Table Leader','sT_La':'Alternate','sT_Le':'Extra', 'sMCR':'Conf Rm Extra'};
        var selectBackHallList = ['sMu','sMua', 'sPP_Tech', 'sAgape', 'sM_S', 'sRef', 'sp72_hr', 'sHous', 'sCnd_Lite', 'sClo', 'sWor', 'sFo_Up','sFoto', 'sS_Pray', 'sSpo_Hr', 'sEnt', 'sGoph', 'sClnUp', 'sMBH', 'sP'];
        var selectBackHallTitle = {'sMu':'Music','sMua':'Alternate', 'sPP_Tech':'Tech', 'sAgape':'Agape',
            'sM_S':'Meal Service', 'sRef':'Refreshments', 'sp72_hr':'72 hour', 'sHous':'Housing',
            'sCnd_Lite':'Candlelight', 'sClo':'Closing', 'sWor':'Worship', 'sFo_Up':'Follow Up',
            'sFoto':'Photographer', 'sS_Pray':'Speakers Prayer Chap', 'sSpo_Hr':'Sponsers Hour', 'sEnt':'Entertainment',
            'sGoph':'Humble Servant', 'sClnUp':'Clean Up', 'sMBH':'Extra Back Hall'};
        var talkList = ['PER', 'MG', 'PG', 'OG', 'SG', 'JG', 'PRI', 'FD', 'PHB', 'PIE', 'S', 'CA', 'DISC', 'CW', 'BC'];
        var selectedTalkList = ['sPER', 'sMG', 'sPG', 'sOG', 'sSG', 'sJG', 'sPRI', 'sFD', 'sPHB', 'sPIE', 'sS', 'sCA', 'sDISC', 'sCW', 'sBC'];
        var selectedTalkTitle = {'sPER':'Perseverance', 'sMG':'Means', 'sPG':'Prevenient', 'sOG':'Obstacles', 'sSG':'Sanctifying', 'sJG':'Justifying'
            , 'sPRI':'Priority', 'sFD':'Forth Day', 'sPHB':'Priesthood', 'sPIE':'Piety'
            , 'sS':'Study', 'sCA':'Christian Action', 'sDISC':'Discipleship', 'sCW':'Chg Our World', 'sBC':'Body Of Christ'};

        var testRow = ['FIRS'];

        var generateRowHeader = function () {
            var rowData = {};
            rowData.TeamAssignment = ' ';
            rowData.FIRST_NAME = ' ';
            rowData.LAST_NAME = ' ';
            rowData.PHONE = ' ';
            rowData.CITY = ' ';
            rowData.Original_Walk = ' ';
            rowData.totalWalks = ' ';
            rowData.ServiceRecord = ' ';
            var headerArray = Object.keys(rowData);
            return headerArray;
        };
        var generateRowEspecial = function (firstColumn) {
            var rowData = {};
            rowData.TeamAssignment = firstColumn;
            rowData.FIRST_NAME = ' ';
            rowData.LAST_NAME = ' ';
            rowData.PHONE = ' ';
            rowData.CITY = ' ';
            rowData.Original_Walk = ' ';
            rowData.totalWalks = ' ';
            rowData.ServiceRecord = ' ';
            return rowData;
        };
        var getIsChairOrTalk = function(teamRow) {
            for ( var jjj in selectedTalkList ) {
                if (teamRow[selectedTalkList[jjj]]) {
                    return selectedTalkTitle[selectedTalkList[jjj]];
                }
            }
            return ' ';
        }

        $scope.createTeamSelectionForm = function (tableData) {
            var deferred = $q.defer();

            var nowCommunityList = $resource('/team-members?count=99999&page=1&sorting%5BLAST_NAME%5D=asc');
            nowCommunityList.get().$promise.then(function (teamDataResource) {
                var teamData = teamDataResource.results;
                var teamDataCSV = [];
                var headerArray = generateRowHeader();
                teamDataCSV.push(headerArray);
                for (var pos = 0; pos < selectFrontHallList.length; pos++) {
                    var currentPos = selectFrontHallList[pos];
                    teamDataCSV.push(generateRowEspecial(' '));
                    var subHeaderArray = generateRowEspecial(selectFrontHallTitle[currentPos]);
                    teamDataCSV.push(subHeaderArray);
                    for (var i = 0; i < teamData.length; i++) {
                        if (teamData[i][currentPos]) {
                            var rowData = {};
                            rowData.TeamAssignment = getIsChairOrTalk(teamData[i]);
                            rowData.FIRST_NAME = teamData[i].FIRST_NAME;
                            rowData.LAST_NAME = teamData[i].LAST_NAME;
                            rowData.PHONE = teamData[i].AC + '-' + teamData[i].PHONE;
                            rowData.CITY = teamData[i].CITY;
                            rowData.Original_Walk = teamData[i].Original_Walk;
                            rowData.totalWalks = $scope.backHallCount(teamData[i]) + $scope.frontHallCount(teamData[i]);
                            rowData.ServiceRecord = karensSpecialTwo(frontHallList, teamData[i]) + ' ' + karensSpecialTwo(backHallList, teamData[i]);
                            teamDataCSV.push(rowData);
                        }
                    }
                }
                for (var pos = 0; pos < selectBackHallList.length; pos++) {
                    var currentPos = selectBackHallList[pos];
                    teamDataCSV.push(generateRowEspecial(' '));
                    var subHeaderArray = generateRowEspecial(selectBackHallTitle[currentPos]);
                    teamDataCSV.push(subHeaderArray);
                    for (var i = 0; i < teamData.length; i++) {
                        if (teamData[i][currentPos]) {
                            var rowData = {};
                            rowData.TeamAssignment = getIsChairOrTalk(teamData[i]);
                            rowData.FIRST_NAME = teamData[i].FIRST_NAME;
                            rowData.LAST_NAME = teamData[i].LAST_NAME;
                            rowData.PHONE = teamData[i].AC + '-' + teamData[i].PHONE;
                            rowData.CITY = teamData[i].CITY;
                            rowData.Original_Walk = teamData[i].Original_Walk;
                            rowData.totalWalks = $scope.backHallCount(teamData[i]) + $scope.frontHallCount(teamData[i]);
                            rowData.ServiceRecord = karensSpecialTwo(frontHallList, teamData[i]) + '; ' + karensSpecialTwo(backHallList, teamData[i]);
                            teamDataCSV.push(rowData);
                        }
                    }
                }
                deferred.resolve(teamDataCSV);
            });

            return deferred.promise;

        };
        $scope.cvsMe = function (tableData) {
            var deferred = $q.defer();

            var nowCommunityList = $resource('/team-members?count=99999&page=1&sorting%5BLAST_NAME%5D=asc');
            nowCommunityList.get().$promise.then(function (teamDataResource) {
                var teamData = teamDataResource.results;
                var teamDataCSV = [];
                var pushHeaders = true;
                for (var i = 0; i < teamData.length; i++) {
                    var rowData = {};
                    rowData.FIRST_NAME = teamData[i].FIRST_NAME;
                    rowData.LAST_NAME = teamData[i].LAST_NAME;
                    rowData.PHONE = teamData[i].AC + '-' + teamData[i].PHONE;
                    rowData.CITY = teamData[i].CITY;
                    rowData.Original_Walk = teamData[i].Original_Walk;
                    rowData.totalWalks = $scope.backHallCount(teamData[i]) + $scope.frontHallCount(teamData[i]);
                    rowData.ConfRoom = karensSpecialTwo(frontHallList, teamData[i]);
                    rowData.BackHall = karensSpecialTwo(backHallList, teamData[i]);
                    for (var j = 0; j < frontHallList.length; j++) {
                        rowData[frontHallList[j]] = teamData[i][frontHallList[j]] ? karensSpecialThree(frontHallList[j], teamData[i][frontHallList[j]], 3) : '-';
                    }
                    rowData['PRI'] = teamData[i]['PRI'] ? teamData[i]['PRI'] : '-';
                    rowData['FD'] = teamData[i]['FD'] ? teamData[i]['FD'] : '-';
                    if (pushHeaders) {
                        var headerArray = Object.keys(rowData);
                        teamDataCSV.push(headerArray);
                        pushHeaders = false;
                    }
                    teamDataCSV.push(rowData);
                }
                deferred.resolve(teamDataCSV);
            });

            return deferred.promise;
        };

        var karensSpecialTwo = function (frontBackList, data) {
            var summaryAnswer = "";
            for (var j = 0; j < frontBackList.length; j++) {
                summaryAnswer += data[frontBackList[j]] ? karensSpecialThree(frontBackList[j], data[frontBackList[j]], 2) + ',' : '';
            }
            return summaryAnswer;
        };

        var karensSpecialThree = function (label, data, number) {
            var dataCount = data.split('-').length;
            if (dataCount > number) {
                return label + '(' + dataCount + ')';
            }
            else {
                return label + '-' + data + ' ';
            }
        };

        $scope.backHallCount = function (thisPerson) {

            var keys = Object.keys(thisPerson);
            var overAllCount = 0;
            for (var i = 0; i < backHallList.length; i++) {
                if (keys.indexOf(backHallList[i]) > -1) {
                    var colValue = thisPerson[backHallList[i]];
                    var arrayColValue = colValue.split('-');
                    overAllCount += arrayColValue.length;
                }
            }
            return overAllCount;
        };
        $scope.frontHallCount = function (thisPerson) {

            var keys = Object.keys(thisPerson);
            var overAllCount = 0;
            for (var i = 0; i < frontHallList.length; i++) {
                if (keys.indexOf(frontHallList[i]) > -1) {
                    var colValue = thisPerson[frontHallList[i]];
                    var arrayColValue = colValue.split('-');
                    overAllCount += arrayColValue.length;
                }
            }
            return overAllCount;
        };
        $scope.talkCount = function (thisPerson) {

            var keys = Object.keys(thisPerson);
            var overAllCount = 0;
            for (var i = 0; i < talkList.length; i++) {
                if (keys.indexOf(talkList[i]) > -1) {
                    var colValue = thisPerson[talkList[i]];
                    var arrayColValue = colValue.split('-');
                    overAllCount += arrayColValue.length;
                }
            }
            return overAllCount;
        };

        $scope.selectedForTeam = function (thisPerson) {
            console.log("checkbox");
            var communityMember = thisPerson;
            TeamMembers.update({communityMemberId: thisPerson._id}, thisPerson);

        };

        $scope.selectedForUpdate = function (thisPerson) {
            TeamMembers.update({communityMemberId: thisPerson._id}, thisPerson);

        };


    }

]);

'use strict';

//Team members service used to communicate Team members REST endpoints
angular.module('team-members').factory('TeamMembers', ['$resource',
	function($resource) {
		return $resource('team-members/:teamMemberId', { teamMemberId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function() {
    'use strict';

    angular
        .module('team-members')
        .factory('TeamMembersForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
            { key: 'COMBO_KEY',
                type: 'input',
                templateOptions: {
                    label: 'Selected:',
                    disabled: disabled
                }},
            { key: 'Selected',
                type: 'input',
                templateOptions: {
                    label: 'Selected:',
                    disabled: disabled
                }},
            { key: 'LAST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'Last Name:',
                    disabled: disabled
                }},
            { key: '    FIRST_NAME',
                type: 'input',
                templateOptions: {
                    label: 'First Name:',
                    disabled: disabled
                }},
            { key: 'AC',
                type: 'input',
                templateOptions: {
                    label: 'AC:',
                    disabled: disabled
                }},
            { key: 'PHONE',
                type: 'input',
                templateOptions: {
                    label: 'Phone:',
                    disabled: disabled
                }},
            { key: 'STREET_ADDRESS',
                type: 'input',
                templateOptions: {
                    label: 'Street Address:',
                    disabled: disabled
                }},
            { key: 'CITY',
                type: 'input',
                templateOptions: {
                    label: 'City:',
                    disabled: disabled
                }},
            { key: 'ST',
                type: 'input',
                templateOptions: {
                    label: 'ST:',
                    disabled: disabled
                }},
            { key: 'ZIP',
                type: 'input',
                templateOptions: {
                    label: 'Zip:',
                    disabled: disabled
                }},
            { key: 'Original_Walk',
                type: 'input',
                templateOptions: {
                    label: 'Original Walk:',
                    disabled: disabled
                }},
            { key: 'L_D',
                type: 'input',
                templateOptions: {
                    label: 'Lay Dir:',
                    disabled: disabled
                }},
            { key: 'S_D',
                type: 'input',
                templateOptions: {
                    label: 'Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'A_L_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'A_S_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'Mu',
                type: 'input',
                templateOptions: {
                    label: 'Music:',
                    disabled: disabled
                }},
            { key: 'A_T_L',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'T_L',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'Agape',
                type: 'input',
                templateOptions: {
                    label: 'Agape:',
                    disabled: disabled
                }},
            { key: 'M_S',
                type: 'input',
                templateOptions: {
                    label: 'M S:',
                    disabled: disabled
                }},
            { key: 'Ref',
                type: 'input',
                templateOptions: {
                    label: 'Refreshments:',
                    disabled: disabled
                }},
            { key: 'p72_hr',
                type: 'input',
                templateOptions: {
                    label: '72hr:',
                    disabled: disabled
                }},
            { key: 'Hous',
                type: 'input',
                templateOptions: {
                    label: 'Housing:',
                    disabled: disabled
                }},
            { key: 'Cnd_Lite',
                type: 'input',
                templateOptions: {
                    label: 'Candle Light:',
                    disabled: disabled
                }},
            { key: 'Clo',
                type: 'input',
                templateOptions: {
                    label: 'Closing:',
                    disabled: disabled
                }},
            { key: 'Ent',
                type: 'input',
                templateOptions: {
                    label: 'Entertainment:',
                    disabled: disabled
                }},
            { key: 'S_Pray',
                type: 'input',
                templateOptions: {
                    label: 'Speakers Prayer Chap:',
                    disabled: disabled
                }},
            { key: 'Spo_Hr',
                type: 'input',
                templateOptions: {
                    label: 'Sponsers Hour:',
                    disabled: disabled
                }},
            { key: 'Fo_up',
                type: 'input',
                templateOptions: {
                    label: 'Follow Up:',
                    disabled: disabled
                }},
            { key: 'Foto',
                type: 'input',
                templateOptions: {
                    label: 'Photographer:',
                    disabled: disabled
                }},
            { key: 'Wor',
                type: 'input',
                templateOptions: {
                    label: 'Worship:',
                    disabled: disabled
                }},
            { key: 'Goph',
                type: 'input',
                templateOptions: {
                    label: 'Goph:',
                    disabled: disabled
                }},
            { key: 'ClnUp',
                type: 'input',
                templateOptions: {
                    label: 'Clean Up:',
                    disabled: disabled
                }},
            { key: 'PP_Tech',
                type: 'input',
                templateOptions: {
                    label: 'Tech:',
                    disabled: disabled
                }},
            { key: 'PER',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PRI',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'PHB',
                type: 'input',
                templateOptions: {
                    label: 'Presithood of Beleivers:',
                    disabled: disabled
                }},
            { key: 'PIE',
                type: 'input',
                templateOptions: {
                    label: 'Life of Piety:',
                    disabled: disabled
                }},
            { key: 'S',
                type: 'input',
                templateOptions: {
                    label: 'S:',
                    disabled: disabled
                }},
            { key: 'CA',
                type: 'input',
                templateOptions: {
                    label: 'CA:',
                    disabled: disabled
                }},
            { key: 'DISC',
                type: 'input',
                templateOptions: {
                    label: 'DISC:',
                    disabled: disabled
                }},
            { key: 'CW',
                type: 'input',
                templateOptions: {
                    label: 'CW:',
                    disabled: disabled
                }},
            { key: 'BC',
                type: 'input',
                templateOptions: {
                    label: 'BC:',
                    disabled: disabled
                }},
            { key: 'P',
                type: 'input',
                templateOptions: {
                    label: 'P:',
                    disabled: disabled
                }},
            { key: 'FD',
                type: 'input',
                templateOptions: {
                    label: 'FD:',
                    disabled: disabled
                }},
            { key: 'PG',
                type: 'input',
                templateOptions: {
                    label: 'PG:',
                    disabled: disabled
                }},
            { key: 'OG',
                type: 'input',
                templateOptions: {
                    label: 'OG:',
                    disabled: disabled
                }},
            { key: 'SG',
                type: 'input',
                templateOptions: {
                    label: 'SC:',
                    disabled: disabled
                }},
            { key: 'JG',
                type: 'input',
                templateOptions: {
                    label: 'JG:',
                    disabled: disabled
                }},
            { key: 'MG',
                type: 'input',
                templateOptions: {
                    label: 'MG:',
                    disabled: disabled
                }},

            { key: 'sL_D',
                type: 'input',
                templateOptions: {
                    label: 'Lay Dir:',
                    disabled: disabled
                }},
            { key: 'sS_D',
                type: 'input',
                templateOptions: {
                    label: 'Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'sA_L_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'sA_S_D',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'sA_T_L',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'sT_L',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'sA_L_Da',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'sA_S_Da',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'sA_T_La',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'sT_La',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'sA_L_De',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Lay Dir:',
                    disabled: disabled
                }},
            { key: 'sA_S_De',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Spiritual Dir:',
                    disabled: disabled
                }},
            { key: 'sA_T_Le',
                type: 'input',
                templateOptions: {
                    label: 'Asst. Table Leader:',
                    disabled: disabled
                }},
            { key: 'sT_Le',
                type: 'input',
                templateOptions: {
                    label: 'Table Leader:',
                    disabled: disabled
                }},
            { key: 'sMu',
                type: 'input',
                templateOptions: {
                    label: 'Music:',
                    disabled: disabled
                }},
            { key: 'sMua',
                type: 'input',
                templateOptions: {
                    label: 'Music Alternate:',
                    disabled: disabled
                }},
            { key: 'sAgape',
                type: 'input',
                templateOptions: {
                    label: 'Agape:',
                    disabled: disabled
                }},
            { key: 'sM_S',
                type: 'input',
                templateOptions: {
                    label: 'M S:',
                    disabled: disabled
                }},
            { key: 'sRef',
                type: 'input',
                templateOptions: {
                    label: 'Refreshments:',
                    disabled: disabled
                }},
            { key: 'sp72_hr',
                type: 'input',
                templateOptions: {
                    label: '72hr:',
                    disabled: disabled
                }},
            { key: 'sHous',
                type: 'input',
                templateOptions: {
                    label: 'Housing:',
                    disabled: disabled
                }},
            { key: 'sCnd_Lite',
                type: 'input',
                templateOptions: {
                    label: 'Candle Light:',
                    disabled: disabled
                }},
            { key: 'sClo',
                type: 'input',
                templateOptions: {
                    label: 'Closing:',
                    disabled: disabled
                }},
            { key: 'sEnt',
                type: 'input',
                templateOptions: {
                    label: 'Entertainment:',
                    disabled: disabled
                }},
            { key: 'sS_Pray',
                type: 'input',
                templateOptions: {
                    label: 'Speakers Prayer Chap:',
                    disabled: disabled
                }},
            { key: 'sSpo_Hr',
                type: 'input',
                templateOptions: {
                    label: 'Sponsers Hour:',
                    disabled: disabled
                }},
            { key: 'sFo_up',
                type: 'input',
                templateOptions: {
                    label: 'Follow Up:',
                    disabled: disabled
                }},
            { key: 'sFoto',
                type: 'input',
                templateOptions: {
                    label: 'Photographer:',
                    disabled: disabled
                }},
            { key: 'sWor',
                type: 'input',
                templateOptions: {
                    label: 'Worship:',
                    disabled: disabled
                }},
            { key: 'sGoph',
                type: 'input',
                templateOptions: {
                    label: 'Goph:',
                    disabled: disabled
                }},
            { key: 'sClnUp',
                type: 'input',
                templateOptions: {
                    label: 'Clean Up:',
                    disabled: disabled
                }},
            { key: 'sPP_Tech',
                type: 'input',
                templateOptions: {
                    label: 'Tech:',
                    disabled: disabled
                }},
            { key: 'sPER',
                type: 'input',
                templateOptions: {
                    label: 'Perseverance:',
                    disabled: disabled
                }},
            { key: 'sPRI',
                type: 'input',
                templateOptions: {
                    label: 'Priority:',
                    disabled: disabled
                }},
            { key: 'sPHB',
                type: 'input',
                templateOptions: {
                    label: 'Presithood of Beleivers:',
                    disabled: disabled
                }},
            { key: 'sPIE',
                type: 'input',
                templateOptions: {
                    label: 'Life of Piety:',
                    disabled: disabled
                }},
            { key: 'sS',
                type: 'input',
                templateOptions: {
                    label: 'Study:',
                    disabled: disabled
                }},
            { key: 'sCA',
                type: 'input',
                templateOptions: {
                    label: 'Christian Action:',
                    disabled: disabled
                }},
            { key: 'sDISC',
                type: 'input',
                templateOptions: {
                    label: 'Discipleship:',
                    disabled: disabled
                }},
            { key: 'sCW',
                type: 'input',
                templateOptions: {
                    label: 'Changing Our World:',
                    disabled: disabled
                }},
            { key: 'sBC',
                type: 'input',
                templateOptions: {
                    label: 'Body Of Christ:',
                    disabled: disabled
                }},
            { key: 'sP',
                type: 'input',
                templateOptions: {
                    label: 'P:',
                    disabled: disabled
                }},
            { key: 'sFD',
                type: 'input',
                templateOptions: {
                    label: 'FD:',
                    disabled: disabled
                }},
            { key: 'sPG',
                type: 'input',
                templateOptions: {
                    label: 'PG:',
                    disabled: disabled
                }},
            { key: 'sOG',
                type: 'input',
                templateOptions: {
                    label: 'OG:',
                    disabled: disabled
                }},
            { key: 'sSG',
                type: 'input',
                templateOptions: {
                    label: 'SC:',
                    disabled: disabled
                }},
            { key: 'sJG',
                type: 'input',
                templateOptions: {
                    label: 'JG:',
                    disabled: disabled
                }},
            { key: 'sMG',
                type: 'input',
                templateOptions: {
                    label: 'MG:',
                    disabled: disabled
                }},
            { key: 'sMBH',
                type: 'input',
                templateOptions: {
                    label: 'MBH:',
                    disabled: disabled
                }},
            { key: 'sMCR',
                type: 'input',
                templateOptions: {
                    label: 'MCR:',
                    disabled: disabled
                }}



        ];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('zipcodes').config(['$stateProvider',
	function($stateProvider) {
		// Zipcodes state routing
		$stateProvider.
		state('listZipcodes', {
			url: '/zipcodes',
			templateUrl: 'modules/zipcodes/views/list-zipcodes.client.view.html'
		}).
		state('createZipcode', {
			url: '/zipcodes/create',
			templateUrl: 'modules/zipcodes/views/create-zipcode.client.view.html'
		}).
		state('viewZipcode', {
			url: '/zipcodes/:zipcodeId',
			templateUrl: 'modules/zipcodes/views/view-zipcode.client.view.html'
		}).
		state('editZipcode', {
			url: '/zipcodes/:zipcodeId/edit',
			templateUrl: 'modules/zipcodes/views/edit-zipcode.client.view.html'
		});
	}
]);
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

'use strict';

//Zipcodes service used to communicate Zipcodes REST endpoints
angular.module('zipcodes').factory('Zipcodes', ['$resource',
	function($resource) {
		return $resource('zipcodes/:zipcodeId', { zipcodeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function() {
    'use strict';

    angular
        .module('zipcodes')
        .factory('ZipcodesForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
//Add new properties to the angular-formly array properties in public/modules/module-name/services/module-name.form.client.service.js
//Then add new columns for the new properties in the HTML table in public/modules/module-name/views/list-module-name.client.view.html
  					key: 'name',
  					type: 'input',
  					templateOptions: {
  			      label: 'Name:',
  						disabled: disabled
  			    }
  				}

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();
