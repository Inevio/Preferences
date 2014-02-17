    
    var win               = $( this );
    var checkboxPrototype = $( '.preferences-bottom-checkbox.wz-prototype', win );

    var saveChanges = function(){

        $( '.preferences-bottom-checkbox', win ).not( '.wz-prototype' ).each( function(){

            if( $( this ).hasClass( 'checked' ) ){
                wql.insertType( [ params.id, $( this ).data( 'type' ) ], function(){});
            }else{
                wql.removeType( [ params.id, $( this ).data( 'type' ) ], function(){});
            }

        });

        service.trigger( 'config-changed' );
        wz.view.remove();

    };

    win
    .on( 'click', '.preferences-bottom-checkbox', function(){
        $( this ).toggleClass( 'checked' );
    })

    .on( 'click', '.preferences-button.cancel', function(){
        wz.view.remove();
    })

    .on( 'click', '.preferences-button.save', function(){
        saveChanges();

    })

    .on( 'click', '.preferences-account-remove', function(){
        wz.social.removeAccount( params.id );
        wz.view.remove();
    });

    if( params.type === 'facebook' ){

        $( '.preferences-top span', win ).text( lang.facebookSettings );
        $( '.preferences-account-name', win ).text( params.name );

        for( var i = 0; i < lang.facebookOptions.length; i++ ){

            checkboxPrototype
                .clone().removeClass( 'wz-prototype' ).addClass( 'type-' + i )
                .appendTo( $( '.preferences-content', win ) )
                .data( 'type', i )
                .find( 'span' ).text( lang.facebookOptions[i] );

            wql.getType( [ params.id, i ], function( error, result ){

                if( result.length ){
                    $( '.preferences-bottom-checkbox.type-' + result[0].type ).addClass( 'checked' );
                }

            });

        }

        $( '.preferences-button', win ).appendTo( $( '.preferences-content', win ) );

    }else if( params.type === 'twitter' ){

        $( '.preferences-top span', win ).text( lang.twitterSettings );
        $( '.preferences-account-name', win ).text( params.name );

        for( var i = 0; i < lang.twitterOptions.length; i++ ){

            checkboxPrototype
                .clone().removeClass( 'wz-prototype' ).addClass( 'type-' + i )
                .appendTo( $( '.preferences-content', win ) )
                .data( 'type', i )
                .find( 'span' ).text( lang.twitterOptions[i] );

            wql.getType( [ params.id, i ], function( error, result ){

                if( result.length ){
                    $( '.preferences-bottom-checkbox.type-' + result[0].type ).addClass( 'checked' );
                }

            });

        }

        $( '.preferences-button', win ).appendTo( $( '.preferences-content', win ) );

    }

    $( '.preferences-account-remove', win ).text( lang.remove );
    $( '.preferences-content-title', win ).text( lang.notify + ':' );
    $( '.preferences-button.cancel .preferences-account-button', win ).text( lang.cancel );
    $( '.preferences-button.save .preferences-account-button', win ).text( lang.save );
