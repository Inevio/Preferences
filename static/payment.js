
Stripe.setPublishableKey('pk_test_silkqGKnXMcfkbFy2Tt3nEqU');

var win = $(this)
var availablePlan = null

var availablePlans = function(){
  return request( 'GET', 'https://rest.inevio.com/payment/availableplans' )
}

var currentPlan = function(){
  return request( 'GET', 'https://rest.inevio.com/payment/currentplan' )
}

var listCards = function(){
  return request( 'GET', 'https://rest.inevio.com/payment/listcards' )
}

var processCardForm = function(){

  $('.load-only').show()
  $('.preferences-payment-button').hide()

  Stripe.card.createToken({

    number    : $('.payment-cc').val(),
    cvc       : $('.payment-cvv').val(),
    exp_month : $('.payment-date-month').val(),
    exp_year  : $('.payment-date-year').val(),
    name      : $('.payment-name').val()

  }, function( status, response ) {

    if( response.error ){

      alert( lang.creditcardError )
      $('.load-only').hide();
      $('.preferences-payment-button').show();
      return

    }

    request( 'POST', 'https://rest.inevio.com/payment/subscribe', {

      token : response.id,
      plan  : availablePlan,

    }).done( function( res ){

      listCards().done( function( res ){

        $( '.credit-number' ).text( '**** **** **** ' + res.cards[ 0 ].last4 );
        $( '.credit-name' ).text( res.cards[ 0 ].name );
        $( '.credit-exp' ).text( res.cards[ 0 ].exp_month + '/' + res.cards[ 0 ].exp_year );
        $( '.save-credit-mode' ).show();
        $( '.intro-credit-mode' ).hide();
        $('.load-only').hide();
        $('.preferences-payment-button').show();

      }).fail( function( res ){

        $('.load-only').hide();
        $('.preferences-payment-button').show();
        alert( 'No se ha podido realizar el pago, ponte en contacto con nosotros.' );

      })

    }).fail( function( res ){

      $('.load-only').hide();
      $('.preferences-payment-button').show();
      alert( 'No se ha podido realizar el pago, ponte en contacto con nosotros.' );

    })

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
  });

  return promise

}

win.on( 'click' , '.preferences-payment-button' , function(){

  processCardForm()
  // Prevent the form from submitting with the default action
  return false

});

$.when( /*currentPlan(),*/ availablePlans(), listCards() ).done( function( /*currentPlan,*/ plans, cards ){

  if( plans.plans.length ){

    $('.payment').css( 'display', 'inline-block' );

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

});

/*
win.on( 'click' , '.cancel-credit' , function(){

  $.ajax({
   type: 'POST',
   url: 'https://rest.inevio.com/unsubscribe',
   crossDomain: true,
   data: {
     id    : userId
   },
   success: function ( res ) {
     console.log( res );
     $( '.save-credit-mode' ).hide();
     $( '.intro-credit-mode' ).show();
   },
   error: function( res ) {
     console.log( res );
   }
  });

});
*/
