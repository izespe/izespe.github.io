$(document).ready(function () {
    (function () {
        var selectors = {
            nav: '[data-features-nav]',
            tabs: '[data-features-tabs]',
            screens: '[data-features-screens]',
            active: '.__active',
            toright: '__right',
            toleft: '__left'
        };
        var classes = {
            active: '__active',
            toright: '__right',
            toleft: '__left'
        };

        $('a', selectors.nav).on('click', function () {

            var $this = $(this)[0];

            if ($($this).hasClass(classes.active)) {
                return false;
            }

            $(selectors.active, selectors.nav).removeClass(classes.active);
            $('img', selectors.screens).removeClass(classes.toleft);

            $($this).addClass(classes.active);
            $('div', selectors.tabs).removeClass(classes.active);

            if ($('img', selectors.screens).hasClass(classes.active)) {
                $('img.__active').addClass(classes.toleft);
                $('img.__left').addClass(classes.toright);
            }

            $($this.hash, selectors.tabs).addClass(classes.active);
            $('img', selectors.screens).removeClass(classes.active);
            $($this.hash, selectors.screens).addClass(classes.active);

            return false;
        });
    })();

    $(".info-button-1").hover(function () {
        $(".info-popup-1").toggleClass('active');
    });
    $(".info-button-2").hover(function () {
        $(".info-popup-2").toggleClass('active');
    });
    $(".info-button-3").hover(function () {
        $(".info-popup-3").toggleClass('active');
    });
    $(".info-button-4").hover(function () {
        $(".info-popup-4").toggleClass('active');
    });


    $('#modal-content').apFullscreenModal({
        openSelector: '.open-modal',
        backgroundColor: '#fafafa',
        closeSelector: '.close-modal, #send'
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 4
            },
            1000: {
                items: 6
            }
        }
    })

});
