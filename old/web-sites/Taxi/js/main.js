// PopUp
$(document).ready(function(){
	$("button.join,.button-call").click(function(){
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
});



