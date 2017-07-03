/*验证数字长度   zfl*/
function isNumber(thi){
 isNum = /^[0-9]*$/;
 var _name=$(thi).attr("_name");
 var _val=$(thi).val();
 if(!isNum.test(_val)){
	 $(thi).focus();
	 promptx(_name+"只能是正整数");
	 return;
 }
 if(_val<1){
	 $(thi).focus();
	 promptx(_name+"不能小于1");
	 return;
 }
 
 if(_val>200000000){
	 $(thi).focus();
	 promptx(_name+"不能大于200000000");
	 return;
 }
}


/*获取时间 zfl*/
function getTime(v){
	var arr =v.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    return starttime.getTime();
}

/*验证图片大小  zfl*/
function verifyPic(thi) {
        var filepath = $(thi).val();
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        if (ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
        	promptx("图片限于png,gif,jpeg,jpg格式");
            return false;
        } 
        
        photo_flag = true;
        var fSize = 2*1024*1024; //设置图像的大小为2M
        var fileSize=thi.files[0].size||0;
        if(fileSize==0){
        	promptx("图片大小不能等于0");
            return false;
        }
        if(fileSize>fSize){
        	promptx("图片不能大于2M");
            return false;
        }
        return true;
};

/*新增标签页取消zfl*/
function closeTab(){
	closeLable($(".tabtop .no span"));
}

/*导出模版* zfl*/
function exportStencil(type){
	var href="/excel/exportStencil.htm?type="+type;
	location.href=href;
}
/*权限设置 zfl*/
function setAuthClick(url,yid,yname,id){
    if($('#'+yid).html()){
        $(".tabtop .no").removeClass();
        $(".tobcon .no").removeClass();
        $("#"+yid).addClass("no");
        var eid=$("#"+yid).attr('zid');
        $("#"+eid).addClass("no");
    }else{
        tabtop(yname,yid,id);
        var href;
        var tf=id.toString();
        if(url.indexOf("tfr"+id)>0){
          href=tFunctionUrl;
        }else{
          href=url+"?tFunctionId="+id;
        }
        tobcon(url,id);
    };
}
/*关闭菜单 zfl*/
function closeLable(thi){
  var yid=$(thi).attr("yid");
    var eid=$(thi).attr("eid");
    if($("#"+yid).attr("class") == "no"){
        $("#"+yid).prev().addClass("no");
        $("#"+eid).prev().addClass("no");
    }
    $("#"+yid).remove();
    $("#"+eid).remove();
    return false; 
}


//新增tabtop子集
function tabtop(name,id,usid ) {
  $(".tabtop .no").removeClass().after('<li class="no" id="'+id+'" zid="'+id+'e9"  data-id="'+usid+'" ><a >'+name+' <span  yid="'+id+'" eid="'+id+'e9"><i class="fa fa-times"></i></span></a></li>');
};
//内容展示部分
function tobcon(url,usid) {
  var zid=$(".tabtop .no").attr('zid');
  var login=new RegExp('<form id="login_form" onsubmit="return false;">')
  $(".tobcon .no").removeClass().after('<li class="no" id="'+zid+'"  data-id="'+usid+'" ><div class="loading"></div></li>');
  $(".tabtop .no").attr("_url",url)
  $.ajax({
      url: url,
      type: 'POST',
      dataType: 'HTML',
      success: function(r){
        //if(login.test(r)){
          //window.location.href = '/user/loginOut.htm';
        //}else{
          $(".tobcon .no").html(r);
              tabwidth();  
              //console.log(r)
        //}
         },

    error: function(re) {
      $(".tobcon .no").html('<div class="nopeg"></div>');
        tabwidth();
      }
    });
};


//提示框确认
/*function promptx(e) {
    var deleqian='<div class="delegate" style="z-index:999;"><div class="delegzhen"  style="z-index:999;width:300px;top:50%;height:auto;margin-top:-150px; margin-left:-150px;"><div class="delegctop"><div class="left"><i class="fa fa-exclamation-triangle"></i>&nbsp;提示</div><div class="right"><i class="fa fa-times-circle deloff"></i></div></div><div class="delegccon" style=" width:100%;text-align: center; font-size:16px;line-height:40px;">';
    var delehou='<div class="tanchukan"><button type="submit" class="btn btn-primary deloff">确认</button>&nbsp;</div></div></div></div>';
    $("body").append(deleqian+e+delehou);
}*/

