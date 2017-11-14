/* 
* 网页制作辅助开发工具，网页标尺以及网页参考线
*/
(function($){
	$.pageRuler = function(params){
		params = params || {};
		var flag = $("#zxxScaleBox").length === 0 ? true : false;
		if(flag){
			$('<div class="zxxScaleBox" id="zxxScaleBox" onselectstart="return false;"><div id="zxxScaleRulerH" class="zxxScaleRuler_h"></div><div id="zxxScaleRulerV" class="zxxScaleRuler_v"></div><div id="zxxRefDotH" class="zxxRefDot_h"></div><div id="zxxRefDotV" class="zxxRefDot_v"></div><div class="zxxRefCrtBg" id="zxxRefCrtBg" style="display:none;"><div class="zxxRefCrtTit"><a href="javascript:void(0);" id="zxxRefCrtClose" class="zxxRefCrtClose"></a></div><div class="zxxRefCrtX"><div class="zxxRefCrtLeft"><div class="zxxRefCrtDir"><input type="radio" id="zxxCrtV" class="zxxRefCrtRadio" name="zxxRefCrt" checked="checked" /><label for="zxxCrtV">垂直</label></div><div class="zxxRefCrtDir"><input type="radio" id="zxxCrtH" class="zxxRefCrtRadio" name="zxxRefCrt" /><label for="zxxCrtH">水平</label></div>  <div class="zxxRefCrtPlace">位置：<input id="zxxRefCrtInput" class="zxxRefCrtInput" type="text" />px</div></div><div class="zxxRefCrtRight"><button type="button" id="zxxRefCrtSure" class="zxxRefCrtBtn">确定</button><button type="button" id="zxxRefCrtCancel" class="zxxRefCrtBtn">取消</button></div></div></div></div>').appendTo($("body"));
		}else{
			$("#zxxScaleBox").show();
		}
		//整个标尺盒子对象，垂直标尺与水平标尺对象，虚线对象，弹出框对象，单选对象，文本对象，按钮对象
		var x= $("#zxxScaleBox"), rh = $("#zxxScaleRulerH"), rv = $("#zxxScaleRulerV"), doth = $("#zxxRefDotH"), dotv = $("#zxxRefDotV"), bg = $("#zxxRefCrtBg"), clo = $("#zxxRefCrtClose"), rdov = $("#zxxCrtV"), rdoh = $("#zxxCrtH"), ipt = $("#zxxRefCrtInput"), sur = $("#zxxRefCrtSure"), cancel = $("#zxxRefCrtCancel"), dragFlag = false, oDrag = null;
		//浏览器宽高
		var w, h, bgw = bg.width(), bgh = bg.height();
		var f = {
			box: function(){
				w = $(window).width(), h = $(window).height();
				//整个box的宽高
				x.height(h).width(w);
				//弹出层的定位
				bg.css({
					left: (w - bgw)	 / 2,
					top: (h - bgh) / 2
				});
			},
			ui: function(){
				rh.html("");
				rv.html("");
				//创建标尺数值
				for(var i=0; i<w; i+=1){
					if(i % 50 === 0){
						$('<span class="n">'+i+'</span>').css("left", i+2).appendTo(rh);
					}
				}
				//垂直标尺数值
				for(var i=0; i<h; i+=1){
					if(i % 50 === 0){
						$('<span class="n">'+i+'</span>').css("top", i+2).appendTo(rv);
					}
				}	
			},
			ie6: function(){
				if(!window.XMLHttpRequest){
					$(window).scroll(function(){
						var t = $(document).scrollTop();
						 x.css("top", t);			
					});	
					if(flag){
						$(window).trigger("scroll");
					}
				}
			},
			newv: function(t){//创建新的垂直参考线，有效宽度3像素
				var id = "zxxRefLineV"+($(".zxxRefLine_v").length+1);
				$('<div class="zxxRefLine_v"></div>')
					.appendTo(x)
					.attr({
						  "id": id,
						  "title": t
					});
				return $("#"+id);
			},
			newh: function(t){//创建新的垂直参考线，有效宽度3像素
				var id = "zxxRefLineH"+($(".zxxRefLine_h").length+1);
				$('<div class="zxxRefLine_h"></div>')
					.appendTo(x)
					.attr({
						  "id": id,
						  "title": t
					});
				return $("#"+id);
			},
			dashv: function(){
				$(document).bind("mousemove",function(e){
					//alert(dragFlag);
					if(dragFlag){
						//alert(e.screenX);
						//如果可以拖拽
						//垂直虚线的左坐标
						dotv.css("left",e.pageX);
					}
				});
			},
			dashh: function(){
				$(document).bind("mousemove",function(e){
					if(dragFlag){
						//如果可以拖拽
						//垂直虚线的左坐标
						doth.css("top",e.pageY-$(window).scrollTop());
					}
				});
			},
			//弹出框相关方法
			sure: function(){
				//点击确定按钮
				var dirv = rdov.attr("checked")? true : false;
				var v = parseInt(ipt.val(), 10);
				if(v){
					var pos = v.toString()+"px";
					if(dirv){
						f.newv(pos).css("left", v-1);
					}else{
						f.newh(pos).css("top", v-1);
					}
					$(".zxxRefLine_v").show();	
					$(".zxxRefLine_h").show();	
					f.cacl();
				}else{
					alert("请输入合适的数值。");	
				}
			},
			cacl: function(){
				ipt.val("");
				bg.hide();
				return false;
			},
			//批量参考线创建
			crtv: function(arr){
				if($.isArray(arr)){
					$.each(arr, function(i, n){
						var posv = 	parseInt(n, 10);	
						if(posv > 0 && posv < w){
							nposv = posv.toString() + "px";
							f.newv(nposv).css("left", posv-1);
						}
					});
				}
			},
			crth: function(arr){
				if($.isArray(arr)){
					$.each(arr, function(i, n){
						var posh = 	parseInt(n, 10);	
						if(posh > 0 && posh < h){
							nposh = posh.toString() + "px";
							f.newh(nposh).css("top", posh-1);
						}
					});
				}
			},
			//获取批量参考线参数
			crtdata: function(){
				if(params.v){
					f.crtv(params.v);
				}
				if(params.h){
					f.crth(params.h);
				}
			},
			//初始化执行
			init: function(){
				f.box();
				f.ui();
				f.ie6();	
				f.crtdata();
			}
		};
		f.init();
		
		/*浏览器拉伸时，标尺自适应*/
		$(window).resize(function(){
			f.box();
			f.ui();					  
		});
		//参考线的水平拖移
		$(document).on('mousedown','.zxxRefLine_v',function(){
			oDrag = $(this);	
			dragFlag = true;
			f.dashv();
		});
        //参考线的垂直拖移
		$(document).on('mousedown','.zxxRefLine_h',function(){
			oDrag = $(this);	
			dragFlag = true;
			f.dashh();
		});
		$(document).mouseup(function(e){
			$(this).unbind("mousemove");
			dragFlag = false;
			if(oDrag){
				if(oDrag.hasClass("zxxRefLine_v")){
					var v_l = e.pageX;
					if(v_l < rv.width()){
						v_l = -600;					  
					}
					oDrag.css("left", v_l-1).attr("title", v_l+"px");
				}else{
					var v_t = e.pageY-$(window).scrollTop();
					if(v_t < rh.height()){
						v_t = 600;	
					}
					oDrag.css("top", v_t-1).attr("title", v_t+"px");
				}	
			}
			oDrag = null;
			dotv.css("left", -10);
			doth.css("top", -10);
		}).keyup(function(e){
			if(e.keyCode === k["slash"]){
				bg.show();
				ipt.focus();
			}
		});
		//拖动标尺创建新的参考线
		rv.bind("mousedown", function(){
			oDrag = f.newv();	
			dragFlag = true;
			f.dashv();						  
		});
		rh.bind("mousedown", function(){
			oDrag = f.newh();	
			dragFlag = true;
			f.dashh();						  
		});
		//弹出框一些方法事件的绑定
		clo.bind("click", f.cacl);
		cancel.bind("click", f.cacl);
		sur.bind("click", f.sure);
		ipt.bind("keyup", function(e){
			if(e.keyCode === k["enter"]){
				f.sure();
			}
		});
	};
	
	//快捷键参数
	var k = {
		"enter": 13, //回车
		"r": 82, //字母R
		"slash": 220, //斜线keyCode
		"semi": 59, //分号，火狐
		"semi2": 186, //分号
		"esc": 27
	};
	//侦听键盘事件
	$(document).keyup(function(e){
		if(e.keyCode === k["r"]){
			$.pageRulerToggle();
		}
		if(e.keyCode === k["semi"] || e.keyCode === k["semi2"]){
			$.lineToggle();	
		}
		if(e.keyCode === k["esc"]){
			$.pageRulerHide();
		}
	});
	$.lineToggle = function(){
		$(".zxxRefLine_v").toggle();	
		$(".zxxRefLine_h").toggle();
	};
	$.pageRulerHide = function(){
		$("#zxxScaleBox").hide();
	};
	$.pageRulerToggle = function(params){
		if($("#zxxScaleBox").length && $("#zxxScaleBox").css("display") === "block"){
			$("#zxxScaleRulerH").toggle();
			$("#zxxScaleRulerV").toggle();
		}else{
			$.pageRuler(params);
		}
	};
})(jQuery);