var myApp = angular.module( 'myApp', [] );
// set up a controller (inject $http if using)
myApp.controller( 'FavoritesController', function( $http ){
  console.log( 'NG' );
  // variable global to this controller
  var vm = this;
  // array attached to controller (makes it avilable to DOM)
  vm.movies = [];
  // "vm" stands for "view model"
  vm.getSearch = function(){
    console.log( 'in getSearch ng-click' );
    console.log('http://www.omdbapi.com/?s='+vm.searchIn);
    $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?s='+vm.searchIn //server file app.use points to this
    }).then( function success( response ) {
      console.log( 'resp:', response );
      vm.movies = response.data.Search; //will always be .data with http
    });
  }; // end getSearch
}); //end controller
