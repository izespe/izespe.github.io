$(window).load(function(){
	Modernizr.addTest('sizes', ('sizes' in document.createElement('img')) );
    Modernizr.load([{
      test: Modernizr.mq('only all'),
      yep : [],
      nope: ['https://oss.maxcdn.com/respond/1.4.2/respond.min.js']
	},{
		test: Modernizr.srcset,
		yep : [],
      	nope: ['/assets/templates/main/js/picturefill.min.js']
	}]);
    $('.addr-item').click(function(){
        $(this).find('.toggleArrow').toggleClass('icn-arrow-bottom').toggleClass('icn-arrow-top');
        if ($(this).find('.toggleArrow').hasClass('icn-arrow-top')) {
            $(this).find('.hide-for-medium-down').attr('style','display: block !important');
			$(this).parent().children().not(this).find('.toggleArrow').removeClass('icn-arrow-top').addClass('icn-arrow-bottom');
			$(this).parent().children().not(this).find('.hide-for-medium-down').attr('style','');
        } else {
            $(this).find('.hide-for-medium-down').attr('style','');
        }
    });
	$('form[role="search"] .icn-magnifier').click(function(){
		if ($('#searcher').val() != '') {
			$(this).closest('form').submit();
		} else {
			$(this).closest('form').toggleClass('active');
		}
	});
    $('.toggleSearch').click(function(){
        $(this).toggleClass('icn-close').toggleClass('icn-magnifier');
        $(this).closest('.has-form').next().slideToggle();
    });
    var videoContainer = $('#video-bg');
    $('.toggleVideoState').click(function(){
        if (videoContainer.length > 0) {
            var self = $(this);
            var video = videoContainer.find('video');
            if (video[0].paused) {
                video[0].play();
            } else {
                video[0].pause();
            }
            self.toggleClass('icn-media-play').toggleClass('icn-media-stop');
        }
    });
    $('.country-map').click(function(e, nomove){
		if (!$(this).hasClass('active')) {
			$('.shops-data .icn-close').trigger('click');
		}
        $('.country-map').removeClass('active');
        $('.offices-map').removeClass('active');
        $(this).addClass('active');
        $('.offices-map[data-country="'+$(this).data('country')+'"]').addClass('active');
        if (nomove != 1) {
            var lat = $(this).data('lat');
            var lng = $(this).data('lng');
            var zoom = $(this).data('zoom');
            if (lat && lng && zoom) {
                moveToLocation(lat, lng, zoom);
            }
        }
    });
    $('.show-city').click(function(e, nomove){
        $('.shops-data .icn-close').show();
        $(this).addClass('active').children('.button-link').addClass('active');
        $(this).parent().find('.show-city').not(this).removeClass('active').children('.button-link').removeClass('active');
        $(this).removeClass('after-active').removeClass('before-active');
        $(this).nextAll().addClass('after-active');
        $(this).prevAll().addClass('before-active');
        if ($(this).hasClass('active') && map != undefined){
            var city = $(this).children('.button-link').data('city');
            var country = $(this).closest('.offices-map').data('country');
            if (city && country && nomove != 1) {
                if ($(e.target).hasClass('show-city') || $(e.target).is('.show-city > button')) {
                    moveToLocation(coords[country][city][0].lat, coords[country][city][0].lng, 10);
                }
            }
        } else {
            $('.show-city').removeClass('after-active').removeClass('before-active');
        }
    });
    $('.offices > li').click(function(e, nomove){
        var parent = $(this).closest('.show-city');
        var id = $(this).data('id');
		var index = $(this).data('index');
        if (map != undefined && id != undefined && index != undefined) {
            var city = parent.children('.button-link').data('city');
            var country = parent.closest('.offices-map').data('country');
            if (city && country && nomove != 1) {
                moveToLocation(coords[country][city][id].lat, coords[country][city][id].lng, 15, index);
            }
        }
    });
    $('.addr-item').click(function(){
        /*var city = $(this).data('city');
        var country = $(this).data('country');
        var id = $(this).data('id');
        if (city && country) {
            moveToLocation(coords[country][city][id].lat, coords[country][city][id].lng, 10);
        }*/
    });
    $('.shops-data .icn-close').click(function(){
        $('.offices-map .show-city').removeClass('active').removeClass('after-active').removeClass('before-active').find('.button-link').removeClass('active');
        $(this).hide();
        //$(this).closest('.offices').parent().find('.show-city').removeClass('active');
    });
	$(".butt_katalog").on("click",function(){
		$(".down_kat").slideToggle();
	});
});

