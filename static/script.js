Stripe.setPublishableKey('pk_live_ufl5Tdl4iL0ylmu3k3N1hmWd');

// Variables
var win = $( this );
var language = null;
var user = null;

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
var forgetPasswordHtml   = "https://www.inevio.com/";
var popup                = null;

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
var accountPrototype     = $( '.preferences-social-account.wz-prototype', win );

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

/* Invite variables */
var addMailButton = $('.add-mail span');
var mailPrototype = $('.mail.wz-prototype');
var mailList      = $('.mail-list');
var shareButton   = $('.share-button');
var validMails    = [];
var MAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/

var spaceTabs = [
  "space-premium",
  "modify-premium",
  "modify-space",
  "order-premium",
  "finish-premium",
  "space",
  "more",
  "order",
  "finish",
];


var currentTab = null;
var loadTab = null;
var makePremium = true;
var passwordTry = 0;

// Info about user & plans
var infoSubscriptions = null;
var quota = null;
var inevioPlans = [];
var typePlan = null;
/*
cardStatus mode{
  0 -> no card
  1 -> card-active
  2 -> mode add card
}
*/


var cardStatus = 0;
var listPlans = null;
var plansCounter = 0;
var activePlan = null;
var minusSpaceCondition = true;
var moreSpaceCondition = true;
var tabCondition = true;
var loading = false;

var userLocal = {

  info : false,
  customPlan : false,
  activePlan: null,
  base: 0,
  totalStorage : 0,
  actualPrice : 0,
  extraStorage : 0,
  payDay : 0,
  card : {

    id: null,
    number : 0,
    brand : null

 }

}

var codeNumber = [48,49,50,51,52,53,54,55,56,57];

var plan0 = {

  addQuota : 0,
  amount  : 0,
  currency :  "usd",
  customPlan : false,
  id  : "plan0",
  name  : "Basic Plan"

};

var COLORS = {

  "colorMain": '#7ebe30',
  "grayHorbito": '#51575f',
  "grayHorbitoHover": '#474d54',
  "grayHorbitoActive": '#42464d',
  "grayHorbitoDisabled": '#c3c9cc',
  "greenHorbito": '#60b25e',
  "greenHorbitoHover": '#4ea34b',
  "greenHorbitoActive": '#3d903b',
  "greenHorbitoDisabled": '#c3c9cc',
  "blueHorbito": '#0071f6',
  "blueHorbitoHover": '#006ae6',
  "blueHorbitoActive": '#0062d6',
  "blueHorbitoDisabled": '#c3c9cc',
  "redHorbito": '#ff2153',
  "redHorbitoHover": '#f81d4e',
  "redHorbitoActive": '#e51846',
  "redHorbitoDisabled": '#c3c9cc',
  "darkHorbito": '#252525',
  "gray1": '#717171',
  "gray2": '#9a9aa2',
  "gray3":  '#f3f3f3',
  "lightGray": '#f9f9fe',
  "whiteHorbito ": '#f7f7f7'

}

inevioPlans.push(plan0);
activePlan= plan0.id;


addMailButton.on( 'click' , function(){
  addMail();
});

shareButton.on( 'click' , function(){
  share();
});

win.on( 'blur input' , '.mail' , function(){
  checkMails();
});

var addMail = function(){

  var mail = mailPrototype.clone();
  mail.removeClass('wz-prototype');
  mailList.append(mail);
  mailList.stop().clearQueue().animate( { scrollTop : mailList[0].offsetTop }, 400  );

}

var share = function(){

  if( shareButton.hasClass( 'valid' ) ){

    api.user.inviteByMail(validMails);
    api.banner()
      .setTitle( lang.invitationSentTitle )
      .setText( lang.invitationSentSubtitle )
      .setIcon( 'https://static.inevio.com/app/3/icon.png' )
      .render();
    mailList.find('.mail:not(.wz-prototype)').each(function(){
        $(this).removeClass('wrong').val('');
    });

  }

}

var checkMails = function(){

  $('.wrong').removeClass('wrong');
  shareButton.removeClass('valid');
  validMails = []

  mailList.find('.mail:not(.wz-prototype)').each( function(){

    if ( $(this).val() != '' ) {

      if( $(this).val().length && MAIL_REGEXP.test( $(this).val() ) ){
        validMails.push( $(this).val() )
        shareButton.addClass('valid');
      }else{
        $(this).addClass('wrong');
      }

    }

  });

}


