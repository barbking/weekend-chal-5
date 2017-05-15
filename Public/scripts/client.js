//add ngRoute module dependency for additional pages
console.log('test');
var myApp = angular.module('myApp', ['ngRoute']);
//Define routes in a config function using $routeProvider
myApp.config(function($routeProvider, $locationProvider) {
$routeProvider
  .when('/', {
  template: '<h3>Welcome to movie search</h3>',
  controller: 'DefaultController as dc'})
  .when('/search', {
  templateUrl: 'views/pages/search.html',
  controller: 'SearchController as sc'})
  .when('/favorites', {
  templateUrl: 'views/pages/favorites.html',
  controller: 'FavoritesController as fc'})
  .otherwise('/');

$locationProvider.html5Mode(true);
});

myApp.controller( 'DefaultController', function( $http ){
  console.log( 'in default controller' );
});

// set up a controller (inject $http if using)
myApp.controller( 'SearchController', function( $http ){
  console.log( 'in search controller' );
  // variable global to this controller
  var vm = this;
  // array attached to controller (makes it avilable to DOM)
  vm.movies = [];
  // "vm" stands for "view model"
  vm.getSearch = function(){
    console.log( 'in getSearch' );
    console.log('http://www.omdbapi.com/?s='+vm.searchIn);
    $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?s='+vm.searchIn //server file app.use points to this
    }).then( function success( response ) {
      console.log( 'resp:', response.data.Search );
      vm.movies = response.data.Search; //will always be .data with http
    });//end GET
  }; //end getSearch

//send and save favorite movie to db
vm.saveFavorite = function(imdbID,Title,Year,Poster) {
  console.log('in saveFavorite func');
  var movieToSend = {
    title: Title,
    year: Year,
    poster: Poster,
    imbDBid: imdbID
  };
  console.log(movieToSend);
  $http({
    method: 'POST',
    url: '/movietosave',
    data: movieToSend
  }).then( function success(response){
    console.log(response);
  });//end POST
 };//end saveFavortie
}); //end search controller

//display favorites on favorite page
myApp.controller('FavoritesController',function($http){
  console.log('in favorites controller');
  var vm = this;
  vm.favmovies = [];
  //get favorite movies from db
  vm.getFavorites = function(){
    console.log('in favorites function');
    $http({
      method: 'GET',
      url: '/getfavorites'
    }).then( function success(response){
      console.log('fav movie:'+ response.data);
      console.log('favmovie array'+vm.favmovies);
      vm.favmovies = response.data;
    });//end GET
  };//end of getFavorites
});//end of Favorties Controller
