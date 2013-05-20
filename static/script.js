
wz.app.addScript( 3, 'common', function( win, app, lang, params ){

    // Local variables
    var idInterval = 0;
    var cakeTotal = $('.preferences-hdd-cake-total', win);
    var cakeFree = $('.preferences-hdd-cake-free', win);
    var oldPassword = $('#old-password').children('input');
    var newPassword = $('#new-password').children('input');
    var renewPassword = $('#renew-password').children('input');
    var saveData = $('#save-data');
    var usernameInput = $('#username').children('input');
    var emailInput = $('#email').children('input');
    var savePassword = $('#save-password');
    var username = '';
    var mail = '';

    var ctx         = null;
    var ctxInterval = 0;
    var circleGrads = 0;
    var circleEnd   = 0;

    // Local Functions
    var startCircleAnimation = function( end ){

        cicleEnd = ( end * 360 ) + 5;

        // Define CTX Object
        ctx = $( 'canvas', win ).transition( { opacity : 1 }, 500 );
        ctx = ctx[ 0 ].getContext('2d');

        // CTX Style
        ctx.lineWidth   = 20;
        ctx.lineCap     = 'round';
        ctx.strokeStyle = "#34a7ff";

        // Start CTX
        ctx.beginPath();
        ctx.moveTo(110,11);
        ctx.lineTo(111,11);
        ctx.stroke();

        setTimeout( function(){
            ctxInterval = setInterval( nextCircleAnimation, 10 );
        }, 1000 );

    };

    var radians =  function( grads ){
        return ( ( Math.PI / 180 ) * grads ) - ( Math.PI / 2 );
    };

    var nextCircleAnimation = function(){

        if( circleGrads ){
            ctx.clearRect( 0, 0, 221, 220 );
        }

        ctx.beginPath();
        ctx.arc( 110, 109, 98, ( -Math.PI / 2 ), radians( circleGrads ), false );

        if( ( circleGrads / cicleEnd ) < 0.5 ){
            circleGrads += 6;
        }else{
            circleGrads += ( 10 - ( ( circleGrads / cicleEnd ) * 10 ) );
        }

        ctx.stroke();

        if( circleGrads >= cicleEnd ){
            clearInterval( ctxInterval );
        }

    };

    var data = function(){

        wz.config( function( error, config ){

            username = config.user.user;
            mail     = config.user.mail;

            $( '#username input', win ).val( username );
            $( '#email input', win ).val( mail );

        });

    };
	
	var socialNetworks = function(){
		
		wz.social.getAccounts( function( error, accounts ){
			
			for( var i = 0 ; i < accounts.length ; i++ ){
				
				if( accounts[i].network === 'twitter' ){
					$( '.preferences-social-element-name.twitter', win ).addClass('exists').text( accounts[i].name );
				}else if( accounts[i].network === 'facebook' ){
					$( '.preferences-social-element-name.facebook', win ).addClass('exists').text( accounts[i].name );
				}
				
			}
			
		});
		
    };

    // Events
    win
    .on( 'mousedown', function( e ){

        if( win.is( e.target ) ){

            win.transition( { opacity : 0 }, 250, function(){
                wz.app.closeWindow( win );
            });

        }

    })

    .on('mousedown', 'li', function(){

        var oldActive = $( 'li.active', win );
        var newActive = $( this );

        if( !oldActive.is( newActive ) ){

            $( 'input', win ).val('');

            oldActive.removeClass('active');
            newActive.addClass('active');

            $( '.preferences-bottom-content.' + oldActive.attr('id'), win )
                .css( 'display', 'none' )
                .transition( { opacity : 0 }, 250 );

            $( '.preferences-bottom-content.' + newActive.attr('id'), win )
                .css( 'display', 'block' )
                .transition( { opacity : 1 }, 250);

            if( $( '.preferences-bottom-content.password', win ).css('display') === 'block' ){

                $( '.preferences-bottom-content.password', win )
                    .css( 'display', 'none' )
                    .transition( { opacity : 0 }, 250 );

            }

            if( newActive.attr('id') === 'account' ){

                $( '#username input', win ).val( username );
                $( '#email input', win ).val( mail );
            }

            $('.preferences-account-middle article i, .preferences-password-middle article i', win ).removeClass();

            saveData.add( savePassword )
                .removeClass('active')
                .addClass('disabled');

        }

    })

    .on('mousedown', '#change-password', function(){

        $('input', win ).val('');

        $( '.preferences-bottom-content.account', win )
            .css( 'display', 'none' )
            .transition( { opacity : 0 }, 250 );

        $( '.preferences-bottom-content.password', win )
            .css( 'display', 'block' )
            .transition( { opacity : 1 }, 250 );

        $( '.preferences-account-middle article i, .preferences-password-middle article i', win ).removeClass();

        saveData.add( savePassword )
            .removeClass('active')
            .addClass('disabled');

    })
        
    .on('mousedown', '#cancel-password', function(){
                    
        $( '.preferences-bottom-content.password' ).transition({opacity:0},250).css('display','none');
        $( '.preferences-bottom-content.account' ).css('display','block').transition({opacity:1},250);
        
        $('input').val('');
        usernameInput.val( username );
        emailInput.val( mail );
        $('.preferences-account-middle article, .preferences-password-middle article').find('i').removeClass();
        saveData.add(savePassword).removeClass('active').addClass('disabled');
        
    })
    
    .on('mousedown', '#save-data', function(){
        
        if( usernameInput.val().match( ' ' ) !== null ){
            alert( lang.usernameWhitespaces );
        }else if( emailInput.val().match( ' ' ) !== null ){
            alert( lang.mailWhitespaces );
        }else if( !usernameInput.val().length ){
            alert( lang.usernameEmpty );
        }else if( !emailInput.val().length ){
            alert( lang.mailEmpty );
        }else if( usernameInput.val() !== username || emailInput.val() !== mail ){
        
            wz.config( function( error, config ){

                config.changeUsername( usernameInput.val(), function( error ){

                    if( error ){

                        if( error === 'USER ABORT' ){
                            return false;
                        }

                        alert( error );
                        usernameInput.val( username );
                        emailInput.val( mail );

                    }else{

                        data();
                        alert( lang.dataChanged );
                        
                    }

                    saveData.removeClass('active').addClass('disabled');
                    $('#username', win).find('i').removeClass();
                    $('#email', win).find('i').removeClass();
                    
                });
            });
            
        }
        
    })
    
    .on('mousedown', '#save-password', function(){
        
        if( newPassword.val() === renewPassword.val() && newPassword.val() && renewPassword.val() && oldPassword.val() ){
            
            wz.config( function( error, config ){
                config.changePassword( oldPassword.val(), newPassword.val(), function( error ){
                    
                    if( error ){

                        if( error === 'USER ABORT' ){
                            return false;
                        }

                        oldPassword.val('');
                        oldPassword.focus();
                        alert( error );

                    }else{

                        oldPassword.val('');
                        newPassword.val('');
                        $('#renew-password', win).children('input').val('');
                        alert( lang.passwordChanged );

                    }

                    savePassword.removeClass('active').addClass('disabled');
                    $('#renew-password', win).find('i').removeClass();
                    
                });
            });
            
        }
        
    })
    
    .on('mousedown', '#old-password figure i', function(){
        
        alert( lang.retrievePassword );
    
    })
    
    .on('mousedown', '.preferences-account-middle article figure', function(){
        $(this).siblings('input').focus();
    })
    
    .on('mousedown', '#new-password figure, #renew-password figure', function(){
        $(this).siblings('input').focus();
    })
	
	.on('mousedown', '.preferences-social-element-name', function(){
		
		if( !$(this).hasClass('exists') ){
			
			if( $(this).hasClass('twitter') ){
				wz.social.addAccount('twitter', function(){});
			}else if( $(this).hasClass('facebook') ){
				wz.social.addAccount('facebook', function(){});
			}
			
		}
		
	})

    .on('mousedown', '.hdd-options-starter, .hdd-options-pro, .hdd-options-advance, .hdd-options-ultimate', function(){
        
        alert( lang.upgradePlans );
    
    })
    
    .on('focus', '.preferences-account-middle article, .preferences-password-middle article', function(){

        $(this).addClass('active');
        
    })
    
    .on('blur', 'input', function(){

        $(this).parent().removeClass('active');
        
    })
    
    .on('keyup', '#username, #email', function(){
        
        clearInterval(idInterval);
        idInterval = setTimeout( function(){

            var usernameLength = usernameInput.val().length;
            var emailLength = emailInput.val().length;
            
            if( usernameLength || emailLength ){
                
                var userEqual = usernameInput.val() === username;
                var mailEqual = emailInput.val() === mail;
                
                if( usernameLength && !userEqual && usernameInput.val().match( ' ' ) === null){
                    usernameInput.siblings('figure').children('i').addClass('process');
                }else{
                    usernameInput.siblings('figure').children('i').removeClass('process');
                }
                
                if( emailLength && !mailEqual && emailInput.val().match( ' ' ) === null){
                    emailInput.siblings('figure').children('i').addClass('process');
                }else{
                    emailInput.siblings('figure').children('i').removeClass('process');
                }

                if( ( !userEqual ||  !mailEqual ) && usernameLength && emailLength 
                    && usernameInput.val().match( ' ' ) === null && emailInput.val().match( ' ' ) === null ){
                    saveData.removeClass('disabled').addClass('active');
                }else{
                    saveData.removeClass('active').addClass('disabled');
                }
                
            }else{

                usernameInput.siblings('figure').children('i').removeClass('process');
                emailInput.siblings('figure').children('i').removeClass('process');
                saveData.removeClass('active').addClass('disabled');
                
            }

        }, 500);

    })

    .on('keyup', '#renew-password, #new-password, #old-password', function(){

        if( $(this).attr('id') === 'new-password' || $(this).attr('id') === 'renew-password' ){
            $('#renew-password').find('i').removeClass();
        }

        clearInterval(idInterval);
        idInterval = setTimeout( function(){

            var element = $('#renew-password');
            var valNewPassword = $('#new-password').children('input').val();
            var valreNewPassword = element.children('input').val();

            if( valNewPassword.length && valreNewPassword.length ){

                if( valreNewPassword === valNewPassword ){
                    element.find('i').removeClass('error').addClass('tick');
                    if( $('#old-password').children('input').val().length ){
                        $('#save-password').removeClass('disabled').addClass('active');
                    }else{
                        $('#save-password').removeClass('active').addClass('disabled');
                    }
                }else{
                    element.find('i').removeClass('tick').addClass('error');
                    $('#save-password').removeClass('active').addClass('disabled');
                }

            }else{
                element.find('i').removeClass();
                $('#save-password').removeClass('active').addClass('disabled');
            }

        }, 500);

    })

    /*.on( 'mousedown', '#invite', function(){

    })*/

    .on( 'click', '.preferences-button.invite', function(){

        $( '.preferences-invite-weekey input' ).val( 'W3GT95VT' );

    })

    .on( 'social-twitterAccountAdded', function( e, socialUsername ){
        $( '.preferences-social-element-name.twitter', win ).addClass('exists').text( socialUsername );
    })

    .on( 'social-facebookAccountAdded', function( e, socialUsername ){
        $( '.preferences-social-element-name.facebook', win ).addClass('exists').text( socialUsername );
    })
    
    .key( 'enter', function(e){
        if( $(e.target).is( '.preferences-account-middle input' ) ){
            $('#save-data').mousedown();
        }else if( $(e.target).is( '.preferences-password-middle input' ) ){
            $('#save-password').mousedown();
        }
    });

    // Start App
    win
        .width( $( document.body ).width() )
        .height( $('#wz-desktop').height() )
        .transition( { opacity : 1 }, 250 );

    $( '.preferences-top', win ).css( 'margin-top', ( $('#wz-desktop').height() / 2 ) - 193 );

    wz.config( function( error, config ){

        cakeTotal.text( wz.tool.bytesToUnit( config.quotaMax ) );
        cakeFree.text( wz.tool.bytesToUnit( config.quotaFree, 2 ) + ' ' + lang.freeSpace );

        startCircleAnimation( config.quotaPercentage );

    });

    data();
	socialNetworks();

    $( '#hdd' ).text( lang.hdd );
    $( '#account' ).text( lang.account );
    $( '#social' ).text( lang.socialNetworks );
    $( '#language' ).text( lang.language );
    $( '#date-time' ).text( lang.date );
    $( '#wallpaper' ).text( lang.wallpaper );
    $( '#invite' ).text( lang.invite );
    $( '#about' ).text( lang.about );
    $( '.more-features', win ).text( lang.moreFeatures );
    $( '.starter', win ).text( lang.starter );
    $( '.price-starter', win ).text( lang.priceStarter );
    $( '.pro', win ).text( lang.pro );
    $( '.price-pro', win ).text( lang.pricePro );
    $( '.advance', win ).text( lang.advance );
    $( '.price-advance', win ).text( lang.priceAdvance );
    $( '.ultimate', win ).text( lang.ultimate );
    $( '.price-ultimate', win ).text( lang.priceUltimate );
    $( '.avatar-edit', win ).text( lang.avatarEdit );
    $( '.username-name', '#username' ).text( lang.usernameName );
    $( '.username-mail', '#email' ).text( lang.usernameMail );
    $( 'span', '#change-password' ).text( lang.changePassword );
    $( 'span', '#save-data' ).text( lang.saveData );
    $( '.password-title', win ).text( lang.passwordTitle );
    $( '.password-description', win ).text( lang.passwordDescription );
    $( 'i', '#old-password' ).text( lang.forgotPassword );
    $( 'span', "#old-password" ).text( lang.oldPassword );
    $( 'span', "#new-password" ).text( lang.newPassword );
    $( 'span', "#renew-password" ).text( lang.renewPassword );
    $( 'span', "#cancel-password" ).text( lang.cancelPassword );
    $( 'span', "#save-password" ).text( lang.savePassword );
    $( '.preferences-social-top', win ).text( lang.socialDescription );
    $( '.twitter-name', win ).text( lang.twitterName );
    $( '.facebook-name', win ).text( lang.facebookName );
    $( '.preferences-social-bottom', win ).text( lang.socialBottom );
    $( '.preferences-invite-title', win ).text( lang.inviteTitle );
    $( '.preferences-invite-explanation', win ).text( lang.inviteExplanation );
    $( '.preferences-invite-button', win ).text( lang.inviteButton );

    // En el futuro eliminar estas lineas:
    $( '.preferences-bottom-content.language span' ).text( lang.changeLanguage );
    $( '.preferences-bottom-content.date-time span' ).text( lang.changeDate );
    $( '.preferences-bottom-content.wallpaper span' ).text( lang.changeWallpaper );
    $( '.preferences-bottom-content.about span' ).text( lang.aboutError );


});
