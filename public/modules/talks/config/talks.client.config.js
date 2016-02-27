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
