/***
 * 鼠标悬浮气泡提示Jquery插件
 ***/
$(function () {
    $.fn.manhua_hoverTips = function (options) {
        var defaults = {
            position: "t", //箭头指向上(t)、箭头指向下(b)、箭头指向左(l)、箭头指向右(r)
            value: 23 //小箭头偏离左边和上边的位置			

        };
        var options = $.extend(defaults, options);

        var bid = parseInt(Math.random() * 100000);
        var $this = $(this);
        $("body").prepend('<div class="docBubble" id="btip' + bid + '"><i class="triangle-' + options.position + '"></i><div class="tl"><div class="inner"><div class="cont"></div></div></div><div class="tr"></div><div class="bl"></div></div>');
        var $btip = $("#btip" + bid);
        var $btipClose = $("#btipc" + bid);
        var offset, h, w;
        var timer;
        $this.off().on("mousemove", function () {
            clearInterval(timer);
            offset = $(this).offset();
            h = $(this).height();
            w = $(this).width();
            $(".cont").html($(this).attr("tips"));

            switch (options.position) {
                case "t": //当它是上面的时候
                    $(".triangle-t").css('left', options.value);
                    $btip.css({
                        "left": offset.left,
                        "top": offset.top + h + 14
                    }).show();
                    break;
                case "b": //当它是下面的时候
                    $(".triangle-b").css('left', options.value);
                    $btip.css({
                        "left": offset.left,
                        "top": offset.top - h - 7 - $btip.height()
                    }).show();
                    break;
                case "l": //当它是左边的时候		
                    $(".triangle-l").css('top', options.value);
                    $btip.css({
                        "left": offset.left + w + 10,
                        "top": offset.top + h / 2 - 7 - options.value
                    }).show();
                    break;
                case "r": //当它是右边的时候			
                    $(".triangle-r").css('top', options.value);
                    $btip.css({
                        "left": offset.left - 20 - $btip.width(),
                        "top": offset.top + h / 2 - 7 - options.value
                    }).show();
                    break;
            }

        });
        $this.on("mouseout", function () {
            timer = setInterval(function () {
                $btip.hide();
            }, 0);
        });

        $btip.on("mousemove", function () {
            clearInterval(window.timer);
            $btip.show();
        });
        $btip.on("mouseout", function () {
            $btip.hide();
        });
        $btipClose.on("click", function (e) {
            $btip.hide();
        });
    }
});