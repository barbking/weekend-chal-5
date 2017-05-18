//add ngRoute module dependency for additional pages
// Creating the angular module that will act as our entire application
var myApp = angular.module('myApp', ['ngRoute']);
// Angular configuration
//Define routes in a config function using $routeProvider
myApp.config(function($routeProvider, $locationProvider) {
$routeProvider
  .when('/', {
  templateUrl: 'views/pages/search.html',
  controller: 'SearchController as sc'})
  .when('/favorites', {
  templateUrl: 'views/pages/favorites.html',
  controller: 'FavoritesController as fc'})
  .otherwise('/');

$locationProvider.html5Mode(true);
});
