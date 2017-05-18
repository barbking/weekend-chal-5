var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );

// router.use( '/', function( req, res ){
//   res.sendFile( path.resolve( 'public/views/index.html' ) );
// });

// to get search/favorites routes
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

module.exports = router;