//提示框
function promptld() {
	  $("body").append('<div class="prompt_con "><div class="loading"></div></div>')
	}

function promptx(e) {
  $(".prompt_con").remove();
  $(".prompt").remove();
  $("body").append('<div class="prompt_con"></div><div class="prompt">'+e+'</div>')
  $(".prompt").animate({top:'-150px',opacity:'0.2'},1);
  $(".prompt_con").animate({opacity:'0.2'},0);
  $(".prompt").animate({top:'50px',opacity:'1'},500);
  $(".prompt_con").animate({opacity:'1'},500);
  $(".prompt").animate({top:'50px',opacity:'1'},1000);
  $(".prompt_con").animate({opacity:'1'},1000);
  $(".prompt").animate({top:'-150px',opacity:'0.0'},500);
  $(".prompt_con").animate({opacity:'0.2'},500);
  setTimeout(function() {
    $(".prompt_con").remove();
    $(".prompt").remove();
   },
   2000)
}


//验证表单
function input_name(thi) {
	var input = $(thi).find("input[_name]");
	var textarea =$(thi).find("textarea[_name]");
	var tishi=""
	for(var i=0,lem=input.length; i<lem;i++){
		if( input.eq(i).val()==null || input.eq(i).val()==""){
		  var $inp=input.eq(i).attr('_name')
		  tishi+=$inp+'/'
		}
	}
	
	for(var i=0,lem=textarea.length; i<lem;i++){
	  if( textarea.eq(i).val()==null || textarea.eq(i).val()==""){
	    var $inp=textarea.eq(i).attr('_name')
	    tishi+=$inp+'/'
	  }
	}
	if(tishi==""){
	}else{
		tishi+="不能为空！";
		promptx(tishi);
		return false;
	}
	return true;
}



//表格宽度
function tabwidth(){
  var zid=$(".tabtop .no").attr('zid');
    var tabs=$("#"+zid+" .toptable table thead th").length-1;
  var winwid=window.innerWidth*0.98;
  var tablemb=0;
  for(var i=0;i<tabs;i++){
  tablemb+=parseInt($('#'+zid+' .toptable table thead th:eq('+i+')').attr("width"));
  };
  if(winwid>tablemb){
	$('#'+zid+' .toptable').css("width",winwid); 
   $('#'+zid+' .toptable table').attr("width","100%") ;
  }else{
      if($('#'+zid+' .toptable table thead th:eq('+tabs+')').html()==""){
         $('#'+zid+' .toptable table').attr("width",tablemb) ;
          $('#'+zid+' .toptable').css("width",tablemb) ;
      }else{
           $('#'+zid+' .toptable table').attr("width",tablemb+200) ;
          $('#'+zid+' .toptable').css("width",tablemb+200) ;
      }
  }
  if($(".allproduct").html()){
    $(".allproducttop").css("width",((Math.floor(winwid))-1))
    $(".allproductcom").css("width",((Math.floor(winwid))-21)) 
    $(".allproducttop li").css("width",(((Math.floor(winwid))-1)/3)-1) 
    $(".allproductcom>li").css("width",(((Math.floor(winwid))-1)/3)-11) 
    $(".allproductcom>li:nth-child(3)").css("width",(((Math.floor(winwid))-1)/3)-21) 
    $(".")
  }
}

///tab切换
function tobdom(taba,tabb,px) {
 
  $(taba).children().click(function() { 
    var i=$(taba).children().index(this);
    $(taba).children().removeClass(px);
    $(this).addClass(px);
    $(tabb).hide();
    $(tabb).eq(i).show();
  })
};



