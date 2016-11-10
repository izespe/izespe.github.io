/**
 * Created by Wide-Web on 31.10.2016.
 */



function d(e) {
    var s, t = $(A.activeFrame.html), a = t.find(".js-slider-item").data("id"), o = $(".js-slider-cont").length - 1, i = t.data("id");
    void 0 === e && (e = a + 1), 0 == i ? s = $(".js-s1") : 1 == i ? s = $(".js-s2") : 2 == i && (s = $(".js-s0")), o > a && (s.html($(".js-slider-cont-" + e).html()), A.show(">"), $(".js-dot").removeClass("active"), $(".js-dot[data-id=" + e + "]").addClass("active"), $(".js-project-ship").removeClass("reverse").css("left", 52 * e + "px"))
}

function u(e) {
    var s, t = $(A.activeFrame.html), a = t.find(".js-slider-item").data("id"), o = ($(".js-slider-cont").length - 1, t.data("id"));
    void 0 === e && (e = a - 1), 0 == o ? s = $(".js-s2") : 1 == o ? s = $(".js-s0") : 2 == o && (s = $(".js-s1")), a > 0 && (s.html($(".js-slider-cont-" + e).html()), A.show("<"), $(".js-dot").removeClass("active"), $(".js-dot[data-id=" + e + "]").addClass("active"), $(".js-project-ship").addClass("reverse").css("left", 52 * e + "px"))
}

var A = C.data("fotorama");
$(".js-dots").on("click", ".js-dot", function () {
    var e = $(this).data("id"), s = $(A.activeFrame.html).find(".js-slider-item").data("id");
    return e > s ? d(e) : s > e && u(e), !1
}), C.on("fotorama:show", function (e, s, t) {
    $(".js-project-ship").addClass("move")
}).on("fotorama:showend", function (e, s, t) {
    $(".js-project-ship").removeClass("move")
});