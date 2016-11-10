/*------------RANGE SLIDER----------*/

$(function () {


    jQuery(window).load(function () {

        makeRangeSlider($(".range"));


        $(".tabgroup").map(function () {
            makeRangeSlider($(this).find(".range"));
        });
        if ($(".range").length > 0) {
            makeRangeSlider($(".range"));
        }

    });

    function makeRangeSlider(s) {

        if ($(s).find("input").length > 0) {
            $(s).map(function () {
                var el = $(this);
                var inp = $(el).find("input");
                var inpRes = $(el).parents(".sliderCalc").find(".res output");


                var setSlider = {
                    grid: true,
                    min: inp.attr('data-min'),
                    max: inp.attr('data-max'),
                    step: inp.attr('data-step'),
                    value: inp.val(),
                    hide_min_max: true,
                    hide_from_to: true,
                    grid_num: 2,
                    type: "single",
                    keyboard: true,
                    onChange: function (data) {
                        setVal(el, data);
                        setVal2(el, data);

                        setTop(el, data);
                        setBubble(el, data);
                    },
                    onStart: function (data) {
                        setVal(el, data);
                        setVal2(el, data);
                        if (!$(el).hasClass("cost")) $(inpRes).attr("disabled", "true");
                    }

                };

                function setVal(s, d) {
                    var inpR = $(s).parents(".sliderCalc").find(".res output");
                    $(inpR).val(d.from);

                }

                function setVal2(s, d) {
                    var fourDay = "2-4 дня";
                    var sevenDay = "5-7 дней";
                    var inpR = $(s).parents(".sliderCalc").find("#txt output");

                    if (d.from >= 1000 && d.from <= 50000) {
                        $(inpR).val(fourDay);
                    } else {
                        $(inpR).val(sevenDay);
                    }
                }



                function setTop() {
                    var rp = 100 - (100 * inp.val() / (inp.attr('data-max') - inp.attr('data-min')));
                    var r = 78 * (rp) / 100;
                    $(".round").css('background-position-y', r + "px");
                }

                function setBubble() {
                    var current_pull1 = parseInt($('.irs-slider').css('left'));
                    var pull1buff = current_pull1 - 14;
                    $("#txt").css('left', pull1buff);
                    console.log(current_pull1, pull1buff)
                }

                var $slider = $(el).find("input");
                $slider.ionRangeSlider(setSlider);


                if ($(el).hasClass("stavka")) {
                    var slider = $slider.data("ionRangeSlider");
                    slider.update({
                        step: 0.1
                    });
                }
                $(inpRes).on("focus", function () {
                    $(this).val(parseInt($(this).val()));
                });
                $(inpRes).on("blur change", function () {
                    var slidUp = $slider.data("ionRangeSlider");
                    slidUp.update({
                        from: parseInt($(this).val())
                    });
                    if (event.type != 'change')
                        $(this).val(parseInt($(this).val()) + " рублей");

                });


            });

        }
    }


});

/*--------------COUNTER-------------*/

$(function () {
    jQuery(document).ready(function ($) {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    });
});

/*-------------OWL 3 ROWS-----------*/

$(function () {
    var owl1 = $('#owl-steps');
    var owl = $('#owl2row-plugin');
    var owl2 = $('#owl-reviews');

    owl.owlCarousel({
        loop: true,
        dots: true,
        nav: true,
        margin: 30,
        owl2row: 'true', // enable plugin
        owl2rowTarget: 'item',    // class for items in carousel div
        owl2rowContainer: 'owl2row-item', // class for items container
        owl2rowDirection: 'utd', // ltr : directions
        responsive: {
            0: {
                items: 2,
                owl2row: false
            },
            768: {
                items: 3,
            },
            1024: {
                items: 3
            },
            1500: {
                items: 5
            }
        }
    });

    owl1.owlCarousel({

        nav: true,
        slideSpeed: 300,
        paginationSpeed: 300,
        items: 1,
        loop: false,
        dots: true
    });

    owl2.owlCarousel({

        nav: true,
        slideSpeed: 10,
        paginationSpeed: 10,
        items: 1,
        loop: true,
        dots: true
    });
});

/*---------------CLOCK--------------*/

