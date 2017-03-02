/**
 * Created by Wide-Web on 15.02.2017.
 */
$(function () {
    $('.owl-carousel-only-phone').owlCarousel({
        loop: true,
        margin: 10,
        items: 1
    });


});

/* Menu */

$(function () {


    $('.dropdown').click(function (e) {
        e.stopPropagation();
        $('.nav-dropdown').toggle();
    });

    $('html').click(function () {
        $('.nav-dropdown').hide();
    });



    $('.js-nav-more').on('click', function(){
        $('.js-sub-nav').slideToggle();
        $('.js-nav-more i').toggleClass('cross');
        $('.catalog-nav').toggleClass('blurred');
        $('.main-nav__sub-item').css('display','flex');
    });


});
