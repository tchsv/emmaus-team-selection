'use strict';

//Community members service used to communicate Community members REST endpoints
angular.module('community-members').factory('CommunityMembers', ['$resource',
	function($resource) {
		return $resource('community-members/:communityMemberId', { communityMemberId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);