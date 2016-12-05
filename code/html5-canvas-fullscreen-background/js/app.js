function loadJS(A, e, t) {
    var o = !!window.ActiveXObject,
        i = o && !window.XMLHttpRequest,
        a = document.createElement("script"),
        n = i ? document.documentElement : document.getElementsByTagName("head")[0];
    a.type = "text/javascript", a.async = !0, a.readyState ? a.onreadystatechange = function () {
        ("loaded" == a.readyState || "complete" == a.readyState) && (a.onreadystatechange = null, e && e())
    } : a.onload = function () {
        e && e()
    }, a.src = A, t ? document.getElementById(t).appendChild(a) : n.insertBefore(a, n.firstChild)
}

function bgImage() {
    function A() {
        t.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, t.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }

    function e() {
        o.clearRect(0, 0, t.width, t.height);
        var A = [a].concat(n);
        n.forEach(function (e) {
            e.x += e.xa, e.y += e.ya, e.xa *= e.x > t.width || e.x < 0 ? -1 : 1, e.ya *= e.y > t.height || e.y < 0 ? -1 : 1, o.fillRect(e.x - .5, e.y - .5, 1, 1);
            for (var i = 0; i < A.length; i++) {
                var n = A[i];
                if (e !== n && null !== n.x && null !== n.y) {
                    var r, l = e.x - n.x,
                        s = e.y - n.y,
                        d = l * l + s * s;
                    d < n.max && (n === a && d >= n.max / 2 && (e.x -= .03 * l, e.y -= .03 * s), r = (n.max - d) / n.max, o.beginPath(), o.lineWidth = r / 2, o.strokeStyle = "rgba(0,0,0," + (r + .2) + ")", o.moveTo(e.x, e.y), o.lineTo(n.x, n.y), o.stroke())
                }
            }
            A.splice(A.indexOf(e), 1)
        }), i(e)
    }
    var t = document.getElementById("cas"),
        o = t.getContext("2d");
    A(), window.onresize = A;
    var i = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (A) {
                window.setTimeout(A, 1e3 / 60)
            }
        }(),
        a = {
            x: null,
            y: null,
            max: 2e4
        };
    window.onmousemove = function (A) {
        A = A || window.event, a.x = A.clientX, a.y = A.clientY
    }, window.onmouseout = function (A) {
        a.x = null, a.y = null
    };
    for (var n = [], r = 0; 150 > r; r++) {
        var l = Math.random() * t.width,
            s = Math.random() * t.height,
            d = 2 * Math.random() - 1,
            c = 2 * Math.random() - 1;
        n.push({
            x: l,
            y: s,
            xa: d,
            ya: c,
            max: 6e3
        })
    }
    setTimeout(function () {
        e()
    }, 100)
}
$.fn.extend({
    isOnScreenVisible: function () {
        if (!$("body").hasClass("post-template")) return !1;
        var A = $(window),
            e = {
                top: A.scrollTop(),
                left: A.scrollLeft()
            };
        e.right = e.left + A.width(), e.bottom = e.top + A.height();
        var t = this.offset();
        return t.right = t.left + this.outerWidth(), t.bottom = t.top + this.outerHeight(), !(e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom)
    }
});
var duoshuoQuery = {
        short_name: "snowz"
    },
    GlobalConfigue = {
        duoshuoDomain: "https://snowz.me"
    },
    General = {
        isMobile: !1,
        isWechat: !1,
        viewWidth: $(window).width(),
        absUrl: location.protocol + "//" + location.host,
        init: function () {
            var A = window,
                e = (A.document, navigator.userAgent.toLowerCase()),
                t = A.navigator.appVersion.match(/android/gi);
            A.navigator.appVersion.match(/iphone/gi);
            "micromessenger" == e.match(/MicroMessenger/i) && (General.isWechat = !0, $("body").addClass("wechat-webview")), t && (General.isMobile = !0), $("body").hasClass("post-template") && (General.updateImageWidth(), General.rewardLoader()), General.webFontLoader(), General.scrollToPos(), General.arrowEvent(), General.commentLoader()
        },
        updateImageWidth: function () {
            function A() {
                var A = $(this),
                    e = t.outerWidth(),
                    o = this.naturalWidth;
                o >= e ? A.addClass("full-img") : A.removeClass("full-img")
            }

            function e() {
                o.each(A)
            }
            var t = $(".post-content"),
                o = $(".single-post-inner img").on("load", A);
            e()
        },
        webFontLoader: function () {
            WebFontConfig = {
                loading: function () {},
                custom: {
                    families: ["Exo", "iconfont"],
                    urls: [General.absUrl + "/assets/css/font.min.css"]
                }
            }, loadJS(General.absUrl + "/assets/js/webfont.js", function () {
                WebFont.load({
                    custom: {
                        families: ["Exo", "iconfont"]
                    }
                })
            })
        },
        arrowEvent: function () {
            $(".arrow_down").click(function () {
                return $("html,body").animate({
                    scrollTop: $(window).height() - 20
                }, 600, function () {
                    window.location.hash = "#"
                }), !1
            })
        },
        scrollToPos: function (A) {
            var e = "我要飞到最高",
                t = (A || $(window).height(), $('<a href="#" id="to-top" title="' + e + '"> <div class="to-top-wrap"></div></a>').appendTo("body"));
            $(window).scroll(function () {
                $(window).scrollTop() > $(window).height() ? t.fadeIn(500) : t.fadeOut(500)
            }), t.click(function (A) {
                A.preventDefault(), $("html,body").animate({
                    scrollTop: 0
                }, 666, function () {
                    window.location.hash = "#"
                })
            })
        },
        urlIconlize: function (A) {
            var e, t, o = "iconfont",
                i = {
                    twitter: o + "-twitter",
                    qzone: o + "-qzone",
                    weibo: o + "-weibo",
                    facebook: o + "-facebook",
                    github: o + "-github",
                    douban: o + "-douban",
                    google: o + "-google",
                    luolei: o + "-luolei",
                    dribble: o + "-dribble",
                    v2ex: o + "-v2ex",
                    zhihu: o + "-zhihu",
                    wikipedia: o + "-wikipedia",
                    jianshu: o + "-jianshu",
                    youku: o + "-youku",
                    youtube: o + "-youtube"
                };
            for (var a in i)
                if ("function" != typeof i[a]) {
                    var n = a;
                    A.indexOf(n) >= 0 && (e = n, t = i[n])
                }
            return t
        },
        addIcons: function () {
            $(".single-post-inner  a:not(:has(img))").each(function (A) {
                var e = $(this).attr("href"),
                    t = document.createElement("a");
                t.href = e, _selfDomain = t.hostname, General.urlIconlize(_selfDomain), $(this).prepend('<i class="iconfont ' + General.urlIconlize(_selfDomain) + '"></i>');
                var o = $(this).find("i").css("color"),
                    i = $(this).css("color");
                $(this).hover(function () {
                    $(this).css("color", o), $(this).addClass("animated pulse")
                }, function () {
                    $(this).css("color", i), $(this).removeClass("animated pulse")
                })
            })
        },
        rewardLoader: function () {
            var A = {
                alipay: "/assets/images/qr-alipay-256.png",
                wechat: "/assets/images/qr-wechat-256.png"
            };
            General.isWechat && $(".wechat-code b").html("长按上方二维码打赏作者"), $(".money-like .reward-button").hover(function () {
                $("img.wechat-img").attr("src", A.wechat), $("img.alipay-img").attr("src", A.alipay), $(".money-code").fadeIn(), $(this).addClass("active")
            }, function () {
                $(".money-code").fadeOut(), $(this).removeClass("active")
            }, 800), $(".money-like .reward-button").click(function () {
                $(this).hasClass("active") ? ($(this).find("img.wechat-img").attr("src", A.wechat), $(this).find("img.alipay-img").attr("src", A.alipay), $(".money-code").fadeOut(), $(this).removeClass("active")) : ($(".money-code").fadeIn(), $(this).addClass("active"))
            })
        },
        commentLoader: function () {
            if (!$("body").hasClass("post-template")) return !1;
            var A = GlobalConfigue.duoshuoDomain + location.pathname;
            $(window).scroll(function () {
                return $(".comment-area").has("div").length > 0 ? !1 : void(($(".author-image").isOnScreenVisible() || $(".read-next").isOnScreenVisible()) && 0 == $(".author-image").hasClass("duoshuo-loaded") && ($(".author-image").addClass("duoshuo-loaded"), loadJS(General.absUrl + "/assets/js/duoshuo.modify.js", function () {
                    var e = document.createElement("div");
                    e.setAttribute("data-thread-key", A), e.setAttribute("data-url", location.href), e.setAttribute("data-title", $("title").html()), DUOSHUO.EmbedThread(e), scrollStop = !0, setTimeout(function () {
                        $(".comment-area").append(e)
                    }, 250)
                })))
            })
        }
    },
    ImageSmartLoader = {
        isWebPSupported: !1,
        isImageCompressed: !1,
        init: function () {
            ImageSmartLoader.webPCheck()
        },
        isCompressedCheck: function () {},
        webPCheck: function (A, e) {
            var t = {
                    demo: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="
                },
                o = new Image;
            o.onload = function () {
                o.width > 0 && o.height > 0;
                ImageSmartLoader.isWebPSupported = !0, ImageSmartLoader.webPLoader()
            }, o.onerror = function () {
                ImageSmartLoader.isWebPSupported = !1, ImageSmartLoader.webPLoader()
            }, o.src = "data:image/webp;base64," + t.demo
        },
        imgLoader: function () {},
        webPLoader: function () {
            if (1 == ImageSmartLoader.isWebPSupported) {
                if (768 == General.viewWidth) return $(".lazy").lazyload({
                    advanced_load: !0,
                    data_attribute: "url",
                    webP_load: !0,
                    is_scale: !1
                }), !1;
                General.viewWidth < 768 ? $(".lazy").lazyload({
                    advanced_load: !0,
                    data_attribute: "url",
                    webP_load: !0,
                    is_scale: !0,
                    scale_width: 750
                }) : $(".lazy").lazyload({
                    advanced_load: !0,
                    data_attribute: "url",
                    webP_load: !0,
                    is_scale: !1
                })
            } else {
                if (768 == General.viewWidth) return $(".lazy").lazyload({
                    advanced_load: !0,
                    data_attribute: "url",
                    webP_load: !1,
                    is_scale: !0,
                    scale_width: 1500
                }), !1;
                General.viewWidth < 768 ? $(".lazy").lazyload({
                    advanced_load: !0,
                    data_attribute: "url",
                    webP_load: !1,
                    is_scale: !0,
                    scale_width: 750
                }) : $(".lazy").lazyload({
                    advanced_load: !0,
                    data_attribute: "url",
                    webP_load: !1,
                    is_scale: !1
                })
            }
        }
    };