$(function(){
	
//禁止在浏览器中后退
	if (window.history && window.history.pushState) {
		$(window).on('popstate', function(){
			window.history.pushState('forward', null,"#");
			window.history.forward(1);
		});
	}
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
	if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {//判断ie
		window.history.forward(1);
	}else{
	    window.history.pushState('forward', null,"#"); //在IE中必须得有这两行	
	    window.history.forward(1);
	};
	

//宽度兼容
function kwidth(){
    var tit=window.innerWidth-165;
    var winheight=window.innerHeight-127;
    $(".incomx dl dd").css("width",tit);
    $(".navtabpanel").css("height",winheight);
    $("iframe").css("height",winheight);
  //处理表格宽度 
    tabwidth();
 //结束   
   
  };

window.onresize=window.onscroll=window.onload=function(){
    kwidth();
};

$(".tabtop li").click( function(e){
  $("#main").load();
});


//局部刷新
$("body").on("click",".refresh",function(e){
	var login=new RegExp('<form id="login_form" onsubmit="return false;">')
	if($(".tabtop .no").attr("_url")){
	    $(".tobcon .no").html('<div class="loading"></div>');
		var url=$(".tabtop .no").attr("_url");
		$.ajax({
		      url: url,
		      type: 'POST',
		      dataType: 'HTML',
		      success: function(r){
		        if(login.test(r)){
		          window.location.href = '/user/loginOut.htm';
		        }else{
		          $(".tobcon .no").html(r);
		              tabwidth();  
		        }
		         },
	
		    error: function(re) {
		      $(".tobcon .no").html('<div class="nopeg"></div>');
		        tabwidth();
		      }
		    });
	}else{
		return false;
	}
	
})




//拖动弹出框
$("body").on("mousedown",".delegctop",function(e){
      var obj = $(this).parents('.delegzhen')
      var isMove = true; 
      var abs_x = event.pageX - obj.offset().left; 
      var abs_y = event.pageY - obj.offset().top; 
      $(document).mousemove(function (event) { 
        if (isMove) { 
          obj.css({'left':event.pageX - abs_x, 'top':event.pageY - abs_y,"margin":"0px"}); 
        } 
      } 
      ).mouseup( 
        function () { 
          isMove = false; 
        } 
      ); 
}); 



//删除关闭
$("body").on("click",".offnawall",function(e){
    var x=$(".tabtop li").length
    console.log(x)
    for(var i=0;i<x;x--){
    	$(".tabtop li").eq(x).remove();
    	$(".tobcon li").eq(x).remove();
    	
    }
	$(".tabtop li").eq(0).addClass("no");
	$(".tobcon li").eq(0).addClass("no");
    
   // $("#"+yid).remove();
   // $("#"+eid).remove();
    return false; 
});







//删除关闭
$("body").on("click",".tabtop li span",function(e){
    var yid=$(this).attr("yid");
    var eid=$(this).attr("eid");
    if($("#"+yid).attr("class") == "no"){
        $("#"+yid).prev().addClass("no");
        $("#"+eid).prev().addClass("no");
    }
    $("#"+yid).remove();
    $("#"+eid).remove();
    return false; 
});

//取消页面关闭
$("body").on("click",".addoff",function(e){
    $(".tabtop li.no span").click();
    return false; 
});

//点击导航菜单
$("body").on("click",".navd",function(e){
     var yname= $(this).attr("navname");
     var yid= $(this).attr("navid");
     var url=$(this).attr("navurl");
     var id=$(this).attr("data-id");
     if($('#'+yid).html()){
         $(".tabtop .no").removeClass();
         $(".tobcon .no").removeClass();
         $("#"+yid).addClass("no");
         var eid=$("#"+yid).attr('zid');
         $("#"+eid).addClass("no");
     }else{
      var topli=$(".tabtop li");
      var mab=38;
      var mabli=topli.length;
      var topliw=0;
      for(var i=0;i<mabli ;i++){
        topliw+=topli.eq(i).width()+mab;
      };
      topliw+=140;
      if(topliw>window.innerWidth-40){
        promptx("导航栏已满，请关闭部分栏目!")
        return ;
      }else{

         tabtop(yname,yid,id);
         tobcon(url,id);
      }
     };
 });

//点击中间菜单
 $("body").on("click",".tabtop li",function(e){
     $(".tabtop li").removeClass();
     $(".tobcon>li").removeClass();
     $(this).addClass("no");
     var eid=$(this).attr('zid');
     $("#"+eid).addClass("no");
    
     return false; 
 });
 
/*//表格点击变色
 $("body").on("click","table tr td",function(e){
     $(this).parents("tr").siblings("tr").removeClass("on");
     $(this).parents("tr").addClass("on")
}); */
 
 
//弹出框一层
$("body").on("click",".deleg",function(e){
    var delegname=$(this).attr('degname');
    var delegurl=$(this).attr('degurl');
    var delwidth=$(this).attr('degwidht');
    var delheight=$(this).attr('degheight');
    var delheight=$(this).attr('degheight');
    var Zindex=$(this).attr("zindex");
    if(Zindex){
        Zindex=200*Zindex;
        if(delheight<window.innerHeight){
             var winhei=delheight-50;
             var deleqian='<div class="delegate" style="z-index:'+Zindex+'"><div class="delegzhen"  style="width:'+delwidth+'px;height:'+delheight+'px;margin-top:-'+delheight/2+'px; margin-left:-'+delwidth/2+'px;"><div class="delegctop"><div class="left"><i class="fa fa-files-o deloff"></i>&nbsp;';
        }else{
             var deleqian='<div class="delegate" style="z-index:'+Zindex+'"><div class="delegzhen"  style="width:'+delwidth+'px;height:'+window.innerHeight+'px;top:0px;margin-top:0px; margin-left:-'+delwidth/2+'px;"><div class="delegctop"><div class="left"><i class="fa fa-files-o deloff"></i>&nbsp;';
             var winhei=window.innerHeight-50;
        }
        var delehou='</div><div class="right"><i class="fa fa-times-circle deloff"></i></div></div><div class="delegccon delegccon'+Zindex+' scrollbar" style="height:'+winhei+'px;"></div></div></div>';
        $("body").append(deleqian+delegname+delehou);
        $.ajax({
            url: delegurl,
            type: 'POST',
            dataType: 'HTML',
            success: function(r){
               // var login=new RegExp('<form id="login_form" onsubmit="return false;">')
                //if(login.test(r)){
                  //window.location.href = '/user/loginOut.htm';
                //}else{
                  $('.delegccon'+Zindex ).html(r);
                //}
              }
        });
    }else{
        if(delheight<window.innerHeight){
             var winhei=delheight-50;
             var deleqian='<div class="delegate"><div class="delegzhen"  style="width:'+delwidth+'px;height:'+delheight+'px;margin-top:-'+delheight/2+'px; margin-left:-'+delwidth/2+'px;"><div class="delegctop"><div class="left"><i class="fa fa-files-o deloff"></i>&nbsp;';
        }else{
             var deleqian='<div class="delegate"><div class="delegzhen"  style="width:'+delwidth+'px;height:'+window.innerHeight+'px;top:0px;margin-top:0px; margin-left:-'+delwidth/2+'px;"><div class="delegctop"><div class="left"><i class="fa fa-files-o deloff"></i>&nbsp;';
             var winhei=window.innerHeight-50;
        }   
        var delehou='</div><div class="right"><i class="fa fa-times-circle deloff"></i></div></div><div class="delegccon scrollbar" style="height:'+winhei+'px;"></div></div></div>';
        $("body").append(deleqian+delegname+delehou);
        $.ajax({
            url: delegurl,
            type: 'POST',
            dataType: 'HTML',
            success: function(r){
                //var login=new RegExp('<form id="login_form" onsubmit="return false;">')
                //if(login.test(r)){
                 // window.location.href = '/user/loginOut.htm';
                //}else{
                  $('.delegccon' ).html(r);
                //}
              }
        });
    }
    $(this).parents("tr").siblings().removeClass("on");
    $(this).parents("tr").addClass("on")
    return false;
})


$("body").on("click",".deloff",function(e){
    $(this).parents('.delegate').remove();  
    $("tr").removeClass("on");
    return false;
});

//编辑框
var editor;
KindEditor.ready(function(K) {
  editor = K.create('.kind', {
    allowFileManager : true
  });
});
 
//目录开关
$("body").on("mousedown",".lisi li",function(e){
       $(this).children(".onb").toggle();
       $(this).children(".ona").toggle();
       $(this).children("ul").toggle();
       return false;
});
$("body").on("mousedown",".lisi label",function(e){
       return false;
});


//商品目录

$("body").on("click",".conavtop",function(e){
	if($(this).children(".onb").css("display") == "none"){
		$(this).children(".ona").hide();
	    $(this).children(".onb").show();
	     var i=$(".leve1").length-1
	     $(".leve1").eq(i).attr("style","border:0px; background:url(images/ioc2.png) no-repeat top left; background-size:1px 23px;")
		$(".leve1").parents("tr").show();
	}else{
		$(this).children(".ona").show();
	    $(this).children(".onb").hide();
	    $(".conav").children(".ona").show();
	    $(".conav").children(".onb").hide();
		$(".conav").parents("tr").hide();
	}
})

//展开目录

$("body").on("click",".conavtopk",function(e){
		$(".conavtop").children(".ona").hide();
	    $(".conavtop").children(".onb").show();
	    $(".conav").children(".ona").hide();
	    $(".conav").children(".onb").show();
		$(".conav").parents("tr").show();
	    $(".conavtopk").hide();
	    $(".conavtopg").show();
})
//关闭目录

$("body").on("click",".conavtopg",function(e){
		$(".conavtop").children(".ona").show();
	    $(".conavtop").children(".onb").hide();
	    $(".conav").children(".ona").show();
	    $(".conav").children(".onb").hide();
		$(".conav").parents("tr").hide();
	    $(".conavtopk").show();
	    $(".conavtopg").hide();
})

$("body").on("click",".conav",function(e){
    var cla=$(this).attr('navclass')
    if( $(this).children(".ona").css("display") == "none"){

     $(this).children(".ona").show();
     $(this).children(".onb").hide();
     var as=$(this).attr("_navid")
     $("div[_id="+as+"]").children(".ona").show();
     $("div[_id="+as+"]").children(".onb").hide();
     $('.'+cla).parents("tr").hide();
     $("div[_id="+as+"]").parents("tr").hide();
    }else{
      var as=$(this).attr("_navid")
     $(this).children(".onb").toggle();
     $(this).children(".ona").toggle();
     var i=$('.'+cla).length-1
     $('.'+cla).eq(i).attr("style","border:0px; background:url(images/ioc2.png) no-repeat top left; background-size:1px 23px;")
     $('.'+cla).parents("tr").toggle();
     return false;
     }
});

//表格的复选框；点击td 相当于点击复选框
$("body").on("click","td.checkbox",function(e){
	$(this).children("input[type=checkbox]").click();
})

//所有验证

//验证判断
function filtertest(v,fil,a){
  if(fil.test(a)){
        v.attr("style","")
      }else{
        v.attr("style","border: 1px solid #f00;color:#f60")
      }
  
}

//验证邮箱
$("body").on("blur","input[_email]",function(e){
  var v=$(this);
    var a=$(this).val();
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      filtertest(v,filter,a);
}); 
//验证身份证
$("body").on("blur","input[_idcard]",function(e){
    var v=$(this);
      var a=$(this).val();
      var filter  =/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
      filtertest(v,filter,a);
}); 
// 只能输入数量
$("body").on("change","input[_number=1]",function(e){
  var a=$(this).val();
    var xa=parseInt(a)
    if(xa){
        $(this).val(xa) 
    }else{
      $(this).val("") 
    }
});
//验证数量 99999
$("body").on("change","input[_number=2]",function(e){
      var a=$(this).val();
      var xa=parseInt(a)
      if(xa){
        if(xa>99999){
          $(this).val(a.substr(0,5));
          promptx("数量不能超过99999！");
          $(this).blur();
        }else{
          $(this).val(parseInt(a)) 
        }
      }else{
        $(this).val("") 
      }
      
});

//验证数量
$("body").on("change","input[_number=21]",function(e){
      var a=$(this).val();
      var b=$(this).attr("_max")
      var xa=parseInt(a)
      var xb=parseInt(b)
      if(xa){
        if(xa>xb){
          $(this).val(xb);
          promptx("数量不能超过"+xb+"！");
          $(this).blur();
        }else{
          $(this).val(parseInt(a)) 
        }
      }else{
        $(this).val("") 
      }
      
});
//验证表单字符
$("body").on("change","input[_idnumber]",function(e){
      var a=$(this).val();
      var xa=$(this).attr("_idnumber")
      if(a.length>xa){
          $(this).val(a.substr(0,xa));
          promptx("输入不能超过"+xa+"个字！");
          $(this).blur();
      }else{ 
      }
});
//验证手机
$("body").on("blur","input[_tel]",function(e){
    var v=$(this);
      var a=$(this).val();
      var filter  =/^1(3|4|5|7|8)\d{9}$/;
      filtertest(v,filter,a);
});
//验证两位小数
$("body").on("change","input[_number=2w]",function(e){
    var a=$(this).val();
    var xa=parseFloat(a)
    if(xa){
        xa=parseInt(xa*100)
        $(this).val(xa/100) 
    }else if(xa==0){
      $(this).val("0") 
    }else{
        $(this).val("") 
    }
}); 



//选择指定时间
$("body").on("change","select[_jedata]",function(e){
    var a=$(this).siblings("input[_inpstart]")
    var s=this.options[this.options.selectedIndex].value;
    function daymm(e) {
      var shu=$.nowDate(0).substr(0,10).split("-")[2];
      var shua=0
      for(var i=0;i<e;i++){
        shua=shua-$.nowDate(shua).substr(0,10).split("-")[2];
      }
      var a2=$.nowDate(shua).substr(0,10).split("-");
      if(a2[2]>shu){
        a.val(a2[0]+"-"+a2[1]+"-"+shu)
        }else{
        a.val($.nowDate(shua).substr(0,10))
      }
    }
    $(this).siblings("input[_inpend]").val($.nowDate(0).substr(0,10));
    if(s==0){
      a.val($.nowDate(0).substr(0,10))
    } else if(s==1){
      a.val($.nowDate(-7).substr(0,10))
    } else if(s==2){
      daymm(1);
    } else if(s==3){
      daymm(3);
    } else if(s==4){
      daymm(6);
    } else if(s==5){
      daymm(12);
    }
});








})

