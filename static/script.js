
wz.app.addScript( 3, 'common', function( win, params ){

	win.width( $( document.body ).width() );
	win.height( $('#wz-desktop').height() );
	var height = $('#wz-desktop').height()/2-193;
	var idInterval = 0;
	var cakeTotal = $('.preferences-hdd-cake-total', win);
	var cakeFree = $('.preferences-hdd-cake-free', win);
	var cakeFreeNumber = 0;
	var cakeMaxNumber = 0;
	var grados = 0;
	var id = 0;
	var entrada = 0;
	var fin = 0;
	var ctx = null;
	var oldPassword = $('#old-password', win).children('input');
	var newPassword = $('#new-password', win).children('input');
	var saveData = $('#save-data', win);
	var usernameInput = $('#username', win).children('input');
	var emailInput = $('#email', win).children('input');
	var savePassword = $('#save-password', win);
	var username = '';
	var mail = '';
	
	$( '.preferences-top', win ).css('margin-top',height);
	
	wz.config( function( error, config ) {
		cakeTotal.text(wz.tool.bytesToUnit(config.quotaMax));
		cakeFree.text(wz.tool.bytesToUnit(config.quotaFree) + ' FREE');
		cakeFreeNumber = config.quota;
		cakeMaxNumber = config.quotaMax;
		entrada = cakeFreeNumber/cakeMaxNumber;
		fin = entrada*360+5;
		
		iniciar();
	
	});
	
	win.transition({opacity:1},250);

	var iniciar = function(){
		
		$( 'canvas', win ).transition({opacity:1},500);
		
		ctx = $( 'canvas', win )[ 0 ];
		ctx = ctx.getContext('2d');
		ctx.strokeStyle = "#34a7ff";
		ctx.lineWidth = 20;
		ctx.lineCap = 'round';
		
		ctx.beginPath();
		ctx.moveTo(110,11);
		ctx.lineTo(111,11);
		ctx.stroke();
		
		setTimeout(function(){
			id = setInterval(animacion,10);
		},1000);
		
	}
	
    var animacion = function(){
		
		if(grados){	ctx.clearRect(0,0,221,220); }
		
		ctx.beginPath();
		var radians = Math.PI/180 * grados - Math.PI/2;
		ctx.arc(110,109,98,(-Math.PI/2),radians,false);
		if(grados/fin < 0.5){grados += 6;
		}else{ grados += (10 - ((grados/fin)*10)) }
		ctx.stroke();
		
		if(grados >= fin){clearInterval(id)}
	
	}
	
	var data = function(){
		
		wz.config( function( error, config ){
		
			username = config.user.user;
			mail = config.user.mail;
			$( '#username input', win ).val( username );
			$( '#email input', win ).val( mail );

		});
		
	}
	
	data();
	
	win
	
		.on( 'click', function( e ){
			
			if( $(this).is( e.target ) ){
				$( win ).transition({opacity:0},250, function(){
					wz.app.closeWindow( win );				
				});
			}
			
		})
		
		.on('click', 'li', function(){
			
			var oldActive = $('li.active');
			var newActive = $(this);
			
			if( !oldActive.is( newActive ) ){
			
				oldActive.removeClass('active');			
				$( '.preferences-bottom-content.' + oldActive.attr('id') ).transition({opacity:0},250).css('display','none');
				newActive.addClass('active');
				$( '.preferences-bottom-content.' + newActive.attr('id') ).css('display','block').transition({opacity:1},250);
				
				if( $( '.preferences-bottom-content.password' ).css('display','block') ){
					$( '.preferences-bottom-content.password' ).transition({opacity:0},250).css('display','none');
				}
				
				$('input').val('');	
				if( newActive.attr('id') === 'account' ){
					$( '#username input', win ).val( username );
					$( '#email input', win ).val( mail );
				}
				$('.preferences-account-middle article, .preferences-password-middle article').find('i').removeClass();
				saveData.add(savePassword).removeClass('active').addClass('disabled');
			
			}
			
		})
		
		.on('click', '#change-password', function(){
						
			$( '.preferences-bottom-content.account' ).transition({opacity:0},250).css('display','none');
			$( '.preferences-bottom-content.password' ).css('display','block').transition({opacity:1},250);
			
			$('input').val('');
			$('.preferences-account-middle article, .preferences-password-middle article').find('i').removeClass();
			saveData.add(savePassword).removeClass('active').addClass('disabled');
			
		})
		
		.on('click', '#cancel-password', function(){
						
			$( '.preferences-bottom-content.password' ).transition({opacity:0},250).css('display','none');
			$( '.preferences-bottom-content.account' ).css('display','block').transition({opacity:1},250);
			
			$('input').val('');
			usernameInput.val( username );
			emailInput.val( mail );
			$('.preferences-account-middle article, .preferences-password-middle article').find('i').removeClass();
			saveData.add(savePassword).removeClass('active').addClass('disabled');
			
		})
		
		.on('click', '#save-data', function(){
			
			if( saveData.hasClass('active') ){
				
				wz.config( function( error, config ){
					config.changeUsername( usernameInput.val(), function( error ){

						saveData.removeClass('active').addClass('disabled');
						$('#username', win).find('i').removeClass();
						$('#email', win).find('i').removeClass();
						
						if( error ){
							alert( error );
							usernameInput.val( username );
							emailInput.val( mail );
						}else{
							data();
							alert( 'Your data has been changed successfully' );
						}
						
					});
				});
				
			}
			
		})
		
		.on('click', '#save-password', function(){
			
			if( savePassword.hasClass('active') ){
				
				wz.config( function( error, config ){
					config.changePassword( oldPassword.val(), newPassword.val(), function( error ){

						savePassword.removeClass('active').addClass('disabled');
						$('#renew-password', win).find('i').removeClass();
						
						if( error ){
							oldPassword.val('');
							oldPassword.focus();
							alert( error );
						}else{
							oldPassword.val('');
							newPassword.val('');
							$('#renew-password', win).children('input').val('');
							alert( 'Your password has been changed successfully' );		
						}
						
					});
				});
				
			}
			
		})
		
		.on('click', '#old-password figure i', function(){
			
			alert( 'Please send us a mail to weezeel@weezeel.com asking us to retrieve your password. Thank you.' );
		
		})
		
		.on('click', '.preferences-account-middle article figure', function(){
			$(this).siblings('input').focus();
		})
		
		.on('click', '#new-password figure, #renew-password figure', function(){
			$(this).siblings('input').focus();
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
					
					if( usernameLength && !(userEqual) ){
						usernameInput.siblings('figure').children('i').addClass('process');
					}else{
						usernameInput.siblings('figure').children('i').removeClass('process');
					}
					
					if( emailLength && !(mailEqual) ){
						emailInput.siblings('figure').children('i').addClass('process');
					}else{
						emailInput.siblings('figure').children('i').removeClass('process');
					}
					
					if( !userEqual || !mailEqual ){
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
			
		});
		
});
