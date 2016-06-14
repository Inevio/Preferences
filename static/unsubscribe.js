
var stripe = require('./stripe.js')

module.exports = function ( req, res ) {

	res.header( 'Access-Control-Allow-Credentials', 'true' );
	res.header( 'Access-Control-Allow-Headers', 'X-Requested-With,X-File-Name,X-File-Size,X-File-Id,Content-Type' );
	res.header( 'Access-Control-Allow-Methods', 'POST' );
  res.header( 'Access-Control-Allow-Origin', 'https://beta.inevio.com' );

	stripe.cancelSubscription( req.body, function ( err, res ) {
		
    console.log( err );
		console.log( res );

	});

}