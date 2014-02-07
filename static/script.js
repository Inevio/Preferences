    
    var win = $( this );

    // Clock variable
    var date          = new Date(0);
    var clockInterval = null;
    var clockHour     = $( '.preferences-clock-hour', win );
    var clockMinute   = $( '.preferences-clock-minute', win );
    var clockSecond   = $( '.preferences-clock-second', win );
    var configNow     = $( '.preferences-config-now', win );
    var configHour    = $( '.preferences-config-hour span', win );
    var timeZone      = 0;

    // Account data
    var username             = null;
    var mail                 = null;
    var mailExpresion        = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    var usernameExpresion    = /^[a-zA-Z0-9._]+$/;
    var userInterval         = 0;
    var oldPwdInterval       = 0;
    var newPwdInterval       = 0;
    var renewPwdInterval     = 0;
    var accountUsername      = $( '.account-username', win );
    var accountUsernameInput = $( 'input', accountUsername );
    var accountMail          = $( '.account-mail', win );
    var accountMailInput     = $( 'input', accountMail );
    var currentPassword      = $( '.password-current', win );
    var currentPasswordInput = $( 'input', currentPassword );
    var newPassword          = $( '.password-new', win );
    var newPasswordInput     = $( 'input', newPassword );
    var confirmPassword      = $( '.password-confirm', win );
    var confirmPasswordInput = $( 'input', confirmPassword );

    // HDD variables
    var cakeTitle            = $( '.preferences-hdd-usage', win );
    var cakeTotal            = $( '.preferences-hdd-cake-total', win );
    var cakeFree             = $( '.preferences-hdd-cake-free', win );
    var card                 = $( '.preferences-hdd-card', win );
    var cardTitle            = $( '.preferences-card-title', win );
    var cardPrice            = $( '.preferences-card-price', win );
    var cardDescriptionOne   = $( '.preferences-card-description-one', win );
    var cardDescriptionTwo   = $( '.preferences-card-description-two', win );
    var cardDescriptionThree = $( '.preferences-card-description-three', win );
    var cardDescriptionFour  = $( '.preferences-card-description-four', win );

    // Social Accounts
    var accountPrototype = $( '.preferences-social-account.wz-prototype', win );

    // Quota circle variables
    var cakeCanvas   = null;
    var cakeInterval = 0;
    var cakeGrads    = 0;
    var cakeEnd      = 0;

    // Avatar uploading variables
    var avatarCanvas    = null;
    var avatarInterval  = 0;
    var avatarGrads     = 0;
    var avatarEnd       = 0;
    var avatarUploading = false;
    var avatarUrl       = '';

    var degrees = 0;

    // Quota circle functions
    var startCircleAnimation = function( end ){

        cakeEnd = ( end * 360 ) + 5;

        // Define cakeCanvas Object
        cakeCanvas = $( '.preferences-hdd-canvas', win ).transition( { opacity : 1 }, 500 );
        cakeCanvas = cakeCanvas[ 0 ].getContext('2d');

        // cakeCanvas Style
        cakeCanvas.lineWidth   = 22;
        cakeCanvas.lineCap     = 'round';
        cakeCanvas.strokeStyle = "#7EBE30";

        // Start cakeCanvas
        cakeCanvas.beginPath();
        cakeCanvas.moveTo(110,12);
        cakeCanvas.lineTo(111,12);
        cakeCanvas.stroke();

        if( cakeGrads === 0 ){
            setTimeout( function(){
                cakeInterval = setInterval( nextCircleAnimation, 10 );
            }, 1000 );
        }else if( cakeGrads < cakeEnd ){
            clearInterval( cakeInterval );
            setTimeout( function(){
                cakeInterval = setInterval( nextCircleAnimation, 10 );
            }, 100 );
        }else{
            clearInterval( cakeInterval );
            setTimeout( function(){
                cakeInterval = setInterval( prevCircleAnimation, 10 );
            }, 100 );
        }

    };

    var radians =  function( grads ){
        return ( ( Math.PI / 180 ) * grads ) - ( Math.PI / 2 );
    };

    // Makes cake circle bigger
    var nextCircleAnimation = function(){

        if( cakeGrads ){
            cakeCanvas.clearRect( 0, 0, 220, 221 );
        }

        cakeCanvas.beginPath();
        cakeCanvas.arc( 110, 110, 98, ( -Math.PI / 2 ), radians( cakeGrads ), false );

        if( ( cakeGrads / cakeEnd ) < 0.5 ){
            cakeGrads += 6;
        }else{
            cakeGrads += ( 10 - ( ( cakeGrads / cakeEnd ) * 10 ) );
        }

        cakeCanvas.stroke();

        if( cakeGrads >= cakeEnd ){
            clearInterval( cakeInterval );
        }

    };

    // Makes cake circle shorter
    var prevCircleAnimation = function(){

        if( cakeGrads ){
            cakeCanvas.clearRect( 0, 0, 220, 221 );
        }

        cakeCanvas.beginPath();
        cakeCanvas.arc( 110, 110, 98, ( -Math.PI / 2 ), radians( cakeGrads ), false );

        if( ( cakeEnd / cakeGrads ) < 0.5 ){
            cakeGrads -= 6;
        }else{
            cakeGrads -= ( 10 - ( ( cakeEnd / cakeGrads ) * 10 ) );
        }

        cakeCanvas.stroke();

        if( cakeGrads < cakeEnd ){
            clearInterval( cakeInterval );
        }

    };

    var changeCake = function( space ){

        wz.system.updateQuota( function(){

            if( space ){
                startCircleAnimation( configObject.quota / space );
                cakeFree.text( wz.tool.bytesToUnit( space - configObject.quota, 2 ) + ' ' + lang.freeSpace );
            }else{
                startCircleAnimation( configObject.quotaPercentage );
                cakeFree.text( wz.tool.bytesToUnit( configObject.quotaFree, 2 ) + ' ' + lang.freeSpace );
            }

        });

    };

    var uploadingAvatar = function( percent ){

        avatarEnd = ( percent * 360 ) + 5;

        // Define avatarCanvas Object
        avatarCanvas = $( '.preferences-account-avatar', win ).css( 'opacity', 1 );
        avatarCanvas = avatarCanvas[ 0 ].getContext('2d');

        // avatarCanvas Style
        avatarCanvas.lineWidth   = 2;
        avatarCanvas.strokeStyle = "#7EBE30";

        clearInterval( avatarInterval );
        setTimeout( function(){
            avatarInterval = setInterval( avatarAnimation, 10 );
        }, 100 );

    };

    // Makes avatar circle bigger
    var avatarAnimation = function(){

        avatarCanvas.clearRect( 0, 0, 148, 148 );

        avatarCanvas.beginPath();
        avatarCanvas.arc( 74, 74, 73, -Math.PI / 140, ( Math.PI / 180 ) * avatarGrads, false );

        avatarGrads += ( 10 - ( ( avatarGrads / avatarEnd ) * 10 ) );

        avatarCanvas.stroke();

        if( avatarGrads >= avatarEnd ){
            clearInterval( avatarInterval );
        }

    };

    var cardInfo = function( type ){

        if( type === 'starter' ){

            card.addClass( 'starter' );

            cakeTitle.text( lang.starterUsage );
            cakeTotal.text( '5 GB' );

            cardTitle.text( lang.starter );
            cardPrice.text( lang.FREE + ' ' + lang.forever );
            cardDescriptionOne.css( 'display', 'none' );
            cardDescriptionTwo.html( '<b>' + '5 GB' + '</b>' + ' ' + lang.storage );
            cardDescriptionThree.css( 'display', 'none' );
            cardDescriptionFour.html( '<b>' + lang.support + '</b>' + ' ' + lang.supportForum );

            changeCake( 5 * 1024 * 1024 * 1024 );

        }else if( type === 'pro' ){

            card.addClass( 'pro' );

            cakeTitle.text( lang.proUsage );
            cakeTotal.text( '25 GB' );

            cardTitle.text( lang.pro );
            cardPrice.text( lang.proPrice + ' ' + lang.monthly );
            cardDescriptionOne.css( 'display', 'none' );
            cardDescriptionTwo.html( '<b>' + '25 GB' + '</b>' + ' ' + lang.storage );
            cardDescriptionThree.css( 'display', 'block' ).html( '<b>' + lang.safeFolders + '</b>' + ' ' + lang.withPassword );
            cardDescriptionFour.html( '<b>' + lang.support + '</b>' + ' ' + lang.supportMail3 );

            changeCake( 25 * 1024 * 1024 * 1024 );

        }else if( type === 'advance' ){

            card.addClass( 'advance' );

            cakeTitle.text( lang.advanceUsage );
            cakeTotal.text( '50 GB' );

            cardTitle.text( lang.advance );
            cardPrice.text( lang.proPrice + ' ' + lang.monthly );
            cardDescriptionOne.css( 'display', 'none' );
            cardDescriptionTwo.html( '<b>' + '50 GB' + '</b>' + ' ' + lang.storage );
            cardDescriptionThree.css( 'display', 'block' ).html( '<b>' + lang.safeFolders + '</b>' + ' ' + lang.withPassword );
            cardDescriptionFour.html( '<b>' + lang.support + '</b>' + ' ' + lang.supportMail2 );

            changeCake( 50 * 1024 * 1024 * 1024 );

        }else if( type === 'ultimate' ){

            card.addClass( 'ultimate' );

            cakeTitle.text( lang.ultimateUsage );
            cakeTotal.text( '100 GB' );

            cardTitle.text( lang.ultimate );
            cardPrice.text( lang.ultimatePrice + ' ' + lang.monthly );
            cardDescriptionOne.css( 'display', 'block' ).html( '<b>' + '100 GB' + '</b>' + ' ' + lang.storage );
            cardDescriptionTwo.html( '<b>' + lang.safeFolders + '</b>' + ' ' + lang.withPassword );
            cardDescriptionThree.css( 'display', 'block' ).html( '<b>' + lang.support + '</b>' + ' ' + lang.supportMail1 );
            cardDescriptionFour.html( '<b>' + lang.support + '</b>' + ' ' + lang.supportTelephone );

            changeCake( 100 * 1024 * 1024 * 1024 );

        }

    };

    var cardArrows = function(){

        if( card.hasClass( 'starter' ) ){

            $( '.preferences-card-prev', win ).css( 'display', 'none' );
            $( '.preferences-card-next', win ).css( 'display', 'block' );

        }else if( card.hasClass( 'ultimate' ) ){

            $( '.preferences-card-prev', win ).css( 'display', 'block' );
            $( '.preferences-card-next', win ).css( 'display', 'none' );

        }else{

            $( '.preferences-card-prev', win ).css( 'display', 'block' );
            $( '.preferences-card-next', win ).css( 'display', 'block' );

        }

    };
    
    var clock = function(){
         
        date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        
        if( hour < 10 ){ hour = '0' + hour; }
        if( minutes < 10 ){ minutes = '0' + minutes; }
        if( seconds < 10 ){ seconds = '0' + seconds; }

        if( minutes === '00' & seconds === '00' ){
            configNow.text( coolHour( parseInt( configNow.text(), 10 ) + 1 ) );
            clockHour.css( 'transform', 'rotate(' + hourDegree( hour, minutes ) + 'deg)' );
        }

        if( seconds === '00' ){
            clockMinute.css( 'transform', 'rotate(' + minutes / 60 * 360 + 'deg)' );
        }

        clockSecond.css( 'transform', 'rotate(' + seconds / 60 * 360 + 'deg)' );
        configHour.text( ': ' + minutes + ' : ' + seconds );
        
    };

    var coolHour = function( hour ){

        if( hour === 24 ){
            return '00';
        }else if( hour === -1 ){
            return '23';
        }else if( hour < 10 ){
            return '0' + hour;
        }else{
            return hour;
        }

    };

    var hourDegree = function( hour, minutes ){

        if( minutes < 15 ){
            return ( hour * 4 ) / 48 * 360;
        }else if( minutes < 30 ){
            return ( hour * 4 + 1 ) / 48 * 360;
        }else if( minutes < 45 ){
            return ( hour * 4 + 2 ) / 48 * 360;
        }else{
            return ( hour * 4 + 3 ) / 48 * 360;
        }

    };

    var invitationInfo = function(){

        wz.weekey.getList( function( error, list, left ){

            $( '.preferences-invite-left', win ).text( lang.invitesLeft + ': ' + left );

            if( list.length ){

                $( '.preferences-invite-invited', win ).addClass( 'display' );
                $( '.preferences-invite-friends', win ).children().not( '.wz-prototype' ).remove();

                for( var i = 0; i < list.length; i++ ){

                    var invitedFriend = $( '.preferences-invite-friends .wz-prototype', win ).clone().removeClass( 'wz-prototype' );

                    if( list[ i ].user ){
                        invitedFriend.find( 'img' ).attr( 'src', list[ i ].user.avatar.tiny );
                        invitedFriend.find( 'span' ).text( list[ i ].user.fullName );
                    }else{
                        invitedFriend.find( 'img' ).attr( 'src', 'https://static.weezeel.com/app/3/weekey.png' );
                        invitedFriend.find( 'span' ).text( list[ i ].id );
                    }

                    invitedFriend.appendTo( $( '.preferences-invite-friends', win ) );

                }

            }

        });

    };

    var socialNetworks = function(){

        $( '.preferences-social-card', win ).children().not( '.preferences-social-title' ).remove();

        wz.social.getAccounts( function( error, list ){

            for( var i = 0; i < list.accounts.length; i++ ){

                accountPrototype
                    .clone()
                    .removeClass( 'wz-prototype' )
                    .data( 'id', list.accounts[i].id )
                    .data( 'social-network', list.accounts[i].network )
                    .data( 'name', list.accounts[i].name)
                    .appendTo( $( '.preferences-social-card.' + list.accounts[i].network, win ) )
                    .find( '.preferences-social-name' )
                    .text( list.accounts[i].name );

            }

        });

    };

    // WZ Events
    wz.upload

    // Capturing the avatar uploading progress
    .on( 'avatarProgress', function( percent ){

        if( !avatarUploading ){

            $( '.preferences-account-avatar', win )[ 0 ].getContext('2d').clearRect( 0, 0, 148, 148 );
            $( '.preferences-account-avatar', win ).css( 'opacity', 1 );
            avatarGrads = 0;

            avatarUploading = true;
            $( '.avatar-edit', win ).text( '' ).transition({ width : '1px', 'margin-right' : '84px' }, 500, function(){ $( this ).css( 'opacity', 0 ); } );

        }

        uploadingAvatar( percent );

    })

    // Capturing the avatar uploading end
    .on( 'avatarEnd', function(){

        $( '.preferences-account-image', win ).transition({ opacity: 0.3 }, 100, function(){

            $( this ).css( 'background-image', 'url(' + avatarUrl + '?' + Math.random() + ')' ).transition({ opacity : 1 }, 100, function(){

                $( '.preferences-account-avatar', win ).transition({ opacity : 0 }, function(){

                    $( '.preferences-account-image', win ).transition({ 'box-shadow' : 'inset 0 0 24px 4px #7EBE30' }, function(){
                        $( this ).transition({ 'box-shadow' : 'none' });
                    });

                    $( '.avatar-edit', win ).css( 'opacity', 1 ).transition({ width : '85px', 'margin-right' : 0 }, 500, function(){
                        $( this ).text( lang.avatarEdit );
                        avatarUploading = false;
                    });

                });

            });

        });

    })

    // Capturing the walppaper uploading progress
    .on( 'wallpaperProgress', function( percent ){
        $( '.preferences-upload-uploading', win ).css({ height: 35 * percent + 'px', top: 35 * ( 1 - percent ) + 10 + 'px' });
    })

    // Capturing the wallpaper uploading end
    .on( 'wallpaperEnd', function( wallpaper ){

        $( '.preferences-upload-uploading', win ).css({ height: 0, top: '45px' });

        $( '.preferences-wallpaper-image.active', win ).removeClass( 'active' );
        $( '.preferences-wallpaper-image.custom', win ).css( 'background-image', 'url(' + wallpaper[ '1280' ] + ')' ).removeClass( 'wz-prototype' ).addClass( 'active' );

    });

    // DOM Events
    win

    // This function changes the content when a tab is clicked
    .on( 'mouseup', 'li', function(){

        clearInterval( clockInterval );

        if( !$( win ).hasClass( 'wz-win-dragging' ) ){

            var oldActive = $( 'li.active', win );
            var newActive = $( this );

            if( !oldActive.is( newActive ) ){

                $( 'input', win ).val('');

                oldActive.removeClass('active');
                newActive.addClass('active');

                $( '.preferences-bottom-content.' + oldActive.data( 'type' ), win )
                    .css( 'display', 'none' )
                    .transition( { opacity : 0 }, 250 );

                $( '.preferences-bottom-content.' + newActive.data( 'type' ), win )
                    .css( 'display', 'block' )
                    .transition( { opacity : 1 }, 250);

                if( $( '.preferences-bottom-content.password', win ).css('display') === 'block' ){

                    $( '.preferences-bottom-content.password', win )
                        .css( 'display', 'none' )
                        .transition( { opacity : 0 }, 250 );

                }

            }

        }

    })

    // Shows hour when config tab clicked
    .on( 'mouseup', 'li.config', function(){

        date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        
        if( hour < 10 ){ hour = '0' + hour; }
        if( minutes < 10 ){ minutes = '0' + minutes; }
        if( seconds < 10 ){ seconds = '0' + seconds; }

        clockHour.css( 'transform', 'rotate(' + hourDegree( hour, minutes ) + 'deg)' );
        configNow.text( hour );
        clockMinute.css( 'transform', 'rotate(' + minutes / 60 * 360 + 'deg)' );
        clockSecond.css( 'transform', 'rotate(' + seconds / 60 * 360 + 'deg)' );
        configHour.text( ': ' + minutes + ' : ' + seconds );

        clockInterval = setInterval( function(){
            clock();
        }, 1000);

    })

    // Shows info when Invite tab clicked
    .on( 'mouseup', 'li.invite', function(){
        invitationInfo();
    })

    // Shows info when Account tab clicked
    .on( 'mouseup', 'li.account', function(){

        $( '.account-username input', win ).val( username );
        $( '.account-mail input', win ).val( mail );

    })

    .on( 'keyup', '.account-username input, .account-mail input', function(){

        var usernameOk = false;
        var mailOk = false;

        clearInterval( userInterval );

        if( $( this ).is( accountUsernameInput ) && accountUsernameInput.val() !== username ){
            accountUsername.removeClass( 'error' ).addClass( ' correct pending' );
        }

        if( $( this ).is( accountMailInput ) && accountMailInput.val() !== mail ){
            accountMail.removeClass( 'error' ).addClass( 'correct pending' );
        }

        userInterval = setTimeout( function(){

            if( accountUsernameInput.val().length > 2 && usernameExpresion.test( accountUsernameInput.val() ) ){
                accountUsername.removeClass( 'pending error correct' );
            }else if( !accountUsernameInput.val().length ){
                accountUsername.removeClass( 'pending error correct' ).find( 'input' ).val( username );
            }else{
                accountUsername.removeClass( 'pending' ).addClass( 'correct error' );
            }

            if( accountMailInput.val().length && mailExpresion.test( accountMailInput.val() ) ){
                accountMail.removeClass( 'pending error correct' );
            }else if( !accountMailInput.val().length ){
                accountMail.removeClass( 'pending error correct' ).find( 'input' ).val( mail );
            }else{
                accountMail.removeClass( 'pending' ).addClass( 'correct error' );
            }

            if( accountUsernameInput.val().length > 2 && usernameExpresion.test( accountUsernameInput.val() ) && accountUsernameInput.val() !== username ){
                accountUsername.removeClass( 'pending error' ).addClass( 'correct' );
                usernameOk = true;
            }else{
                usernameOk = false;
            }

            if( accountMailInput.val().length && mailExpresion.test( accountMailInput.val() ) && accountMailInput.val() !== mail ){
                accountMail.removeClass( 'pending error' ).addClass( 'correct' );
                mailOk = true;
            }else{
                mailOk = false;
            }

            if( usernameOk || mailOk ){
                $( '.save-info', win ).removeClass( 'unactive' ).addClass( 'active' );
            }else{
                $( '.save-info', win ).removeClass( 'active' ).addClass( 'unactive' );
            }

        }, 500 );

    })

    .on( 'click', '.save-info', function(){

        if( accountUsernameInput.val().length > 2 && usernameExpresion.test( accountUsernameInput.val() ) && accountUsernameInput.val() !== username ){

            wz.config.setUsername( accountUsernameInput.val(), function( error ){

                if( error ){

                    alert( error, null, win.data( 'win' ) );
                    accountUsernameInput.val( username );

                }else{

                    username = accountUsernameInput.val();

                    wz.banner()
                        .title( lang.usernameChanged )
                        .text( lang.usernameChanged2 + ' ' + username )
                        .render();

                }

                accountUsername.removeClass( 'correct' );

            });

        }

        if( accountMailInput.val().length && mailExpresion.test( accountMailInput.val() ) && accountMailInput.val() !== mail ){

            wz.config.setMail( accountMailInput.val(), function( error ){

                if( error ){

                    alert( error, null, win.data( 'win' ) );
                    accountMailInput.val( mail );

                }else{

                    mail = accountMailInput.val();

                    wz.banner()
                        .title( lang.mailChanged )
                        .text( lang.mailChanged2 + ' ' + mail )
                        .render();

                }

                accountMail.removeClass( 'correct' );

            });

        }

    })

    .on( 'keyup', '.password-current input', function(){

        clearInterval( oldPwdInterval );

        currentPassword.removeClass( 'error' ).addClass( 'correct pending' );

        oldPwdInterval = setTimeout( function(){

            if( currentPasswordInput.val().length > 5 ){
                currentPassword.removeClass( 'pending error' ).addClass( 'correct' );
            }else if( currentPasswordInput.val().length === 0 ){
                currentPassword.removeClass( 'pending error correct' );
            }else{
                currentPassword.removeClass( 'pending' ).addClass( 'correct error' );
            }

        }, 500 );

    })

    .on( 'keyup', '.password-new input', function(){

        clearInterval( newPwdInterval );

        newPassword.removeClass( 'error' ).addClass( 'correct pending' );

        newPwdInterval = setTimeout( function(){

            if( newPasswordInput.val().length > 5 ){
                newPassword.removeClass( 'pending error' ).addClass( 'correct' );
            }else if( newPasswordInput.val().length === 0 ){
                newPassword.removeClass( 'pending error correct' );
            }else{
                newPassword.removeClass( 'pending' ).addClass( 'correct error' );
            }

        }, 500 );

    })

    .on( 'keyup', '.password-confirm input', function(){

        clearInterval( renewPwdInterval );

        confirmPassword.removeClass( 'error' ).addClass( 'correct pending' );

        renewPwdInterval = setTimeout( function(){

            if( confirmPasswordInput.val().length === 0 ){
                confirmPassword.removeClass( 'pending error correct' );
            }

        }, 500 );

    })

    .on( 'keyup', '.password-current input, .password-new input, .password-confirm input', function(){

        if( currentPasswordInput.val().length > 5 && newPasswordInput.val().length > 5 && newPasswordInput.val() === confirmPasswordInput.val() ){
            $( '.save-password', win ).removeClass( 'unactive' ).addClass( 'active' );
        }else{
            $( '.save-password', win ).removeClass( 'active' ).addClass( 'unactive' );
        }

        if( confirmPasswordInput.val().length > 5 && newPasswordInput.val() === confirmPasswordInput.val() ){
            confirmPassword.removeClass( 'pending error' ).addClass( 'correct' );
        }else if( !confirmPassword.hasClass( 'pending' ) && confirmPasswordInput.val().length ){
            confirmPassword.removeClass( 'pending' ).addClass( 'correct error' );
        }

    })

    // Shows password content and hides account content when clicked ( Account Tab )
    .on( 'click', '.change-password', function(){

        $( 'input', win ).val( '' );
        $( '.preferences-bottom-input', win ).removeClass( 'correct error pending' );

        $( '.preferences-bottom-content.account', win )
            .css( 'display', 'none' )
            .transition( { opacity : 0 }, 250 );

        $( '.preferences-bottom-content.password', win )
            .css( 'display', 'block' )
            .transition( { opacity : 1 }, 250 );

    })

    // Changes user's password
    .on( 'click', '.save-password', function(){

        if( currentPasswordInput.val().length > 5 && newPasswordInput.val().length > 5 && newPasswordInput.val() === confirmPasswordInput.val() ){

            wz.config.setPassword( currentPasswordInput.val(), newPasswordInput.val(), function( error ){

                if( error ){

                    alert( error, null, win.data( 'win' ) );

                }else{

                    wz.banner()
                        .title( lang.passwordChanged )
                        .text( lang.passwordChanged2 )
                        .render();

                }

                currentPassword.removeClass( 'correct' );
                currentPasswordInput.val( '' );
                newPassword.removeClass( 'correct' );
                newPasswordInput.val( '' );
                confirmPassword.removeClass( 'correct' );
                confirmPasswordInput.val( '' );

            });

        }

    })

    // Shows account content and hides password content when clicked ( Account Tab )
    .on( 'click', '.cancel-password', function(){

        $( 'input', win ).val( '' );

        $( '.preferences-bottom-content.password', win )
            .css( 'display', 'none' )
            .transition( { opacity : 0 }, 250 );

        $( '.preferences-bottom-content.account', win )
            .css( 'display', 'block' )
            .transition( { opacity : 1 }, 250 );

        $( '.account-username input', win ).val( username );
        $( '.account-mail input', win ).val( mail );

    })

    // Shows or hides a tick on a checkbox when clicked
    .on( 'click', '.preferences-bottom-checkbox', function(){

        if( $( this ).hasClass( 'checked' ) ){

            $( this ).removeClass( 'checked' );

        }else{

            if( !$( this ).parent( '.preferences-bottom-selectable' ).hasClass( 'multiple' ) ){
                $( this ).siblings( '.preferences-bottom-checkbox.checked' ).removeClass( 'checked' );
            }

            $( this ).addClass( 'checked' );

        }

    })

    // Shows white border when wallpaper is clicked ( Customize Tab )
    .on( 'click', '.preferences-wallpaper-image', function(){

        if( !$( this ).hasClass( 'active' ) ){

            $( '.preferences-wallpaper-image.active', win ).removeClass( 'active' );
            $( this ).addClass( 'active' );
            $( '.preferences-wallpaper-image.custom', win ).addClass( 'wz-prototype' );

            var id = $( this ).attr( 'data-id' );

            wz.config.setWallpaper( id );

        }

    })

    // Shows or hides invited friends when clicked ( Invite Tab )
    .on( 'click', '.preferences-invite-invited', function( e ){

        if( $( '.preferences-bottom-content.invite', win ).hasClass( 'invited-friends' ) ){
            $( '.preferences-bottom-content.invite', win ).removeClass( 'invited-friends' );
        }else{
            $( '.preferences-bottom-content.invite', win ).addClass( 'invited-friends' );
        }

        e.stopPropagation();
        
    })

    .on( 'click', '.preferences-invite-friends', function( e ){
        e.stopPropagation();
    })

    .on( 'click', function(){
        $( '.preferences-bottom-content.invite', win ).removeClass( 'invited-friends' );

    })

    // Shows plan card when clicked ( Disk Tab )
    .on( 'click', '.preferences-hdd-plans .preferences-button', function(){

        if( $( this ).hasClass( 'hdd-plans-starter' ) ){
            cardInfo( 'starter' );
        }else if( $( this ).hasClass( 'hdd-plans-pro' ) ){
            cardInfo( 'pro' );
        }else if( $( this ).hasClass( 'hdd-plans-advance' ) ){
            cardInfo( 'advance' );
        }else if( $( this ).hasClass( 'hdd-plans-ultimate' ) ){
            cardInfo( 'ultimate' );
        }

        card.css({ display : 'block', scale : 0 }).transition({
            opacity : 1,
            scale : 1
        }, 400, function(){
            cardArrows();
        });

    })

    // Shows prev card when clicked ( Disk Tab )
    .on( 'click', '.preferences-card-prev', function(){

        degrees -= 90;

        card
        .css( 'perspective', '500px' )
        .transition({

            rotateY: degrees + 'deg'

        }, 250, function(){

            degrees -= 180;

            card.css( 'rotateY', degrees + 'deg' );

            var cardType = '';

            if( card.hasClass( 'pro' ) ){
                cardType = 'starter';
            }else if( card.hasClass( 'advance' ) ){
                cardType = 'pro';
            }else if( card.hasClass( 'ultimate' ) ){
                cardType = 'advance';
            }

            card.removeClass().addClass( 'preferences-hdd-card' );

            cardInfo( cardType );
            cardArrows();

            degrees -= 90;

            card.transition({

                rotateY: degrees + 'deg'

            }, 250 );

        });

    })

    // Shows next card when clicked ( Disk Tab )
    .on( 'click', '.preferences-card-next', function(){

        degrees += 90;

        card
        .css( 'perspective', '500px' )
        .transition({

            rotateY: degrees + 'deg',

        }, 250, function(){

            degrees += 180;

            card.css( 'rotateY', degrees + 'deg' );

            var cardType = '';

            if( card.hasClass( 'starter' ) ){
                cardType = 'pro';
            }else if( card.hasClass( 'pro' ) ){
                cardType = 'advance';
            }else if( card.hasClass( 'advance' ) ){
                cardType = 'ultimate';
            }

            card.removeClass().addClass( 'preferences-hdd-card' );

            cardInfo( cardType );
            cardArrows();

            degrees += 90;

            card.transition({

                rotateY: degrees + 'deg',

            }, 250 );

        });

    })

    // Closes card plan ( Disk Tab )
    .on( 'click', '.preferences-card-close', function(){

        // To Do -> Cuando se cierra una card se modifican dos veces el texto de cakeFree

        $( '.preferences-hdd-plans', win ).css( 'display', 'block' );

        card.transition( {

            opacity : 0,
            scale   : 0

        }, 400, function(){
            $( this ).css( 'display', 'none' );
        });

        card.removeClass().addClass( 'preferences-hdd-card' );
        $( '.preferences-card-prev', win ).css( 'display', 'none' );
        $( '.preferences-card-next', win ).css( 'display', 'none' );

        wz.system.updateQuota( function( error, quota ){

            cakeTitle.text( lang.currentUsage );
            cakeTotal.text( wz.tool.bytesToUnit( configObject.quotaMax ) );
            cakeFree.text( wz.tool.bytesToUnit( configObject.quotaFree, 2 ) + ' ' + lang.freeSpace );
            
            changeCake( 0 );

        });

    })

    // Adds +1 hour to the clock
    .on( 'click', '.preferences-config-up', function(){

        clockHour.css( 'transform', 'rotate(' + hourDegree( parseInt( configNow.text(), 10 ) + 1, date.getMinutes() ) + 'deg)' );
        configNow.text( coolHour( parseInt( configNow.text(), 10 ) + 1 ) );
        $( '.preferences-config-auto', win ).removeClass( 'checked' );

        timeZone = parseInt( configNow.text(), 10 ) - date.getUTCHours();

        wz.config.setTimeZone( timeZone, function( error ){

            if( error ){

                alert( error, null, win.data( 'win' ) );

            }

        });

    })

    // Substracts -1 hour to the clock
    .on( 'click', '.preferences-config-down', function(){

        clockHour.css( 'transform', 'rotate(' + hourDegree( parseInt( configNow.text(), 10 ) - 1, date.getMinutes() ) + 'deg)' );
        configNow.text( coolHour( parseInt( configNow.text(), 10 ) - 1 ) );
        $( '.preferences-config-auto', win ).removeClass( 'checked' );

        timeZone = parseInt( configNow.text(), 10 ) - date.getUTCHours();

        wz.config.setTimeZone( timeZone, function( error ){

            if( error ){
                alert( error, null, win.data( 'win' ) );
            }

        });

    })

    .on( 'click', '.preferences-config-auto', function(){

        var hour = date.getHours();
        var minutes = date.getMinutes();
        
        if( hour < 10 ){ hour = '0' + hour; }
        if( minutes < 10 ){ minutes = '0' + minutes; }

        configNow.text( hour );
        clockHour.css( 'transform', 'rotate(' + hourDegree( hour, minutes ) + 'deg)' );

        timeZone = parseInt( configNow.text(), 10 ) - date.getUTCHours();

        wz.config.setTimeZone( timeZone, function( error ){

            if( error ){

                alert( error, null, win.data( 'win' ) );

            }

        });

    })

    .on( 'click', '.time-format .preferences-bottom-checkbox', function(){

        wz.config.setTimeFormat( $(this).children('span').hasClass('time-format-24'), function( error ){

            if( error ){
                alert( error );
            }
            
        });

    })

    .on( 'click', '.date-format .preferences-bottom-checkbox', function(){

        var button = $( this );

        wz.config.setDateFormat( button.attr( 'data-date-format-short' ), button.attr( 'data-date-format-long' ), function( error ){

            if( error ){
                alert( error );
            }
            
        });

    })

    .on( 'click', '.preferences-language-element', function(){

        $( this ).addClass( 'active' ).siblings().removeClass( 'active' );

        if( $( this ).hasClass( 'english-uk' ) ){
            wz.config.setLanguage( 'en-en' );
        }else if( $( this ).hasClass( 'english-us' ) ){
            wz.config.setLanguage( 'en-us' );
        }else if( $( this ).hasClass( 'spanish' ) ){
            wz.config.setLanguage( 'es-es' );
        }

    })

    // Launches browser window to add an account
    .on( 'click', '.preferences-social-icon.plus', function(){
        //alert( 'Demo accounts can\'t add social networks', null, win.data( 'win' ) );
        wz.social.addAccount( $( this ).attr( 'data-social-network' ) );
    })

    // Launches settings window of social networks ( Social Networks Tab )
    .on( 'click', '.preferences-social-icon.settings', function(){

        var socialNetwork = $( this ).parent( '.preferences-social-account' )

        wz.app.createView( { 

            type: socialNetwork.data( 'social-network' ), 
            id: socialNetwork.data( 'id' ),
            name: socialNetwork.data( 'name' )

        }, 'social' );

    })

    .on( 'click', '.preferences-button.invite', function(){

        wz.weekey.create( function( error, weekey ){

            if( error === 'DEMO CAN NOT CREATE A WEEKEY' ){
                alert( 'Demo accounts can\'t create weeKeys', null, win.data( 'win' ) );
            }else if( error === 'CAN NOT CREATE MORE WEEKEYS' ){
                alert( 'You can\'t create more weeKeys', null, win.data( 'win' ) );
            }else{

                $( '.preferences-bottom-input.invite span' ).text( weekey );
                invitationInfo();

            }
            
        });

    });

    // This function fills certain gaps with user's info
    wz.system.updateQuota( function( error, quota ){

        cakeTotal.text( wz.tool.bytesToUnit( wz.system.quota().total ) );
        cakeFree.text( wz.tool.bytesToUnit( wz.system.quota().free, 2 ) + ' ' + lang.freeSpace );

        startCircleAnimation( wz.system.quota().used / wz.system.quota().total );

    });

    avatarUrl = wz.system.user().avatar.normal;
    mail      = wz.system.user().mail;
    username  = wz.system.user().user;

    console.log( wz.system.user() );

    $( '.preferences-account-image', win ).css( 'background-image', 'url(' + avatarUrl + '?' + Math.random() + ')' );

    socialNetworks();

    wz.config.getLanguages( function( error, languages, used ){

        if( used.code === "es" || used.code === "es-es" ){
            $( '.preferences-language-element.spanish', win ).addClass( 'active' );
        }else if( used.code === "en" || used.code === "en-us" ){
            $( '.preferences-language-element.english-us', win ).addClass( 'active' );
        }else if( used.code === "en-uk" ){
            $( '.preferences-language-element.english-uk', win ).addClass( 'active' );
        }

    });

    wz.config.getWallpapers( function( error, wallpapers, used ){

        if( used.custom ){
            $( '.preferences-wallpaper-image.custom', win ).css( 'background-image', 'url(' + used.url[ '1280' ] + ')' ).removeClass( 'wz-prototype' ).addClass( 'active' );
        }else{
            $( '.wallpaper-' + used.id, win ).addClass( 'active' );
        }

    });

    $( 'li.hdd', win ).text( lang.hdd ).data( 'type', 'hdd' );
    $( 'li.account', win ).text( lang.account ).data( 'type', 'account' );
    $( 'li.social', win ).text( lang.social ).data( 'type', 'social' );
    $( 'li.config', win ).text( lang.config ).data( 'type', 'config' );
    $( 'li.custom', win ).text( lang.custom ).data( 'type', 'custom' );
    $( 'li.invite', win ).text( lang.invite ).data( 'type', 'invite' );
    $( 'li.about', win ).text( lang.about ).data( 'type', 'about' );

    $( '.preferences-bottom-title.hdd', win ).text( lang.hddTitle );
    $( '.preferences-bottom-description.hdd', win ).text( lang.hddDescription );
    $( '.preferences-hdd-usage', win ).text( lang.currentUsage );
    $( '.preferences-plans-title', win ).text( lang.moreFeatures );
    $( '.hdd-plan-space.starter', win ).text( lang.starter );
    $( '.hdd-plan-price.starter', win ).text( lang.free );
    $( '.hdd-plan-space.pro', win ).text( lang.pro );
    $( '.hdd-plan-price.pro', win ).text( lang.proPrice );
    $( '.hdd-plan-space.advance', win ).text( lang.advance );
    $( '.hdd-plan-price.advance', win ).text( lang.advancePrice );
    $( '.hdd-plan-space.ultimate', win ).text( lang.ultimate );
    $( '.hdd-plan-price.ultimate', win ).text( lang.ultimatePrice );
    $( '.preferences-card-subscribe-text', win ).text( lang.subscribe );

    $( '.preferences-bottom-title.account', win ).text( lang.accountTitle );
    $( '.preferences-bottom-description.account', win ).text( lang.accountDescription );
    $( '.avatar-edit', win ).text( lang.avatarEdit );
    $( '.change-password .preferences-account-button', win ).text( lang.setPassword );
    $( '.save-info .preferences-account-button', win ).text( lang.saveChanges );

    $( '.preferences-bottom-title.password', win ).text( lang.passwordTitle );
    $( '.preferences-bottom-description.password', win ).text( lang.passwordDescription );
    $( '.cancel-password .preferences-account-button', win ).text( lang.cancel );
    $( '.save-password .preferences-account-button', win ).text( lang.saveChanges );
    $( '.password-current input', win ).attr( 'placeholder', lang.currentPassword );
    $( '.password-new input', win ).attr( 'placeholder', lang.newPassword );
    $( '.password-confirm input', win ).attr( 'placeholder', lang.confirmPassword );

    $( '.preferences-bottom-title.social', win ).text( lang.socialTitle );
    $( '.preferences-bottom-description.social', win ).text( lang.socialDescription );
    $( '.preferences-social-name.facebook', win ).text( lang.facebookAccount );
    $( '.preferences-social-name.twitter', win ).text( lang.twitterAccount );

    $( '.preferences-bottom-title.date', win ).text( lang.dateTitle );
    $( '.preferences-bottom-description.date', win ).text( lang.dateDescription );
    $( '.preferences-config-auto span', win ).text( lang.autoTime );
    $( '.time-format-title', win ).text( lang.timeFormat + ':' );
    $( '.time-format-24', win ).text( '24' + ' ' + lang.hoursClock );
    $( '.time-format-12', win ).text( '12' + ' ' + lang.hoursClock );
    $( '.date-format-title', win ).text( lang.dateFormat + ':' );
    $( '.date-format-ddmmyy', win ).text( lang.ddmmyy );
    $( '.date-format-mmddyy', win ).text( lang.mmddyy );
    $( '.date-format-yymmdd', win ).text( lang.yymmdd );

    $( '.preferences-bottom-title.language', win ).text( lang.languageTitle );
    $( '.preferences-bottom-description.language', win ).text( lang.languageDescription );

    $( '.preferences-bottom-title.custom', win ).text( lang.customTitle );
    $( '.preferences-bottom-description.custom', win ).text( lang.customDescription );
    $( '.preferences-wallpaper-title', win ).text( lang.wallpaper );
    $( '.preferences-wallpaper-upload span', win ).text( lang.upload );

    $( '.preferences-bottom-title.invite', win ).text( lang.inviteTitle );
    $( '.preferences-bottom-description.invite', win ).text( lang.inviteDescription );
    $( '.preferences-account-button.invite', win ).text( lang.generate );
    $( '.preferences-invite-beware', win ).text( lang.inviteBeware );

    $( '.preferences-about-version', win ).text( lang.version + ':' + ' ' + wz.system.version() );
    $( '.preferences-about-link.legal', win ).text( lang.legalNotices );
    $( '.preferences-about-link.privacy', win ).text( lang.privacyPolicies );

    // SOCIAL NETWORKS CODE
    // To Do -> Quitar los triggers al service cuando haya implementada una escucha perpetua
    win

    .on( 'social-twitterAccountAdded', function( event, account ){
        
        for( var i = 0; i < 8; i++ ){
            wql.insertType( [ account.id, i ] );
        }

        socialNetworks();

    })

    .on( 'social-twitterAccountRemoved', function( event, accountId ){
        wql.removeAccount( accountId );
        socialNetworks();
    })

    .on( 'social-facebookAccountAdded', function( event, account ){
        
        for( var i = 0; i < 8; i++ ){
            wql.insertType( [ account.id, i ] );
        }

        socialNetworks();

    })

    .on( 'social-facebookAccountRemoved', function( event, accountId ){
        wql.removeAccount( accountId );
        socialNetworks();
    })

    .on( 'social-twitterTweet', function( event, account, tweet ){

        service.trigger( 'social-twitterTweet', [ account, tweet ] );           

    })

    .on( 'social-twitterMessage', function( event, account, message ){

        service.trigger( 'social-twitterMessage', [ account, message ] ); 

    })

    .on( 'social-twitterReply', function( event, account, reply ){

        service.trigger( 'social-twitterReply', [ account, reply ] );

    })

    .on( 'social-twitterMention', function( event, account, mention ){

        service.trigger( 'social-twitterMention', [ account, mention ] );

    })

    .on( 'social-twitterRetweet', function( event, account, retweet ){

        service.trigger( 'social-twitterRetweet', [ account, retweet ] );

    })

    .on( 'social-twitterFavorite', function( event, account, fav ){

        service.trigger( 'social-twitterFavorite', [ account, fav ] );

    })

    .on( 'social-twitterUnfavorite', function( event, account, unfav ){

        service.trigger( 'social-twitterUnfavorite', [ account, unfav ] );

    })

    .on( 'social-twitterFollow', function( event, account, follow ){

        service.trigger( 'social-twitterFollow', [ account, follow ] );

    })

    .on( 'social-facebookGroupPost', function( event, account, data ){

        service.trigger( 'social-facebookGroupPost', [ account, data ] );

    })

    .on( 'social-facebookEventCreated', function( event, account, data ){

        service.trigger( 'social-facebookEventCreated', [ account, data ] );

    })

    .on( 'social-facebookStatusUpdated', function( event, account, data ){

        service.trigger( 'social-facebookStatusUpdated', [ account, data ] );

    })

    .on( 'social-facebookPhotoPosted', function( event, account, data ){

        service.trigger( 'social-facebookPhotoPosted', [ account, data ] );

    })

    .on( 'social-facebookNoteCreated', function( event, account, data ){

        service.trigger( 'social-facebookNoteCreated', [ account, data ] );

    })

    .on( 'social-facebookLinkPosted', function( event, account, data ){

        service.trigger( 'social-facebookLinkPosted', [ account, data ] );

    })

    .on( 'social-facebookVideoPosted', function( event, account, data ){

        service.trigger( 'social-facebookVideoPosted', [ account, data ] );

    })

    .on( 'social-facebookMessage', function( event, account, data ){

        service.trigger( 'social-facebookMessage', [ account, data ] );

    })

    .on( 'social-facebookFriendRequest', function( event, account, data ){

        service.trigger( 'social-facebookFriendRequest', [ account, data ] );

    })

    .on( 'social-facebookNotificationEvent', function( event, account, data ){

        service.trigger( 'social-facebookNotificationEvent', [ account, data ] );

    })

    .on( 'social-facebookNotificationFriend', function( event, account, data ){

        service.trigger( 'social-facebookNotificationFriend', [ account, data ] );

    })

    .on( 'social-facebookNotificationGroup', function( event, account, data ){

        service.trigger( 'social-facebookNotificationGroup', [ account, data ] );

    })

    .on( 'social-facebookNotificationPhoto', function( event, account, data ){

        service.trigger( 'social-facebookNotificationPhoto', [ account, data ] );

    });
