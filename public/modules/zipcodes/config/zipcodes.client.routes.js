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