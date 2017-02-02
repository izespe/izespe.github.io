/**
 * Created by Wide-Web on 06.01.2017.
 */
$(document).ready(function () {

    $('.owl-one').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"]
    });
    $('.owl-card').owlCarousel({
        loop: true,
        items: 1
});

    $('.owl-four').owlCarousel({
        loop: true,
        nav: true,
        margin: 30,
        responsiveClass: true,
        items: 4,
        navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    // show first content by default
    $('#tabs-nav li:first-child').addClass('active');
    $('.content').hide();
    $('.content:first').show();

    // click function
    $('#tabs-nav li').click(function(){
        $('#tabs-nav li').removeClass('active');
        $(this).addClass('active');
        $('.content').hide();

        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;

    });



    $("#show").on('click touchstart', function(event) {
        $(".tags").addClass("tags-full");
        $("#show").addClass("show-hide");
        event.preventDefault();
    });
    $("#show1").on('click touchstart', function(event) {
        $(".marks-list").addClass("tags-full");
        $("#show1").addClass("show-hide");
        event.preventDefault();
    });

});

$(function () {
    $('.add').on('click',function(){
        var $qty=$(this).closest('p').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal < 99) {console.log(currentVal);
            $qty.val(currentVal + 1);

            if(currentVal === 98){

                $('.centerbox').css('border-bottom','3px solid red');
                $('.qty').css('color','red');

            }

        }
    });
    $('.minus').on('click',function(){
        var $qty=$(this).closest('p').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {console.log(currentVal);
            $qty.val(currentVal - 1);
            if(currentVal <= 98){

                $('.centerbox').css('border-bottom','1px solid #009688');
                $('.qty').css('color','black');
            }
        }
    });

    $(function() {
        /* initial variables */
        var numRows = $('#ticketLinesTable').find('tr').length;
        var SHOWN = 9;
        var MORE = 20;

        /* get how many more can be shown */
        var getNumMore = function(ns) {
            var more = MORE;
            var leftOver = numRows - ns;
            if ((leftOver) < more) {
                more = leftOver;
            }
            return more;
        }
        /* how many are shown */
        var getInitialNumShown = function() {
            var shown = SHOWN;
            if (numRows < shown) {
                shown = numRows;
            }
            return shown;
        }
        /* set how many are initially shown */
        var numShown = getInitialNumShown();

        /* set the numMore if less than 20 */
        var numMore = getNumMore(numShown);

        /* set more html */
        if (numMore > 0) {
            var more_html = '<p><button id="more">Показать ещё <span>' + numMore + '</span></button></p>';
            $('#ticketLinesTable').find('tr:gt(' + (numShown - 1) + ')').hide().end().after(more_html);
        }
        $('#more').click(function() {
            /* determine how much more we should update */
            numMore = getNumMore(numShown);
            /* update num shown */
            numShown = numShown + numMore;
            $('#ticketLinesTable').find('tr:lt(' + numShown + ')').show();

            /* determine if to show more and how much left over */
            numMore = getNumMore(numShown);
            if (numMore > 0) {
                $('#more span').html(numMore);
            } else {
                $('#more').remove();
            }
        });

    });
});