// Quota circle functions
var startCircleAnimation = function( end ){

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
  cakeCanvas.strokeStyle = COLORS.blueHorbito;

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


// Quota circle functions
var changeCake = function( space ){

  api.system.updateQuota( function(){

    if( space ){
      cakeFree.text( api.tool.bytesToUnit( space - configObject.quota, 2 ) + ' ' + lang.freeSpace );
    }else{
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
  avatarCanvas.strokeStyle = COLORS.blueHorbito;

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
  avatarCanvas.strokeStyle = COLORS.blueHorbito;

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

  $('.modify-space .quantity').find('span').text(userLocal.actualPrice);
  plansCounter = listPlans.indexOf(userLocal.activePlan);
  var espacioTotal = quota.base + inevioPlans[plansCounter].addQuota;

  if(infoSubscriptions.currentPlan.addQuota == "Infinity"){

    //espacioTotal = lang.unlimitedStorage;
    espacioTotal = 10000;

  }
  else{

    //espacioTotal = parseInt(userLocal.totalStorage);

    if(plansCounter == inevioPlans.length - 1){

      moreSpaceCondition = false;
      $('.'+currentTab+ ' .more-icon').addClass('block');
      $('.'+currentTab+ ' .more-icon').removeClass('moreStorage');

    }else{

      moreSpaceCondition = true;
      $('.'+currentTab+ ' .more-icon').addClass('moreStorage');
      $('.'+currentTab+ ' .more-icon').removeClass('block');

    }

    if(plansCounter == 0){

      minusSpaceCondition = false;
      $('.'+currentTab+ ' .minus-icon').addClass('block');
      $('.'+currentTab+ ' .minus-icon').removeClass('minusStorage');

    }else{

      minusSpaceCondition = true;
      $('.'+currentTab+ ' .minus-icon').addClass('minusStorage');
      $('.'+currentTab+ ' .minus-icon').removeClass('block');

    }

    $('.modify-space button').removeClass('validate');
    $('.modify-space button').addClass('block');
    //$('.modify-space .show-space-selected .big-text').text(parseInt(userLocal.extraStorage) + parseInt(userLocal.actualStorage));

  }

  $('.modify-space .show-space-selected span:last-child').text(api.tool.bytesToUnit(espacioTotal).split(" ", 2)[1]);
  $('.modify-space .show-space-selected .big-text').text(api.tool.bytesToUnit(espacioTotal).split(" ", 2)[0]);
  $('.modify-space .quantity').text(userLocal.actualPrice);

}

var nextPage = function(crntTab, mode) {

  if( $( '.'+crntTab ).hasClass( 'active' ) ){

    calculateNextPage(crntTab, mode);

    $('.'+crntTab).removeClass('active');
    $('.'+loadTab).addClass('active');
    currentTab = loadTab;

  }else{
    console.log('ERROR! NO ACTIVE CLASS FOUND', crntTab);
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
      if(actualPage == "order-premium"){
        loadTab = spaceTabs[4];
        break;
      }
      if(actualPage == "finish-premium"){
        loadTab = spaceTabs[0];
        break;
      }

      //NORMAL
      if(actualPage == "space"){
        loadTab = spaceTabs[6];
        break;
      }
      if(actualPage == "more"){
        loadTab = spaceTabs[7];
        break;
      }
      if(actualPage == "order"){
        loadTab = spaceTabs[8];
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
      if(actualPage == "order-premium"){
        loadTab = spaceTabs[2];
        break;
      }
      //NORMAL
      if(actualPage == "more"){
        loadTab = spaceTabs[5];
        break;
      }
      if(actualPage == "order"){
        loadTab = spaceTabs[6];
        break;
      }

    case 3:
      if(actualPage == "modify-space"){
        //loadTab = spaceTabs[4];
        console.log("user wants unsubscribe?");
        break;
      }
    default:
      console.log(mode);
      console.log("ERROR no mode selected");

  }

};

var clearVar = function() {
  //plansCounter = 0;
  $('.hdd-container').scrollLeft(0);

  $('.'+currentTab).removeClass('active');

  if( userLocal.info){

    loadTab = spaceTabs[0];
    currentTab = spaceTabs[0];
    plansCounter = listPlans.indexOf(userLocal.activePlan);

  }else{

    loadTab = spaceTabs[5];
    currentTab = spaceTabs[5];

    if( $( '.more .minus-icon' ).hasClass( 'minusStorage' ) ){

      $('.more .minus-icon').removeClass('minusStorage');
      $('.more .minus-icon').addClass('block');

    }

    if( $( '.more .minus-icon' ).hasClass( 'block' ) ){

      $('.more .more-icon').addClass('moreStorage');
      $('.more .more-icon').removeClass('block');

    }

    $('.more .show-space-selected span:last-child').text(api.tool.bytesToUnit(userLocal.base).split(" ", 2)[1]);
    $('.more .show-space-selected .big-text').text(api.tool.bytesToUnit(userLocal.base).split(" ", 2)[0]);
    $('.more .quantity').text(inevioPlans[0].amount);

  }

  $('.'+loadTab).addClass('active');

};

var updateSpaceToPremium = function(){

  spacePRTab();
  modifyPRTab();
  modifySPTab();
  $('.space .fr-box').addClass('hidden');
  $('.space .pr-box').removeClass('hidden');
  $('.pr-box .box-current-plan-top').find('span').text(lang.activePlan);
  $('.pr-box .box-current-plan-bottom').find('span').text(lang.manage);
  $('.pr-box .box-current-plan-middle .premium-info span').text(lang.premiumPlan + api.tool.bytesToUnit(userLocal.extraStorage) + lang.extra +  userLocal.actualPrice + lang.dolarMonthMinus);
  var fecha = new Date(userLocal.payDay);
  $(  '.pr-box .box-current-plan-middle .premium-date').find('span').text(lang.payDay + fecha.getDate() + '/'+ (fecha.getMonth()+1) + '/' + (fecha.getFullYear()));

};

var updateSpaceToFree = function(){

  spaceTab();
  moreTab();
  orderTab();
  finishTab();
  $('.space .pr-box').addClass('hidden');
  $('.space .fr-box').removeClass('hidden');

};


var updateUserLocal = function(value, attr){

  /*
  0 userLocal.info
  1 userLocal.totalStorage
  2 userLocal.actualPrice
  3 userLocal.extraStorage
  4 userLocal.payDay
  5 userLocal.activePlan
  6 userLocal.base
  */
  switch (attr) {

    case 0:
      userLocal.info = value;
      break;
    case 1:
      userLocal.totalStorage = value;
      break;
    case 2:
      userLocal.actualPrice = value;
      break;
    case 3:
      userLocal.extraStorage = value;
      break;
    case 4:
      userLocal.payDay = value;
      break;
    case 5:
      userLocal.activePlan = value;
      break;
    case 6:
      userLocal.base = value;
      break;
    default:
      console.log("Invalid attr: "+attr , "value: "+value );

  }

};



var resetLocalVar = function(){

  quota = api.system.quota();
  $('.hdd .more button').addClass('block');
  moreSpaceCondition = true;
  $(  '.hdd .more .minus-icon').addClass('block');

  api.config.getSubscriptionStatus(function( err, info ){

    //api.app.storage('infoSubscriptions', info);
    infoSubscriptions = info;
    //activePlan = infoSubscriptions.currentPlan.id;
    inevioPlans= [];
    inevioPlans.push(plan0);
    for(var i = 0; i<infoSubscriptions.availablePlans.length; i++){
      inevioPlans.push(infoSubscriptions.availablePlans[i]);
    }

    //console.log(inevioPlans);
    inevioPlans = inevioPlans.sort( function( a, b ){
      return a.amount - b.amount
    })
    listPlans = inevioPlans.map(function( item ){
      return item.id
    });


    if(activePlan == inevioPlans[0].id){
      minusSpaceCondition = false;
    }
    if(activePlan == inevioPlans[inevioPlans.length - 1].id){
      moreSpaceCondition = false;
    }
    tabCondition = false;
    loadInfoUserSub(infoSubscriptions);
    reLoadApp();

  });

  //console.log("RESET");

};

var reLoadApp = function(){

  spacePRTab();
  modifyPRTab();
  modifySPTab();
  spaceTab();
  moreTab();
  orderTab();
  finishTab();

}


var validateEmail = function(mail){

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(mail);

}

var changePassword = function(){

  api.config.setPassword( $('.popup .old-input').val(), $('.popup .new-input').val(), function( error ){

    if( error ){

      alert( error );

    }else{

      api.banner()
        .setTitle( lang.passwordChanged )
        .setText( lang.passwordChanged2 )
        .render();

    }

  });

};

var changeUsername = function(){

  var value = ' '+$('.popup .new-input').val();

  api.config.setUsername($('.popup .new-input').val(), function(error){

    if(error){
      alert( error);
    }else{

      $('.info-username span').text(value);
      api.banner()
        .setTitle( lang.usernameChanged )
        .setText( lang.usernameChanged2 +  value)
        .render();

    }

  })

};

var changeName = function(){

  var value = ' ' + $('.popup .old-input').val() + ' ' + $('.popup .new-input').val();

  api.config.setFullName( $('.popup .old-input').val(),$('.popup .new-input').val(), function(error){

    if(error){
      alert( error );
    }else{

      $('.info-name span').text(value);
      api.banner()
        .setTitle( lang.nameChanged )
        .setText( lang.nameChanged2 +  value)
        .render();
    }

  })

}

var changeMail = function(){

  var value = ' ' + $('.popup .new-input').val();

  api.config.setMail( $('.popup .new-input').val(), function(error){

    if(error){
      alert( error );
    }else{

      api.banner()
        .setTitle( lang.mailChanged )
        .setText( lang.mailChanged2 +  value)
        .render();

    }

  })

};


var resetInputStatus = function(){

  $('.hdd input').val("");

  $('.modify-premium .info-current-new-card-bottom .owner-credit-card').removeClass('error');
  $('.modify-premium .info-current-new-card-bottom .number-credit-card').removeClass('error');
  $('.modify-premium .month-year-credit-card').removeClass('error');
  $('.modify-premium .info-current-new-card-bottom .code-credit-card').removeClass('error');

  $('.order-premium .info-current-new-card-bottom .owner-credit-card').removeClass('error');
  $('.order-premium .info-current-new-card-bottom .number-credit-card').removeClass('error');
  $('.order-premium .month-year-credit-card').removeClass('error');
  $('.order-premium .info-current-new-card-bottom .code-credit-card').removeClass('error');

  $('.order .owner-credit-card').removeClass('error');
  $('.order .number-credit-card').removeClass('error');
  $('.order .month-year-credit-card').removeClass('error');
  $('.order .info-current-new-card-bottom .code-credit-card').removeClass('error');

};

var loadInfoUserSub = function (infoSubscriptions){

  // only for dev infoSubscriptions.currentPlan == null --> loads app without premium
  //console.log("QUITAR IMPORTANTE");
  //infoSubscriptions.currentPlan = null;

  if(infoSubscriptions.currentPlan !=  null){

    userLocal.info = true;
    userLocal.customPlan = infoSubscriptions.currentPlan.customPlan;

    if(userLocal.customPlan){
      $('.hdd .modify-premium .change-plan').addClass('block').removeClass('pointer');
    }else{
      $('.hdd .modify-premium .change-plan').removeClass('block').addClass('pointer');
    }

    userLocal.totalStorage = quota.total;
    userLocal.base = quota.base;
    userLocal.actualPrice = infoSubscriptions.currentPlan.amount;
    userLocal.extraStorage = infoSubscriptions.currentPlan.addQuota;
    userLocal.payDay = infoSubscriptions.currentPlan.current_period_end;

    if (infoSubscriptions.listCards[0] == null){

      cardStatus = 0;
      userLocal.card.number = "null";
      userLocal.card.id = null;
      userLocal.card.brand = null;
      $('.modify-premium .info-current-card').removeClass('card-active');

    }else{

      cardStatus = 1;
      userLocal.card.number = infoSubscriptions.listCards[0].last4;
      userLocal.card.id = infoSubscriptions.listCards[0].id;
      userLocal.card.brand = infoSubscriptions.listCards[0].brand;
      $('.modify-premium .info-current-card').addClass('card-active');

    }

    userLocal.activePlan = infoSubscriptions.currentPlan.id;

    if (tabCondition){
      currentTab = spaceTabs[0];
    }

    plansCounter = listPlans.indexOf(userLocal.activePlan);
    $('.'+currentTab).addClass('active');

   if($('.hdd-container').hasClass('free-user')){

     $('.hdd-container').removeClass('free-user');
     $('.hdd-container').addClass('premium-user');

   }

  }else{

    userLocal.info = false;
    userLocal.customPlan = false;
    userLocal.totalStorage = quota.total;
    userLocal.base = quota.base;
    userLocal.actualPrice = 0;
    userLocal.extraStorage = 0;
    userLocal.payDay = null;
    userLocal.card.number = null;
    userLocal.card.id = null;
    userLocal.card.brand = null;
    plansCounter=0;
    currentTab = spaceTabs[5];
    $( '.' + currentTab ).addClass('active');

    if( $('.hdd-container').hasClass('premium-user') ){

      $('.hdd-container').removeClass('premium-user');
      $('.hdd-container').addClass('free-user');

    }

  }
};

// API Events
api.upload

// Capturing the avatar uploading progress
.on( 'avatarProgress', function( percent ){

  if( !avatarUploading ){

    $( '.preferences-account-avatar', win )[ 0 ].getContext('2d').clearRect( 0, 0, 148, 148 );
    $( '.preferences-account-avatar', win ).css( 'opacity', 1 );
    avatarGrads = 0;

    avatarUploading = true;
    $( '.avatar-edit span', win ).text( '' ).transition({ width : '1px', 'margin-right' : '84px' }, 500, function(){ $( this ).css( 'opacity', 0 ); } );

  }

  uploadingAvatar( percent );

})



// Capturing the avatar uploading end
.on( 'avatarEnd', function(){

  $( '.preferences-account-image', win ).transition({ opacity: 0.3 }, 100, function(){

    $( this ).css( 'background-image', 'url(' + avatarUrl + '?' + Math.random() + ')' ).transition({ opacity : 1 }, 100, function(){

      $( '.preferences-account-avatar', win ).transition({ opacity : 0 }, function(){

        $( '.preferences-account-image', win ).transition({ 'box-shadow' : 'inset 0 0 24px 4px #0071f6' }, function(){
          $( this ).transition({ 'box-shadow' : 'none' });
        });

        $( '.preferences-account-image', win ).transition({ 'box-shadow' : 'none' }, function(){
          $( this ).transition({ 'box-shadow' : 'inset 0 1px 1px rgba(255, 255, 255, 0.3)' });
        });

        $( '.avatar-edit span', win ).css( 'opacity', 1 ).transition({ width : '85px', 'margin-right' : 0 }, 500, function(){
          $( this ).text( lang.avatarEdit );
          avatarUploading = false;
        });

      });

    });

  });

})


// Capturing the walppaper uploading progress
.on( 'wallpaperProgress', function( percent ){

  $('.preferences-wallpaper-upload .progress').height( percent * 100 + '%' );
  $('.upload-button').css('top',  (percent * (-100)) + '%' );

})

// Capturing the wallpaper uploading end
.on( 'wallpaperEnd', function( wallpaper ){

  $('.preferences-wallpaper-upload .progress').height( 0 );
  $('.upload-button').css('top',  '0px' );

})

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

  clearVar();
  resetLocalVar();

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


.on( 'click' , '.hdd .nextTab', function(){

  resetInputStatus();

  if( !loading ){

    if($(this).parents('.preferences-hdd-payment').hasClass(currentTab)){

      if(currentTab == 'space'){
        plansCounter = 0;
        $('.more button').addClass('block')
      }

      nextPage(currentTab, 1);
      var currentObject = $('.hdd-container');
      $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){});

    }else{
      console.log("ERROR, no currentTab" , $(this).parents('.preferences-hdd-payment') , currentTab);
    }

    //console.log("Pestaña actual: "+currentTab);

  }

})

.on('focus', '.hdd input',function(){

  $(this).parent('.new-input').removeClass('error');
  $(this).parent('.new-input').addClass('active');

})

.on('blur', '.hdd input',function(){
  $(this).parent('.new-input').removeClass('active');
  $(this).parent('.new-input').removeClass('error');
})

.on('blur', '.popup new-input, .popup .new-input',function(){

  $(this).removeClass('active');
  if(!popup == 'email'){
    $(this).removeClass('wrong');
  }

})


.on( 'click' , '.hdd .back', function(){

  if(!loading){

    resetInputStatus();

    if($(this).parents('.preferences-hdd-payment').hasClass(currentTab)){

      if (currentTab == '.modify-premium' || currentTab == '.order-premium')  {

        if(! $('.'+currentTab +' .secure-by-stripe').hasClass('hidden') && $('.'+currentTab+ ' .info-current-card').hasClass('new-card')){

          $('.'+currentTab +' .secure-by-stripe').addClass('hidden');
          $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
          $('.'+currentTab +' .info-current-card').removeClass('new-card');

        }

      }

      nextPage(currentTab, 2);
      var currentObject = $('.hdd-container');
      $('.order .secure-by-stripe').addClass('hidden');
      $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
      $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() - 838}, 800, function(){});

    }else{
      console.log("ERROR, no currentTab" , $(this).parents('.preferences-hdd-payment') , currentTab);
    }
    //console.log("Pestaña actual: "+currentTab);
  }

})

.on( 'click' , '.change-plan' , function(){

  if(!userLocal.customPlan){

    plansCounter = listPlans.indexOf(userLocal.activePlan);

    if(userLocal.card.id == null && cardStatus == 2){
      cardStatus = 0;
    }

    if( $(this).parents('.preferences-hdd-payment').hasClass(currentTab) ){

      nextPage(currentTab, 1);
      loadModifySpace();
      var currentObject = $('.hdd-container');
      $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){});

    }else{
      console.log("ERROR, no currentTab");
    }
    //console.log("Pestaña actual: "+currentTab);

  }

})


.on(  'click', '.finish .loadPremium', function(){

  //update userLocal and load Premium-mode
  updateUserLocal(true, 0);
  updateUserLocal(inevioPlans[listPlans.indexOf(activePlan)].amount, 2);
  updateUserLocal(inevioPlans[listPlans.indexOf(activePlan)].addQuota, 3);
  updateUserLocal(new Date(), 4);
  resetLocalVar();

})

