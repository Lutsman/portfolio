$(document).ready(function(){

// PopUp
	$("button.join, .button-call").click(function(){
		popupShow();
	});
	$("#hidingPopup-js").click(function(){
		popupHide();
	});
	function popupShow(){
		$("#popup1-js").fadeIn(500);
	}

	function popupHide(){
		$("#popup1-js").fadeOut(500);
	}

//Scroll
	$('a[href^="#"]').bind('click.smoothscroll',function (e) {
	 e.preventDefault();
	 
	var target = this.hash,
	 $target = $(target);
	 
	$('html, body').stop().animate({
	 'scrollTop': $target.offset().top
	 }, 500, 'swing', function () {
	 window.location.hash = target;
	 });
	 });

//Slider
    var slideWidth=940;
    $(function(){
    $('.slidewrapper-js').width($('.slidewrapper-js').children().size()*slideWidth);
        $('#next_slide').click(function(){
            nextSlide();
        });
        $('#prev_slide').click(function(){
            prevSlide();
        });
    });

    function nextSlide(){
        var currentSlide=parseInt($('.slidewrapper-js').data('current'));
        currentSlide++;
        if(currentSlide>=$('.slidewrapper-js').children().size())
        {
            currentSlide=0;
        }
        $('.slidewrapper-js').animate({left: -currentSlide*slideWidth},500).data('current',currentSlide);
    }

    function prevSlide(){
        var currentSlide=parseInt($('.slidewrapper-js').data('current'));
        currentSlide--;
        if(currentSlide<0)
        {
            currentSlide=$('.slidewrapper-js').children().size()-1;
        }
        $('.slidewrapper-js').animate({left: -currentSlide*slideWidth},500).data('current',currentSlide);
    }

//form validate
    $('#submit').click(function(e) {
        var vResult = true;
        $('#subscribe input[name!="submit"]').each(function() {
            var vVal = $(this).val(),
                requiredField = $(this).attr('required');
            $(this).removeClass('form-danger');
            $(this).removeClass('form-success');
            if (vVal.length <= 0  && requiredField) {
                $(this).val('').attr('placeholder', 'Заполните поле!').addClass('form-danger');
                vResult = false;
            }else if($(this).attr('name') == 'email' && vVal.length>0) {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if (pattern.test($(this).val())) {
                    $(this).addClass('form-success');
                } else {
                    $(this).val('').attr('placeholder', 'Неверный email!').addClass('form-danger');
                    vResult = false;
                }
            }else if($(this).attr('name') == 'telephone') {
                    var pattern =/\b[+]?[-0-9\(\) ]{11,18}\b/ ;
                if (pattern.test($(this).val())) {
                    $(this).addClass('form-success');
                } else {
                    $(this).val('').attr('placeholder', 'Неверный телефон').addClass('form-danger');
                    vResult = false;
                }
            }else if(requiredField) {
                $(this).addClass('form-success');
            }
        });
        if (vResult == false) {
            e.preventDefault();
        }
    });

    $('#hidingPopup-js').click(function(){
        $('#subscribe input[name!="submit"]').each(function(){
           if($(this).val()){
               $(this).val('');
           };
            $(this).removeClass('form-danger');
            $(this).removeClass('form-success');
        });
        $('#subscribe textarea').each(function(){
            $(this).val('');
        });
    });

});

