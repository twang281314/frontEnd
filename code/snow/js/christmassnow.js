// $Christmas Snow jQuery v1.1 jQuery Plugin
// Author: FantasticPlugins
// Website: www.fantasticplugins.com | Exclusive to: http://www.codecanyon.net
// *********************************************************************************************

(function ($) {

    $.fn.christmassnow = function (options) {
        // Establish our default settings
        var settings = $.extend({
            snowflaketype: null,
            snowflakesize: null,
            snowflakedirection: null,
            snownumberofflakes: null,
            snowflakespeed: null,
            snowflakemovement: top,
            flakeheightandwidth: null
        }, options);
        this.each(function () {
            var windowHeight = jQuery(window).height();
            var snowDisappear = (windowHeight * '100') / 100;
            var drop = jQuery('.drop').detach();
            var snowTop = Math.floor(Math.random() * (windowHeight));
            snowTop = 0;
            var header = document.getElementsByTagName("head")[0];
            $(header).append('<style type="text/css">.drop{position: fixed;color:#fff;z-index:999999;}</style>');
            function create() {
                var number1 = 1 + Math.floor(Math.random() * 4);
                var number2 = 5 + Math.floor(Math.random() * 4);
                var number3 = 9 + Math.floor(Math.random() * 4);
                var number4 = 13 + Math.floor(Math.random() * 4);
                var number5 = 17 + Math.floor(Math.random() * 4);
                var content;

                // alert(imageSize);
                if (settings.snowflakesize === 1) {
                    var imageSize = Math.floor(Math.random() * 30);
                }
                else {
                    var imageSize = settings.flakeheightandwidth;
                }
                if (settings.snowflakesize === 1) {
                    if (imageSize > 15) {
                        var customsize = settings.snowflakespeed * 1000;
                    } else {
                        var customsize = settings.snowflakespeed * 1200;
                    }
                } else {
                    var customsize = settings.snowflakespeed * 1200;
                }
                if (settings.snowflakedirection === 3) {
                    var direction = "right";
                } else {
                    var direction = "left";
                }
                for (var i = 1; i <= 25; i++) {
                    if (settings.snowflaketype === i) {
                        if (i === 21) {
                            content = '<img class="flakeimage" style="height:' + imageSize + 'px; width:' + imageSize + 'px;"src="img/snowflake' + number1 + '.png"/>'
                        } else if (i === 22) {
                            content = '<img class="flakeimage" style="height:' + imageSize + 'px; width:' + imageSize + 'px;"src="img/snowflake' + number2 + '.png"/>'
                        } else if (i === 23) {
                            content = '<img class="flakeimage" style="height:' + imageSize + 'px; width:' + imageSize + 'px;"src="img/snowflake' + number3 + '.png"/>'
                        } else if (i === 24) {
                            content = '<img class="flakeimage" style="height:' + imageSize + 'px; width:' + imageSize + 'px;"src="img/snowflake' + number4 + '.png"/>'
                        } else if (i === 25) {
                            content = '<img class="flakeimage" style="height:' + imageSize + 'px; width:' + imageSize + 'px;"src="img/snowflake' + number5 + '.png"/>'
                        } else {
                            content = '<img class="flakeimage" style="height:' + imageSize + 'px; width:' + imageSize + 'px;"src="img/snowflake' + i + '.png"/>'
                        }
                        var movement = settings.snowflakemovement;
                        var clone = drop
                                .clone()
                                .appendTo('body')
                                .css(direction, Math.random() * jQuery(window).width() - 20)
                                .css('top', snowTop)
                                .html(content)
                                .animate(
                                { top: jQuery(window).height() - 80 },
                        {
                            duration: customsize,
                            complete: function () {
                                jQuery(this).fadeOut(200, function () {
                                    jQuery(this).remove();
                                });
                            },
                            step: function (fallingSpeed) {


                                var fallingSpeed = Math.floor(Math.random() * 5 + 1);
                                var movingDirection = Math.floor(Math.random() * 2);
                                var currentTop = parseInt(jQuery(this).css('top'));
                                var currentLeft = parseInt(jQuery(this).css('left'));
                                var currentRight = parseInt(jQuery(this).css('right'));
                                // jQuery(this).css('top', currentTop + fallingSpeed);
                                //alert(currentRight);
                                //
                                //alert(movingDirection);

                                if (settings.snowflakedirection === 1) {
                                    if (movingDirection === 0) {
                                        jQuery(this).css('bottom', currentLeft + fallingSpeed);
                                    } else {
                                        // set the snow move to left
                                        jQuery(this).css('bottom', currentLeft + -(fallingSpeed));
                                    }
                                }
                                if (settings.snowflakedirection === 2) {
                                    if (movingDirection === 0) {
                                        jQuery(this).css('left', currentLeft + fallingSpeed);
                                    } else {
                                        // set the snow move to left
                                        jQuery(this).css('left', currentLeft + -(fallingSpeed));
                                    }

                                }
                                if (settings.snowflakedirection === 3) {
                                    if (movingDirection === 0) {
                                        console.log(currentRight);
                                        jQuery(this).css('right', currentRight);

                                    } else {
                                        // set the snow move to left
                                        jQuery(this).css('right', currentRight + -(fallingSpeed));
                                    }
                                }
                                if (settings.snowflakedirection === 4) {
                                    if (movingDirection === 0) {
                                        jQuery(this).css('left', currentLeft);
                                    } else {
                                        // set the snow move to left
                                        jQuery(this).css('left', currentLeft + -(fallingSpeed));
                                    }

                                }

                            }

                        });
                    }
                }
            }
            function makeflake() {
                for (var j = 0; j < settings.snownumberofflakes; j++) {
                    setTimeout(create, Math.random() * 5000);
                }
            }
            setInterval(makeflake, 2000);

        });
    };

}(jQuery));