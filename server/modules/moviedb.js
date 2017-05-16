// requires
var express = require( 'express' );
var router = express.Router();
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

//save favorite to db
router.post('/movietosave',function(req, res){
  console.log('req.param to save:', req.body);
  var newFav = favorites(req.body);
  newFav.save().then(function(){
  res.sendStatus( 200 );
  });//end psot
});//end app.delete

//get saved movies
router.get('/',function(req,res){
  console.log('in get');
  favorites.find().then(function(data){
  res.send(data);
  });
});//end GET

//delete a movie form db
router.delete('/deletemovie/:id', function(req,res){
  console.log('in delete');
  favorites.remove({_id: req.params.id}).then(function(){
  res.sendStatus(200);
  });//end remove
});//end DELETE

module.exports = router;
