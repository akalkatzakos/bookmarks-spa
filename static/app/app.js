var bookmarkApp = angular.module('bookmarkApp', [ 'ngRoute', 'ui.bootstrap' ]);

bookmarkApp.config(function($routeProvider) {
	$routeProvider.when("/bookmark", {
		controller : 'BookmarkController',
		templateUrl : 'app/partials/bookmark_partial.html'
	}).when("/bookmark/:id", {
		controller : 'BookmarkController',
		templateUrl : 'app/partials/bookmark_partial.html'
	}).when("/list", {
		controller : 'ListBookmarkController',
		templateUrl : 'app/partials/bookmark_list.html'
	}).when("/", {
		redirectTo : "/list"
	});
});
