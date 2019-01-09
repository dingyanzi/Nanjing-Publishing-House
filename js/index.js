//顶部二级导航
//顶部搜索
var all = localStorage.getItem("all");
var data = JSON.parse(all);
var bannerlist = data.detail[0].bannerlist;


for(var i=0;i<bannerlist.length;i++){
	var ids = bannerlist[i].content_id; 
	var txt = '<div class="ban_c album" ng-click="jumps('+i+','+ids+')"><a><img src="'+bannerlist[i].imgurl+'"/></a></div>'
	$(".banner").append(txt);
}
$(".frontCover").css({width:98*bannerlist.length});


$("#search").click(function() {
	$(".search_open").animate({
		left: -20
	}, 600);
	$(this).parent(".rt").animate({
		width: 644
	}, 600);
	$(this).hide();
	$(".se2").addClass("animated fadeInRight");
	$(".se1").addClass("animated fadeInRight2");
});

$("#remove").click(function() {
	$(this).parents(".rt").animate({
		width: 115
	}, 600);
	$(".search_open").animate({
		left: 143
	}, 600);
	$("#search").show();
	$(".se2").removeClass("animated fadeInRight");
	$(".se1").removeClass("animated1 fadeInRight2");
});
//首页banner

//首页滚动图片
$(function() {
	var Marquee = function(ul) {
		var moveNum = $(ul).attr('moveNum') || 1;
		var w = $(ul).find('li').outerWidth(true);
		var changeLi = function(dir) {
			for(var i = 0; i < moveNum; i++) {
				if(dir == 'r') {
					$(ul).find('li:first').appendTo($(ul));
				} else {
					$(ul).find('li:last').prependTo($(ul));
				}
			}
		}
		var move = function(dir) {
			var _left = 0;
			if(dir == 'r') {
				_left = -moveNum * w;
			} else {
				changeLi(dir);
				_left = moveNum * w;
				$(ul).css('left', -_left);
				_left = 0;
			}
			$(ul).animate({
				left: _left
			}, 500, function() {
				if(dir == 'r') {
					changeLi(dir);
				}
				$(ul).css('left', '0');
			});
		}
		var timeout = null;
		return {
			autoRun: function() {},
			next: function() {
				this.stop();
				move('r');
				this.autoRun();
			},
			pre: function() {
				this.stop();
				move('l');
				this.autoRun();
			},
			stop: function() {
				window.clearTimeout(timeout);
			}
		}

	};

	var marquee_list1 = new Marquee($('#xstj ul'));
	marquee_list1.autoRun();
	$("#LeftArr").click(function() {
		marquee_list1.pre();
	})
	$("#RightArr").click(function() {
		marquee_list1.next();
	})

});
//首页banner
var ie6 = !-[1, ] && !window.XMLHttpRequest;
var userAgent = navigator.userAgent.toLowerCase();
var browser = {
	ie8: /msie 8/.test(userAgent),
	ie7: /msie 7/.test(userAgent)
};

//Slide func
$.fn.slide = function() {
	var defaults, opts, data_opts, $this, $b_, t, n = 0,
		count, $nav, $p, $n, DelayObj, Delay = false;
	defaults = {
		fade: true,
		auto: true,
		time: 4000,
		action: 'mouseover',
		fn: null
	};
	$this = $(this);
	data_opts = $this.data('slide') || {};
	opts = $.extend({}, defaults, data_opts);
	$b_ = $this.children('.ban_c');
	count = $b_.length;
	if($this.find('.ban_nav').length) {
		$nav = $this.find('.ban_nav')
	} else {
		$nav = $('<div class="ban_nav"></div>');
		for(i = 0; i < count; i++) {
			$nav.append('<a>' + (i + 1) + '</a>')
		};
		$this.append($nav)
	};
	$this.append('<a class="Left" onselectstart="return false;"></a><a class="Right" onselectstart="return false;"></a>');
	$nav.children('a').eq(0).addClass('on');
	$nav.children('a').eq(1).addClass('ban_next');
	$nav.children('a').eq(count - 1).addClass('ban_prev');
	$b_.hide().eq(0).show();
	if(ie6) {
		$b_.height($b_.attr('height') || $this.height())
	};
	$nav.children('a').each(function(index) {
		$(this).on(opts.action, function(event) {
			event.preventDefault();
			event.stopPropagation();
			if(index >= count) {
				return false
			} else {
				$nav.children('a').eq(index - 1).addClass('ban_prev').siblings().removeClass('ban_prev');
				$nav.children('a').eq(index == count - 1 ? 0 : index + 1).addClass('ban_next').siblings().removeClass('ban_next')
			};
			if(opts.fade) {
				$b_.stop(1, 1).fadeOut(200).eq(index).stop(1, 1).fadeIn(500)
			} else {
				$b_.hide().eq(index).show()
			};
			$(this).addClass('on').siblings().removeClass("on");
			n = index
		})
	});
	$p = $(this).find('.Left');
	$n = $(this).find('.Right');
	if(opts.auto) {
		t = setInterval(function() {
			showAuto()
		}, opts.time);
		$this.mouseenter(function() {
			clearInterval(t);
		}).mouseleave(function() {
			t = setInterval(function() {
				showAuto()
			}, opts.time);
		})
	};
	$p.click(function() {
		showPre()
	});
	$n.click(function() {
		showAuto()
	});

	function showAuto() {
		n = n >= (count - 1) ? 0 : ++n;
		$nav.find('a').eq(n).trigger(opts.action);
	};

	function showPre() {
		n = n <= 0 ? (count - 1) : --n;
		$nav.find('a').eq(n).trigger(opts.action)
	};
	if(opts.fn) {
		eval(opts.fn + "(opts,$b_,$nav)")
	}
};
$('.slide').each(function() {
	$(this).slide()
});

