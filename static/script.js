
wz.app.addScript( 3, 'common', function( win, params ){

	win.width( $( document.body ).width() );
	win.height( $('#wz-desktop').height() );
	var height = $('#wz-desktop').height()/2-193;
	
	$( '.preferences-top', win ).css('margin-top',height);
	
	$( win ).animate({'opacity':'1'},250);
	
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
	
	$( 'canvas', win ).fadeIn(500);
	
	$( win ).on( 'click', function( e ){
		
		if( $(this).is( e.target ) ){
			$( win ).animate({'opacity':'0'},250, function(){
				wz.app.closeWindow( win );				
			});
		}
		
	});
	
});