.on(  'click', '.finish-premium .updatePremium', function(){
  //
})

.on( 'click' , '.finish-premium .inicio', function(){

  if( $(this).parents('.preferences-hdd-payment').hasClass(currentTab) ){

    nextPage(currentTab, 1);
    $('.hdd-container').scrollLeft(0);

    if(!makePremium){

      updateSpaceToFree();
      var tab = $('.premium-user');
      tab.removeClass('premium-user');
      tab.addClass('free-user');

    }

    spaceTab();
    resetLocalVar();
    //$(  '.preferences-hdd-cake-total').text( api.tool.bytesToUnit( api.system.quota().total ) );
    //$(  '.preferences-hdd-cake-free').text( api.tool.bytesToUnit( api.system.quota().free, 2 ) + ' ' + lang.freeSpace );

  }else{
    console.log("ERROR, no currentTab");
  }
  //console.log(currentTab);

})

.on( 'click' , '.finish .inicio', function(){

  if( $(this).parents('.preferences-hdd-payment').hasClass(currentTab) ){

    nextPage(currentTab, 1);
    spaceTab();
    spacePRTab();

    resetLocalVar();

    if (makePremium){

      updateSpaceToPremium();
      var tab = $('.free-user');
      tab.removeClass('free-user');
      tab.addClass('premium-user');
      $('.hdd-container').scrollLeft(0);

    }else{

      updateSpaceToFree();
      $('.hdd-container').scrollLeft(0);

    }

  }else{
    console.log("ERROR, no currentTab");
  }

})

.on('keypress' , '.credit-card-info input', function(tecla){

  var tipo = null;
  if(this.className == "number-card"){
    tipo = 1;
  }else if (this.className == "month-year-card"){
    tipo = 2;
  }else if (this.className == "code-card"){
    tipo = 3;
  }else{
    tipo = 0;
  }
  if(tipo == 0){
    $(this).append(tecla.key);
  }

  if(tipo == 1){

    if(tecla.charCode == 0){

      var text = $(this).val();
      text = text.toString();
      text.substring(0, text.length - 1);
      $(this).val(text);
      return;

    }

    if($(this).val().length < 19){

      if(tecla.charCode == codeNumber[codeNumber.indexOf(tecla.charCode)]){
        $(this).append(codeNumber.indexOf(tecla.charCode));
      }else{
        return false;
      }

    }else{
      return false;
    }

  }

  if(tipo == 2){

    if(tecla.charCode == 0){

      var text = $(this).val();
      text = text.toString();
      text.substring(0, text.length - 1);
      $(this).val(text);
      return;

    }

    if($(this).val().length < 5){

      if($(this).val().length == 2){

        $(this).val($(this).val() + "/");
      }

      if( tecla.charCode == codeNumber[codeNumber.indexOf(tecla.charCode)] ){
        $(this).append(codeNumber.indexOf(tecla.charCode));
      }else{
        return false;
      }

    }else{
      return false;
    }

  }

  if(tipo == 3){

    if(tecla.charCode == 0){

      var text = $(this).val();
      text = text.toString();
      text.substring(0, text.length - 1);
      $(this).val(text);
      return;

    }

    if($(this).val().length < 4){

      if(tecla.charCode == codeNumber[codeNumber.indexOf(tecla.charCode)]){
        $(this).append(codeNumber.indexOf(tecla.charCode));
      }else{
        return false;
      }

    }else{
      return false;
    }
  }

})

.on(  'click', '.modify-premium .save', function(){

  if(cardStatus == 1){
    return;
  }

  if(cardStatus == 0){

    $('.modify-premium .preferences-hdd-payment-bottom button').addClass('back');
    $('.modify-premium .card-active').removeClass('card-active');
    $('.modify-premium .new-card').removeClass('new-card');
    $('.modify-premium .secure-by-stripe').addClass('hidden');
    $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
    return;

  }

  var month_year = $('.modify-premium .month-year-card').val().split("/");

  if(month_year[1] == null && month_year[0] != null){
    month_year[1] = "";
  }

  var card = {

    name : $('.modify-premium .new-card .owner-card').val(),
    number : $('.modify-premium .info-current-new-card-bottom .number-card').val(),
    month : month_year[0],
    year :  month_year[1],
    code :  $('.modify-premium .info-current-new-card-bottom .code-card').val()

  }

  if( card.name == "" && card.number == "" && card.month == "" && card.code == "" ){

    cardStatus = 0;
    $('.modify-premium .preferences-hdd-payment-bottom button').addClass('back');
    $('.modify-premium .card-active').removeClass('card-active');
    $('.modify-premium .new-card').removeClass('new-card');
    $('.modify-premium .secure-by-stripe').addClass('hidden');
    $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
    return;

  }

  if( (cardStatus == 2)&&( card.name == "" | card.number == "" | card.month == "" | card.code == "") ){

    alert(lang.emptyInput);
    if(card.name == ""){
      $('.modify-premium .info-current-new-card-bottom .owner-credit-card').addClass('error');
    }
    if(card.number == ""){
      $('.modify-premium .info-current-new-card-bottom .number-credit-card').addClass('error');
    }
    if(card.month == "" || card.year == ""){
      $('.modify-premium .month-year-credit-card').addClass('error');
    }
    if(card.code ==  ""){
      $('.modify-premium .info-current-new-card-bottom .code-credit-card').addClass('error');
    }
    return;

  }

  if( parseInt(card.month) < 10 ){
    card.month = '0' + card.month;
  }

  if (cardStatus == 2){

    loadLoading();
    Stripe.card.createToken({

      number    : card.number,
      cvc       : card.code,
      exp_month : card.month,
      exp_year  : card.year,
      name      : card.name

    }, function( status, response ) {

      if( response.error ){

        alert( lang[response.error.code] );
        if(response.error.code == "invalid_number" || response.error.code == "incorrect_number"){
          $('.modify-premium .info-current-new-card-bottom .number-credit-card').addClass('error');
        }
        if(response.error.code == "invalid_expiry_month" || response.error.code == "invalid_expiry_year"){
          $('.modify-premium .month-year-credit-card').addClass('error');
        }
        if(response.error.code == "invalid_cvc"){
          $('.modify-premium .info-current-new-card-bottom .code-credit-card').addClass('error');
        }
        loadLoading();
        return;

      }

      request( 'POST', 'https://restbeta.horbito.com/payment/addCard', {

        token : response.id

      })
      .done( function( res ){

        resetLocalVar();
        $('.modify-premium .preferences-hdd-payment-bottom button').addClass('back');
        cardStatus=1;
        setTimeout(function(){

          $('.modify-premium .new-card').removeClass('new-card').addClass('card-active');
          loadLoading();

          if( ! $('.modify-premium .secure-by-stripe').hasClass('hidden') ){

            $('.modify-premium .secure-by-stripe').addClass('hidden');
            $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
          }

        }, 1300);


      })
      .fail( function( res ){

        console.log("ERROR", res);
        alert( lang.paymentError );
        loadLoading();

      })

    });

  }

})

.on(  'click', '.space .nextTab' , function(){

  $('.hdd .more button').addClass('block');
  moreSpaceCondition = true;
  $(  '.hdd .more .minus-icon').addClass('block');
  $('.hdd .more .quantity').text(0);
  $('.hdd .more .container .big-text').text(api.tool.bytesToUnit(userLocal.base).split(" ", 2)[0]);

})

.on(  'click', '.order-premium .validate', function(){

  //console.log(quota.used);
  var stUser = quota.used;
  var stNewPlan = quota.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota;

  if( typePlan == "downgrade" ){

    if( stUser >= stNewPlan ){

      alert(lang.limitStorageDowngrade[0] + api.tool.bytesToUnit(stUser) + lang.limitStorageDowngrade[1]);
      return;

    }

  }

  if( activePlan == plan0.id ){

    loadLoading();
    console.log("plan 0");

    var test = confirm( lang.unsubscribeConfirm, function( value ){

      if( value ){

        console.log("Confirm clicked");

        request( 'POST', 'https://restbeta.horbito.com/payment/unsubscribe' )

        .done( function(){

          loadLoading();
          console.log("unsubscribe OK");
          nextPage(currentTab, 1);
          var currentObject = $('.hdd-container');
          $(  '.preferences-hdd-cake-total').text(api.tool.bytesToUnit(quota.base + inevioPlans[0].addQuota));
          $(  '.preferences-hdd-cake-free').text( api.tool.bytesToUnit(quota.base + inevioPlans[0].addQuota - quota.used) + ' ' + lang.freeSpace );
          $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){
          });
          $('.finish-premium button').find('span').text(lang.finish);
          updateCanvasCake();
          makePremium = false;
          //resetLocalVar();
          return;

        })

        .fail( function(){

          loadLoading();
          console.log("unsubscribe fail");
          return;

        })

      }else{

        console.log("Cancel clicked");
        loadLoading();
        return;

      }

    });

  }

  else{

    //console.log(cardStatus);

    if( cardStatus == 1 ){

      loadLoading();
      changePlan(activePlan, this);

    }

    if( cardStatus == 0 ){

      alert(lang.mustBeCard);
      return;

    }else{

      var month_year = $('.order-premium .month-year-card').val().split("/");
      if(month_year[1] == null && month_year[0] != null){
        month_year[1] = "";
      }

      var card = {

        name : $('.order-premium .new-card .owner-card').val(),
        number : $('.order-premium .info-current-new-card-bottom .number-card').val(),
        month : month_year[0],
        year :  month_year[1],
        code :  $('.order-premium .info-current-new-card-bottom .code-card').val()

      }

      if(card.name == "" && card.number == "" && card.month == "" && card.code == ""){

        cardStatus = 0;
        $('.order-premium .card-active').removeClass('card-active');
        $('.order-premium .new-card').removeClass('new-card');
        $('.order-premium .secure-by-stripe').addClass('hidden');
        $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
        return;

      }

      if( (cardStatus == 2)&&( card.name == "" | card.number == "" | card.month == "" | card.code == "") ){

        alert(lang.emptyInput);
        if(card.name == ""){
          $('.order-premium .new-card .owner-credit-card').addClass('error');
        }
        if(card.number == ""){
          $('.order-premium .info-current-new-card-bottom .number-credit-card').addClass('error');
        }
        if(card.month == "" || card.year == ""){
          $('.order-premium .month-year-credit-card').addClass('error');
        }
        if(card.code ==  ""){
          $('.order-premium .info-current-new-card-bottom .code-credit-card').addClass('error');
        }
        return;

      }

      if(parseInt(card.month) < 10){
        card.month = '0' + card.month;
      }

      if (cardStatus == 2){

        loadLoading();
        Stripe.card.createToken({

          number    : card.number,
          cvc       : card.code,
          exp_month : card.month,
          exp_year  : card.year,
          name      : card.name

        }, function( status, response ) {

          if( response.error ){

            alert( lang[response.error.code] );

            if(response.error.code == "invalid_number" || response.error.code == "incorrect_number"){
              $('.order-premium .info-current-new-card-bottom .number-credit-card').addClass('error');
            }
            if(response.error.code == "invalid_expiry_month" || response.error.code == "invalid_expiry_year"){
              $('.order-premium .month-year-credit-card').addClass('error');
            }
            if(response.error.code == "invalid_cvc"){
              $('.order-premium .info-current-new-card-bottom .code-credit-card').addClass('error');
            }

            loadLoading();
            return;

          }

          userLocal.card.id = response.id;
          request( 'POST', 'https://restbeta.horbito.com/payment/addCard', {

            token : response.id

          })

          .done( function( res ){

            resetLocalVar();
            cardStatus=1;
            loadLoading();
            changePlan(activePlan, this);

          })

          .fail( function( res ){

            console.log("addCard fail", res);
            alert( lang.paymentError );
            removeCard();
            loadLoading();

          })

        });

      }

    }

  }

})