$(function () {
    var s = Snap(document.getElementById("clock"));

    var seconds = s.select("#seconds"),
        minutes = s.select("#minutes"),
        hours = s.select("#hours"),
        rim = s.select("#rim"),
        face = {
            elem: s.select("#face"),
            cx: s.select("#face").getBBox().cx,
            cy: s.select("#face").getBBox().cy,
        },
        angle = 0,
        easing = function (a) {
            return a == !!a ? a : Math.pow(4, -10 * a) * Math.sin((a - .075) * 2 * Math.PI / .3) + 1;
        };

    var sshadow = seconds.clone(),
        mshadow = minutes.clone(),
        hshadow = hours.clone(),
        rshadow = rim.clone(),
        shadows = [sshadow, mshadow, hshadow];

    //Insert shadows before their respective opaque pals
    seconds.before(sshadow);
    minutes.before(mshadow);
    hours.before(hshadow);
    rim.before(rshadow);

    //Create a filter to make a blurry black version of a thing
    var filter = Snap.filter.blur(0.1) + Snap.filter.brightness(0);

    //Add the filter, shift and opacity to each of the shadows
    shadows.forEach(function (el) {
        el.attr({
            transform: "translate(0, 2)",
            opacity: 0.2,
            filter: s.filter(filter)
        });
    })

    rshadow.attr({
        transform: "translate(0, 8) ",
        opacity: 0.5,
        filter: s.filter(Snap.filter.blur(0, 8) + Snap.filter.brightness(0)),
    })

    function update() {
        var time = new Date();
        setHours(time);
        setMinutes(time);
        setSeconds(time);
    }

    function setHours(t) {
        var hour = t.getHours();
        hour %= 12;
        hour += Math.floor(t.getMinutes() / 10) / 6;
        var angle = hour * 360 / 12;
        hours.animate(
            {transform: "rotate(" + angle + " 244 251)"},
            100,
            mina.linear,
            function () {
                if (angle === 360) {
                    hours.attr({transform: "rotate(" + 0 + " " + face.cx + " " + face.cy + ")"});
                    hshadow.attr({transform: "translate(0, 2) rotate(" + 0 + " " + face.cx + " " + face.cy + 2 + ")"});
                }
            }
        );
        hshadow.animate(
            {transform: "translate(0, 2) rotate(" + angle + " " + face.cx + " " + face.cy + 2 + ")"},
            100,
            mina.linear
        );
    }

    function setMinutes(t) {
        var minute = t.getMinutes();
        minute %= 60;
        minute += Math.floor(t.getSeconds() / 10) / 6;
        var angle = minute * 360 / 60;
        minutes.animate(
            {transform: "rotate(" + angle + " " + face.cx + " " + face.cy + ")"},
            100,
            mina.linear,
            function () {
                if (angle === 360) {
                    minutes.attr({transform: "rotate(" + 0 + " " + face.cx + " " + face.cy + ")"});
                    mshadow.attr({transform: "translate(0, 2) rotate(" + 0 + " " + face.cx + " " + face.cy + 2 + ")"});
                }
            }
        );
        mshadow.animate(
            {transform: "translate(0, 2) rotate(" + angle + " " + face.cx + " " + face.cy + 2 + ")"},
            100,
            mina.linear
        );
    }

    function setSeconds(t) {
        t = t.getSeconds();
        t %= 60;
        var angle = t * 360 / 60;
        //if ticking over to 0 seconds, animate angle to 360 and then switch angle to 0
        if (angle === 0) angle = 360;
        seconds.animate(
            {transform: "rotate(" + angle + " " + face.cx + " " + face.cy + ")"},
            600,
            easing,
            function () {
                if (angle === 360) {
                    seconds.attr({transform: "rotate(" + 0 + " " + face.cx + " " + face.cy + ")"});
                    sshadow.attr({transform: "translate(0, 2) rotate(" + 0 + " " + face.cx + " " + face.cy + 2 + ")"});
                }
            }
        );
        sshadow.animate(
            {transform: "translate(0, 2) rotate(" + angle + " " + face.cx + " " + face.cy + 2 + ")"},
            600,
            easing
        );
    }

    setInterval(update, 1000);
});

/*--------OWL DOTS ANIMATION--------*/

$(function () {

    $(".owl-dot:nth-child(1)").click(function () {
        move(0);
    });

    $(".owl-dot:nth-child(2)").click(function () {
        move(173);
    });

    $(".owl-dot:nth-child(3)").click(function () {
        move(345);
    });

    $(".owl-dot:nth-child(4)").click(function () {
        move(517);
    });

    $('.owl-next').click(function () {
        var current_pull = isNaN(parseInt($('.active-img').css('transform').split(',')[4])) ? 0 : parseInt($('.active-img').css('transform').split(',')[4]);
        tx = current_pull;
        if (tx < 500) {
            console.log(tx);
            move(tx + 172);
        }
    });

    $('.owl-prev').click(function () {
        var current_pull = isNaN(parseInt($('.active-img').css('transform').split(',')[4])) ? 0 : parseInt($('.active-img').css('transform').split(',')[4]);
        tx = current_pull;
        if (tx > 10) {
            console.log(tx);
            move(tx - 172);
        }
    });

    function move(tx) {
        $('.active-img').css({
            '-webkit-transform': 'translate(' + tx + 'px ,0)',
            '-moz-transform': 'translate(' + tx + 'px ,0)',
            '-ms-transform': 'translate(' + tx + 'px ,0)',
            '-o-transform': 'translate(' + tx + 'px ,0)'
        });
    }
});