$.fn.extend({
    lakbiSlider: function(options){
        var $this = this;
        var noChangeHeight = options ? (options.noChangeHeight ? options.noChangeHeight : false) : false;
        var inline = options ? (options.inline ? options.inline : false) : false;
        var resizeInit = options ? (options.resizeInit ? options.resizeInit : true) : true;
        var duration = options ? (options.duration ? options.duration : 1000) : 1000;
        var container = options ? (options.container ? options.container : '') : '';
        var bckgr = options ? (options.bckgr ? options.bckgr : 'black') : 'black';
        var navElement = options ? (options.navElement ? options.navElement : 'button') : 'button';
        var figure = options ? (options.figure ? options.figure : 'figure') : 'figure';
        var caption = options ? (options.caption ? options.caption : '') : '';
        var numbers = options ? (options.numbers ? options.numbers : '') : '';
        var minCount = options ? (options.minCount ? options.minCount : 1) : 1;

        var $container = $this.find(container);
        var next = $this.find(navElement+'[data-action="next"]');
        var prev = $this.find(navElement+'[data-action="prev"]');
        var items = $container.find(figure);
        var width = $this.width();
        var height = $this.height();

        var position = 'absolute';
        if (inline) {
            position = 'relative';
        }
        $container.css('position', position);

        if (resizeInit) {
            var rtime = new Date(1, 1, 2000, 12,00,00);
            var timeout = false;
            var delta = 200;
            $(window).resize(function() {
                rtime = new Date();
                if (timeout === false) {
                    timeout = true;
                    setTimeout(resizeend, delta);
                }
            });

            function resizeend() {
                if (new Date() - rtime < delta) {
                    setTimeout(resizeend, delta);
                } else {
                    timeout = false;
                    reInitSlider($this, options, items, $container);
                }               
            }
        }

        var $numbers = [];
        var $caption = [];
        if (items.length > minCount) {
            if (numbers) {
                $numbers = $this.find(numbers);
            }
            var cHeight = 0;
            if (caption) {
                $caption = $this.find(caption);
                if ($caption.length > 0) {
                    /*$caption.attr('style', 'position: absolute; bottom: 0;');
                    $caption.width(width);
                    cHeight = $caption.height();
                    $caption.css('bottom', -cHeight/2+'px');*/
                }
            }
            if (!inline) {
                $this.css('height', height + cHeight);
            }
            $this.css('position', 'relative');
            $container.width(items.length * width);
            var maxWidth = $container.width();
            if (!inline) {
                $container.height(height);
            } else {
                $container.css('overflow', 'hidden');
            }
            var iHeight = 0;
            items.each(function(i){
                $(this).css('background', bckgr).css('position', position).css('left', i*width+'px').css('top', '0px').css('overflow', 'hidden').width(width);
                if (position == 'relative') {
                    $(this).css('float', 'left').css('position', 'static');
                }
                if (!noChangeHeight) {
                    $(this).height(height);
                }
                $(this).find('img').css('z-index', '1');
                $(this).show();
            });
            if (inline) {
                $container.height(items.first().height());
            }
            if ($numbers.length > 0) {
                $numbers.find('span:first').text('1');
            }
            var isAnimate = false;
            if (next) {
                next.unbind().click(function(){
                    var curLeft = $container.position().left;
                    if (isAnimate == false && curLeft - width > -maxWidth) {
                        isAnimate = true;
                        $container.stop().animate({left:curLeft-width+'px'}, duration, 'swing', function(){
                            isAnimate = false;
                            if ($caption && position == 'relative') {
                                iHeight = 0;
                                items.each(function(){
                                    if ($(this).position().left + $container.position().left + 2 <= width && $(this).position().left + $container.position().left + 2 > 0) {
                                        iHeight = $(this).height();
                                        $caption.children().hide().eq($(this).index()).show();
                                        if ($numbers.length > 0) {
                                            $numbers.find('span:first').text($(this).index()+1);
                                        }
                                    } else {
                                    }
                                });
                                if (iHeight > 0) {
                                    $container.height(iHeight);
                                }
                            }
                        });
                    } else if (isAnimate == false) {
                        isAnimate = true;
                        $container.stop().animate({left:'0px'}, duration, 'swing', function(){
                            isAnimate = false;
                            if ($caption && position == 'relative') {
                                iHeight = 0;
                                items.each(function(){
                                    if ($(this).position().left + $container.position().left + 2 <= width && $(this).position().left + $container.position().left + 2 > 0) {
                                        iHeight = $(this).height();
                                        $caption.children().hide().eq($(this).index()).show();
                                        if ($numbers.length > 0) {
                                            $numbers.find('span:first').text($(this).index()+1);
                                        }
                                    } else {
                                    }
                                });
                                if (iHeight > 0) {
                                    $container.height(iHeight);
                                }
                            }
                        });
                    }
                });
            }
            if (prev) {
                prev.unbind().click(function(){
                    var curLeft = $container.position().left;
                    if (isAnimate == false && curLeft + width < width) {
                        isAnimate = true
                        $container.stop().animate({left:curLeft+width+'px'}, duration, function(){
                            isAnimate = false;
                            if ($caption && position == 'relative') {
                                iHeight = 0;
                                items.each(function(){
                                    if ($(this).position().left + $container.position().left + 2 <= width && $(this).position().left + $container.position().left + 2 > 0) {
                                        iHeight = $(this).height();
                                        $caption.children().hide().eq($(this).index()).show();
                                        if ($numbers.length > 0) {
                                            $numbers.find('span:first').text($(this).index()+1);
                                        }
                                    } else {
                                    }
                                });
                                if (iHeight > 0) {
                                    $container.height(iHeight);
                                }
                            }
                        });
                    } else if (isAnimate == false) {
                        $container.stop().animate({left:-width*(items.length-1)+'px'}, duration, function(){
                            isAnimate = false;
                            if ($caption && position == 'relative') {
                                iHeight = 0;
                                items.each(function(){
                                    if ($(this).position().left + $container.position().left + 2 <= width && $(this).position().left + $container.position().left + 2 > 0) {
                                        iHeight = $(this).height();
                                        $caption.children().hide().eq($(this).index()).show();
                                        if ($numbers.length > 0) {
                                            $numbers.find('span:first').text($(this).index()+1);
                                        }
                                    } else {
                                    }
                                });
                                if (iHeight > 0) {
                                    $container.height(iHeight);
                                }
                            }
                        });
                    }
                });
            }
			if (next && prev) {
				items.each(function(){
					swipedetect(this, function(dir){
						if (dir == 'right') {
							prev.trigger('click');
						} else if (dir == 'left') {
							next.trigger('click');
						}
					});
				});
			}
        }
    }
});

function reInitSlider($this, options, items, $container){
    items.attr('style', '');
    $this.attr('style', '');
    $container.attr('style', '');
    $this.lakbiSlider(options);
}

function swipedetect(el, callback){
 
	var touchsurface = el,
		swipedir,
		startX,
		startY,
		distX,
		distY,
		threshold = 80, //required min distance traveled to be considered swipe
		restraint = 60, // maximum distance allowed at the same time in perpendicular direction
		allowedTime = 250, // maximum time allowed to travel that distance
		elapsedTime,
		startTime,
		handleswipe = callback || function(swipedir){}
	
	touchsurface.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0]
		swipedir = 'none'
		dist = 0
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
		//e.preventDefault()
		
	}, false)
	
	touchsurface.addEventListener('touchmove', function(e){
		//e.preventDefault() // prevent scrolling when inside DIV
	}, false)
	
	touchsurface.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed
		if (elapsedTime <= allowedTime){ // first condition for awipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
				swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
				swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
			}
				}
		handleswipe(swipedir)
		//e.preventDefault()
	}, false)
}


//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
 swipedir contains either "none", "left", "right", "top", or "down"
 if (swipedir =='left')
   alert('You just swiped left!')
})
*/
