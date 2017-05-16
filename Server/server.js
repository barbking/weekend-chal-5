//requires
//node modules
var express = require('express');
var app = express();
var bodyParser = require( 'body-parser' );
//our modules
var index = require( './modules/index' );
var moviedb = require( './modules/moviedb' );
//uses
app.use(express.static('public'));
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
//routes
app.use( '/', index );
app.use( '/moviedb', moviedb );
// globals
var port = process.env.PORT || 3000;
// spin up server
app.listen( port, function() {
  console.log( 'server up on:', port );
});