$(document).ready(function () {
    var A = $(window);
    $.fn.lazyload = function (e) {
        function t() {
            var A = 0;
            i.each(function () {
                var e = $(this);
                if (!a.skip_invisible || e.is(":visible"))
                    if ($.abovethetop(this, a) || $.leftofbegin(this, a));
                    else if ($.belowthefold(this, a) || $.rightoffold(this, a)) {
                    if (++A > a.failure_limit) return !1
                } else e.trigger("appear"), A = 0
            })
        }
        var o, i = this,
            a = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: window,
                data_attribute: "original",
                skip_invisible: !1,
                appear: null,
                load: null,
                placeholder: "data:image/gif;base64,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",
                advanced_load: !1,
                webP_load: !1,
                is_scale: !1,
                scale_width: 750
            };
        return e && (void 0 !== e.failurelimit && (e.failure_limit = e.failurelimit, delete e.failurelimit), void 0 !== e.effectspeed && (e.effect_speed = e.effectspeed, delete e.effectspeed), $.extend(a, e)), o = void 0 === a.container || a.container === window ? A : $(a.container), 0 === a.event.indexOf("scroll") && o.bind(a.event, function () {
            return t()
        }), this.each(function () {
            var A = this,
                e = $(A);
            A.loaded = !1, (void 0 === e.attr("src") || e.attr("src") === !1) && e.is("img") && (e.attr("src", a.placeholder), e.addClass("loading")), e.one("appear", function () {
                if (!this.loaded) {
                    if (a.appear) {
                        var t = i.length;
                        a.appear.call(A, t, a)
                    }
                    var o = e.attr("data-" + a.data_attribute);
                    (o.indexOf("upaiyun") > -1 || o.indexOf("file.is26.com") > -1) && (1 == a.advanced_load && (o += "!"), 1 == a.is_scale && (o += "/fw/" + a.scale_width), 1 == a.webP_load && (o += "/format/webp")), $("<img />").bind("load", function () {
                        e.hide(), e.is("img") ? e.attr("src", o) : e.css("background-image", "url('" + o + "')"), e[a.effect](a.effect_speed), A.loaded = !0;
                        var t = $.grep(i, function (A) {
                            return !A.loaded
                        });
                        if (i = $(t), a.load) {
                            var n = i.length;
                            a.load.call(A, n, a)
                        }
                        e.removeClass("loading")
                    }).attr("src", o)
                }
            }), 0 !== a.event.indexOf("scroll") && e.bind(a.event, function () {
                A.loaded || e.trigger("appear")
            })
        }), A.bind("resize", function () {
            t()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && A.bind("pageshow", function (A) {
            A.originalEvent && A.originalEvent.persisted && i.each(function () {
                $(this).trigger("appear")
            })
        }), $(document).ready(function () {
            t()
        }), this
    }, $.belowthefold = function (e, t) {
        var o;
        return o = void 0 === t.container || t.container === window ? (window.innerHeight ? window.innerHeight : A.height()) + A.scrollTop() : $(t.container).offset().top + $(t.container).height(), o <= $(e).offset().top - t.threshold
    }, $.rightoffold = function (e, t) {
        var o;
        return o = void 0 === t.container || t.container === window ? A.width() + A.scrollLeft() : $(t.container).offset().left + $(t.container).width(), o <= $(e).offset().left - t.threshold
    }, $.abovethetop = function (e, t) {
        var o;
        return o = void 0 === t.container || t.container === window ? A.scrollTop() : $(t.container).offset().top, o >= $(e).offset().top + t.threshold + $(e).height()
    }, $.leftofbegin = function (e, t) {
        var o;
        return o = void 0 === t.container || t.container === window ? A.scrollLeft() : $(t.container).offset().left, o >= $(e).offset().left + t.threshold + $(e).width()
    }, $.inviewport = function (A, e) {
        return !($.rightoffold(A, e) || $.leftofbegin(A, e) || $.belowthefold(A, e) || $.abovethetop(A, e))
    }, $.extend($.expr[":"], {
        "below-the-fold": function (A) {
            return $.belowthefold(A, {
                threshold: 0
            })
        },
        "above-the-top": function (A) {
            return !$.belowthefold(A, {
                threshold: 0
            })
        },
        "right-of-screen": function (A) {
            return $.rightoffold(A, {
                threshold: 0
            })
        },
        "left-of-screen": function (A) {
            return !$.rightoffold(A, {
                threshold: 0
            })
        },
        "in-viewport": function (A) {
            return $.inviewport(A, {
                threshold: 0
            })
        },
        "above-the-fold": function (A) {
            return !$.belowthefold(A, {
                threshold: 0
            })
        },
        "right-of-fold": function (A) {
            return $.rightoffold(A, {
                threshold: 0
            })
        },
        "left-of-fold": function (A) {
            return !$.rightoffold(A, {
                threshold: 0
            })
        }
    }), General.init(), ImageSmartLoader.init(), $("body").hasClass("post-template") && (General.addIcons(), General.commentLoader()), bgImage()
});