.on(  'click', '.delete-card', function(){

  //Delete actual card
  resetInputVal();
  cardStatus=0;
  loadLoading();
  removeCard();

  setTimeout(function(){

    loadLoading();

    $('.order-premium .card-active').removeClass('card-active');
    $('.modify-premium .card-active').removeClass('card-active');
    if(currentTab == 'order-premium'){
      $('.order-premium button').find('span').text(lang.save);
    }

  },500)

})

// Increases or reduces the required storage
.on('click', '.moreStorage', function() {

  if(moreSpaceCondition && inevioPlans[plansCounter + 1] != null ){

    var price = null;
    var size = null;
    var total = null;
    var condition = true;
    var unit = null;

    if(currentTab == spaceTabs[2]){

      //premium
      unit = $('.modify-space .show-space-selected .container .unit');
      size = $('.modify-space .show-space-selected .big-text');
      price = $('.modify-space .quantity');
      total = $('.finish-premium .info-space');

    }else if (currentTab == spaceTabs[6]){

      //normal
      unit = $('.more .show-space-selected .container .unit');
      size = $('.more .show-space-selected .big-text');
      price = $('.more .quantity');
      total = $( '.order .options-bottom .bottom .left').find('span');

    }else{

      //console.log("ERROR! Mal gestión de pestañas");
      condition = false;

    }

    if( condition ){

      size.text(api.tool.bytesToUnit(inevioPlans[plansCounter + 1].addQuota + userLocal.base).split(" ", 2)[0]);
      unit.text(api.tool.bytesToUnit(inevioPlans[plansCounter + 1].addQuota + userLocal.base).split(" ", 2)[1]);
      price.text(inevioPlans[plansCounter + 1 ].amount);
      total.text(api.tool.bytesToUnit(inevioPlans[plansCounter + 1].addQuota + userLocal.base).split(" ", 2)[1]);
      activePlan = inevioPlans[plansCounter + 1].id;
      console.log("Plan: " + activePlan);
      if (plansCounter < inevioPlans.length - 1){
        plansCounter++;
      }else {
        moreSpaceCondition = false;
      }

      if(api.tool.bytesToUnit(inevioPlans[plansCounter + 1].addQuota + userLocal.base) == (api.tool.bytesToUnit(inevioPlans[inevioPlans.length - 1].addQuota + userLocal.base))){

        $('.moreStorage').addClass('block');
        $('.'+currentTab+ ' .more-icon').removeClass('moreStorage');

      }

      minusSpaceCondition = true;
      if( $('.minus-icon').hasClass('block') ){

        $('.minus-icon').removeClass('block');
        $('.minus-icon').addClass('minusStorage');
        $('.'+currentTab+ ' .info-current-quantity .no-free').removeClass('hidden');
        $('.'+currentTab+ ' .info-current-quantity .free').addClass('hidden');
        //$('.'+currentTab+ ' .youSpace span').addClass('hidden');

      }

      if( userLocal.activePlan == activePlan ){

        $('.modify-space button').removeClass('validate');
        $('.modify-space button').addClass('block');

      }else{

        if( $('.modify-space button').hasClass('block') ){

          $('.modify-space button').removeClass('block');
          if( !($('.modify-space button').hasClass('validate')) ){
            $('.modify-space button').addClass('validate');
          }

        }

      }
    }

    if( currentTab == 'more' && plansCounter != 0 ){
      $('.more button').removeClass('block');
      $('.more button').addClass('nextTab');
    }

  }else{

    console.log("Error, there isn´t any plan in this position, counter: "+plansCounter);
    activePlan = null;

  }

})

.on(  'click', '.minusStorage' , function(){

  if(minusSpaceCondition && inevioPlans[plansCounter - 1] != null ){

    var price = null;
    var size = null;
    var total = null;
    var condition = true;

    if( currentTab == spaceTabs[2] ){

      //premium
      unit = $('.modify-space .show-space-selected .container .unit');
      size = $('.modify-space .show-space-selected .big-text');
      price = $('.modify-space .quantity');
      total = $('.finish-premium .info-space');

    }else if ( currentTab == spaceTabs[6] ){

      //normal
      unit = $('.more .show-space-selected .container .unit');
      size = $('.more .show-space-selected .big-text');
      price = $('.more .quantity');
      total = $( '.order .options-bottom .bottom .left').find('span');

    }else{
      condition = false;
    }

    if(condition){

      size.text(api.tool.bytesToUnit(inevioPlans[plansCounter - 1].addQuota + userLocal.base).split(" ", 2)[0]);
      unit.text(api.tool.bytesToUnit(inevioPlans[plansCounter - 1].addQuota + userLocal.base).split(" ", 2)[1]);
      price.text(inevioPlans[plansCounter - 1].amount);
      total.text( api.tool.bytesToUnit(inevioPlans[plansCounter - 1].addQuota + userLocal.base).split(" ", 2)[1]);
      activePlan = inevioPlans[plansCounter - 1 ].id;
      console.log("Plan: " + activePlan);

      if (plansCounter > 0){
        plansCounter--;
      }else {

        minusSpaceCondition = false;
        $('.minusStorage').addClass('block');
        $('.'+currentTab+ ' .minus-icon').removeClass('minusStorage');
        $('.'+currentTab+ ' .info-current-quantity .no-free').addClass('hidden');
        $('.'+currentTab+ ' .info-current-quantity .free').removeClass('hidden');

      }
      /*

      if(api.tool.bytesToUnit(inevioPlans[plansCounter - 1].addQuota + userLocal.base) == (api.tool.bytesToUnit(inevioPlans[0].addQuota + userLocal.base)) && userLocal.info){
        $('.minusStorage').addClass('block');
        $('.'+currentTab+ ' .minus-icon').removeClass('minusStorage');
      }
      */

      moreSpaceCondition = true;

      if($('.more-icon').hasClass('block')){

        $('.more-icon').removeClass('block');
        $('.more-icon').addClass('moreStorage');

      }

      if( plansCounter == 0 ){

        $('.more button').addClass('block');
        minusSpaceCondition = false;
        $('.minusStorage').addClass('block');
        //$('.'+currentTab+ ' .youSpace span').removeClass('hidden');
        $('.'+currentTab+ ' .minus-icon').removeClass('minusStorage');
        $('.'+currentTab+ ' .info-current-quantity .no-free').addClass('hidden');
        $('.'+currentTab+ ' .info-current-quantity .free').removeClass('hidden');

      }

      if(userLocal.activePlan == activePlan){

        $('.modify-space button').removeClass('validate');
        $('.modify-space button').addClass('block');

      }else{

        if( $('.modify-space button').hasClass('block') ){

          $('.modify-space button').removeClass('block');
          if( !($('.modify-space button').hasClass('validate')) ){
            $('.modify-space button').addClass('validate');
          }

        }

      }
    }

    if(currentTab == 'more' && plansCounter == 0){
      $('.more button').addClass('block');
      $('.more button').removeClass('nextTab');
    }

  }else{

    console.log("Error, there isn´t any plan in this position: "+plansCounter);
    activePlan = null;

  }

})


.on(  'click',  '.more .nextTab', function(){

  resetInputStatus();
  $('.order .secure-by-stripe').removeClass('hidden');
  $('.'+currentTab +' .preferences-hdd-payment-bottom').addClass('goUp');
  var total = userLocal.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota;
  var price = inevioPlans[listPlans.indexOf(activePlan)].amount;
  $('.order .info-options .options-middle .options-middle-right').text(price + lang.dolarMonthMinus);
  $('.order .info-options .options-middle .options-middle-left').text( lang.add +  api.tool.bytesToUnit(inevioPlans[listPlans.indexOf(activePlan)].addQuota));
  $('.order .info-options .options-bottom .bottom .left').text(api.tool.bytesToUnit(total));
  $('.order .info-options .options-bottom .bottom .right').text(price + lang.dolarMonthMinus);

})

.on(  'click', '.addCard' , function(){

  resetInputStatus();
  if( currentTab == 'modify-premium' ){

    $('.modify-premium .secure-by-stripe').removeClass('hidden');
    $('.'+currentTab +' .preferences-hdd-payment-bottom').addClass('goUp');
    $('.modify-premium .info-current-card').addClass('new-card');
    $('.modify-premium .preferences-hdd-payment-bottom button').removeClass('back');
    cardStatus = 2;

  }else if( currentTab == 'order-premium' ){

    if( activePlan != plan0.id ){

      $('.order-premium .secure-by-stripe').removeClass('hidden');
      $('.'+currentTab +' .preferences-hdd-payment-bottom').addClass('goUp');
      $('.order-premium .info-current-card').addClass('new-card');
      $('.order-premium .preferences-hdd-payment-bottom button').removeClass('back');
      cardStatus = 2;

    }

  }else{
    console.log("ERROR");
  }

})

.on( 'click' , '.order .validate', function(){

  makePremium = true;
  var month_year = $('.order .month-year-card').val().split("/");

  if(month_year[1] == null && month_year[0] != null){
    month_year[1] = "";
  }

  var card = {

    name : $('.order .owner-card').val(),
    number : $('.order .number-card').val(),
    month : month_year[0],
    year :  month_year[1],
    code :  $('.order .code-card').val()

  }

  if( card.name == "" | card.number == "" | card.month == "" | card.code == ""){

    if(card.name == ""){
      $('.order .owner-credit-card').addClass('error');
    }
    if(card.number == ""){
      $('.order .number-credit-card').addClass('error');
    }
    if(card.month == "" || card.year == ""){
      $('.order .month-year-credit-card').addClass('error');
    }
    if(card.code ==  ""){
      $('.order .code-credit-card').addClass('error');
    }
    alert(lang.emptyInput);
    return;

  }

  if(parseInt(card.month) < 10){
    card.month = '0' + card.month;
  }

  loadLoading();
  Stripe.card.createToken({

    number    : card.number,
    cvc       : card.code,
    exp_month : card.month,
    exp_year  : card.year,
    name      : card.name

  }, function( status, response ) {

    if( response.error ){

      alert( lang[response.error.code] );

      if(response.error.code == "invalid_number" || response.error.code == "incorrect_number"){
        $('.order .number-credit-card').addClass('error');
      }
      if(response.error.code == "invalid_expiry_month" || response.error.code == "invalid_expiry_year"){
        $('.order .month-year-credit-card').addClass('error');
      }
      if(response.error.code == "invalid_cvc"){
        $('.order .code-credit-card').addClass('error');
      }

      loadLoading();
      return;

    }

    request( 'POST', 'https://restbeta.horbito.com/payment/subscribe', {

      token : response.id,
      plan  : activePlan,

    })
    .done( function( res ){

      loadLoading();
      nextPage(currentTab, 1);
      $(  '.preferences-hdd-cake-total').text(api.tool.bytesToUnit(quota.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota));
      $(  '.preferences-hdd-cake-free').text( api.tool.bytesToUnit(quota.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota - quota.used) + ' ' + lang.freeSpace );
      updateCanvasCake();
      var currentObject = $('.hdd-container');
      $('.finish .finish-middle .info-space').text( $( '.order .options-bottom .bottom .left').text());
      $('.order .secure-by-stripe').addClass('hidden');
      $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
      $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){});

    })
    .fail( function( res ){

      console.log("Fail subscribe");
      alert( lang.paymentError );
      loadLoading();

    })

  });

})

