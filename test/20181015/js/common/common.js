/*===========================================================
PCSPをウィンドウサイズで分ける
PC pcWin SP spWin
===========================================================*/
$(function(){
  var judgeDevice = function(){
  var windowWidth = $(window).innerWidth();

    if(windowWidth > 768) {
      $('body').removeClass('spWin');
      $('body').addClass('pcWin');
    } else {
      $('body').removeClass('pcWin');
      $('body').addClass('spWin');
    }
  }

  judgeDevice();

  $(window).on('load resize',function(){
    judgeDevice();
  });

});


/*===========================================================
    ハンバーガーメニューのJS、出ているとき背景固定
===========================================================*/
$(function(){

  var body = $('body');

  //sp
  var header = $('#header');
  var spNav = $('.sp_obj .nav_inner');//出てくるメニュー
  var spBtn = $('.navOpen');//ハンバーガーボタン
  spNav.css('display','none');

  //オーバーレイ
  var bg = $('.layer');
  bg.css('display','none');

  //スクロールの値
  var current_scrollY;

  spBtn.on('click',function(){

    if(body.hasClass('spWin')) {

      if(!spBtn.hasClass('active')){
        nav_open(spBtn,spNav,bg);
      }else{
        nav_close(spBtn,spNav,bg);
      }
    }
  });

  //オーバーレイを押したときの挙動
  bg.on('click',function(){

    if(body.hasClass('spWin')) {
      if(!spBtn.hasClass('active')){
        return;
      }else{
        nav_close(spBtn,spNav,bg);
      }
    }
  });

  function nav_open(spBtn_,spNav_,bg_){
    current_scrollY = $( window ).scrollTop();
    spBtn_.addClass('active');
    spNav_.stop(true,true).slideDown();
    bg_.stop(true,true).fadeIn();

    $('#wrapper').css({ position: 'fixed', width: '100%',top: -1 * current_scrollY});
  }

  function nav_close(spBtn_,spNav_,bg_){
    spBtn_.removeClass('active');
    spNav_.stop(true,true).slideUp();
    bg_.stop(true,true).fadeOut();
    $('#wrapper').css({"position":"static",'width':' ','top':'0'}).prop( { scrollTop: current_scrollY } );
    $( 'body , html' ).attr( { style: '' } ).prop( { scrollTop: current_scrollY } );
  }

  //PCサイズになったときにBGを消す

  var timer = null;

  $(window).on('resize load',function(){
    clearTimeout( timer );
    timer = setTimeout(function(){
      if(body.hasClass('pcWin')){
        bg.css({'display':'none'});
      }else{
        if(spBtn.hasClass('active')){
          bg.css({'display':'block'});
        }else{
          return;
        }
      }
    },300);
  });
});
