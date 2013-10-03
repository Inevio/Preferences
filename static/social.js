
var checkboxPrototype = $( '.preferences-bottom-checkbox.wz-prototype', win );

var facebookOptions = [

	'Tagged on a photo',
	'Message received',
	'Friend requests',
	'Friend\'s new status',
	'Friend posts a new photo',
	'Group activity',
	'Events created',
	'Notes, links or videos posted'

];

var twitterOptions = [

	'Followed people send tweets',
	'Message received',
	'Tweet sent is replied',
	'Someone mentions me',
	'Tweet sent is retweeted',
	'Tweet sent is favorited',
	'Tweet sent is unfavorited',
	'New followers'

];

if( params.type === 'facebook' ){

	$( '.preferences-top span', win ).text( 'Facebook Settings' );
	$( '.preferences-account-name', win ).text( params.name );

	for( var i = 0; i < facebookOptions.length; i++ ){

		checkboxPrototype
			.clone().removeClass( 'wz-prototype' )
			.appendTo( $( '.preferences-content', win ) )
			.find( 'span' ).text( facebookOptions[i] );

	}

	$( '.preferences-button', win ).appendTo( $( '.preferences-content', win ) );

}else if( params.type === 'twitter' ){

	$( '.preferences-top span', win ).text( 'Twitter Settings' );
	$( '.preferences-account-name', win ).text( params.name );

	for( var i = 0; i < twitterOptions.length; i++ ){

		checkboxPrototype
			.clone().removeClass( 'wz-prototype' )
			.appendTo( $( '.preferences-content', win ) )
			.find( 'span' ).text( twitterOptions[i] );

	}


	$( '.preferences-button', win ).appendTo( $( '.preferences-content', win ) );

}

win

.on( 'click', '.preferences-bottom-checkbox', function(){
	$( this ).toggleClass( 'checked' );
})

.on( 'click', '.preferences-button.cancel', function(){
	wz.win.close();
});

$( '.preferences-account-remove', win ).text( lang.remove )
$( '.preferences-button.cancel .preferences-account-button', win ).text( lang.cancel );
$( '.preferences-button.save .preferences-account-button', win ).text( lang.save );
