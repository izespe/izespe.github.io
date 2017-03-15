/**
 * Created by Wide-Web on 13.03.2017.
 */
$(document).ready(function(){
(function($) {
    $.fn.respnav = function(options) {
        return this.each(function() {

            $('body').prepend('<div class="' + $(this).attr("class") + '_overlay"></div>');

            var obj = $(this);
            var tree = obj.next('ul');
            var overlay = $("." + obj.attr("class") + "_overlay");

            var toggleNav = function () {
                if( obj.is(':visible') ){
                    tree.slideToggle('fast');
                    obj.toggleClass("open");
                    overlay.toggle();
                }
            };

            obj.click(toggleNav);
            tree.click(toggleNav);
            overlay.click(toggleNav);

            $(window).resize(function(){
                if ( $(window).width() >= 970 ){
                    tree.attr('style', '');
                    $("." + obj.attr("class") + "_overlay").attr('style', '');
                    obj.removeClass('open');
                }
            });
        });
    };
})(jQuery);

$('.icon').respnav();




    $("#menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1000);
    });
});