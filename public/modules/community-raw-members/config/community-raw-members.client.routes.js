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