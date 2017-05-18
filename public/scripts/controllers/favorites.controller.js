//display favorites on favorite page
myApp.controller('FavoritesController',function($http){
  console.log('in favorites controller');
  var vm = this;
  vm.fav = [];
  //get favorite movies from db
  vm.getFavorites = function(){
    console.log('in favorites function');
    $http({
      method: 'GET',
      url: '/moviedb'
    }).then( function success(response){
      console.log(response);
      vm.fav = response.data;
      console.log(vm.fav);
    });//end GET
  };//end of getFavorites

  vm.deleteMovie = function(id){
    $http({
      method: 'DELETE',
      url: '/moviedb/'+id
    }).then(function success(response){
      vm.getFavorites();
    });//end DELETE
  };//end removeMovie function
});//end of Favorties Controller
