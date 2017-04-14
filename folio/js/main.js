


$(document).ready(function () {
    var w = $(window).width(); // Получаем ширину окна
    if (w <= 520) { // Если ширина окна меньше, либо равна 600

        $(".portfolioFilter").css('display', 'none');
        $("#portfolioContainer").addClass("box-to-carousel-on").removeClass("portfolioContainer");
        $(".box-to-carousel-2").addClass("box-to-carousel-on2");
    }
    $('.box-to-carousel-on, .box-to-carousel-on2 ').owlCarousel({
        loop: true,
        margin: 10,
        dots: true,
        nav: false,
        items: 1,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                dots: false
            }
        }

    });
    $('.folio ').owlCarousel({
        loop: false,
        margin: 0,
        dots: true,
        nav: true,
        items: 1,
        navText: ["&#10141;", "&#10141;"]
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.fix-scroll').addClass('active');
        }
        if ($(this).scrollTop() <= 200) {
            $('.fix-scroll').removeClass('active');
        }
    });

    /**
     * Created by dmve on 04.04.2017.
     */

    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
    };

    $(window).load(function () {
        var $container = $('.portfolioContainer');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.portfolioFilter a').click(function () {
            $('.portfolioFilter .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    });
    $(window).load(function () {
        var current = 1;
        var current2 = 1;
        var current3 = 1;
        var height = $('.works-item').height();
        var height2 = $('.skills-item').height();
        var height3 = $('.contacts-item').height();
        var numberDivs = $('.works-item').children().length;
        var numberDivs2 = $('.skills-item').children().length;
        var numberDivs3 = $('.contacts-item').children().length;
        var first = $('.works-item div:nth-child(1)');
        var first2 = $('.skills-item div:nth-child(1)');
        var first3 = $('.contacts-item div:nth-child(1)');
        setInterval(function () {
            var number = current * -height;
            var number2 = current2 * -height2;
            var number3 = current3 * -height3;

            first.css('margin-top', number + 'px');
            if (current === numberDivs) {
                first.css('margin-top', '0px');
                current = 1;
            } else current++;

            first2.css('margin-top', number2 + 'px');
            if (current2 === numberDivs2) {
                first2.css('margin-top', '0px');
                current2 = 1;
            } else current2++;

            first3.css('margin-top', number3 + 'px');
            if (current3 === numberDivs3) {
                first3.css('margin-top', '0px');
                current3 = 1;
            } else current3++;

        }, 2000);

    });


});