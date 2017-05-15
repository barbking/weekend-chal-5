//requires
//node modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
// 27017 is default mongo port
mongoose.connect( 'localhost:27017/movies' );
//schema
var ourSchema = mongoose.Schema({
  title: String,
  year: Number,
  poster: String,
  imbDBid: String
});
//model
var favorites = mongoose.model( 'favorites', ourSchema );
//uses
app.use(express.static('public'));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
//routes
// app.get( '/', function( req, res ){
//   res.sendFile( path.resolve( 'public/views/index.html' ) );
// });
// globals
var port = process.env.PORT || 3000;
// spin up server
app.listen( port, function() {
  console.log( 'server up on:', port );
});
//save favorite to db
app.post('/movietosave',function(req, res){
  console.log('req.param to save:', req.body);
  var newFav = favorites(req.body);
  newFav.save().then(function(){
  res.sendStatus( 200 );
  });//end psot
});//end app.delete
//get saved movies
app.get('/getfavorites',function(req,res){
  console.log('in get');
  favorites.find().then(function(data){
  res.send(data);
  });
});//end GET
//delete a movie form db
app.delete('/deletemovie/:id', function(req,res){
  console.log('in delete');
  favorites.remove({_id: req.params.id}).then(function(){
  res.sendStatus(200);
  });//end remove
});//end DELETE
//to get search/favorites routes
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
