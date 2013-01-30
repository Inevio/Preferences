
wz.app.addScript( 3, 'common', function( win, params ){

	win.width( $( document.body ).width() );
	win.height( $('#wz-desktop').height() );
	var height = $('#wz-desktop').height()/2-193;
	
	$( '.preferences-top', win ).css('margin-top',height)
	
	var grados = 0;
	var id = 0;
	var entrada = 0.8566632541;
	var fin = entrada*360+5;

	var iniciar = function(){
		
		var elemento = $( 'canvas', win )[ 0 ];
		ctx = elemento.getContext('2d');
		ctx.strokeStyle = "#34a7ff";
		ctx.lineWidth = 20;
		ctx.lineCap = 'round';
		
		ctx.beginPath();
		ctx.arc(110,109,98,(-Math.PI/2),(-Math.PI/2),false);
		ctx.stroke();
		
		setTimeout(function(){
			id = setInterval(animacion,10);
		},1000);
		
	}
	
    var animacion = function(){
		
		ctx.clearRect(0,0,221,220);
		
		ctx.beginPath();
		var radians = Math.PI/180 * grados - Math.PI/2;
		ctx.arc(110,109,98,(-Math.PI/2),radians,false);
		if(grados/fin < 0.5){grados += 6;
		}else{ grados += (10 - ((grados/fin)*10)) }
		ctx.stroke();
		
		if(grados >= fin){clearInterval(id)}
	
	}
	
	iniciar();
	$( 'canvas', win ).animate({'opacity':1},500);
	
});
