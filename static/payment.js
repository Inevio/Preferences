var app = $( this );
var myContactID = api.system.user().id;

Stripe.setPublishableKey('pk_live_ufl5Tdl4iL0ylmu3k3N1hmWd');

$.ajax({
 type: 'POST',
 url: 'https://rest.inevio.com/checkstripe',
 crossDomain: true,
 data: {
   id : api.system.user().id
 },
 success: function ( res, status ) {

   console.log(res,status);

   if ( res.customer != null ) {

     $( '.save-credit-mode' ).show();
     $( '.intro-credit-mode' ).hide();

     $.ajax({
      type: 'POST',
      url: 'https://rest.inevio.com/listcards',
      crossDomain: true,
      data: {
        id : api.system.user().id
      },
      success: function ( res, status ) {

        console.log( res, status );

        $( '.credit-number' ).text( '****   ****   ****  ' + res.cards.data[0].last4 );
        $( '.credit-name' ).text( res.cards.data[0].name );
        $( '.credit-exp' ).text( res.cards.data[0].exp_month + '/' + res.cards.data[0].exp_year );

        $( '.save-credit-mode' ).show();
        $( '.intro-credit-mode' ).hide();

      },
      error: function( res, status ) {

        $( '.save-credit-mode' ).hide();
        $( '.intro-credit-mode' ).show();

        console.log( res, status );
      }
     });

   }else{

     $( '.save-credit-mode' ).hide();
     $( '.intro-credit-mode' ).show();

   }

 },
 error: function( res, status ) {
   console.log( res, status );
 }
});

var stripeResponseHandler = function( status, response ) {
  var $form = $('#payment-form');

  if (response.error) {

    alert( lang.creditcardError );
    $('.load-only').hide();
    $('.preferences-payment-button').show();

  } else {
   // token contains id, last4, and card type
   var token = response.id;

   console.log( token );

   // Insert the token into the form so it gets submitted to the server
   $form.append($('<input type="hidden" name="stripeToken" />').val(token));

   /*
   if ( myContactID === 5196 ) {

     $.ajax({
      type: 'POST',
      url: 'https://rest.inevio.com/makepayment',
      crossDomain: true,
      data: {
        token: token,
        user:  api.system.user().mail
      },
      success: function ( res, status ) {

        console.log( res, status );
        $.ajax({
         type: 'POST',
         url: 'https://rest.inevio.com/listcards',
         crossDomain: true,
         data: {
           id    : api.system.user().id
         },
         success: function ( res, status ) {

           console.log( res, status );

           $('.load-only').hide();
           $('.preferences-payment-button').show();

           alert( 'Pago realizado con éxito' );

         },
         error: function( res, status ) {

           $('.load-only').hide();
           $('.preferences-payment-button').show();

           alert( 'No se ha podido realizar el pago, ponte en contacto con nosotros.' );

           console.log( res, status );

         }
        });


      },
      error: function( res, status ) {
        console.log( res, status );
      }
     });

   }
   */

   //if ( myContactID === 924 ) {

     $.ajax({
      type: 'POST',
      url: 'https://rest.inevio.com/subscribe',
      crossDomain: true,
      data: {
        desc  : api.system.user().fullName,
        mail  : api.system.user().mail,
        token : token,
        plan  : api.system.user().id === 5196 ? 'plan1' : ( api.system.user().id === 11610 ? 'plan2' : 'plan0' ),
        id    : api.system.user().id
      },
      success: function ( res, status ) {


        console.log( res, status );
        $.ajax({
         type: 'POST',
         url: 'https://rest.inevio.com/listcards',
         crossDomain: true,
         data: {
           id    : api.system.user().id
         },
         success: function ( res, status ) {

           console.log( res, status );

           $( '.credit-number' ).text( '****   ****   ****  ' + res.cards.data[0].last4 );
           $( '.credit-name' ).text( res.cards.data[0].name );
           $( '.credit-exp' ).text( res.cards.data[0].exp_month + '/' + res.cards.data[0].exp_year );

           $( '.save-credit-mode' ).show();
           $( '.intro-credit-mode' ).hide();

           $('.load-only').hide();
           $('.preferences-payment-button').show();

         },
         error: function( res, status ) {

           $( '.save-credit-mode' ).hide();
           $( '.intro-credit-mode' ).show();

           $('.load-only').hide();
           $('.preferences-payment-button').show();
           console.log( res, status );

         }
        });


      },
      error: function( res, status ) {
        console.log( res, status );
      }
     });

   //}

 }
};

jQuery(function($) {
 $('#payment-form').submit(function(e) {
   var $form = $(this);

   // Disable the submit button to prevent repeated clicks
   $('.load-only').show();
   $('.preferences-payment-button').hide();

   Stripe.card.createToken({
     name: $('.payment-name').val(),
     number: $('.payment-cc').val(),
     cvc: $('.payment-cvv').val(),
     exp_month: $('.payment-date-month').val(),
     exp_year: $('.payment-date-year').val()
   }, stripeResponseHandler);


   // Prevent the form from submitting with the default action
   return false;
 });
});

app.on( 'click' , '.preferences-payment-button' , function(){
  var $form =  $('#payment-form');

  // Disable the submit button to prevent repeated clicks
  $('.load-only').show();
  $('.preferences-payment-button').hide();

  Stripe.card.createToken({
    number: $('.payment-cc').val(),
    cvc: $('.payment-cvv').val(),
    exp_month: $('.payment-date-month').val(),
    exp_year: $('.payment-date-year').val(),
    name: $('.payment-name').val()
  }, stripeResponseHandler);

  // Prevent the form from submitting with the default action
  return false;
});

app.on( 'click' , '.cancel-credit' , function(){

  $.ajax({
   type: 'POST',
   url: 'https://rest.inevio.com/unsubscribe',
   crossDomain: true,
   data: {
     id    : api.system.user().id
   },
   success: function ( res, status ) {
     console.log( res, status );
     $( '.save-credit-mode' ).hide();
     $( '.intro-credit-mode' ).show();
   },
   error: function( res, status ) {
     console.log( res, status );
   }
  });

});
