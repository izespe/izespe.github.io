/* Progressive .js enhancement - not mandatory */
/* This is only here to set initial navigation state from anchors */
var pushNav = document.getElementsByClassName('redaktor push nav')[0];
document.body.dataset.has_js = 'true';
document.body.dataset.initial = '1';
Array.prototype.forEach.call(pushNav.getElementsByTagName('a'), function(el, i){
    if (window.location.hash === el.getAttribute("href")) {
        document.body.dataset.initial = (i+1).toString();
    }
});
var endInit = function (event) {
    delete document.body.dataset.initial;
    pushNav.removeEventListener('click', endInit, false);
};
pushNav.addEventListener('click', endInit, false);