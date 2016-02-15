'use strict';

// Configuring the new module
angular.module('team-members').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Team members', 'team-members', 'dropdown', '/team-members(/create)?');
		Menus.addSubMenuItem('topbar', 'team-members', 'List Team members', 'team-members');
		Menus.addSubMenuItem('topbar', 'team-members', 'New Team member', 'team-members/create');
	}
]);
