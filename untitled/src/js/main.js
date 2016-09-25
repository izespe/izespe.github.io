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
                    onChange: function (data) {
                        setVal(el,data);
                    },
                    onStart: function (data) {
                        setVal(el,data);
                        if (!$(el).hasClass("cost")) $(inpRes).attr("disabled","true");
                    }

                };

                function setVal(s,d){
                    var inpR = $(s).parents(".sliderCalc").find(".res output");
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


$(function () {
    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));

    jQuery(function ($) {
        // custom formatting example
        /*$('#count-number').data('countToOptions', {
         formatter: function (value, options) {
         return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
         }
         });*/

        // start all the timers
        $('.timer').each(count);

        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
    });

});


$(function () {
    var owl = $('#owl2row-plugin');
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
                items: 4,
                owl2row: false
            },
            1024: {
                items: 5
            },
            1025: {
                items: 5
            }
        }
    });
});
