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