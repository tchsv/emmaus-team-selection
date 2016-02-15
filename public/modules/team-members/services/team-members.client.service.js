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