.on('click', '.modify-space .validate', function(){

  if (userLocal.card.id != null) {
    cardStatus = 1;
  }else{
    cardStatus = 0;
  }
  orderPRTab();

  $('.order-premium .options-top-body .body-bottom .left').find('span').text(api.tool.bytesToUnit(userLocal.base + userLocal.extraStorage));
  $('.order-premium .options-top-body .body-bottom .right').find('span').text(userLocal.actualPrice + lang.dolarMonthMinus);

  $('.order-premium .options-middle .options-middle-left').find('span').text(lang.changeTo + api.tool.bytesToUnit(userLocal.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota));
  $('.order-premium .options-middle .options-middle-right').find('span').text($('.modify-space .quantity').text() + lang.dolarMonthMinus);

  $('.order-premium .options-bottom .left').find('span').text(api.tool.bytesToUnit(userLocal.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota));
  $('.order-premium .options-bottom .right').find('span').text(inevioPlans[listPlans.indexOf(activePlan)].amount + lang.dolarMonthMinus);

  if(cardStatus == 1){

    $('.order-premium .info-current-card').addClass('card-active');
    $('.order-premium .info-current-card').removeClass('new-card');

    var cardFigure = $('.order-premium .card-active .number-credit-card');
    if(userLocal.card.brand == "Visa"){
      cardFigure.addClass('card-visa');
    }
    else if (userLocal.card.brand == "American Express"){
      cardFigure.addClass('card-americanExp');
    }
    else if (userLocal.card.brand == "MasterCard"){
      cardFigure.addClass('card-master');
    }
    else if (userLocal.card.brand == "Discover"){
      cardFigure.addClass('card-discover');
    }
    else if (userLocal.card.brand == "JCB"){
      cardFigure.addClass('card-JCB');
    }
    else if (userLocal.card.brand == "Diners Club") {
      cardFigure.addClass('card-diners');
    }
    else{
      cardFigure.addClass('card-default');
    }

    $(  '.order-premium .number-card').find('span').text("xxxx - xxxx - xxxx - " + userLocal.card.number);
    $(  '.order-premium .delete-card').find('span').text(lang.delete);
    $(  '.order-premium .info-current-card-bottom .delete-card').text(lang.delete);
    $(  '.order-premium .info-current-card-bottom .info-current-payment').text(lang.payParagraph[0] + $('.modify-space .quantity').text() + lang.payParagraph[1]+ new Date(userLocal.payDay).getDate() + lang.payParagraph[2]);

    $(  '.order-premium .preferences-hdd-payment-bottom button').find('span').text(lang.confirm);

  }else{

    console.log(cardStatus);
    if( cardStatus == 0 ){

      $('.order-premium .new-card').removeClass('card-active');
      $('.order-premium .secure-by-stripe').addClass('hidden');
      $('.order-premium .new-card').removeClass('new-card');

    }
    $(  '.order-premium .preferences-hdd-payment-bottom button').find('span').text(lang.save);

  }

  if( (userLocal.base + userLocal.extraStorage) > (userLocal.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota) ){

    typePlan = "downgrade";
    $('.finish-premium .finish-top').addClass('sad');
    $('.finish-premium .finish-middle span:first-child').text(lang.decrease);
    $('.finish .finish-top').addClass('sad');
    $('.finish .finish-middle span:first-child').text(lang.decrease);

  }else{

    typePlan = "update";
    $('.finish-premium .finish-top').removeClass('sad');
    $('.finish-premium .finish-middle span:first-child').text(lang.congratulation);
    $('.finish .finish-top').removeClass('sad');
    $('.finish .finish-middle span:first-child').text(lang.congratulation);

  }
  //console.log(cardStatus);

  if( $(this).parents('.preferences-hdd-payment').hasClass(currentTab) ){

    nextPage(currentTab, 1);
    var currentObject = $('.hdd-container');
    $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){});

  }else{
    console.log("ERROR, no currentTab");
  }

})

