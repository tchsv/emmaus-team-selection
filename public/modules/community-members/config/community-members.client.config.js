'use strict';

// Configuring the new module
angular.module('community-members').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Community members', 'community-members', 'dropdown', '/community-members(/create)?');
		Menus.addSubMenuItem('topbar', 'community-members', 'List Community members', 'community-members');
		Menus.addSubMenuItem('topbar', 'community-members', 'New Community member', 'community-members/create');
	}
]);
