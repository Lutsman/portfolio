$(document).ready(function() {
/**
 *Animate
 */
  $(".scroll").each(function () {
    var block = $(this);
    $(window).bind({
      scroll : function() {
        var top = block.offset().top;
        var bottom = block.height()+top;
        top = top - $(window).height();
        var scroll_top = $(this).scrollTop();
        if ((scroll_top > top) && (scroll_top < bottom)) {
          if (!block.hasClass("animated")) {
            block.addClass("animated");
          }
        }
      },
      load : function() {
        var top = block.offset().top;
        var bottom = block.height()+top;
        top = top - $(window).height();
        var scroll_top = $(this).scrollTop();
        if ((scroll_top > top) && (scroll_top < bottom)) {
          if (!block.hasClass("animated")) { // если забыли добавить анимацию, все же добавляем
            //block.addClass("animated");
          }
        } else {
          block.removeClass("animated");
        }
      }
    });
  });

/**
 * Validate and send mail
 */
  $(".phone").mask("+7 (999) 999-99-99");  //init mask

  $('input[name="submit"]').click(function(e) {
    var form = $(this).parent();

    if(validateForm(form)) {
      sendForm(form);
    } else {
     /* alert("ниче не вышло");*/
    }

    e.preventDefault(); //останавливаем обработку submit
  });

  function validateForm(formObj) {
    var vResult = true;

    $('input[name!="submit"], textarea', formObj).each(function() {
      var vVal = $(this).val(),
        requiredField = $(this).attr('required');

      if($(this).hasClass('form-fail')) { //чистим классы, если отсались после прошлого раза
        $(this).removeClass('form-fail');
      }else if( $(this).hasClass('form-success')) {
        $(this).removeClass('form-success');
      }

      if (vVal.length == 0  && requiredField) {
        $(this).val('').attr('placeholder', 'Заполните поле!').addClass('form-fail');
        vResult = false;
      }else if($(this).attr('name') == 'email' && requiredField) {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

        if (pattern.test($(this).val())) {
          $(this).addClass('form-success');
        } else {
          $(this).val('').addClass('form-fail');
          vResult = false;
        }

      }else if($(this).attr('name') == 'phone'  && requiredField && vVal.length) {
        $(this).addClass('form-success');
      }else if($(this).is('textarea') && vVal.length < 10 && vVal.length > 0  && requiredField) {
        $(this).val('').attr('placeholder', 'Вопрос слишком короткий!').addClass('form-fail');
        vResult = false;
      }else if(requiredField) {
        $(this).addClass('form-success');
      }
    });
    return vResult;
  }

  function sendForm(formObj) {
    var form_data = formObj.serialize(); //собераем все данные из формы

    $.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: form_data,
      success: function() {
        //код в этом блоке выполняется при успешной отправке сообщения
        showNewWindow('thanks.html');
        if(formObj.parent().attr('id') == 'ask' || formObj.parent().attr('id') == 'callback') {
          popupHide('#' + formObj.parent().attr('id'));
        }
      }
    });
  }

  function showNewWindow(windowPath) {
    var newWindow = window.open(windowPath, '_self');
  }

/**
 * Pop Up
 */
  $('.btn-call').click(function() {
    setSubj('#callback', this);
    popupShow('#callback');
  });
  $('.btn-request').click(function() {
    popupShow('#request');
  })
  $('p.questions').find('a').click(function() {
    popupShow('#ask');
  });

  $('.close, .pop-up-wrap').click(function() {
    popupHide('#ask');
    popupHide('#callback');
    popupHide('#request');
  });

  function popupShow(popupForm) {
    $(popupForm).fadeIn({queue : false, duration: 400});
    $('.pop-up-wrap').fadeIn(400);
  }

  function popupHide(popupForm) {
    $(popupForm).fadeOut({queue : false, duration: 400});
    $('.pop-up-wrap').fadeOut(400);
  }

  /**
   * Устанавливаем заголовок для формы (если привязываем больше одной кнопки на форму)
   * @param popupForm строка селектор формы
   * @param requestBtn строка селектор кнопки от которой поступило событие
   * @returns  возвращает true/false
   */
  function setSubj(popupForm, requestBtn) {
    var formSubjectField = $('input[name="subject"]', popupForm),
      btnSubject = $(requestBtn).attr('data-subject');

    if(btnSubject && formSubjectField.length) {
      formSubjectField.val(btnSubject);
      return true;
    }
    return false;
  }

/**
 * Smooth scroll
 */
  $('a[href^="#"]').bind('click.smoothscroll',function (e) {
    e.preventDefault();

    var target = this.hash;

    $('html, body').stop().animate({
      'scrollTop' : $(target).offset().top -90
    }, 500, 'swing', function () {
      window.location.hash = target;
    });
  });

/**
 * ScrollUp button
 */
  var buttonUp = '<div id="scrlup"><i class="upButton">&#9650;</i></div>',
      flag = false;

  $('body').append($(buttonUp));

  $('#scrlup').mouseover( function(){
    $( this ).animate({opacity: 1},100);
  }).mouseout( function(){
    $( this ).animate({opacity: 0.8},100);
  });

  $('#scrlup i').click( function(){
    $("html, body").animate({scrollTop: 0}, 500);
    return false;
  });

  $(window).scroll(function(){
    if ( $(document).scrollTop() > $(window).height() && !flag ) {
      $('#scrlup').fadeIn({queue : false, duration: 400});
      $('#scrlup').animate({'bottom' : '40px'}, 400);
      flag = true;
    } else if ( $(document).scrollTop() < $(window).height() && flag ) {
      $('#scrlup').fadeOut({queue : false, duration: 400})
      $('#scrlup').animate({'bottom' : '-20px'}, 400);
      flag = false;
    }
  });

  /**
   * Fancybox
   */

  $("#privateP").fancybox({
    maxWidth	: 800,
    maxHeight	: 600,
    fitToView	: false,
    width		: '70%',
    height		: '70%',
    autoSize	: false,
    closeClick	: false,
    openEffect	: 'fade',
    closeEffect	: 'fade',
    openSpeed : 400,
    closeSpeed : 400,
    helpers : {
      overlay : {
        locked : false
      }
    }
  });


/**
 * Slider
 */
  $('.l-box').slick({
    dots: true,
    infinite: true,
    width : '100%',
    speed: 300,
    slidesToShow: 1,
    /*slidesToScroll: 4,*/
    centerMode: true,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
});




/**
 * Fixed menu
  */
var menu = $('#topMenu'),
  h_hght = 126,//console.log(menu.prev().height()); при загрузке возращает 330, а запрос через консоль 126
  h_mrg = 0;

  $(window).bind({
    scroll : function() {
      if ($(this).width() >= 1024){
        setMenuStyle();
      }
    },
    load : function() {
      if ($(this).width() >= 1024){
        menu.css('position', 'fixed');
        setMenuStyle();
      }
    }
  });

  function setMenuStyle() {
    var top = $(this).scrollTop();

    if((top + h_mrg) < h_hght) {
      menu.css('top', h_hght-top);
    } else {
      menu.css('top', h_mrg);
    }
  }

});
