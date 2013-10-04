
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

	var saveChanges = function(){

		$( '.preferences-bottom-checkbox', win ).not( '.wz-prototype' ).each( function(){

			if( $( this ).hasClass( 'checked' ) ){

				wql.insertType( [ params.id, $( this ).data( 'type' ) ] );

			}else{

				wql.removeType( [ params.id, $( this ).data( 'type' ) ] );

			}

		});

	};

	win

	.on( 'click', '.preferences-bottom-checkbox', function(){
		$( this ).toggleClass( 'checked' );
	})

	.on( 'click', '.preferences-button.cancel', function(){
		wz.app.closeWindow( win );
	})

	.on( 'click', '.preferences-button.accept', function(){

		saveChanges( function(){

			service.trigger( 'config-changed' );
			wz.app.closeWindow( win );

		});


	})

	.on( 'click', '.preferences-account-remove', function(){

		wz.social.removeAccount( params.id );

	});

	if( params.type === 'facebook' ){

		$( '.preferences-top span', win ).text( 'Facebook Settings' );
		$( '.preferences-account-name', win ).text( params.name );

		for( var i = 0; i < facebookOptions.length; i++ ){

			wql.getType( [ params.id, i ], function( error, result ){

				if( result.length ){

					checkboxPrototype
						.clone().removeClass( 'wz-prototype' ).addClass( 'checked' )
						.appendTo( $( '.preferences-content', win ) )
						.data( 'type', i )
						.find( 'span' ).text( facebookOptions[i] );

				}else{

					checkboxPrototype
						.clone().removeClass( 'wz-prototype' )
						.appendTo( $( '.preferences-content', win ) )
						.data( 'type', i )
						.find( 'span' ).text( facebookOptions[i] );

				}

			});

		}

		$( '.preferences-button', win ).appendTo( $( '.preferences-content', win ) );

	}else if( params.type === 'twitter' ){

		$( '.preferences-top span', win ).text( 'Twitter Settings' );
		$( '.preferences-account-name', win ).text( params.name );

		for( var i = 0; i < twitterOptions.length; i++ ){

			wql.getType( [ params.id, i ], function( error, result ){

				if( result.length ){

					checkboxPrototype
						.clone().removeClass( 'wz-prototype' ).addClass( 'checked' )
						.appendTo( $( '.preferences-content', win ) )
						.data( 'type', i )
						.find( 'span' ).text( facebookOptions[i] );

				}else{

					checkboxPrototype
						.clone().removeClass( 'wz-prototype' )
						.appendTo( $( '.preferences-content', win ) )
						.data( 'type', i )
						.find( 'span' ).text( facebookOptions[i] );

				}

			});

		}

		$( '.preferences-button', win ).appendTo( $( '.preferences-content', win ) );

	}

	$( '.preferences-account-remove', win ).text( lang.remove )
	$( '.preferences-button.cancel .preferences-account-button', win ).text( lang.cancel );
	$( '.preferences-button.save .preferences-account-button', win ).text( lang.save );
