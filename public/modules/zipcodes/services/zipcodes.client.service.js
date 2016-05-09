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