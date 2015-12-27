/**
 * Created by Женя on 27.12.2015.
 */
$(document).ready(function(){
    /* ---------------------------------------------- /*
     * Home BG
     /* ---------------------------------------------- */

    $(".screen-height").height($(window).height());

    $(window).resize(function(){
        $(".screen-height").height($(window).height());
    });

    /*if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
     $('#home').css({'background-attachment': 'scroll'});
     } else {
     $('#home').parallax('50%', 0.1);
     }*/

});