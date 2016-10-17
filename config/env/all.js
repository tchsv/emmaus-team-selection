'use strict';

module.exports = {
	app: {
		title: 'emmaus-team-selection',
		description: 'Allow lay director to upload community listing and select team.',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3700,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/ng-table/ng-table.min.css',
				'public/lib/ngprogress/ngProgress.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ng-table/ng-table.min.js',
				'public/lib/api-check/dist/apiCheck.min.js',
				'public/lib/angular-formly/dist/formly.min.js',
				'public/lib/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js',
				'public/lib/ng-csv/build/ng-csv.min.js',
				'public/lib/js-xlsx/dist/xlsx.full.min.js',
				'public/lib/ngprogress/build/ngprogress.js',
				//TODO if you need to add lib assets put them here please...
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