/*
	{maxValue,minValue,allowDecimal,scale,validateBlank}
*/
function numberValidate(numStr,errName,validate){
	if(numStr.length == 0){
		if(validate.validateBlank){
			promptx(errName+"不能为空");
			return false;
		}
		return true;
	}
	// 是否是数值
	var isNumber = $.isNumeric(numStr);
	if(!isNumber){
		promptx(errName+"不是一个数值");
		return false;
	}
	// 是否是小数
	var pointIndex = numStr.indexOf(".");
	if(-1 != pointIndex){
		// 是否允许小数
		if(validate.allowDecimal){

		}else{
			promptx(errName+"必须是一个整数");
			return false;
		}
		// 是否符合小数位标准
		if(validate.scale > 0){
			if(numStr.length - 1 - pointIndex > validate.scale){
				promptx(errName+"只能保留" + validate.scale + "位小数");
				return false;
			}
		}
	}
	// 检查最小
	if($.isNumeric(validate.minValue)){
		if(new Number(numStr) < validate.minValue){
			promptx(errName+"不能小于" + validate.minValue);
			return false;	
		}
	}
	// 检查最大
	if($.isNumeric(validate.maxValue)){
		if(new Number(numStr) > validate.maxValue){
			promptx(errName+"不能大于" + validate.maxValue);
			return false;	
		}
	}
	return true;
}

