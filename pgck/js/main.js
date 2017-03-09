/**
 * Created by Wide-Web on 07.03.2017.
 */
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
                var inpRes = $(el).parents(".sliderCalc").find(".res input");


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

                    },
                    onStart: function (data) {
                        setVal(el, data);
                        if (!$(el).hasClass("cost")) $(inpRes).attr("disabled", "true");
                    }

                };

                function setVal(s, d) {
                    var inpR = $(s).parents(".sliderCalc").find(".res input");
                    $(inpR).val(d.from);

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
