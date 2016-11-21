;
(function(root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.Loading = factory(window.Zepto || window.jQuery || $);
	}
})(this, function($) {
	var Loading = function() {};
	Loading.prototype = {
		loadingTpl: '<div class="ui-loading"><div class="ui-loading-mask"></div><i></i></div>',
		stop: function() {
			var content = $(this.target);
			this.loading.remove();
		},
		start: function() {
			var _this = this;
			var loading = this.loading;
			if (!loading) {
				loading = $(_this.loadingTpl);
				$('body').append(loading);
			}
			this.loading = loading;
			//console.log(cw,ch)
			this.setPosition();
		},
		setPosition: function() {
			var _this = this;
			var loading = this.loading;
			var target = _this.target;
			var content = $(target);
			var ch = $(content).outerHeight();
			var cw = $(content).outerWidth();
			if ($(target)[0].tagName == "HTML") {
				ch = Math.max($(target).height(), $(window).height());
				cw = Math.max($(target).width(), $(window).width());
			}
			loading.height(ch).width(cw);
			loading.find('div').height(ch).width(cw);
			if (ch < 100) {
				loading.find('i').height(ch).width(ch);
			}
			var offset = $(content).offset();
			loading.css({
				top: offset.top,
				left: offset.left
			});
			var icon = loading.find('i');
			var h = ch,
				w = cw,
				top = 0,
				left = 0;
			if ($(target)[0].tagName == "HTML") {
				h = $(window).height();
				w = $(window).width();
				top = (h - icon.height()) / 2 + $(window).scrollTop();
				left = (w - icon.width()) / 2 + $(window).scrollLeft();
			} else {
				top = (h - icon.height()) / 2;
				left = (w - icon.width()) / 2;
			}
			icon.css({
				top: top,
				left: left
			})
		},
		init: function(settings) {
			settings = settings || {};
			this.loadingTpl = settings.loadingTpl || this.loadingTpl;
			this.target = settings.target || 'html';
			this.bindEvent();
		},
		bindEvent: function() {
			var _this = this;
			$(this.target).on('stop', function() {
				_this.stop();
			});
			$(window).on('resize', function() {
				_this.setPosition();
			});
		}
	}
	return Loading;
});