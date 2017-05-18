// set up a controller (inject $http if using)
myApp.controller( 'SearchController', function( $http ){
  console.log( 'in search controller' );
  // variable global to this controller, ,"vm" stands for "view model"
  var vm = this;
  // array attached to controller (makes it avilable to DOM)
  vm.movies = [];
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
    url: '/moviedb',
    data: movieToSend
  });
 };//end saveFavortie
}); //end search controller
