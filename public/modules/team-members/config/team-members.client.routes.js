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