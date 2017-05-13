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
  tile: String,
  description: String
});
//model
var favorites = mongoose.model( 'favorites', ourSchema );
//uses
app.use(express.static('public'));
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
//routes
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});
// This should be the last route
// /* is wildcard will respond to all requests
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public/views/index.html'));
// });
// globals
var port = process.env.PORT || 3456;
// spin up server
app.listen( port, function() {
  console.log( 'server up on:', port );
});
