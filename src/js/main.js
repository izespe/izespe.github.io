
$(function () {
$.reject({
    reject: {
        safari6: true,
        chrome25: true,
        firefox23: true,
        msie9: true,
        opera17: true,
        unknown: true // Everything else
    },
    header: 'Вы используете устаревший браузер.',

    paragraph1: 'Вы пользуетесь устравшим браузером, который не поддерживает' +
    ' современные веб-стандарты и представляет угрозу вашей безопасности. ',

    paragraph2: 'Пожалуйста, установите современный браузер:',
    closeMessage: '',
    closeLink: 'Зактрыть окно'
});
});

/*----------------MOBILE MENU---------------*/

$(function () {

    $('#navbttn').click(function () {
        $('#nav').toggleClass('open');
    });
    $('.menuitem').click(function () {
        $('#nav').toggleClass('open');
    });
});




$(function () {
    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
    })
});




$(function () {
    var owl = $('#owl2row-plugin');
    var owl1 = $('#thumbs-plugin');

    owl.owlCarousel({
        loop: true,
        nav: true,
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
                items: 4,
                owl2row: false
            },
            1024: {
                items: 6,
                owl2row: false
            },
            1025: {
                items: 6
            }
        }
    });

    owl1.owlCarousel({

        thumbs: true,
        thumbImage: true,
        items: 1,
        loop: true,
        nav: true

    });
});


$(document).ready(function() {

    jQuery(window).load(function() {

        makeRangeSlider($(".range"));


        $(".tabgroup").map(function(){
            makeRangeSlider($(this).find(".range"));
        });
        if ($(".range").length > 0){
            makeRangeSlider($(".range"));
        }

    });


    function makeRangeSlider(s){

        if ($(s).find("input").length > 0){
            $(s).map(function(){
                var el = $(this);
                var inp = $(el).find("input");
                var inpRes = $(el).parents(".sliderCalc").find(".res input");
                var setSlider = {
                    grid: false,
                    min: inp.attr('data-min'),
                    max: inp.attr('data-max'),
                    step: inp.attr('data-step'),
                    value: inp.val(),
                    hide_min_max: true,
                    hide_from_to: true,
                    onChange: function (data) {
                        setVal(el,data);
                    },
                    onStart: function (data) {
                        setVal(el,data);
                        if (!$(el).hasClass("cost")) $(inpRes).attr("disabled","true");
                    }

                };

                function setVal(s,d){
                    var inpR = $(s).parents(".sliderCalc").find(".res input");
                    if (s.hasClass("stavka")){
                        $(inpR).val(d.from+"%");
                    }else{
                        $(inpR).val(d.from+" рублей");
                    }
                }
                var $slider = $(el).find("input");
                $slider.ionRangeSlider(setSlider);

                if ($(el).hasClass("stavka")){
                    var slider = $slider.data("ionRangeSlider");
                    slider.update({
                        step:0.1
                    });
                }
                $(inpRes).on("focus",function(){
                    $(this).val(parseInt($(this).val()));
                });
                $(inpRes).on("blur change",function(){
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

