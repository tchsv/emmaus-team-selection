'use strict';

// Configuring the new module
angular.module('community-raw-members').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Community raw members', 'community-raw-members', 'dropdown', '/community-raw-members(/create)?');
		Menus.addSubMenuItem('topbar', 'community-raw-members', 'List Community raw members', 'community-raw-members');
		Menus.addSubMenuItem('topbar', 'community-raw-members', 'New Community raw member', 'community-raw-members/create');
	}
]);
