var app = $( this );
Stripe.setPublishableKey('pk_test_silkqGKnXMcfkbFy2Tt3nEqU');

$.ajax({
 type: 'POST',
 url: 'https://restbeta.inevio.com/checkstripe',
 crossDomain: true,
 data: {
   id : api.system.user().id
 },
 success: function ( res, status ) {

   console.log(res,status);

   if ( res.subscription != null ) {

     $( '.save-credit-mode' ).show();
     $( '.intro-credit-mode' ).hide();

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

  $form.find('button').prop('disabled', false);

  if (response.error) {

    alert( lang.creditcardError );

  } else {
   // token contains id, last4, and card type
   var token = response.id;

   console.log( token );

   // Insert the token into the form so it gets submitted to the server
   $form.append($('<input type="hidden" name="stripeToken" />').val(token));
   // and re-submit
   $.ajax({
    type: 'POST',
    url: 'https://restbeta.inevio.com/subscribe',
    crossDomain: true,
    data: {
      desc  : api.system.user().fullName,
      mail  : api.system.user().mail,
      token : token
    },
    success: function ( res, status ) {
      console.log( res, status );
    },
    error: function( res, status ) {
      console.log( res, status );
    }
   });

 }
};

jQuery(function($) {
 $('#payment-form').submit(function(e) {
   var $form = $(this);

   // Disable the submit button to prevent repeated clicks
   $form.find('button').prop('disabled', true);

   Stripe.card.createToken($form, stripeResponseHandler);

   // Prevent the form from submitting with the default action
   return false;
 });
});

app.on( 'click' , '.preferences-payment-button' , function(){
  var $form =  $('#payment-form');

  // Disable the submit button to prevent repeated clicks
  $form.find('button').prop('disabled', true);

  Stripe.card.createToken($form, stripeResponseHandler);

  // Prevent the form from submitting with the default action
  return false;
});
