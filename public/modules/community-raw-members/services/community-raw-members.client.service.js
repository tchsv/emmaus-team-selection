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