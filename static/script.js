
wz.app.addScript( 3, 'common', function( win, params ){

	win.width( $( document.body ).width() );
	win.height( $('#wz-desktop').height() );
	var height = $('#wz-desktop').height()/2-193;
	var idInterval = 0;
	
	$( '.preferences-top', win ).css('margin-top',height);
	
	$( win ).transition({opacity:1},250);
	
	var grados = 0;
	var id = 0;
	var entrada = 0.8566632541;
	var fin = entrada*360+5;
	var ctx = null;

	var iniciar = function(){
		
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
	
	iniciar();
	
	$( 'canvas', win ).transition({opacity:1},500);
	
	$( win )
	
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
			
			oldActive.removeClass('active');			
			$( '.preferences-bottom-content.' + oldActive.attr('id') ).transition({opacity:0},250).css('display','none');
			newActive.addClass('active');
			$( '.preferences-bottom-content.' + newActive.attr('id') ).css('display','block').transition({opacity:1},250);
			
			if( $( '.preferences-bottom-content.password' ).css('display','block') ){
				$( '.preferences-bottom-content.password' ).transition({opacity:0},250).css('display','none');
			}
			
			$('input').val('');
			$('.preferences-account-middle article, .preferences-password-middle article').find('i').removeClass();
			$('#save-data, #save-password').removeClass('active').addClass('disabled');
			
		})
		
		.on('click', '#change-password', function(){
						
			$( '.preferences-bottom-content.account' ).transition({opacity:0},250).css('display','none');
			$( '.preferences-bottom-content.password' ).css('display','block').transition({opacity:1},250);
			
			$('input').val('');
			$('.preferences-account-middle article, .preferences-password-middle article').find('i').removeClass();
			$('#save-data, #save-password').removeClass('active').addClass('disabled');
			
		})
		
		.on('click', '#cancel-password', function(){
						
			$( '.preferences-bottom-content.password' ).transition({opacity:0},250).css('display','none');
			$( '.preferences-bottom-content.account' ).css('display','block').transition({opacity:1},250);
			
			$('input').val('');
			$('.preferences-account-middle article, .preferences-password-middle article').find('i').removeClass();
			$('#save-data, #save-password').removeClass('active').addClass('disabled');
			
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

				var username = $('#username');
				var email = $('#email');
				var usernameLength = username.children('input').val().length;
				var emailLength = email.children('input').val().length;
				
				if( usernameLength || emailLength ){
					
					if( usernameLength ){
						username.find('i').addClass('process');
					}else{
						username.find('i').removeClass('process');
					}
					
					if( emailLength ){
						email.find('i').addClass('process');
					}else{
						email.find('i').removeClass('process');
					}
					
					$('#save-data').removeClass('disabled').addClass('active');
					
				}else{
	
					username.find('i').removeClass('process');
					email.find('i').removeClass('process');
					$('#save-data').removeClass('active').addClass('disabled');
					
				}
				
			}, 500);
			
		})
		
		.on('keyup', '#renew-password, #new-password, #old-password', function(){
					console.log(this);
					console.log($('#new-password'));
					console.log($('#renew-password'));
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
