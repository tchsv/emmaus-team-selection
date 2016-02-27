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