.on('click', '.order-premium .back', function(){

  resetInputStatus();
  $('.order-premium .secure-by-stripe').addClass('hidden');
  $('.'+currentTab +' .preferences-hdd-payment-bottom').removeClass('goUp');
  $('.order-premium .info-current-card').removeClass('new-card');

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
.on( 'click', '.password .ui-btn', function(){

  var currentPass = $('.password .old-input');
  var newPass = $('.password .new-input');
  var repeatNewPass = $('.password .repeat-input');

  if( newPass.val() != repeatNewPass.val() ){

    newPass.addClass('wrong');
    repeatNewPass.addClass('wrong');
    return;

  }
  if( !$(this).hasClass('block') ){

    api.config.setPassword( currentPass.val(), newPass.val(), function( error ){

      if( error ){

        alert( error );

      }else{

        api.banner()
          .setTitle( lang.passwordChanged )
          .setText( lang.passwordChanged2 )
          .render();

      }

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

  // To Do -> Cuando se cierra una card se modifican dos veces el text de cakeFree

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

.on(  'click', '.popup .footer .ui-btn', function(){

  console.log(user);

  if( !$(this).hasClass('block') ){

    if(popup == 'password'){
      changePassword();
    }else{

      if( popup == 'username' ){
        changeUsername();
      }else if ( popup == 'name' ){
        changeName();
      }else if ( popup == 'email' ){
        changeMail();
      }
      else{
        alert(lang.incorrectPass);
      }

    }
    deletePopup();

  }

})

.on( 'click', '.time-format .preferences-bottom-checkbox', function(){

  api.config.setTimeFormat( $(this).children('span').hasClass('time-format-24'), function( error ){

    if( error ){
      alert( error );
    }

  });

})

.on( 'click', '.selectExtensions .switch', function(){

  var status = $('.selectExtensions .head input')[0].checked;

  api.config.setDisplayExtensions( status, function( error ){

    if( error ){

      $('.selectExtensions .head input')[0].checked = true;;
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

.on( 'click', '.config .flag', function(){

  if( $( this ).hasClass( 'en' ) ){

    language = 'en';

    api.config.setLanguage( 'en-en' , function(){

      confirm('¿Desea recargar horbito ahora?', function( o ){

        if ( o == true ){

          var window = win.parents().slice( -1 )[ 0 ].parentNode.defaultView;
          window.location.reload();

        }

      });

    });

  }else if( $( this ).hasClass( 'es' ) ){

    language = 'es';
    api.config.setLanguage( 'es-es' , function(){

      confirm('Do you want to reload horbito now?', function(o){

        if ( o == true ){

          var window = win.parents().slice( -1 )[ 0 ].parentNode.defaultView;
          window.location.reload();

        }

      });

    });

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

.on('click', '.new-input .delete-content', function(){
  $(this).siblings('input').val('');
})

.on( 'click', '.config .backup .download', function(){

  api.fs.downloadBackup();
  alert(lang.filesDownloading);

})

.on('click', '.custom .theme-card', function(){

  if( !$(this).hasClass('block') ){

    if( !$(this).hasClass('active') ){

      $('.custom .theme-card').removeClass('active');
      $(this).addClass('active');

    }

    if( $(this).hasClass('dark') ){

      $(  $('.preferences-top').parents()[0]).addClass('dark');
      //$('.preferences-top').addClass('dark');
      //$('.preferences-bottom').addClass('dark');

    }else{

      //$('.preferences-top').removeClass('dark');
      //$('.preferences-bottom').removeClass('dark');
      $(  $('.preferences-top').parents()[0]).removeClass('dark');

    }

  }

})

.on('click', '.account .card-content .right', function(){

  if($(this).parents('.account-card').hasClass('username')){
    throwPopup('username');
  }
  else if($(this).parents('.account-card').hasClass('password')){
    throwPopup('password');
  }
  else if ($(this).parents('.account-card').hasClass('email')){
    throwPopup('email');
  }
  else {
    throwPopup('name');
  }

})

.on('click', '.popup .close', function(){
  deletePopup();
})

.on( 'keyup', '.password .popup .new-input', function(){


  $(this).removeClass('active');
  var currentTry = passwordTry++
  var input      = $(this)[0];
  var value      = $(this).val()
  var strengthContainer = $('.password .password-security')[0];

  if( !value.length){
    input.classList = "new-input input";
    strengthContainer.classList= "password-security active";
  }

  api.config.checkPasswordStrength( value, function( err, strength ){

    if( currentTry !== passwordTry - 1 ){
      return
    }

    switch (strength + 1) {
      case 0:

        strengthContainer.classList= "password-security active";
        $(input).removeClass('wrong');
        break;

      case 1:

        strengthContainer.classList= "password-security active one";
        $(input).removeClass('wrong').addClass('active');
        break;

      case 2:

        strengthContainer.classList= "password-security active two";
        $(input).removeClass('wrong').addClass('active');
        break;

      case 3:

        strengthContainer.classList= "password-security active three";
        $(input).removeClass('wrong').addClass('active');
        break;

      default:

        strengthContainer.classList= "password-security active four";
        $(input).removeClass('wrong').addClass('active');

    }

    if( value.length < 6 ){

      input.classList = "new-input input wrong";
      strengthContainer.classList= "password-security active";

    }

  })

})

/*

.on('keyup', '.password .popup .repeat-input', function(){

  var pass = $(this).val().length;

  if(pass == $('.popup .new-input').val().length){
    $(this).removeClass('wrong');
  }else{
    $(this).addClass('wrong');
  }

})
*/

.on('keyup', '.email .popup .new-input', function(){

  var mail = $(this).val();

  if( validateEmail(mail) ){

    $(this).removeClass('wrong');
    $('.popup .ui-btn').removeClass('block');

  }else{

    $(this).addClass('wrong');
    $('.popup .ui-btn').addClass('block');

  }

})

/*
.on('keyup', '.popup .repeat-input', function(){
  if($('.popup-container').hasClass('password')){
    if (($('.popup .new-input').val() == $('.popup .repeat-input').val() ) && ($('.popup input').val().length > 0)){
      $('.popup .ui-btn').removeClass('block');
    }
  }else{
    if($('.popup .repeat-input').val().length != 0  && (!$('.popup input').hasClass('wrong'))){
      $('.popup .ui-btn').removeClass('block');
    }
  }
})

*/

.on('keyup', '.popup input', function(){

  if( $('.popup-container').hasClass('password') ){

    if( !$('.popup .new-input').hasClass('wrong') && ($('.popup .new-input').val().length > 5) ){
      $('.popup .ui-btn').removeClass('block');
    }

  }else{

    if( $('.popup .new-input').val().length != 0  && (!$('.popup input').hasClass('wrong')) ){
      $('.popup .ui-btn').removeClass('block');
    }

  }

})

// This function fills certain gaps with user's info
api.system.updateQuota( function( error, quota ){

  cakeTotal.text( api.tool.bytesToUnit( api.system.quota().total ) );
  cakeFree.text( api.tool.bytesToUnit( api.system.quota().free, 2 ) + ' ' + lang.freeSpace );

});

user      = api.system.user();
avatarUrl = user.avatar.normal;
mail      = user.mail;
username  = user.user;
console.log( api.system.user() );

$( '.preferences-account-image', win ).css( 'background-image', 'url(' + avatarUrl + '?' + Math.random() + ')' );

socialNetworks();

api.config.getConfiguration( function( error, config ){

  if( config.displayExtensions ){
    $('.selectExtensions .head input')[0].checked = true;
  }else{
    $('.selectExtensions .head input')[0].checked = false;
  }

});

api.config.getLanguages( function( error, languages, used ){

  if( used.code === "es" || used.code === "es-es" ){

    $('.config .flag.es').addClass('active');
    language = "es";

  }else if( used.code === "en" || used.code === "en-us" ){

    $('.config .flag.en').addClass('active');
    language = "en";

  }

});

api.config.getWallpapers( function( error, wallpapers, used ){

  if( used.custom ){
    $( '.preferences-wallpaper-image.custom', win ).css( 'background-image', 'url(' + used.url[ '1280' ] + ')' ).removeClass( 'wz-prototype' ).addClass( 'active' );
  }else{
    $( '.wallpaper-' + used.id, win ).addClass( 'active' );
  }

});

var loadLoading = function(){

  var button = "."+ currentTab + " button";

  if( $(button).hasClass('loading') ){

    $(button).removeClass('loading');
    loading = false;

  }else{

    loading = true;
    $(button).addClass('loading');

  }

};

/*
  Función para crear un circulo que muestre lo que esta debajo, se le pasa:
    - El canvas.
    - El context del objeto canvas.
    - Posicion del centro (x e y).
    - Radio.
    - Porcentaje entre 0 y 1.
    - Tiempo de la animación por defecto 200.
*/

var loadCanvasCake = function( canvas,context, x, y, radius, porcentaje, tiempo ){

  porcentaje = porcentaje- .025;

  if(porcentaje < 0.041111 && porcentaje != 0 ){
    porcentaje = 0.042;
  }else if (porcentaje <= 0){
    porcentaje = 0;
  }else if (porcentaje > 1 - 0.025){
    porcentaje = 1 - 0.025
  }

  if(tiempo == null){
    tiempo = 200;
  }

  var curPerc = 0;
  var circ = Math.PI * 2;
  var quart = Math.PI / 2;

  var circle1 = {
    xCenter : (x + radius * Math.cos(((circ) * 0) - quart + 0.12)),
    yCenter : (y + radius * Math.sin(((circ) * 0) - quart + 0.12)),
  }

  var xCoordinates = {
    x1 : 0,
    x2 : 0,
    xCenter : 0
  }

  var yCoordinates = {
    y1 : 0,
    y2 : 0,
    yCenter : 0
  }

  context.beginPath();
  context.lineWidth = 25;
  context.strokeStyle = COLORS.gray3;

  function animate(current) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, radius, -(quart - .1), ((circ) * current) - quart, true);
    context.stroke();
    context.save();

    xCoordinates.xCenter = (x + radius * Math.cos(((circ) * current) - quart + 0.01));
    yCoordinates.yCenter = (y + radius * Math.sin(((circ) * current) - quart + 0.01));

    xCoordinates.x1 = (x + (radius-12) * Math.cos(((circ) * current) - quart));
    xCoordinates.x2 = (x + (radius+12) * Math.cos(((circ) * current) - quart));

    yCoordinates.y1 = (y + (radius-12) * Math.sin(((circ) * current) - quart));
    yCoordinates.y2 = (y + (radius+12) * Math.sin(((circ) * current) - quart));

    var radius2 = Math.abs(Math.sqrt((xCoordinates.x1 - xCoordinates.xCenter)*(xCoordinates.x1 - xCoordinates.xCenter) + (yCoordinates.y1 - yCoordinates.yCenter)*(yCoordinates.y1 - yCoordinates.yCenter)));
    var startAngle = Math.atan2(yCoordinates.y1 - yCoordinates.yCenter, xCoordinates.x1 - xCoordinates.xCenter);
    var endAngle   = Math.atan2(yCoordinates.y2 - yCoordinates.yCenter, xCoordinates.x2 - xCoordinates.xCenter);

    context.beginPath();
    context.lineWidth = 0.01;
    context.arc((xCoordinates.x1 + xCoordinates.x2)/2,(yCoordinates.y1 + yCoordinates.y2)/2,radius2, endAngle,startAngle);
    context.globalCompositeOperation = 'destination-out';
    context.globalAlpha=1;
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = 0.01;
    context.arc(circle1.xCenter,circle1.yCenter,radius2, 0.53*Math.PI, 1.53*Math.PI);
    context.globalCompositeOperation = 'destination-out';
    context.globalAlpha=1;
    context.fill();
    context.stroke();

    context.restore();

    curPerc++;

    if (curPerc < porcentaje*tiempo) {

       requestAnimationFrame( function(){
          animate(curPerc / tiempo)
       });

    }

  }

  console.log(porcentaje);
  if (porcentaje < 0.01){

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, radius, 0*Math.PI, 2*Math.PI, true);
    context.stroke();

  }else{
    animate();
  }

};

// payments.js start
var resetInputVal = function(){
  $('.hdd input').val("");
}

var unsubscribe = function(){

  request( 'POST', 'https://restbeta.horbito.com/payment/unsubscribe' ).done( function(){

    console.log("unsubscribe OK");

  }).fail( function(){
    console.log("Fail unsubscribe");
  })

}


var removeCard = function(){

  request( 'POST', 'https://restbeta.horbito.com/payment/removeCard', {

    card  : userLocal.card.id

  }).done(function(res){

    console.log("Done, removeCard", res);
    resetLocalVar();
    cardStatus = 0;

  })
  .fail( function(res){

    console.log("Fail removeCard", res);
    aler(lang.errorRemoveCard);

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
      //console.log(card);
      //console.log(response);
      alert( lang[response.error.code] );
      $('.load-only').hide();
      $('.preferences-payment-button').show();
      return

    }

    request( 'POST', 'https://restbeta.horbito.com/payment/subscribe', {

      token : response.id,
      plan  : activePlan,

    }).done( function( res ){

      console.log("OK, subscribe");
      resetLocalVar();

    }).fail( function( res ){

      console.log("Fail, subscribe",res);
      alert( lang.paymentError );

    })

  });

  return true;

};

var changePlan = function(newPlan, context){

  request( 'POST', 'https://restbeta.horbito.com/payment/subscribe', {

    plan  : newPlan

  }).done(function(res){

    console.log("Plan changed", res);
    resetLocalVar();

    if( $(context).parents('.preferences-hdd-payment').hasClass(currentTab) ){

      userLocal.activePlan = newPlan;
      loadLoading();
      nextPage(currentTab, 1);
      var currentObject = $('.hdd-container');
      $('.hdd-container').animate({scrollLeft: currentObject.scrollLeft() + 838}, 800, function(){
      });
      $(  '.preferences-hdd-cake-total').text(api.tool.bytesToUnit(quota.base + inevioPlans[listPlans.indexOf(userLocal.activePlan)].addQuota));
      $(  '.preferences-hdd-cake-free').text( api.tool.bytesToUnit(quota.base + inevioPlans[listPlans.indexOf(userLocal.activePlan)].addQuota - quota.used) + ' ' + lang.freeSpace );
      updateCanvasCake();
      return;

    }else{

      console.log("ERROR, no currentTab");
      return;

    }

  })
  .fail( function(res){

    console.log("ERROR", res);
    alert(lang.changePlanError);
    loadLoading();

  })

  return;

};

/* POPUP */
var setTextPopup = function(type){

  if(type === 'username'){

    $('.popup .header .title span').text(lang.accountUser);
    $('.popup .old .title .title-txt').text(lang.currentUsername);
    $('.popup .old .old-input').val(user.user);
    $('.popup .new .title span').text(lang.newUsername);
    $('.popup .repeat-new .title span').text(lang.changePassword);
    $('.popup .footer span').text(lang.save);

  }else if (type === 'password'){

    $('.popup input').val('');
    $('.popup .header .title span').text(lang.changePassword);
    $('.popup .old .title .title-txt').text(lang.currentPassword);
    $('.popup .old .title .forgetPassword-txt').text(lang.forgetPassword);
    $('.popup .new .title span').text(lang.newPassword);
    $('.popup .repeat-new .title span').text(lang.repeatNewPassword);
    $('.popup .footer span').text(lang.save);

  }else if (type === 'name'){

    $('.popup .header .title span').text(lang.changeName);
    $('.popup .old .title .title-txt').text(lang.name);
    $('.popup .old .old-input').attr('placeholder',user.name);
    $('.popup .new .title span').text(lang.surname);
    $('.popup .new .new-input').attr('placeholder',user.surname);
    $('.popup .repeat-new .title span').text(lang.changePassword);
    $('.popup .footer span').text(lang.save);

  }else{

    $('.popup .header .title span').text(lang.accountMailUser);
    $('.popup .old .title .title-txt').text(lang.currentEmail);
    $('.popup .old .old-input').val(user.mail);
    $('.popup .new .title span').text(lang.newEmail);
    $('.popup .repeat-new .title span').text(lang.changePassword);
    $('.popup .footer span').text(lang.save);

  }

};

var throwPopup = function(o){

  popup = o;

  $('.popup-container .popup .content .old .old-input')[0].readOnly = true;

  if(o === 'password'){

    $('.popup-container .popup .content .old .old-input')[0].readOnly = false;
    $('.popup-container .popup .content .old .forgetPassword-txt').addClass('active');
    $('.popup-container .popup .content .password-security').addClass('active');
    $('.popup-container .popup .content input').attr('type', 'password');

  }
  if( o === 'name'){

    $('.popup-container .popup .content .old .old-input')[0].readOnly = false;

  }
  $('.popup-container').addClass('active');
  $('.popup-container').addClass(o);

  setTextPopup(o);

};


var deletePopup = function(){

  $('.popup-container').removeClass('active');
  $('.popup-container')[0].classList.value = "popup-container wz-dragger";
  $('.popup-container .popup .content .old .forgetPassword-txt').removeClass('active');
  $('.popup-container .popup .content .password-security').removeClass('active');
  $('.popup input').val('');
  $('.popup input').removeClass('wrong');
  $('.popup input').removeClass('active');
  $('.popup-container .popup .content .old-input')[0].removeAttribute('type');
  $('.popup-container .popup .content .new-input')[0].removeAttribute('type');
  $('.popup-container .popup input').attr('placeholder', '');
  $('.popup-container .popup .ui-btn').addClass('block');
  $('.popup-container .password-security')[0].classList= "password-security";

};

/* POPUP END*/

var updateCanvasCake = function(){

  var canvasObject1 = $( '.preferences-hdd-canvas-cake')[0];
  var canvasObject2 = $( '.preferences-hdd-canvas-cake')[1];
  var context1 = canvasObject1.getContext('2d');
  var context2 = canvasObject2.getContext('2d');
  var centroX = canvasObject1.width / 2;
  var centroY = canvasObject1.height / 2;
  var radio = 107;
  var porcentaje = (1 - ( api.system.quota().free / api.system.quota().total ).toFixed(3)).toFixed(2);
  porcentaje = porcentaje <= 0.01 ? 0.01 : porcentaje;
  loadCanvasCake(canvasObject1,context1, centroX, centroY, radio, porcentaje);
  loadCanvasCake(canvasObject2,context2, centroX, centroY, radio, porcentaje);

};

var loadAppUser = function(){

  var canvasObject1 = $( '.preferences-hdd-canvas-cake')[0];
  var canvasObject2 = $( '.preferences-hdd-canvas-cake')[1];
  var context1 = canvasObject1.getContext('2d');
  var context2 = canvasObject2.getContext('2d');
  var centroX = canvasObject1.width / 2;
  var centroY = canvasObject1.height / 2;
  var radio = 107;
  var porcentaje = (1 - ( api.system.quota().free / api.system.quota().total ).toFixed(3)).toFixed(2);
  porcentaje = porcentaje <= 0.01 ? 0.01 : porcentaje;

  if(porcentaje < 1){

    loadCanvasCake(canvasObject1,context1, centroX, centroY, radio, porcentaje);
    loadCanvasCake(canvasObject2,context2, centroX, centroY, radio, porcentaje);

  }

  infoSubscriptions = api.app.storage('infoSubscriptions');
  console.log(infoSubscriptions);
  language = api.app.storage('language');
  quota = api.system.quota();
  inevioPlans= [];
  inevioPlans.push(plan0);

  for(var i = 0; i<infoSubscriptions.availablePlans.length; i++){
    inevioPlans.push(infoSubscriptions.availablePlans[i]);
  }
  //console.log(inevioPlans);
  inevioPlans = inevioPlans.sort( function( a, b ){
    return a.amount - b.amount
  })
  listPlans = inevioPlans.map(function( item ){
    return item.id
  });

  //console.log(infoSubscriptions);

  // Load info user subscription
  loadInfoUserSub(infoSubscriptions);

  //console.log("Pestaña actual: "+currentTab);

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

  //userLocal.info = null;
  if (userLocal.info){

    spacePRTab();
    modifyPRTab();
    modifySPTab();
    orderPRTab();
    finishPRTab();

  }else{

    spaceTab();
    moreTab();
    orderTab();
    finishTab();

  }

  $( '.preferences-bottom-title.account', win ).text( lang.accountTitle );
  $( '.preferences-bottom-description.account', win ).text( lang.accountDescription );
  $( '.avatar-edit span', win ).text( lang.avatarEdit );
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

  $('.config .preferences-bottom-content-title .title span' , win).text(lang.config);

  $('.config .selectLanguage .title span' , win).text( lang.languageTitle );
  $('.config .en span' , win).text( lang.englishLanguage );
  $('.config .es span' , win).text( lang.spanishLanguage );

  $('.config .selectExtensions .title span' , win).text( lang.extensionsTitle );
  $('.config .selectExtensions .content span' , win).text( lang.displayExtensions );

  $('.config .desktopApp .title span' , win).text( lang.horbitoAppTitle );
  $('.config .desktopApp .content-description span' , win).text( lang.horbitoAppDescription );

  $('.config .backup .title span' , win).text( lang.backup );
  $('.config .backup .content-description span' , win).text( lang.backupDescription );

  $('.config .deleteAccount .title span' , win).text( lang.deleteAccount );
  $('.config .deleteAccount .body span' , win).text( lang.deleteAccountDescription );
  $('.config .deleteAccount .delete span' , win).text( lang.delete );

  $('.config .ui-btn span').text(lang.download);

  $( '.custom .preferences-bottom-content-title .title span' , win).text(lang.customTitle);
  $( '.custom .theme-card.light span').text(lang.light);
  $( '.custom .theme-card.dark span').text(lang.dark);
  $( '.custom .selectWallpaper .title span').text(lang.wallpaper);

  if(language == 'es'){
    $('.preferences-wallpaper-upload .upload-button').addClass('es');
  }else{
    $('.preferences-wallpaper-upload .upload-button').addClass('en');
  }

  $( '.preferences-about-version', win ).text( lang.version + ':' + ' ' + api.system.version().replace( 'beta', 'Beta' ) );
  $( '.preferences-about-link.legal', win ).text( lang.legalNotices );
  $( '.preferences-about-link.privacy', win ).text( lang.privacyPolicies );


  $('.invite .preferences-bottom-content-title .title span' , win).text(lang.inviteYourFriends);
  $('.invite .preferences-bottom-content-body .head .alone').text(lang.inviteDescriptionAlone);
  $('.invite .preferences-bottom-content-body .head .share').text(lang.inviteDescriptionShare);
  $('.invite .preferences-bottom-content-body .mail-container .mail-title span').text(lang.emails);
  $('.invite .preferences-bottom-content-body .mail-container .mail-footer span').text(lang.addMail);
  $('.invite .preferences-bottom-content  .share-text').text(lang.sendInvitations);

  // Infinity storage??

  if(infoSubscriptions.currentPlan != null){

    if(infoSubscriptions.currentPlan.addQuota == "Infinity"){

      $(  '.space-premium .box-current-plan-middle .premium-info span').text(lang.premiumPlan + lang.unlimitedStorage);
      //$(  '.modify-premium .info-current-plan .options-bottom .bottom').find('span').text(lang.unlimitedStorage);
      //$(  '.modify-premium .info-options .options-top .top .left').find('span').text(lang.unlimitedStorage);

    }

  }

};

var spaceTab = function(){

  //console.log(language);
  if (language == 'es'){
    $('.space .info-plan-premium').addClass('es');
  }else if (language == 'en') {
    $('.space .info-plan-premium').addClass('en');
  }

  $(  '.space .preferences-hdd-usage').text(lang.usedSpace);
  $(  '.space .bottom-card span').text(lang.moreInfo);
  $(  '.space .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
  $(  '.space .title-card span').text(lang.needMoreSpace);
  $(  '.space .content-card .info span').text('GB');
  $(  '.space .content-card .info .quantity').text('25');
  $(  '.space .content-card .price span').text(lang.priceExtra);

};

var moreTab = function(){

  $(  '.more .preferences-hdd-payment-top').find('span').text(lang.increaseStorage);
  $(  '.more .box-current-plan-top').find('span').text(lang.increaseStorage);
  $(  '.more .current-information.one .li-circle').find('span').text(lang.infoPaymentOneHead);
  $(  '.more .current-information.one .paragraph').find('span').text(lang.infoPaymentOneBody);
  $(  '.more .current-information.two .li-circle').find('span').text(lang.infoPaymentTwoHead);
  $(  '.more .current-information.two .paragraph').find('span').text(lang.infoPaymentTwoBody);
  $(  '.more .quantity').find('span').text(inevioPlans[0].amount);
  $(  '.more .quantity-container .top').text("$");
  $(  '.more .quantity-container .bottom').text(lang.perMonth);
  $(  '.more .info-current-quantity .free span').text(lang.free);
  $(  '.more .show-space-selected span:last-child').text(api.tool.bytesToUnit(userLocal.base + plan0.addQuota).split(" ", 2)[1]);
  $(  '.more .show-space-selected .big-text').text(api.tool.bytesToUnit(userLocal.base).split(" ", 2)[0]);
  $(  '.more .preferences-hdd-payment-bottom').find('span').text(lang.next);
  $(  '.more .youSpace span').text(lang.currentSpace);

};

var orderTab = function(){

  $(  '.order .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
  $(  '.order .preferences-hdd-payment-top').find('span').text(lang.order);
  $(  '.order .options-top-tittle').find('span').text(lang.summary);
  $(  '.order .options-top-body').find('span').text(lang.currentSpaceMayus);
  $(  '.order .options-top-body .body-bottom .right').find('span').text(lang.free);
  $(  '.order .options-top-body .body-bottom .left').find('span').text(api.tool.bytesToUnit(userLocal.totalStorage));
  $(  '.order .options-middle .options-middle-left').find('span').text(lang.add + api.tool.bytesToUnit(userLocal.base + inevioPlans[0].addQuota));
  $(  '.order .options-middle .options-middle-right').find('span').text(0 +lang.dolarMonthMinus);
  $(  '.order .options-bottom .top .left').text(lang.totalStorageMayus);
  $(  '.order .options-bottom .top .right').text(lang.totalMayus);
  $(  '.order .options-bottom .bottom .left').find('span').text(api.tool.bytesToUnit(userLocal.base).split(" ", 2)[2]);
  $(  '.order .options-bottom .bottom .right').find('span').text(lang.perMonth);
  $(  '.order .options-bottom .bottom .right .big').text(0 + lang.dolarMonthMinus);
  $(  '.order .info-current-card-bottom.owner-credit-card').find('input').attr('placeholder', lang.creditCardOptions.nameCreditCard);
  $(  '.order .info-current-card-bottom.number-credit-card').find('input').attr('placeholder', lang.creditCardOptions.numberCreditCard);
  $(  '.order .info-current-card-bottom.options-credit-card.month-credit-card').find('input').attr('placeholder', lang.creditCardOptions.monthCreditCard);
  $(  '.order .info-current-card-bottom.options-credit-card.year-credit-card').find('input').attr('placeholder', lang.creditCardOptions.yearCreditCard);
  $(  '.order .info-current-card-bottom.options-credit-card.code-credit-card').find('input').attr('placeholder', lang.creditCardOptions.codeCreditCard);
  $(  '.order .info-current-card-bottom .info-current-payment').find('p').text(lang.infoCurrentPayment);
  $(  '.order .preferences-hdd-payment-bottom button').find('span').text(lang.next);
  $(  '.order .info-current-card-top').find('span').text(lang.creditCard);
  $(  '.order .info-current-without-card-bottom .top .top-bottom').find('span').text(lang.addCard);
  $(  '.order .info-current-without-card-bottom .bottom').find('span').text(lang.noCardInfo);
  $(  '.order .info-secure span').text(lang.secureByStripe);
  $(  '.order .info-secure .underline').text(lang.stripe);

};

var finishTab = function(){

  $(  '.finish .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
  $(  '.finish .finish-middle').find('span').text(lang.congratulation);
  $(  '.finish .finish-middle .info-space').text(api.tool.bytesToUnit(inevioPlans[listPlans.indexOf(activePlan)].addQuota + userLocal.base));
  $(  '.finish .finish-bottom').find('span').text(lang.finish);

};

var spacePRTab = function(){

  $(  '.space-premium .preferences-hdd-usage').text(lang.usedSpace);
  $(  '.space-premium .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
  $(  '.space-premium .box-current-plan-top').find('span').text(lang.activePlan);
  $(  '.space-premium .box-current-plan-bottom').find('span').text(lang.manage);
  $(  '.space-premium .box-current-plan-middle .premium-info span').text(lang.premiumPlan + api.tool.bytesToUnit(userLocal.extraStorage) + lang.extra +  userLocal.actualPrice + lang.dolarMonthMinus);
  var fecha = new Date(userLocal.payDay);
  $(  '.space-premium .box-current-plan-middle .premium-date').find('span').text(lang.payDay + fecha.getDate() + '/'+ (fecha.getMonth()+1) + '/' + (fecha.getFullYear()));

};

var modifyPRTab = function(){

  if(cardStatus == 1){

    var cardFigure = $('.modify-premium .card-active .number-credit-card');
    if(userLocal.card.brand == "Visa"){
      cardFigure.addClass('card-visa');
    }
    else if (userLocal.card.brand == "American Express"){
      cardFigure.addClass('card-americanExp');
    }
    else if (userLocal.card.brand == "MasterCard"){
      cardFigure.addClass('card-master');
    }
    else if (userLocal.card.brand == "Discover"){
      cardFigure.addClass('card-discover');
    }
    else if (userLocal.card.brand == "JCB"){
      cardFigure.addClass('card-JCB');
    }
    else if (userLocal.card.brand == "Diners Club") {
      cardFigure.addClass('card-diners');
    }
    else{
      cardFigure.addClass('card-default');
    }

  }

  $(  '.modify-premium .preferences-hdd-payment-top').find('span').text(lang.hddTitle);

  if(language == "en"){

    var text= "st";
    var day = new Date(userLocal.payDay).getDate();
    if(day == 1){
      text = "st";
    }else if(day == 2){
      text = "nd";
    }else if (day == 3){
      text = "rd";
    }
    else{
      text = "th";
    }
    $(  '.modify-premium .info-current-plan .options-middle').find('span').text(lang.partPayDay[0] + day + text +lang.partPayDay[1]);

  }else{
    $(  '.modify-premium .info-current-plan .options-middle').find('span').text(lang.partPayDay[0] + new Date(userLocal.payDay).getDate() + lang.partPayDay[1]);
  }

  $(  '.modify-premium .info-current-plan .options-top .top .left span').text(lang.currentPlan);
  $(  '.modify-premium .info-current-plan .options-top .top .right span').text(lang.modify);

  if(userLocal.customPlan == true){

    $(  '.modify-premium .info-current-plan .options-top .bottom span').text(lang.premiumPlan +  lang.unlimitedStorage);
    $(  '.modify-premium .info-options .options-bottom .bottom .summary-subtitle-space').text(lang.unlimitedStorage);

  }else{

    $(  '.modify-premium .info-current-plan .options-top .bottom span').text(lang.premiumPlan +  inevioPlans[listPlans.indexOf(userLocal.activePlan)].name + lang.extra);
    $(  '.modify-premium .info-options .options-bottom .bottom .summary-subtitle-space').text(api.tool.bytesToUnit(userLocal.totalStorage));

  }

  $(  '.modify-premium .number-card').find('span').text("xxxx - xxxx - xxxx - " + userLocal.card.number);
  $(  '.modify-premium .delete-card').find('span').text(lang.change);
  $(  '.modify-premium .preferences-hdd-payment-bottom button').find('span').text(lang.save);
  $(  '.modify-premium .preferences-hdd-payment-top').find('span').text(lang.currentPlan);

  $(  '.modify-premium .info-options .options-bottom .top .subtitle-space').text(lang.space);
  $(  '.modify-premium .info-options .options-bottom .top .subtitle-price').text(lang.price);
  $(  '.modify-premium .info-options .options-bottom .bottom .summary-subtitle-amount').text(userLocal.actualPrice + lang.dolarMonthMinus);

  $(  '.modify-premium .info-current-card-bottom .delete-card').text(lang.change);
  $(  '.modify-premium .info-current-card-bottom .info-current-payment').text(lang.payParagraph[0] + userLocal.actualPrice + lang.payParagraph[1]+ new Date(userLocal.payDay).getDate() + lang.payParagraph[2]);
  $(  '.modify-premium .info-current-card-top').find('span').text(lang.creditCard);
  $(  '.modify-premium .info-current-without-card-bottom .top .top-bottom').find('span').text(lang.addCard);
  $(  '.modify-premium .info-current-without-card-bottom .bottom').find('span').text(lang.noCardInfo);
  $(  '.modify-premium .info-secure span').text(lang.secureByStripe);
  $(  '.modify-premium .info-secure .underline').text(lang.stripe);

};

var modifySPTab = function(){

  if(cardStatus == 0){
    $('.modify-premium .info-current-card').removeClass('card-active');
  }
  $(  '.modify-space .preferences-hdd-payment-top').find('span').text(lang.increaseStorage);
  $(  '.modify-space .current-information.one .li-circle').find('span').text(lang.infoPaymentOneHead);
  $(  '.modify-space .current-information.one .paragraph').find('span').text(lang.infoPaymentOneBody);
  $(  '.modify-space .current-information.two .li-circle').find('span').text(lang.infoPaymentTwoHead);
  $(  '.modify-space .current-information.two .paragraph').find('span').text(lang.infoPaymentTwoBody);
  $(  '.modify-space .quantity').find('span').text(1);
  $(  '.modify-space .info-current-quantity .free span').text(lang.free);

  $(  '.modify-space .quantity-container .top').text("$");
  $(  '.modify-space .quantity-container .bottom').text(lang.perMonth);
  $(  '.modify-space .show-space-selected span:last-child').text(api.tool.bytesToUnit(userLocal.totalStorage).split(" ", 2)[1]);
  $(  '.modify-space .show-space-selected .big-text').text(api.tool.bytesToUnit(userLocal.totalStorage).split(" ", 2)[0]);
  $(  '.modify-space .preferences-hdd-payment-bottom').find('span').text(lang.next);
  $(  '.modify-space .youSpace span').text(lang.currentSpace);

};

var orderPRTab = function (){

  $(  '.order-premium .preferences-hdd-payment-top').find('span').text(lang.hddTitle);
  $(  '.order-premium .preferences-hdd-payment-top').find('span').text(lang.order);
  $(  '.order-premium .options-top-tittle').find('span').text(lang.summary);
  $(  '.order-premium .options-top-body').find('span').text(lang.currentSpaceMayus);
  $(  '.order-premium .options-top-body .body-bottom .right').find('span').text(lang.free);
  $(  '.order-premium .options-top-body .body-bottom .left').find('span').text(api.tool.bytesToUnit(userLocal.totalStorage));
  $(  '.order-premium .options-middle .options-middle-left').find('span').text(lang.add + api.tool.bytesToUnit(userLocal.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota));
  $(  '.order-premium .options-middle .options-middle-right').find('span').text(($('.modify-space .quantity').text()).toString().substring(29,30)+lang.dolarMonthMinus);
  $(  '.order-premium .options-bottom .top .left').text(lang.totalStorageMayus);
  $(  '.order-premium .options-bottom .top .right').text(lang.totalMayus);
  $(  '.order-premium .options-bottom .bottom .left').find('span').text(api.tool.bytesToUnit(userLocal.base + inevioPlans[listPlans.indexOf(activePlan)].addQuota));
  $(  '.order-premium .options-bottom .bottom .right').find('span').text(lang.perMonth);
  $(  '.order-premium .options-bottom .bottom .right .big').text(inevioPlans[listPlans.indexOf(activePlan)].amount + lang.dolarMonthMinus);
  $(  '.order-premium .info-current-card-bottom.owner-credit-card').find('input').attr('placeholder', lang.creditCardOptions.nameCreditCard);
  $(  '.order-premium .info-current-card-bottom.number-credit-card').find('input').attr('placeholder', lang.creditCardOptions.numberCreditCard);
  $(  '.order-premium .info-current-card-bottom.options-credit-card.month-credit-card').find('input').attr('placeholder', lang.creditCardOptions.monthCreditCard);
  $(  '.order-premium .info-current-card-bottom.options-credit-card.year-credit-card').find('input').attr('placeholder', lang.creditCardOptions.yearCreditCard);
  $(  '.order-premium .info-current-card-bottom.options-credit-card.code-credit-card').find('input').attr('placeholder', lang.creditCardOptions.codeCreditCard);
  $(  '.order-premium .info-current-card-bottom .info-current-payment').find('p').text(lang.infoCurrentPayment);
  $(  '.order-premium .preferences-hdd-payment-bottom button').find('span').text(lang.next);
  $(  '.order-premium .info-current-card-top').find('span').text(lang.creditCard);
  $(  '.order-premium .info-current-without-card-bottom .top .top-bottom').find('span').text(lang.addCard);
  $(  '.order-premium .info-current-without-card-bottom .bottom').find('span').text(lang.noCardInfo);
  $(  '.order-premium .info-secure span').text(lang.secureByStripe);
  $(  '.order-premium .info-secure .underline').text(lang.stripe);

};

var finishPRTab = function(){

  $(  '.finish-premium .finish-middle').find('span').text(lang.congratulation);
  $(  '.finish-premium .finish-middle .info-space').text(null);
  $(  '.finish-premium .finish-bottom').find('span').text(lang.finish);

};

var translateUI = function(){

  $( 'li.hdd', win ).text( lang.hdd ).data( 'type', 'hdd' );
  $( 'li.account', win ).text( lang.account ).data( 'type', 'account' );
  $( 'li.social', win ).text( lang.social ).data( 'type', 'social' );
  $( 'li.config', win ).text( lang.config ).data( 'type', 'config' );
  $( 'li.custom', win ).text( lang.custom ).data( 'type', 'custom' );
  $( 'li.invite', win ).text( lang.invite ).data( 'type', 'invite' );
  $( 'li.backup', win ).text( lang.backup ).data( 'type', 'backup' );
  $( 'li.payment', win ).text( lang.payment ).data( 'type', 'payment' );
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

  //Account texts

  $( '.account .avatar-edit span', win ).text( lang.avatarEdit );
  $( '.account .preferences-account-top .avatar-info .info-username span').text('@'+user.user);
  $( '.account .preferences-account-top .avatar-info .info-name span').text(user.fullName);
  $( '.account .bottom-account-card .header span').text(lang.accountSetting);
  $( '.account .bottom-account-card .card-content .right span').text(lang.change);
  $( '.account .bottom-account-card .username .card-content .left span').text(lang.accountUser);
  $( '.account .bottom-account-card .email .card-content .left span').text(lang.accountMailUser);
  $( '.account .bottom-account-card .password .card-content .left span').text(lang.changePassword);
  $( '.account .bottom-account-card .name .card-content .left span').text(lang.changeName);

  /*
  $( '.preferences-bottom-title.account', win ).text( lang.accountTitle );
  $( '.preferences-bottom-description.account', win ).text( lang.accountDescription );

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

  */
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

  $('.preferences-bottom-title.payment').text( lang.paymentTitle );
  $('.preferences-bottom-description.payment').text( lang.peymentDesc );
  $('.preferences-bottom-label.name').text( lang.paymentCardHolder );
  $('.preferences-bottom-label.number').text( lang.paymentCardNumber );
  $('.preferences-bottom-label.month').text( lang.paymentCardMonth );
  $('.preferences-bottom-label.year').text( lang.paymentCardYear );
  $('.preferences-bottom-label.cvv').text( lang.paymentCardCVV );
  $('.preferences-payment-button span').text( lang.save );
  $('.cancel-credit span').text( lang.unlinkCard );
  $('.stripe-loading').text( lang.stripeLoading );

  $( '.preferences-about-version', win ).text( lang.version + ':' + ' ' + api.system.version().replace( 'beta', 'Beta' ) );
  $( '.preferences-about-link.legal', win ).text( lang.legalNotices );
  $( '.preferences-about-link.privacy', win ).text( lang.privacyPolicies );

  $('.preferences-bottom-content .subtitle').text(lang.feelAlone);
  $('.preferences-bottom-content .emails').text(lang.emails);
  $('.preferences-bottom-content .add-mail-text').text(lang.addMail);
  $('.preferences-bottom-content .share-text').text(lang.sendInvitations);
  $('.preferences-bottom-content .mail').attr('placeholder' , lang.mailExample);

}

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
translateUI();
loadAppUser();
