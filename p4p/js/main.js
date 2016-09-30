/**
 * Created by Wide-Web on 28.09.2016.
 */
$(function () {
    var owl = $('#owl-head');


    owl.owlCarousel({

        nav: false,
        slideSpeed : 10,
        paginationSpeed : 10,
        items: 1,
        loop: true,
        dots: true
    });
});


$(function () {
    if( jQuery(".toggle .toggle-title").hasClass('active') ){
        jQuery(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
    }
    jQuery(".toggle .toggle-title").click(function(){
        if( jQuery(this).hasClass('active') ){
            jQuery(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
        }
        else{	jQuery(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
        }
    });
});

$(document).ready(function(){
    $('.menutoggle,.menumobile>a').click (function() {
        $('.menumobile').toggleClass("menuoff");
        $("html,body").toggleClass("noscroll");
        $('.overlay').toggleClass("overlay-active");
    });

    $('.banktoggle,.bankmobile>a').click (function() {
        $('.bankmobile').toggleClass("menuoff");
        $("html,body").toggleClass("noscroll");
        $('.overlay').toggleClass("overlay-active");
    });
    
});