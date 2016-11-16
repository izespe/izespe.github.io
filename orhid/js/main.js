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
                var el1 = $(this);
                var inp = $(el).find("input");
                var inpRes = $(el).parents(".sliderCalc").find("#res");
                var inpRes2 = $(el1).parents(".sliderCalc").find("#res2");
                var setSlider = {

                    type: "double",
                    min: inp.attr('data-min'),
                    max: inp.attr('data-max'),
                    step: inp.attr('data-step'),
                    value: inp.val(),
                    from: 4000,
                    to: 10000,
                    hide_min_max: true,
                    hide_from_to: true,
                    keyboard: true,
                    onChange: function (data) {
                        setVal(el, data);
                        setVal2(el1, data);
                    },
                    onStart: function (data) {
                        setVal(el, data);
                        setVal2(el1, data);
                    }
                };

                function setVal(s, d) {
                    var inpR = $(s).parents(".sliderCalc").find("#res");
                    $(inpR).val(d.from);
                }

                function setVal2(s1, d) {
                    var inpR2 = $(s1).parents(".sliderCalc").find("#res2");
                    $(inpR2).val(d.to);
                }

                var $slider = $(el).find("input");
                $slider.ionRangeSlider(setSlider);

                $(inpRes).on("focus", function () {
                    $(this).val(parseInt($(this).val()));
                });
                $(inpRes).on("blur change", function () {
                    var slidUp = $slider.data("ionRangeSlider");
                    slidUp.update({
                        from: parseInt($(this).val())
                    });
                    if (event.type != 'change')
                        $(this).val(parseInt($(this).val()));

                });


                $(inpRes2).on("focus", function () {
                    $(this).val(parseInt($(this).val()));
                });
                $(inpRes2).on("blur change", function () {
                    var slidUp = $slider.data("ionRangeSlider");
                    slidUp.update({
                        to: parseInt($(this).val())
                    });
                    if (event.type != 'change')
                        $(this).val(parseInt($(this).val()));

                });

            });

        }
    }

    $(".custom-switch").each(function(i) {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name");

        $(this).wrap('<div class="custom-switch" id="' + name + '"></div>');
        $(this).after('<label for="custom-switch-' + i + '"></label>');
        $(this).attr("id", "custom-switch-" + i);
        $(this).attr("name", name);
    });


});