//banner专辑封面
function banner_ext(opts, $b_, $nav) {
	var album = $b_.filter(function() {
			return $(this).hasClass('album')
		}),
		newslink = $('.banner').find('.link');
	newslink.eq(0).show();
	if(browser.ie8) opts.fade = false;
	$b_.each(function(i) {
		$(this).data('index', i)
	});
	album.each(function(i) {
		$('.frontCover').append('<li index="' + ($(this).data('index')) + '"><div class="img">' + $(this).find('a').eq(0).html() + '</div><p>' + $(this).find('img').eq(0).attr('alt') + '</p></li>')
	});
	$nav.children('a').each(function(index) {
		$(this).click(function() {
			$('.frontCover').children('li').filter(function() {
				return $(this).attr('index') == index
			}).addClass('open').siblings().removeClass('open');
			newslink.eq($('.frontCover').find('.open').index()).show().siblings('.link').hide();
		})
	});
	$('.frontCover').children('li').click(function() {
		$nav.children('a').eq($(this).attr('index')).trigger('click')
	});
	$('.frontCover').children('li').eq(0).addClass('open').end().eq(-1).css('margin', 0)
};

var widths = document.body.clientWidth;
$(".slider-panel img").css("width", widths);
window.onresize = function() {
	var widths = document.body.clientWidth;
	$(".slider-panel img").css("width", widths);
}




localStorage.setItem("os",0);
function toSet(obj){
var toTopHeight = $(".Crumbs").offset().top;
var n1_top = $("#n1").offset().top - 180;
var n2_top = $("#n2").offset().top - 180;
var n3_top = $("#n3").offset().top - 180;
var n4_top = $("#n4").offset().top - 180;
var n5_top = $("#n5").offset().top - 180;
var n6_top = $("#n6").offset().top - 180;
//alert(tops);
$(window).scroll(function() {
	var scroH = $(this).scrollTop();
	if(obj=="0"){
		if(scroH >= n6_top) {
			set_cur(5);
		} else if(scroH >= n5_top) {
			set_cur(4);
		} else if(scroH >= n4_top) {
			set_cur(3);
		} else if(scroH >= n3_top) {
			set_cur(2);
		} else if(scroH >= n2_top) {
			set_cur(1);
		} else if(scroH >= n1_top) {
			set_cur(0);
		}
	}else{
		
	}
	
	if($(document).scrollTop() > toTopHeight) {
		if('undefined' == typeof(document.body.style.maxHeight)) {
			var scrollTop = $(document).scrollTop();
			$(".Crumbs").css({
				'position': 'absolute',
				'top': scrollTop + 'px'
			});
		} else {
			$(".Crumbs").addClass("nav_fixed");
		}
	} else {
		if('undefined' == typeof(document.body.style.maxHeight)) {
			$(".Crumbs").css({
				'position': 'absolute',
				'top': toTopHeight + 'px'
			});
		} else {
			$(".Crumbs").removeClass("nav_fixed");
		}
	}
	
});


}

function set_cur(n) {
	if($(".navigation a").hasClass("cur")) {
		$(".navigation a").removeClass("cur");
	}
	$(".navigation a").eq(n).addClass("cur");
};