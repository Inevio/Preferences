
    // Clock variable
    var date          = new Date(0);
    var clockInterval = null;
    var clockHour     = $( '.preferences-clock-hour', win );
    var clockMinute   = $( '.preferences-clock-minute', win );
    var clockSecond   = $( '.preferences-clock-second', win );
    var configNow     = $( '.preferences-config-now', win );
    var configHour    = $( '.preferences-config-hour span', win );

    // Account data
    var username             = null;
    var mail                 = null;
    var mailExpresion        = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    var usernameExpresion    = /^[a-zA-Z0-9._]+$/;
    var idInterval           = 0;
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

        wz.config( function( error, config ){

            if( space ){
                startCircleAnimation( config.quota / space );
                cakeFree.text( wz.tool.bytesToUnit( space - config.quota, 2 ) + ' ' + 'Free' );
            }else{
                startCircleAnimation( config.quotaPercentage );
                cakeFree.text( wz.tool.bytesToUnit( config.quotaFree, 2 ) + ' ' + 'Free' );
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
            cakeTotal.text( '3 GB' );

            cardTitle.text( lang.starter );
            cardPrice.text( lang.FREE + ' ' + lang.forever );
            cardDescriptionOne.css( 'display', 'none' );
            cardDescriptionTwo.html( '<b>' + '3 GB' + '</b>' + ' ' + lang.storage );
            cardDescriptionThree.css( 'display', 'none' );
            cardDescriptionFour.html( '<b>' + lang.support + '</b>' + ' ' + lang.supportForum );

            changeCake( 3 * 1024 * 1024 * 1024 );

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
            cardDescriptionThree.css( 'display', 'block' ).html( '<b>' + lang.support + '</b>' + ' ' + lang.supportMail1 )
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
        }

        clockHour.css( 'transform', 'rotate(' + hourDegree( hour, minutes ) + 'deg)' );
        clockMinute.css( 'transform', 'rotate(' + minutes / 60 * 360 + 'deg)' );
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

    }

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

    win

        // This function changes the content when a tab is clicked
        .on( 'mouseup', 'li', function(){

            clearInterval( clockInterval );

            //if( !$( win ).parent( '.wz-win-container' ).hasClass( 'wz-drag-active' ) ){

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

            //}

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
            
            wz.weekey.getList( function( error, list ){

                console.log( list );

            });

        })

        // Shows info when Account tab clicked
        .on( 'mouseup', 'li.account', function(){

            $( '.account-username input', win ).val( username );
            $( '.account-mail input', win ).val( mail );

        })

        .on( 'keyup', '.account-username input, .account-mail input', function(){

            var usernameOk = false;
            var mailOk = false;

            clearInterval( idInterval );

            if( $( this ).is( accountUsernameInput ) && accountUsernameInput.val() !== username ){
                accountUsername.removeClass( 'error' ).addClass( ' correct pending' );
            }

            if( $( this ).is( accountMailInput ) && accountMailInput.val() !== mail ){
                accountMail.removeClass( 'error' ).addClass( 'correct pending' );
            }

            idInterval = setTimeout( function(){

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

                wz.config( function( error, config ){

                    config.changeUsername( accountUsernameInput.val(), function( error ){

                        if( error ){

                            alert( error, null, win.data( 'win' ) );
                            accountUsernameInput.val( username );
                            accountMailInput.val( mail );

                        }else{

                            username = accountUsernameInput.val();

                            wz.banner()
                                .title( lang.usernameChanged )
                                .text( lang.usernameChanged2 + ' ' + username )
                                .render();

                        }

                    });

                });

            }

            if( accountMailInput.val().length && mailExpresion.test( accountMailInput.val() ) && accountMailInput.val() !== mail ){

                wz.config( function( error, config ){

                    config.changeMail( accountMailInput.val(), function( error ){

                        if( error ){

                            alert( error, null, win.data( 'win' ) );
                            accountUsernameInput.val( username );
                            accountMailInput.val( mail );

                        }else{

                            mail = accountMailInput.val();

                            wz.banner()
                                .title( lang.mailChanged )
                                .text( lang.mailChanged2 + ' ' + mail )
                                .render();

                        }

                    });

                });

            }

        })

        .on( 'keyup', '.password-current input', function(){

            clearInterval( idInterval );

            currentPassword.removeClass( 'error' ).addClass( 'correct pending' );

            idInterval = setTimeout( function(){

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

            clearInterval( idInterval );

            newPassword.removeClass( 'error' ).addClass( 'correct pending' );

            idInterval = setTimeout( function(){

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

            clearInterval( idInterval );

            confirmPassword.removeClass( 'error' ).addClass( 'correct pending' );

            idInterval = setTimeout( function(){

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

            $( '.preferences-bottom-content.account', win )
                .css( 'display', 'none' )
                .transition( { opacity : 0 }, 250 );

            $( '.preferences-bottom-content.password', win )
                .css( 'display', 'block' )
                .transition( { opacity : 1 }, 250 );

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

                $( this ).addClass( 'active' ).siblings( '.preferences-wallpaper-image.active' ).removeClass( 'active' );

                var id = $( this ).attr( 'data-id' );

                wz.config( function( e, o ){

                    if( !e ){
                        o.changeWallpaper( id );
                    }

                });

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
            })

        })

        // Shows prev card when clicked ( Disk Tab )
        .on( 'click', '.preferences-card-prev', function(){

            card.transition({

                perspective: '400px',
                rotateY: '-90deg'

            }, function(){

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

                card.transition({

                    rotateY: '0deg'

                });

            });

        })

        // Shows next card when clicked ( Disk Tab )
        .on( 'click', '.preferences-card-next', function(){

            card.transition({

                perspective: '400px',
                rotateY: '90deg',

            }, function(){

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

                card.transition({

                    rotateY: '0deg'

                });

            });

        })

        // Closes card plan ( Disk Tab )
        .on( 'click', '.preferences-card-close', function(){

            $( '.preferences-hdd-plans', win ).css( 'display', 'block' );

            card.transition({
                opacity : 0,
                scale : 0
            }, 400, function(){
                $( this ).css( 'display', 'none' );
            })

            card.removeClass().addClass( 'preferences-hdd-card' );
            $( '.preferences-card-prev', win ).css( 'display', 'none' );
            $( '.preferences-card-next', win ).css( 'display', 'none' );

            wz.config( function( error, config ){

                cakeTitle.text( lang.currentUsage );
                cakeTotal.text( wz.tool.bytesToUnit( config.quotaMax ) );
                cakeFree.text( wz.tool.bytesToUnit( config.quotaFree, 2 ) + ' ' + 'Free' );

            });

            changeCake( 0 );

        })

        // Adds +1 hour to the clock
        .on( 'click', '.preferences-config-up', function(){
            $( '.preferences-clock-hour', win ).css( 'transform', 'rotate(' + hourDegree( date.getHours() + 1, date.getMinutes() ) + 'deg)' );
            $( '.preferences-config-now', win ).text( coolHour( parseInt( $( '.preferences-config-now', win ).text(), 10 ) + 1 ) );
        })

        // Substracts -1 hour to the clock
        .on( 'click', '.preferences-config-down', function(){
            $( '.preferences-clock-hour', win ).css( 'transform', 'rotate(' + hourDegree( date.getHours() - 1, date.getMinutes() ) + 'deg)' );
            $( '.preferences-config-now', win ).text( coolHour( parseInt( $( '.preferences-config-now', win ).text(), 10 ) - 1 ) );
        })

        // Launches browser windoe to add an account
        .on( 'click', '.preferences-social-icon.plus', function(){
            wz.social.addAccount( $( this ).attr( 'data-social-network' ) );
        })

        // Launches settings window of social networks ( Social Networks Tab )
        .on( 'click', '.preferences-social-icon.settings', function(){
            wz.app.createWindow( 69, null/*$( this ).parent( '.preferences-social-account' ).data( 'id' )*/, 'social' );
        })

        // Capturing the avatar uploading progress
        .on( 'avatar-upload-progress', function( event, percent ){

            if( !avatarUploading ){

                $( '.preferences-account-avatar', win )[ 0 ].getContext('2d').clearRect( 0, 0, 148, 148 );
                $( '.preferences-account-avatar', win ).css( 'opacity', 1 )
                avatarGrads = 0;

                avatarUploading = true;
                $( '.avatar-edit', win ).text( '' ).transition({ width : '1px', 'margin-right' : '84px' }, 500, function(){ $( this ).css( 'opacity', 0 ); } );

            }

            uploadingAvatar( percent );

        })

        // Capturing the avatar uploading end
        .on( 'avatar-upload-end', function(){

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

        .on( 'click', '.date-format .preferences-bottom-checkbox', function(){

            var button = $( this );

            wz.config( function( e, config ){

                config.changeDateFormat( button.attr( 'data-date-format-short' ), button.attr( 'data-date-format-long' ), function( error ){

                    if( error ){
                        alert( error );
                    }
                    
                });

            });

        })

        // Capturing the walppaper uploading progress
        .on( 'wallpaper-upload-progress', function( event, percent ){
            $( '.preferences-upload-uploading', win ).css({ height: 35 * percent + 'px', top: 35 * ( 1 - percent ) + 10 + 'px' });
        })

        // Capturing the wallpaper uploading end
        .on( 'wallpaper-upload-end', function(){
            $( '.preferences-upload-uploading', win ).css({ height: 0, top: '45px' });
        });

    // This function fills certain gaps with user's info
    wz.config( function( error, config ){

        cakeTotal.text( wz.tool.bytesToUnit( config.quotaMax ) );
        cakeFree.text( wz.tool.bytesToUnit( config.quotaFree, 2 ) + ' ' + lang.freeSpace );

        avatarUrl = config.user.avatar.normal;
        $( '.preferences-account-image', win ).css( 'background-image', 'url(' + config.user.avatar.normal + '?' + Math.random() + ')' );

        startCircleAnimation( config.quotaPercentage );

        username = config.user.user;
        mail = config.user.mail;

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
    $( '.change-password .preferences-account-button', win ).text( lang.changePassword );
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
    $( '.preferences-invite-left', win ).text( lang.invitesLeft + ':' + ' ' + '2' );
    $( '.preferences-invite-beware', win ).text( lang.inviteBeware );

    $( '.preferences-about-version', win ).text( lang.version + ':' + ' ' + '2.3.17' );
    $( '.preferences-about-link.legal', win ).text( lang.legalNotices );
    $( '.preferences-about-link.privacy', win ).text( lang.privacyPolicies );