/*
	{maxLength,minLength,validateBlank}
*/
function stringValidate(numStr,errName,validate){
	var length = numStr.length;
	if(length == 0){
		if(validate.validateBlank){
			promptx(errName+"不能为空");
			return false;
		}
		return true;
	}
	// 检查长度
	if($.isNumeric(validate.maxLength)){
		if(length > validate.maxLength){
			promptx(errName+"不能超过" + validate.maxLength+"个字符");
			return false;	
		}
	}
	if($.isNumeric(validate.minLength)){
		if(length < validate.minLength){
			promptx(errName+"不能少于" + validate.minLength+"个字符");
			return false;	
		}
	}
	
	return true;
}


//input有下拉框
function dataarr(a) {
    $("body").on("input propertychange",a.classid,function(){
        var classid=a.classid;//input的id/class
        var url=a.url;//json接口的路径
        var jsdata=a.jsdata;//data外字段
        var jsdatax=a.jsdatax;//data的详情字段
        var inarr=a.inarr;//获取的值得到的数组
        var aval=$(classid).val();
        var keya=$(classid).attr("name")
        var obj=keya + "="+aval;
        $.ajax({
            url: url,
            data: obj, 
            type: 'POST',
            dataType: 'json',
            success: function(data){
                var key=eval(jsdata);  
                var inarr = []; 
                var arrx;
                for(var i=0;i<key.length;i++){  
                    if(key[i]!=""){  
                        inarr.push(key[i][jsdatax]);  
                        arrx+="-"+key[i][jsdatax]
                        }  
                };
                $(classid).autocomplete({source: inarr});
                $(classid).keydown();

            }
        });

    })
};

