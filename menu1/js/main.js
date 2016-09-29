$(document).ready(function(){
    $('.menutoggle').click (function() {
        $('.menumobile').toggleClass("menuoff");
        $('.menutoggle').toggleClass("buttonmove");
        $("html,body").toggleClass("noscroll");
    });
});