
  Stripe.setPublishableKey('pk_test_silkqGKnXMcfkbFy2Tt3nEqU');

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
    var forgetPassword       = $( '.preferences-bottom-forgetPassword', win );
    var currentPasswordInput = $( 'input', currentPassword );
    var newPassword          = $( '.password-new', win );
    var newPasswordInput     = $( 'input', newPassword );
    var confirmPassword      = $( '.password-confirm', win );
    var confirmPasswordInput = $( 'input', confirmPassword );
    var forgetPasswordHtml   ="https://www.inevio.com/";

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

    // Config variables
    var spanishLabel         = $( '.preferences-language-element-spanish', win );
    var englishLabel         = $( '.preferences-language-element-english', win );

    // Social Accounts
    var accountPrototype     = $( '.preferences-social-account.wz-prototype', win );

    // Quota circle variables
    var cakeCanvas    = null;
    var cakeCanvasObj = null;
    var cakeInterval  = 0;
    var cakeGrads     = 0;
    var cakeEnd       = 0;

    // Avatar uploading variables
    var avatarCanvas    = null;
    var avatarCanvasObj = null;
    var avatarInterval  = 0;
    var avatarGrads     = 0;
    var avatarEnd       = 0;
    var avatarUploading = false;
    var avatarUrl       = '';

    var degrees           = 0;
    var backingStoreRatio = 1;
    var pixelRatio        = 1;

    var spaceTabs = [
      "space-premium",
      "modify-premium",
      "modify-space",
      "finish-premium",
      "space",
      "more",
      "order",
      "finish",
    ];

    var actualTab = null;
    var loadTab = null;

    // Info about user & plans
    var infoSubscriptions = null;
    var quota = null;
    var inevioPlans = null;
    var listPlans = null;
    var contadorPlans = 0;
    var activePlan = null;
    var minusSpaceCondition = true;
    var moreSpaceCondition = true;

    var userLocal  = {
      premium : {
        info : false,
        activePlan: null,
        actualStorage : 0,
        actualPrice : 0,
        extraStorage : 0,
        payDay : 0,
        card : {
          number : 0,
        }
      }
    };



    // Quota circle functions
    var startCircleAnimation = function( end ){

        /*
        cakeEnd = ( end * 360 ) + 5;

        // Define cakeCanvas Object
        cakeCanvasObj     = $( '.preferences-hdd-canvas', win ).transition( { opacity : 1 }, 500 );
        cakeCanvas        = cakeCanvasObj[ 0 ].getContext('2d');
        backingStoreRatio = cakeCanvas.webkitBackingStorePixelRatio ||
                            cakeCanvas.mozBackingStorePixelRatio ||
                            cakeCanvas.msBackingStorePixelRatio ||
                            cakeCanvas.oBackingStorePixelRatio ||
                            cakeCanvas.backingStorePixelRatio || 1;
        pixelRatio        = api.tool.devicePixelRatio() / backingStoreRatio;

        var oldWidth  = cakeCanvasObj.width();
        var oldHeight = cakeCanvasObj.height();



        cakeCanvasObj[ 0 ].width  = oldWidth * pixelRatio;
        cakeCanvasObj[ 0 ].height = oldHeight * pixelRatio;

        cakeCanvasObj[ 0 ].style.width  = oldWidth + 'px';
        cakeCanvasObj[ 0 ].style.height = oldHeight + 'px';

        cakeCanvas.scale( pixelRatio, pixelRatio );

        // cakeCanvas Style
        cakeCanvas.lineWidth   = 22;
        cakeCanvas.lineCap     = 'round';
        cakeCanvas.strokeStyle = "#60B25E";

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

    */

  };

    var radians =  function( grads ){
        return ( ( Math.PI / 180 ) * grads ) - ( Math.PI / 2 );
    };

    // Makes cake circle bigger
    var nextCircleAnimation = function(){

        var oldWidth  = cakeCanvasObj.width();
        var oldHeight = cakeCanvasObj.height();

        cakeCanvasObj[ 0 ].width        = oldWidth * pixelRatio;
        cakeCanvasObj[ 0 ].height       = oldHeight * pixelRatio;
        cakeCanvasObj[ 0 ].style.width  = oldWidth + 'px';
        cakeCanvasObj[ 0 ].style.height = oldHeight + 'px';

        cakeCanvas.scale( pixelRatio, pixelRatio );

        cakeCanvas.beginPath();

        // cakeCanvas Style
        cakeCanvas.lineWidth   = 22;
        cakeCanvas.lineCap     = 'round';
        cakeCanvas.strokeStyle = "#60B25E";

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

        var oldWidth  = cakeCanvasObj.width();
        var oldHeight = cakeCanvasObj.height();

        cakeCanvasObj[ 0 ].width        = oldWidth * pixelRatio;
        cakeCanvasObj[ 0 ].height       = oldHeight * pixelRatio;
        cakeCanvasObj[ 0 ].style.width  = oldWidth + 'px';
        cakeCanvasObj[ 0 ].style.height = oldHeight + 'px';

        cakeCanvas.scale( pixelRatio, pixelRatio );

        cakeCanvas.beginPath();

        // cakeCanvas Style
        cakeCanvas.lineWidth   = 22;
        cakeCanvas.lineCap     = 'round';
        cakeCanvas.strokeStyle = "#60B25E";

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

        api.system.updateQuota( function(){

            if( space ){
                startCircleAnimation( configObject.quota / space );
                cakeFree.text( api.tool.bytesToUnit( space - configObject.quota, 2 ) + ' ' + lang.freeSpace );
            }else{
                startCircleAnimation( configObject.quotaPercentage );
                cakeFree.text( api.tool.bytesToUnit( configObject.quotaFree, 2 ) + ' ' + lang.freeSpace );
            }

        });

    };

    var uploadingAvatar = function( percent ){

        avatarEnd = ( percent * 360 ) + 5;

        // Define avatarCanvas Object
        avatarCanvasObj = $( '.preferences-account-avatar', win ).css( 'opacity', 1 );
        avatarCanvas    = avatarCanvasObj[ 0 ].getContext('2d');

        var oldWidth  = avatarCanvasObj.width();
        var oldHeight = avatarCanvasObj.height();

        avatarCanvasObj[ 0 ].width        = oldWidth * pixelRatio;
        avatarCanvasObj[ 0 ].height       = oldHeight * pixelRatio;
        avatarCanvasObj[ 0 ].style.width  = oldWidth + 'px';
        avatarCanvasObj[ 0 ].style.height = oldHeight + 'px';

        avatarCanvas.scale( pixelRatio, pixelRatio );

        // avatarCanvas Style
        avatarCanvas.lineWidth   = 2;
        avatarCanvas.strokeStyle = "#60B25E";

        clearInterval( avatarInterval );
        setTimeout( function(){
            avatarInterval = setInterval( avatarAnimation, 10 );
        }, 100 );

    };

    // Makes avatar circle bigger
    var avatarAnimation = function(){

        var oldWidth  = avatarCanvasObj.width();
        var oldHeight = avatarCanvasObj.height();

        avatarCanvasObj[ 0 ].width        = oldWidth * pixelRatio;
        avatarCanvasObj[ 0 ].height       = oldHeight * pixelRatio;
        avatarCanvasObj[ 0 ].style.width  = oldWidth + 'px';
        avatarCanvasObj[ 0 ].style.height = oldHeight + 'px';

        avatarCanvas.scale( pixelRatio, pixelRatio );

        avatarCanvas.beginPath();

        // avatarCanvas Style
        avatarCanvas.lineWidth   = 2;
        avatarCanvas.strokeStyle = "#60B25E";

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

        api.weekey.getList( function( error, list, left ){

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
                        invitedFriend.find( 'img' ).attr( 'src', 'https://static.inevio.com/app/374/weekey.png' );
                        invitedFriend.find( 'span' ).text( list[ i ].id );
                    }

                    invitedFriend.appendTo( $( '.preferences-invite-friends', win ) );

                }

            }

        });

    };


    var socialNetworks = function(){

        $( '.preferences-social-card', win ).children().not( '.preferences-social-title' ).remove();

        api.social.getAccounts( function( error, list ){

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

    var loadModifySpace = function() {

      $('.modify-space .quantity').find('span').text(userLocal.premium.actualPrice);
      var espacioTotal = api.tool.bytesToUnit( api.system.quota().total).split(" ", 1)[0];
      if(infoSubscriptions.currentPlan.addQuota == "Infinity"){
        //espacioTotal = lang.unlimitedStorage;
        espacioTotal = 10000;
      }else{
        espacioTotal = userLocal.premium.extraStorage;
      }
      $('.modify-space .show-space-selected .big-text').text(espacioTotal);
      $('.modify-space .quantity').text(userLocal.premium.actualPrice);
    }

    var nextPage = function(pestanaActual, modo) {

      //pestana actual debe contener la clase active si o si sino la logica no funciona

      if($('.'+pestanaActual).hasClass('active')){

        calculateNextPage(pestanaActual, modo);

        $('.'+pestanaActual).removeClass('active');
        $('.'+loadTab).addClass('active');
        actualTab = loadTab;

      }
      else{
        console.log('ERROR! NO ACTIVE CLASS FOUND', pestanaActual);
      }


    };

    var calculateNextPage = function(actualPage, mode) {
      // Flujo

      // Mode 1 nextPage
      // Mode 2 previousPage
      // Mode 3 loadPage

        switch (mode) {
          case 1:
          //PREMIUM
            if(actualPage == "space-premium"){
              loadTab = spaceTabs[1];
              break;
            }
            if(actualPage == "modify-premium"){
              loadTab = spaceTabs[2];
              break;
            }
            if(actualPage == "modify-space"){
              loadTab = spaceTabs[3];
              break;
            }
            if(actualPage == "finish-premium"){
              loadTab = spaceTabs[0];
              break;
            }

          //NORMAL
          if(actualPage == "space"){
            loadTab = spaceTabs[5];
            break;
          }
          if(actualPage == "more"){
            loadTab = spaceTabs[6];
            break;
          }
          if(actualPage == "order"){
            loadTab = spaceTabs[7];
            break;
          }
          // Change to premium
          if(actualPage == "finish"){
            loadTab = spaceTabs[0];
            break;
          }

          case 2:
          //PREMIUM
            if(actualPage == "modify-premium"){
              loadTab = spaceTabs[0];
              break;
            }
            if(actualPage == "modify-space"){
              loadTab = spaceTabs[1];
              break;
            }
          //NORMAL
          if(actualPage == "more"){
            loadTab = spaceTabs[4];
            break;
          }
          if(actualPage == "order"){
            loadTab = spaceTabs[5];
            break;
          }

          case 3:
          //PREMIUM cuando un usuario se quiere quitar la subscripcion
          if(actualPage == "modify-space"){
            //loadTab = spaceTabs[4];
            console.log("Usuario quiere quitar sub?");
            break;
          }
          default:
          console.log(mode);
          console.log("ERROR NO SE HA SELECCIONADO MODO");
        }

    };

    var clearVar = function() {

      contadorPlans = 0;

      if( userLocal.premium.info){
        loadTab = spaceTabs[0];
        actualTab = spaceTabs[0];
      }else{
        loadTab = spaceTabs[4];
        actualTab = spaceTabs[4];
      }
    };

    var updateSpaceToPremium = function(){
      spacePRTab();
      modifyPRTab();
      modifySPTab();
      $('.space .fr-box').addClass('hidden');
      $('.space .pr-box').removeClass('hidden');
      $('.pr-box .box-current-plan-top').find('span').text(lang.activePlan);
      $('.pr-box .box-current-plan-bottom').find('span').text(lang.manage);
      $('.pr-box .box-current-plan-middle .premium-info .left').find('span').text(userLocal.premium.extraStorage + lang.extra );
      $('.pr-box .box-current-plan-middle .premium-info .right').find('span').text(userLocal.premium.actualPrice + lang.dolarMonthMinus );
      var fecha = new Date(userLocal.premium.payDay);
      $(  '.pr-box .box-current-plan-middle .premium-date').find('span').text(lang.payDay + fecha.getDate() + '/'+ (fecha.getMonth()+1) + '/' + (fecha.getFullYear()));
    };

    var updateUserLocal = function(value, attr){
      /*
      0 premium.info
      1 premium.actualStorage
      2 premium.actualPrice
      3 premium.extraStorage
      4 premium.payDay
      5 premium.activePlan
      */
      switch (attr) {
        case 0:
          userLocal.premium.info = value;
          break;
        case 1:
          userLocal.premium.actualStorage = value;
          break;
        case 2:
          userLocal.premium.actualPrice = value;
          break;
        case 3:
          userLocal.premium.extraStorage = value;
          break;
        case 4:
          userLocal.premium.payDay = value;
          break;
        case 5:
          userLocal.premium.activePlan = value;
          break;
        default:
          console.log("Invalid attr: "+attr , "value: "+value );
      }
    };

    var resetLocalVar = function(){
      quota = wz.system.quota();
      wz.config.getSubscriptionStatus(function( err, info ){
        infoSubscriptions = info;
        contadorPlans = 0;
        activePlan = infoSubscriptions.currentPlan.id;
        inevioPlans = infoSubscriptions.availablePlans;
        if(activePlan == inevioPlans[0].id){
          minusSpaceCondition = false;
        }
        if(activePlan == inevioPlans[inevioPlans.length - 1].id){
          moreSpaceCondition = false;
        }
      });
    };


    // WZ Events
    api.upload

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

                    $( '.preferences-account-image', win ).transition({ 'box-shadow' : 'inset 0 0 24px 4px #60B25E' }, function(){
                        $( this ).transition({ 'box-shadow' : 'none' });
                    });

                    $( '.preferences-account-image', win ).transition({ 'box-shadow' : 'none' }, function(){
                        $( this ).transition({ 'box-shadow' : 'inset 0 1px 1px rgba(255, 255, 255, 0.3)' });
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

        if( !$( win ).hasClass( 'wz-view-dragging' ) ){

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
        // Reset variables if tab != hdd

          console.log(this);
          if(!$(this).hasClass('hdd')){
            clearVar();
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
                $( '.save-info', win ).removeClass( 'unactive' ).addClass( 'active ui-btn accept' );
            }else{
                $( '.save-info', win ).removeClass( 'active' ).addClass( 'unactive' );
            }

        }, 500 );

    })


    .on( 'click' , '.siguiente', function(){


        if($(this).parents('.preferences-hdd-payment').hasClass(actualTab)){
          nextPage(actualTab, 1);
          var currentObject = $('.hdd-container');
          $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){
          });
        }else{
          console.log("ERROR" , $(this).parents('.preferences-hdd-payment') , actualTab);
        }

        console.log("Pestaña actual: "+actualTab);


    })

    .on( 'click' , '.atras', function(){

      if($(this).parents('.preferences-hdd-payment').hasClass(actualTab)){
        nextPage(actualTab, 2);
        var currentObject = $('.hdd-container');
        $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() - 838}, 800, function(){
        });
      }else{
        console.log("ERROR" , $(this).parents('.preferences-hdd-payment') , actualTab);
      }

      console.log("Pestaña actual: "+actualTab);
    })
    .on(  'click' , '.change-plan' , function(){

      if($(this).parents('.preferences-hdd-payment').hasClass(actualTab)){
        nextPage(actualTab, 1);
        loadModifySpace();
        var currentObject = $('.hdd-container');
        $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){
        });
      }else{
        console.log("ERROR" , this , actualTab);
      }
      console.log("Pestaña actual: "+actualTab);

    })

    .on(  'click', '.finish .loadPremium', function(){
      //update userLocal and load Premium-mode
      updateUserLocal(true, 0);
      updateUserLocal(parseInt($('.more .quantity').text()), 2);
      updateUserLocal(parseInt($('.more .show-space-selected .big-text').text()), 3);
      updateUserLocal(new Date(), 4);
      //La tarjeta ya se ha asignado cuando se valida
      resetLocalVar();
    })

    .on(  'click', '.finish-premium .updatePremium', function(){
      //update userLocal in premium-mode
      resetLocalVar();
    })

    .on( 'click' , '.finish-premium .inicio', function(){


      if($(this).parents('.preferences-hdd-payment').hasClass(actualTab)){
        nextPage(actualTab, 1);
        var currentObject = $('.hdd-container');
        $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() - 838*3}, 500, function(){
        });
      }else{
        console.log("ERROR" , this , actualTab);
      }
      console.log(actualTab);

    })
    .on( 'click' , '.finish .inicio', function(){


      if($(this).parents('.preferences-hdd-payment').hasClass(actualTab)){
        nextPage(actualTab, 1);
        var currentObject = $('.hdd-container');
        updateSpaceToPremium();
        $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() - 838*3}, 500, function(){
        });
        var ventana = $('.free-user');
        ventana.removeClass('free-user');
        ventana.addClass('premium-user');
        spaceTab();

      }else{
        console.log("ERROR" , this , actualTab);
      }
      console.log(actualTab);

    })

    .on(  'click', '.modify-premium .delete-card', function(){
      //Delete actual card
      $('.modify-premium .card-active').removeClass('card-active');
      console.log("NO IMPLEMENTADO NO SE BORRA TARJETA");
    })

    // Increases or reduces the required storage
    .on('click', '.moreStorage', function() {

      if(moreSpaceCondition && inevioPlans[contadorPlans + 1] != null ){

        var precio = null;
        var tamaño = null;
        var total = null;
        var condicion = true;

        if(actualTab == spaceTabs[2]){
          //premium
          tamano = $('.modify-space .show-space-selected .big-text');
          precio = $('.modify-space .quantity');
          total = $('.finish-premium .info-space');
        }
        else if (actualTab == spaceTabs[5]){
          //normal
          tamano = $('.more .show-space-selected .big-text');
          precio = $('.more .quantity');
          total = $( '.order .options-bottom .bottom .left').find('span');
        }
        else{
          console.log("ERROR! Mal gestión de pestañas");
          condicion = false;
        }

        if(condicion){

          tamano.text(api.tool.bytesToUnit(inevioPlans[contadorPlans + 1].addQuota).split(" ", 1)[0]);
          precio.text(inevioPlans[contadorPlans + 1 ].amount);
          total.text( parseInt(tamano.text()) + parseInt(userLocal.premium.actualStorage) + " GB");
          activePlan = inevioPlans[contadorPlans + 1].id;
          console.log("Plan activo: " + activePlan);
          if (contadorPlans < inevioPlans.length - 1){
            contadorPlans++;
          }else {
            console.log("Desactivar boton mas, contador: "+contadorPlans);
            // Bloqueamos el boton mas con la clase block(opacidad al .2) y le quitamos la clase al boton
            moreSpaceCondition = false;
          }


          if(tamano.text() == api.tool.bytesToUnit(inevioPlans[inevioPlans.length - 1].addQuota).split(" ", 1)[0]){
            // Bloqueamos el boton menos con la clase block(opacidad al .2) y le quitamos la clase al boton
            $('.moreStorage').parents('.more-icon').addClass('block');
            $('.moreStorage').removeClass('moreStorage');
          }

          minusSpaceCondition = true;
          if($('.minus-icon').hasClass('block')){
            $('.minus-icon').removeClass('block');
            $('.minus-icon').find('figure').addClass('minusStorage');
          }
        }

      }
      else{
        console.log("Error no hay un plan en esa posicion, contador: "+contadorPlans);
        activePlan = null;
      }

    })



    .on(  'click', '.minusStorage' , function(){

      if(minusSpaceCondition && inevioPlans[contadorPlans - 1] != null ){

        var precio = null;
        var tamaño = null;
        var total = null;
        var condicion = true;

        if(actualTab == spaceTabs[2]){
          //premium
          tamano = $('.modify-space .show-space-selected .big-text');
          precio = $('.modify-space .quantity');
          total = $('.finish-premium .info-space');
        }
        else if (actualTab == spaceTabs[5]){
          //normal
          tamano = $('.more .show-space-selected .big-text');
          precio = $('.more .quantity');
          total = $( '.order .options-bottom .bottom .left').find('span');
        }
        else{
          console.log("ERROR! Mal gestión de pestañas");
          condicion = false;
        }

        if(condicion){

          tamano.text(api.tool.bytesToUnit(inevioPlans[contadorPlans - 1].addQuota).split(" ", 1)[0]);
          precio.text(inevioPlans[contadorPlans - 1].amount);
          total.text( parseInt(tamano.text()) + parseInt(userLocal.premium.actualStorage) + " GB");
          activePlan = inevioPlans[contadorPlans - 1 ].id;
          console.log("Plan activo: " + activePlan);
          if (contadorPlans > 0){
            contadorPlans--;
          }else {
            console.log("Desactivar boton menos, contador: "+contadorPlans);
            minusSpaceCondition = false;
          }

          if(tamano.text() == api.tool.bytesToUnit(inevioPlans[0].addQuota).split(" ", 1)[0]){
            // Bloqueamos el boton menos con la clase block(opacidad al .2) y le quitamos la clase al boton
            $('.minusStorage').parents('.minus-icon').addClass('block');
            $('.minusStorage').removeClass('minusStorage');
          }

          moreSpaceCondition = true;
          if($('.more-icon').hasClass('block')){
            $('.more-icon').removeClass('block');
            $('.more-icon').find('figure').addClass('moreStorage');
          }
        }

      }
      else{
        console.log("Error no hay un plan en esa posicion, contador: "+contadorPlans);
        activePlan = null;
      }
    })

    .on(  'click',  '.more .siguiente', function(){

      var tamano = parseInt($('.more .show-space-selected .big-text').text());
      var precio = parseInt($('.more .quantity').text());
      $('.order .info-options .options-middle .options-middle-right').text(precio + lang.dolarMonthMinus);
      $('.order .info-options .options-middle .options-middle-left').text( lang.add + tamano + "GB" );
      $('.order .info-options .options-bottom .bottom .left').text((parseInt(userLocal.premium.actualStorage) + parseInt(tamano)) + "GB" );
      $('.order .info-options .options-bottom .bottom .right').text(precio + lang.dolarMonthMinus);
    })

    .on(  'click' , '.modify-space .siguiente', function(){
      if( parseInt($('.modify-space .quantity').text()) < parseInt(userLocal.premium.actualPrice)){
        $('.finish-premium .finish-top').addClass('sad');
        $('.finish-premium .finish-middle span:first-child').text(lang.decrease);
      }else {
        $('.finish-premium .finish-top').removeClass('sad');
        $('.finish-premium .finish-middle span:first-child').text(lang.congratulation);
      }
    })

    .on(  'click', '.addCard' , function(){


        $('.modify-premium .info-current-card').addClass('new-card');
    })

    .on ('click' ,'.order .validate', function(){
      var card = {
        name: $('.order .owner-card').val(),
        number : $('.order .number-card').val(),
        month: $('.order .month-card').val(),
        year : $('.order .year-card').val(),
        code : $('.order .code-card').val()
      }
      if(validateCard(card)){
        $('.finish .finish-middle .info-space').text( $( '.order .options-bottom .bottom .left').find('span').text());
        if($(this).parents('.preferences-hdd-payment').hasClass(actualTab)){
          nextPage(actualTab, 1);
          var currentObject = $('.hdd-container');
          $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){
          });
        }else{
          console.log("ERROR" , $(this).parents('.preferences-hdd-payment') , actualTab);
        }
      }
      console.log("Pestaña actual: "+actualTab);


    })

    .on('click', '.modify-space .validate', function(){
      console.log("VIEJO: "+userLocal.premium.activePlan);
      //Cambio de plan en premium (plan activo, nuevoplan);
      cambioPlan(activePlan);
      console.log("NUEVO: "+userLocal.premium.activePlan);
        if($(this).parents('.preferences-hdd-payment').hasClass(actualTab)){
          nextPage(actualTab, 1);
          var currentObject = $('.hdd-container');
          $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){
          });
        }else{
          console.log("ERROR" , $(this).parents('.preferences-hdd-payment') , actualTab);
        }
    })


    .on( 'click', '.save-info', function(){

        if( accountUsernameInput.val().length > 2 && usernameExpresion.test( accountUsernameInput.val() ) && accountUsernameInput.val() !== username ){

            api.config.setUsername( accountUsernameInput.val(), function( error ){

                if( error ){

                    alert( error );
                    accountUsernameInput.val( username );

                }else{

                    username = accountUsernameInput.val();

                    api.banner()
                        .setTitle( lang.usernameChanged )
                        .setText( lang.usernameChanged2 + ' ' + username )
                        .render();

                }

                accountUsername.removeClass( 'correct' );

            });

        }

        if( accountMailInput.val().length && mailExpresion.test( accountMailInput.val() ) && accountMailInput.val() !== mail ){

            api.config.setMail( accountMailInput.val(), function( error ){

                if( error ){

                    alert( error );
                    accountMailInput.val( mail );

                }else{

                    mail = accountMailInput.val();

                    api.banner()
                        .setTitle( lang.mailChanged )
                        .setText( lang.mailChanged2 + ' ' + mail )
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
            $( '.save-password', win ).removeClass( 'unactive' ).addClass( 'active ui-btn accept' );
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

            api.config.setPassword( currentPasswordInput.val(), newPasswordInput.val(), function( error ){

                if( error ){

                    alert( error );

                }else{

                    api.banner()
                        .setTitle( lang.passwordChanged )
                        .setText( lang.passwordChanged2 )
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
    .on( 'click', '.preferences-bottom-checkbox', function( e ){

      e.preventDefault();
      e.stopPropagation();

        if( $( this ).hasClass( 'checked' ) ){

            $( this ).removeClass( 'checked' );
            $( this ).find( 'figure' ).removeClass( 'active' );

        }else{

            if( !$( this ).parent( '.preferences-bottom-selectable' ).hasClass( 'multiple' ) ){
                $( this ).siblings( '.preferences-bottom-checkbox.checked' ).removeClass( 'checked' );
            }

            $( this ).addClass( 'checked' );
            $( this ).find( 'figure' ).addClass( 'active' );

        }

    })

    // Shows white border when wallpaper is clicked ( Customize Tab )
    .on( 'click', '.preferences-wallpaper-image', function(){

        if( !$( this ).hasClass( 'active' ) ){

            $( '.preferences-wallpaper-image.active', win ).removeClass( 'active' );
            $( this ).addClass( 'active' );
            $( '.preferences-wallpaper-image.custom', win ).addClass( 'wz-prototype' );

            var id = $( this ).attr( 'data-id' );

            api.config.setWallpaper( id );

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

        api.system.updateQuota( function( error, quota ){

            cakeTitle.text( lang.currentUsage );
            cakeTotal.text( api.tool.bytesToUnit( configObject.quotaMax ) );
            cakeFree.text( api.tool.bytesToUnit( configObject.quotaFree, 2 ) + ' ' + lang.freeSpace );

            changeCake( 0 );

        });

    })


    // Adds +1 hour to the clock
    .on( 'click', '.preferences-config-up', function(){

        clockHour.css( 'transform', 'rotate(' + hourDegree( parseInt( configNow.text(), 10 ) + 1, date.getMinutes() ) + 'deg)' );
        configNow.text( coolHour( parseInt( configNow.text(), 10 ) + 1 ) );
        $( '.preferences-config-auto', win ).removeClass( 'checked' );

        timeZone = parseInt( configNow.text(), 10 ) - date.getUTCHours();

        api.config.setTimeZone( timeZone, function( error ){

            if( error ){
                alert( error );
            }

        });

    })

    // Substracts -1 hour to the clock
    .on( 'click', '.preferences-config-down', function(){

        clockHour.css( 'transform', 'rotate(' + hourDegree( parseInt( configNow.text(), 10 ) - 1, date.getMinutes() ) + 'deg)' );
        configNow.text( coolHour( parseInt( configNow.text(), 10 ) - 1 ) );
        $( '.preferences-config-auto', win ).removeClass( 'checked' );

        timeZone = parseInt( configNow.text(), 10 ) - date.getUTCHours();

        api.config.setTimeZone( timeZone, function( error ){

            if( error ){
                alert( error );
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

        api.config.setTimeZone( timeZone, function( error ){

            if( error ){

                alert( error );

            }

        });

    })

    .on( 'click', '.time-format .preferences-bottom-checkbox', function(){

        api.config.setTimeFormat( $(this).children('span').hasClass('time-format-24'), function( error ){

            if( error ){
                alert( error );
            }

        });

    })

    .on( 'click', '.preferences-extensions-display.preferences-bottom-checkbox', function(){

        api.config.setDisplayExtensions( $(this).hasClass('checked'), function( error ){

            if( error ){
              $('.preferences-extensions-display.preferences-bottom-checkbox').toggleClass('checked');
              $('.preferences-extensions-display.preferences-bottom-checkbox figure').toggleClass('active');
              alert(lang.wrongPass);
            }

        });

    })

    .on( 'click', '.date-format .preferences-bottom-checkbox', function(){

        var button = $( this );

        api.config.setDateFormat( button.attr( 'data-date-format-short' ), button.attr( 'data-date-format-long' ), function( error ){

            if( error ){
                alert( error );
            }

        });

    })

    .on( 'click', '.preferences-language-element', function(){

        $( this ).addClass( 'active' ).siblings().removeClass( 'active' );

        if( $( this ).hasClass( 'english-uk' ) ){
            api.config.setLanguage( 'en-en' );
        }else if( $( this ).hasClass( 'english-us' ) ){
            api.config.setLanguage( 'en-us' );
        }else if( $( this ).hasClass( 'spanish' ) ){
            api.config.setLanguage( 'es-es' );
        }

    })

    // Launches browser window to add an account
    .on( 'click', '.preferences-social-icon.plus', function(){
        //alert( 'Demo accounts can\'t add social networks' );
        api.social.addAccount( $( this ).attr( 'data-social-network' ) );
    })

    // Launches settings window of social networks ( Social Networks Tab )
    .on( 'click', '.preferences-social-icon.settings', function(){

        var socialNetwork = $( this ).parent( '.preferences-social-account' )

        api.app.createView( {

            type: socialNetwork.data( 'social-network' ),
            id: socialNetwork.data( 'id' ),
            name: socialNetwork.data( 'name' )

        }, 'social' );

    })

    .on( 'click', '.preferences-button.invite', function(){

        api.weekey.create( function( error, weekey ){

            if( error === 'DEMO CAN NOT CREATE A WEEKEY' ){
                alert( 'Demo accounts can\'t create weeKeys' );
            }else if( error === 'CAN NOT CREATE MORE WEEKEYS' ){
                alert( 'You can\'t create more weeKeys' );
            }else{

                $( '.preferences-bottom-input.invite span' ).text( weekey );
                invitationInfo();

            }

        });

    })

    .on( 'click', '.preferences-bottom-content.backup button', function(){
        api.fs.downloadBackup();
    })


    // This function fills certain gaps with user's info
    api.system.updateQuota( function( error, quota ){

        cakeTotal.text( api.tool.bytesToUnit( api.system.quota().total ) );
        cakeFree.text( api.tool.bytesToUnit( api.system.quota().free, 2 ) + ' ' + lang.freeSpace );

        startCircleAnimation( api.system.quota().used / api.system.quota().total );

    });



    avatarUrl = api.system.user().avatar.normal;
    mail      = api.system.user().mail;
    username  = api.system.user().user;




    console.log( api.system.user() );

    $( '.preferences-account-image', win ).css( 'background-image', 'url(' + avatarUrl + '?' + Math.random() + ')' );

    socialNetworks();

    api.config.getConfiguration( function( error, config ){

        if( config.displayExtensions ){
            $('.preferences-extensions-display.preferences-bottom-checkbox').addClass('checked');
            $('.preferences-extensions-display.preferences-bottom-checkbox figure').addClass('active');
        }else{
            $('.preferences-extensions-display.preferences-bottom-checkbox').removeClass('checked');
            $('.preferences-extensions-display.preferences-bottom-checkbox figure').removeClass('active');
        }

    });



    api.config.getLanguages( function( error, languages, used ){

        if( used.code === "es" || used.code === "es-es" ){
            $( '.preferences-language-element.spanish', win ).addClass( 'active' );
        }else if( used.code === "en" || used.code === "en-us" ){
            $( '.preferences-language-element.english-us', win ).addClass( 'active' );
        }else if( used.code === "en-uk" ){
            $( '.preferences-language-element.english-uk', win ).addClass( 'active' );
        }

    });

    api.config.getWallpapers( function( error, wallpapers, used ){

        if( used.custom ){
            $( '.preferences-wallpaper-image.custom', win ).css( 'background-image', 'url(' + used.url[ '1280' ] + ')' ).removeClass( 'wz-prototype' ).addClass( 'active' );
        }else{
            $( '.wallpaper-' + used.id, win ).addClass( 'active' );
        }

    });

    /*
      Función para crear un circulo que muestre lo que esta debajo, se le pasa:
        - El canvas.
        - El contexto del objeto canvas.
        - Posicion del centro (x e y).
        - Radio.
        - Porcentaje entre 0 y 1.
        - Tiempo de la animación por defecto 250.
    */

    var loadCanvasCake = function(canvas,context, x, y, radius, porcentaje, tiempo){

      if(tiempo == null){
        tiempo = 200;
      }
      var curPerc = 0;
      var counterClockwise = true;
      var circ = Math.PI * 2;
      var quart = Math.PI / 2;

      context.lineWidth = 25;
      context.strokeStyle = '#586069';

      function animate(current) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.beginPath();
          context.arc(x, y, radius, -(quart), ((circ) * current) - quart, true);
          context.stroke();
          curPerc++;

          if (curPerc < porcentaje*tiempo) {
              requestAnimationFrame(function () {
                  animate(curPerc / tiempo)
              });
          }
      }
      if (porcentaje == 0){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, radius, 0*Math.PI, 2*Math.PI, true);
        context.stroke();
      }else{
        animate();
      }

    };

    // payments.js start


var removeCard = function(){

  request( 'POST', 'https://rest.inevio.com/unsubscribe' ).done( function(){

    $( '.save-credit-mode' ).hide()
    $( '.intro-credit-mode' ).show()

  }).fail( function(){
    alert( 'No se ha podido eliminar la suscripción, ponte en contacto con nosotros.' )
  })

}

var request = function( verb, url, data ){

  var promise = $.Deferred()

  $.ajax({

    type : verb,
    url : url,
    crossDomain : true,
    xhrFields: {
      withCredentials: true
    },
    data : data

  }).done( function( res ){
    promise.resolve( res )
  }).fail( function( res ){
    promise.reject( res )
  })

  return promise

}

win
.on( 'click' , '.preferences-payment-button' , function(){

  processCardForm()
  // Prevent the form from submitting with the default action
  return false

})
.on( 'click' , '.cancel-credit' , function(){
  removeCard()
})

/*
$.when( availablePlans(), listCards() ).done( function( plans, cards ){

  if( plans.plans.length ){

    $('.payment').css( 'display', 'inline-block' )

    availablePlan = plans.plans[ 0 ].id

  }

  if( cards.cards.length ){

    $( '.save-credit-mode' ).show()
    $( '.intro-credit-mode' ).hide()
    $( '.credit-number' ).text( '**** **** **** ' + cards.cards[ 0 ].last4 )
    $( '.credit-name' ).text( cards.cards[ 0 ].name )
    $( '.credit-exp' ).text( cards.cards[ 0 ].exp_month + '/' + cards.cards[ 0 ].exp_year )

  }else{

    $( '.save-credit-mode' ).hide()
    $( '.intro-credit-mode' ).show()

  }

})
*/

// payments.js end

    // To DO
    var validateCard = function(card){

      Stripe.card.createToken({

        number    : card.number,
        cvc       : card.code,
        exp_month : card.month,
        exp_year  : card.year,
        name      : card.name

      }, function( status, response ) {

        if( response.error ){
          console.log(card);
          console.log(response);
          alert( lang.creditcardError )
          $('.load-only').hide()
          $('.preferences-payment-button').show()
          return

        }

        request( 'POST', 'https://restbeta.inevio.com/payment/subscribe', {

          token : response.id,
          plan  : activePlan,

        }).done( function( res ){

          listCards().done( function( res ){

            $( '.credit-number' ).text( '**** **** **** ' + res.cards[ 0 ].last4 )
            $( '.credit-name' ).text( res.cards[ 0 ].name )
            $( '.credit-exp' ).text( res.cards[ 0 ].exp_month + '/' + res.cards[ 0 ].exp_year )
            $( '.save-credit-mode' ).show()
            $( '.intro-credit-mode' ).hide().find('input').val('')
            $('.load-only').hide()
            $('.preferences-payment-button').show()

          }).fail( function( res ){

            $('.load-only').hide()
            $('.preferences-payment-button').show()
            alert( 'No se ha podido realizar el pago, ponte en contacto con nosotros.' )

          })

        }).fail( function( res ){

          $('.load-only').hide()
          $('.preferences-payment-button').show()
          alert( 'No se ha podido realizar el pago, ponte en contacto con nosotros.' )

        })

      });
        return true;

    };

    var cambioPlan = function(planNuevo){


          request( 'POST', 'https://restbeta.inevio.com/payment/subscribe', {


            plan  : planNuevo

          }).done(function(res){
            console.log("TODO OK", res);
          })
          .fail( function(res){
            console.log("ERROR", res);
          })
          return true;


    };

    var loadAppUser = function(){
      var canvasObject1 = $( '.preferences-hdd-canvas-cake')[0];
      var canvasObject2 = $( '.preferences-hdd-canvas-cake')[1];
      var contexto1 = canvasObject1.getContext('2d');
      var contexto2 = canvasObject2.getContext('2d');
      var centroX = canvasObject1.width / 2;
      var centroY = canvasObject1.height / 2;
      var radio = 107;
      var porcentaje = 1 - api.system.quota().free / api.system.quota().total;
        loadCanvasCake(canvasObject1,contexto1, centroX, centroY, radio, porcentaje);
        loadCanvasCake(canvasObject2,contexto2, centroX, centroY, radio, porcentaje);
        // Obtenemos la info de la subscripcion del usuario.
      infoSubscriptions = api.app.storage('infoSubscriptions');
      quota = wz.system.quota();
      inevioPlans = infoSubscriptions.availablePlans;
      listPlans = inevioPlans.map(function( item ){
        return item.id});

      // Load info user subscription
      if(infoSubscriptions.currentPlan !=  null){
        userLocal.premium.info = true;
        userLocal.premium.actualStorage = api.tool.bytesToUnit(quota.total).split(" ", 1)[0];
        userLocal.premium.actualPrice = infoSubscriptions.currentPlan.amount;
        userLocal.premium.extraStorage = api.tool.bytesToUnit(infoSubscriptions.currentPlan.addQuota).split(" ", 1)[0];;
        userLocal.premium.payDay = infoSubscriptions.currentPlan.current_period_end;
        userLocal.premium.card.number = infoSubscriptions.listCards[0].last4;
        userLocal.premium.activePlan = infoSubscriptions.currentPlan.id;
        actualTab = spaceTabs[0];
        contadorPlans = listPlans.indexOf(userLocal.premium.activePlan);
        $('.'+actualTab).addClass('active');
       if($('.hdd-container').hasClass('free-user')){
         $('.hdd-container').removeClass('free-user');
         $('.hdd-container').addClass('premium-user');
       }

      }else{
        userLocal.premium.info = false;
        userLocal.premium.actualStorage = api.tool.bytesToUnit(quota.total).split(" ", 1)[0];
        userLocal.premium.actualPrice = 0;
        userLocal.premium.extraStorage = 0;
        userLocal.premium.payDay = null;
        userLocal.premium.card.number = null;
        contadorPlans=0;
        actualTab = spaceTabs[4];
        $('.'+actualTab).addClass('active');
        if($('.hdd-container').hasClass('premium-user')){
          $('.hdd-container').removeClass('premium-user');
          $('.hdd-container').addClass('free-user');
        }
      }
      console.log("Pestaña actual: "+actualTab);

      // Translate app

      $( '.appName').find('span').text(lang.appName);

      $( 'li.hdd', win ).text( lang.space ).data( 'type', 'hdd' );
      $( 'li.account', win ).text( lang.account ).data( 'type', 'account' );
      $( 'li.social', win ).text( lang.social ).data( 'type', 'social' );
      $( 'li.config', win ).text( lang.config ).data( 'type', 'config' );
      $( 'li.custom', win ).text( lang.custom ).data( 'type', 'custom' );
      $( 'li.invite', win ).text( lang.invite ).data( 'type', 'invite' );
      $( 'li.backup', win ).text( lang.backup ).data( 'type', 'backup' );
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

      //translate hdd zone

      if (userLocal.premium.info){
        spacePRTab();
        modifyPRTab();
        modifySPTab();
        finishPRTab();
      }
      else{
        spaceTab();
        moreTab();
        orderTab();
        finishTab();
      }

      $( '.preferences-bottom-title.account', win ).text( lang.accountTitle );
      $( '.preferences-bottom-description.account', win ).text( lang.accountDescription );
      $( '.avatar-edit', win ).text( lang.avatarEdit );
      $( '.preferences-bottom-labelUsername', win ).text( lang.accountUser );
      $( '.preferences-bottom-labelMail', win ).text( lang.accountMailUser );
      $( '.change-password .preferences-account-button', win ).text( lang.changePassword );
      $( '.save-info .preferences-account-button', win ).text( lang.saveChanges );

      $( '.preferences-bottom-title.password', win ).text( lang.passwordTitle );
      $( '.preferences-bottom-description.password', win ).text( lang.passwordDescription );
      $( '.cancel-password .preferences-account-button', win ).text( lang.cancel );
      $( '.preferences-bottom-labelCurrentPassword', win ).text( lang.currentPassword );
      $( '.save-password .preferences-account-button', win ).text( lang.saveChanges );
      $( '.password-current input', win ).attr( 'placeholder', lang.currentPassword );
      $( '.password-new input', win ).attr( 'placeholder', lang.newPassword );
      $( '.password-confirm input', win ).attr( 'placeholder', lang.confirmPassword );
      $( '.preferences-bottom-labelNewPassword', win ).text( lang.newPassword );
      $( '.preferences-bottom-labelConfirmPassword', win ).text( lang.confirmPassword );
      $( '.preferences-bottom-forgetPassword', win ).text( lang.forgetPassword );
      $( '.preferences-bottom-forgetPassword', win ).attr( 'href', lang.forgetPasswordHtml );

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
      $( '.preferences-language-element-spanish', win ).text( lang.spanishLanguage );
      $( '.preferences-language-element-english', win ).text( lang.englishLanguage );

      $('.preferences-bottom-title.extensions').text( lang.extensionsTitle );
      $('.preferences-extensions-display span').text( lang.displayExtensions );

      $( '.preferences-bottom-title.custom', win ).text( lang.customTitle );
      $( '.preferences-bottom-description.custom', win ).text( lang.customDescription );
      $( '.preferences-wallpaper-title', win ).text( lang.wallpaper );
      $( '.preferences-wallpaper-upload span', win ).text( lang.upload );

      $( '.preferences-bottom-title.invite', win ).text( lang.inviteTitle );
      $( '.preferences-bottom-description.invite', win ).text( lang.inviteDescription );
      $( '.preferences-account-button.invite', win ).text( lang.generate );
      $( '.preferences-invite-beware', win ).text( lang.inviteBeware );

      $( '.preferences-bottom-title.backup', win ).text( lang.backupTitle );
      $( '.preferences-bottom-description.backup', win ).text( lang.backupDescription );
      $( '.preferences-bottom-backup-button.ellipsis', win ).text( lang.backupButton );

      $( '.preferences-about-version', win ).text( lang.version + ':' + ' ' + api.system.version().replace( 'beta', 'Beta' ) );
      $( '.preferences-about-link.legal', win ).text( lang.legalNotices );
      $( '.preferences-about-link.privacy', win ).text( lang.privacyPolicies );

      // Infinity storage??

      if(infoSubscriptions.currentPlan != null){
        if(infoSubscriptions.currentPlan.addQuota == "Infinity"){
          $(  '.space-premium .box-current-plan-middle .premium-info .left').find('span').text(lang.unlimitedStorage);
          $(  '.modify-premium .info-current-plan .options-bottom .bottom').find('span').text(lang.unlimitedStorage);
          $(  '.modify-premium .info-options .options-top .top .left').find('span').text(lang.unlimitedStorage);
        }
      }

    };
    var spaceTab = function(){
      $(  '.space .preferences-hdd-usage').text(lang.usedSpace);
      $(  '.space .box-current-plan-bottom').find('span').text(lang.moreInfo);
      $(  '.space .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
      $(  '.space .info-plan-premium .left').find('span').text(lang.infoPlanPremium[0]);
      $(  '.space .info-plan-premium .middle .top').find('span').text(lang.infoPlanPremium[1]);
      $(  '.space .info-plan-premium .middle .bottom').find('span').text(lang.infoPlanPremium[2]);
      $(  '.space .info-plan-premium .right .top').find('span').text(lang.infoPlanPremium[3]);
      $(  '.space .info-plan-premium .right .bottom').find('span').text(lang.infoPlanPremium[5]);
      $(  '.space .info-plan-premium .right .bottom .big-text').text(lang.infoPlanPremium[4]);
      $(  '.space .box-current-plan-bottom').find('span').text(lang.moreInfo);
      $(  '.space .box-current-plan-top').find('span').text(lang.increaseStorage);

    };
    var moreTab = function(){
      $(  '.more .preferences-hdd-payment-top').find('span').text(lang.increaseStorage);
      $(  '.more .box-current-plan-top').find('span').text(lang.increaseStorage);
      $(  '.more .current-information.one .li-circle').find('span').text(lang.infoPaymentOneHead);
      $(  '.more .current-information.one .paragraph').find('span').text(lang.infoPaymentOneBody);
      $(  '.more .current-information.two .li-circle').find('span').text(lang.infoPaymentTwoHead);
      $(  '.more .current-information.two .paragraph').find('span').text(lang.infoPaymentTwoBody);
      $(  '.more .quantity').find('span').text(1);
      $(  '.more .quantity-container .top').text("$");
      $(  '.more .quantity-container .bottom').text(lang.perMonth);
      $(  '.more .show-space-selected').find('span').text('GB');
      $(  '.more .show-space-selected .big-text').text(api.tool.bytesToUnit( api.system.quota().total).split(" ", 1)[0]);
      $(  '.more .preferences-hdd-payment-bottom').find('span').text(lang.next);

    };
    var orderTab = function(){
      $(  '.order .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
      $(  '.order .preferences-hdd-payment-top').find('span').text(lang.order);
      $(  '.order .options-top-tittle').find('span').text(lang.summary);
      $(  '.order .options-top-body').find('span').text(lang.currentSpaceMayus);
      $(  '.order .options-top-body .body-bottom .right').find('span').text(lang.free);
      $(  '.order .options-top-body .body-bottom .left').find('span').text(userLocal.premium.actualStorage + "GB");
      $(  '.order .options-middle .options-middle-left').find('span').text(lang.add + $('.more .show-space-selected .big-text').text()+"GB");
      $(  '.order .options-middle .options-middle-right').find('span').text(($('.more .quantity').text()).toString().substring(29,30)+lang.dolarMonthMinus);
      $(  '.order .options-bottom .top .left').text(lang.totalStorageMayus);
      $(  '.order .options-bottom .top .right').text(lang.totalMayus);
      $(  '.order .options-bottom .bottom .left').find('span').text((parseInt(userLocal.premium.actualStorage) + parseInt($('.more .show-space-selected .big-text').text()))  + "GB");
      $(  '.order .options-bottom .bottom .right').find('span').text(lang.perMonth);
      $(  '.order .options-bottom .bottom .right .big').text(($('.more .quantity').text()).toString().substring(29,30)+lang.dolarMonthMinus);
      $(  '.order .info-current-card-bottom.owner-credit-card').find('input').attr('placeholder', lang.creditCardOptions.nameCreditCard);
      $(  '.order .info-current-card-bottom.number-credit-card').find('input').attr('placeholder', lang.creditCardOptions.numberCreditCard);
      $(  '.order .info-current-card-bottom.options-credit-card.month-credit-card').find('input').attr('placeholder', lang.creditCardOptions.monthCreditCard);
      $(  '.order .info-current-card-bottom.options-credit-card.year-credit-card').find('input').attr('placeholder', lang.creditCardOptions.yearCreditCard);
      $(  '.order .info-current-card-bottom.options-credit-card.code-credit-card').find('input').attr('placeholder', lang.creditCardOptions.codeCreditCard);
      $(  '.order .info-current-card-bottom .info-current-payment').find('p').text(lang.infoCurrentPayment);
      $(  '.order .preferences-hdd-payment-bottom').find('span').text(lang.next);
      $(  '.order .info-current-card-top').find('span').text(lang.creditCard);
      $(  '.order .info-current-without-card-bottom .top .top-bottom').find('span').text(lang.addCard);
      $(  '.order .info-current-without-card-bottom .bottom').find('span').text(lang.noCardInfo);

    };
    var finishTab = function(){
      $(  '.finish .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
      $(  '.finish .finish-middle').find('span').text(lang.congratulation);
      $(  '.finish .finish-middle .info-space').text((parseInt(userLocal.premium.actualStorage) + parseInt($('.more .show-space-selected .big-text').text()))  + "GB");
      $(  '.finish .finish-bottom').find('span').text(lang.finish);

    };
    var spacePRTab = function(){
      $(  '.space-premium .preferences-hdd-usage').text(lang.usedSpace);
      $(  '.space-premium .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
      $(  '.space-premium .box-current-plan-top').find('span').text(lang.activePlan);
      $(  '.space-premium .box-current-plan-bottom').find('span').text(lang.manage);
      $(  '.space-premium .box-current-plan-middle .premium-info .left').find('span').text(userLocal.premium.extraStorage + lang.extra );
      $(  '.space-premium .box-current-plan-middle .premium-info .right').find('span').text(userLocal.premium.actualPrice + lang.dolarMonthMinus );
      var fecha = new Date(userLocal.premium.payDay);
      $(  '.space-premium .box-current-plan-middle .premium-date').find('span').text(lang.payDay + fecha.getDate() + '/'+ (fecha.getMonth()+1) + '/' + (fecha.getFullYear()));

    };
    var modifyPRTab = function(){
      $(  '.modify-premium .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
      $(  '.modify-premium .info-current-plan .options-middle').find('span').text(lang.partPayDay[0] + new Date(userLocal.premium.payDay).getDate() + lang.partPayDay[1]);
      $(  '.modify-premium .info-current-plan .options-bottom .top').find('span').text(lang.totalStorageMayus);
      $(  '.modify-premium .info-current-plan .options-bottom .bottom').find('span').text(parseInt(userLocal.premium.actualStorage) + parseInt(userLocal.premium.extraStorage) + "GB");
      $(  '.modify-premium .number-card').find('span').text("**** **** **** " + userLocal.premium.card.number);
      $(  '.modify-premium .delete-card').find('span').text(lang.delete);
      $(  '.modify-premium .preferences-hdd-payment-bottom').find('span').text(lang.save);
      $(  '.modify-premium .preferences-hdd-payment-top').find('span').text(lang.currentPlan);
      $(  '.modify-premium .info-options .options-top .bottom').find('span').text(userLocal.premium.actualPrice + lang.dolarMonthMinus);
      $(  '.modify-premium .info-options .options-top .top .left').find('span').text(userLocal.premium.extraStorage + lang.extra);
      $(  '.modify-premium .info-options .options-top .top .right').find('span').text(lang.modify);
      $(  '.modify-premium .info-current-card-bottom .delete-card').text(lang.delete);
      $(  '.modify-premium .info-current-card-bottom .info-current-payment').text(lang.payParagraph[0] + userLocal.premium.actualPrice + lang.payParagraph[1]+ new Date(userLocal.premium.payDay).getDate() + lang.payParagraph[2]);
      $(  '.modify-premium .info-current-card-top').find('span').text(lang.creditCard);
      $(  '.modify-premium .info-current-without-card-bottom .top .top-bottom').find('span').text(lang.addCard);
      $(  '.modify-premium .info-current-without-card-bottom .bottom').find('span').text(lang.noCardInfo);

    };
    var modifySPTab = function(){
      $(  '.modify-space .preferences-hdd-payment-top').find('span').text(lang.increaseStorage);
      $(  '.modify-space .current-information.one .li-circle').find('span').text(lang.infoPaymentOneHead);
      $(  '.modify-space .current-information.one .paragraph').find('span').text(lang.infoPaymentOneBody);
      $(  '.modify-space .current-information.two .li-circle').find('span').text(lang.infoPaymentTwoHead);
      $(  '.modify-space .current-information.two .paragraph').find('span').text(lang.infoPaymentTwoBody);
      $(  '.modify-space .quantity').find('span').text(1);
      $(  '.modify-space .quantity-container .top').text("$");
      $(  '.modify-space .quantity-container .bottom').text(lang.perMonth);
      $(  '.modify-space .show-space-selected').find('span').text('GB');
      $(  '.modify-space .show-space-selected .big-text').text(userLocal.premium.extraStorage);
      $(  '.modify-space .preferences-hdd-payment-bottom').find('span').text(lang.next);

    };
    var finishPRTab = function(){
      $(  '.finish-premium .finish-middle').find('span').text(lang.congratulation);
      $(  '.finish-premium .finish-middle .info-space').text(userLocal.premium.actualStorage + parseInt($('.modify-space .show-space-selected .big-text').text()) + "GB");
      $(  '.finish-premium .finish-bottom').find('span').text(lang.finish);

    };

    // SOCIAL NETWORKS CODE
    api.social
    .on( 'facebookAccountAdded', function( account ){

        for( var i = 0; i < 8; i++ ){
            wql.insertType( [ account.id, i ] );
        }

        socialNetworks();

    })

    .on( 'facebookAccountRemoved', function( accountId ){

        wql.removeAccount( accountId );
        socialNetworks();

    })

    .on( 'twitterAccountAdded', function( account ){

        for( var i = 0; i < 8; i++ ){
            wql.insertType( [ account.id, i ] );
        }

        socialNetworks();

    })

    .on( 'twitterAccountRemoved', function( accountId ){

        wql.removeAccount( accountId );
        socialNetworks();

    });

//StartApp
loadAppUser();
