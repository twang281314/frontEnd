function LoadingJS(){
	
	this.loadBookConfig();   //#1F2232,#DDDDDD
	
	this.body = $("body");

  this.instance = $("<div id='loading_bg'></div>");
  this.proTitle = $("<div id='progress_title'></div>");
  this.stepTitle = $("<div id='step_title'></div>");
  this.loadingBG = $("<div id='loading_progres'></div>");
  this.loadingItem = $("<div id='loading_progress_item'></div>"); 

  this.instance.css({
  	"display" : "none",
  	"position" : "absolute",
  	"width" : "480px",
  	"height" : "70px",
  	'top' : '50%',
  	'left' : '50%',
  	'margin-left' : '-240px',
  	'margin-top' : '-35px',
  	"z-index" : 10000,
  	"background-color" : "transparent"
  });
  //this.addGradient(this.instance,"#B3B3B3","white");
  
  /*
  	"background-color" : "#1F2232",
  	"border-radius" : "3px",
  	"border":"1px solid #DCDCDC",
  	"box-shadow" : "2px 2px 2px #333333",
  	"-mz-box-shadow" : "2px 2px 2px #333333",
  	"-ms-box-shadow" : "2px 2px 2px #333333",
  	"-webkit-box-shadow" : "2px 2px 2px #333333",
  	"-o-box-shadow" : "2px 2px 2px #333333"
  */

  this.proTitle.css({
  	"position" : "absolute",
  	"left" : "10px",
  	"top" : "10px",
  	"width" : "460px",
  	"text-align" : "center",
  	"font-family" : "Tahoma",
  	"font-size" : "24px",
  	"color" : "white",
  	"word-break" : "keep-all",
  	"white-space" : "nowrap",
  	"overflow" : "hidden",
  	"text-overflow" : "ellipsis"
  	
  });
  
  this.proTitle.css({"text-shadow":"0 0 5px #8c97cb, 0 0 10px #8c97cb,0 0 15px #8c97cb"});	 
  
  this.loadingBG.css({
    "position" : "absolute",
    "width" : "280px",
    "height" : "10px",
    "left" : "10px",
    "top" : "35px",
    "background-color" : "#F3F4F9",
    "border-radius" : "2px",
    "display":"none"
  });
  
  this.loadingItem.css({
  	"position" : "absolute",
  	"width" : "0px",
  	"height" : "10px",
  	"left" : "0px",
  	"top" : "0px",
  	"background-color" : "#3FB5F2",
  	"border-radius" : "2px",
  	"display":"none"
  });
  
  this.stepTitle.css({
  	"position" : "absolute",
  	"left" : "10px",
  	"top" : "50px",
  	"width" : "460px",
  	"text-align" : "center",
  	"font-family" : "Tahoma",
  	"font-size" : "12px",
  	"color" : this.loadingCaptionColor,
  	"word-break" : "keep-all",
  	"white-space" : "nowrap",
  	"overflow" : "hidden",
  	"text-overflow" : "ellipsis"
  });
  
  //this.body.css({"background-color":this.backgroundColor});
  this.initBackground();
  
  this.body.append(this.instance);
  this.instance.append(this.proTitle);
  this.instance.append(this.loadingBG);
  this.instance.append(this.stepTitle);
  this.loadingBG.append(this.loadingItem);
  
  this.init();  
  this.addLoadingImage();
  
  this.show();
}

LoadingJS.prototype = {
	loadBookConfig : function(){
	
		this.loadingCaption, this.loadingCaptionColor, this.hasLoadingPicture, this.loadingPicture;
		
	  try{
	  	this.loadingCaption = bookConfig.loadingCaption?bookConfig.loadingCaption:"Loading";
	  	this.loadingCaptionColor = bookConfig.loadingCaptionColor?bookConfig.loadingCaptionColor:"#DDDDDD";
	  	this.loadingBackground = bookConfig.loadingBackground?bookConfig.loadingBackground:"#1F2232";
	  	
	  	this.loadingPicture = bookConfig.loadingPicture?bookConfig.loadingPicture:"";
	  	this.hasLoadingPicture = (this.loadingPicture != "");
	  }catch(err){
	  	this.loadingCaption = "Loading";
	  	this.loadingCaptionColor = "#DDDDDD";
	  	
	  	this.hasLoadingPicture = false;
	  	this.loadingPicture = "";
	  }
	  
	  //console.log("loadingPicture:%s", this.loadingPicture);
	  
	},
	
	init: function(){
		var doc = $(document);
		
		var windowWidth = doc.width(), windowHeight = Math.max(doc.height(),400), progressWidth = 480, progressHeight = 70;
		
		var progressLeft = (windowWidth - progressWidth) / 2, progressTop = (windowHeight - progressHeight) / 2;
		
		// this.instance.css({"left":progressLeft + "px", "top":progressTop + "px"});
		
		this.proTitle.text($(document).attr("title"));
		this.stepTitle.text(this.loadingCaption + "...");
		
		var self = this,iWidth = 0,iStep = 2;
		var oldColor = this.colorSplit("#3FB5F2");
		this.timer = window.setInterval(function(){

				/*var pAddR = Math.floor((255 - oldColor.r) * iWidth / 280),
				    pAddG = Math.floor((255 - oldColor.g) * iWidth / 280),
				    pAddB = Math.floor((255 - oldColor.b) * iWidth / 280);
				
				var newEndColor = self.colorAdd("#3FB5F2",pAddR,pAddG,pAddB);
				self.addGradient(self.loadingItem,"#3FB5F2",newEndColor);

				self.loadingItem.css({width : iWidth +"px"});
				iWidth += iStep;
				if(iWidth == 280) iWidth = 0; */
				
				iWidth += iStep;
				var iCount = Math.floor(iWidth / 50) % 3;
				
				switch(iCount){
					case 0:{self.stepTitle.text(self.loadingCaption + ".  ");break;}
					case 1:{self.stepTitle.text(self.loadingCaption + ".. ");break;}
					case 2:{self.stepTitle.text(self.loadingCaption + "...");break;}
					default:break;
				}
				
				
			},40);
	},
	show: function(){
		this.instance.css({"display":"block"});
	},
	
	addLoadingImage : function(){
		if(this.hasLoadingPicture == false) return;
		
		this.loadingImg = $("<img style='display:none;position:absolute;z-index:10000'></img>");

  	var self = this;
  	this.loadingImg.load(function(){
  		
  		var doc = $(document), windowWidth = doc.width() , oImage = self.loadingImg[0];
  		var iImageWidth = oImage.naturalWidth, iImageHeight = oImage.naturalHeight;
  		
  		var iInstanceTop;
  		try{
  			iInstanceTop = parseInt(self.instance.css("top").replace("px","")) + parseInt(self.instance.css("margin-top").replace("px",""));
  	  }catch(err){
  	  	iInstanceTop = iImageHeight;
  	  }
  	  
  		var iLeft = (windowWidth - iImageWidth) / 2, iTop = iInstanceTop - iImageHeight;
  		
  		//console.log("image loaded, left:%d,top:%d,width:%d,height:%d",iLeft,iTop,iImageWidth,iImageHeight);

  		self.loadingImg.css({
  			"left" : iLeft + "px",
  			"top" : iTop + "px",
  			"width": iImageWidth + "px",
  			"height": iImageHeight + "px",
  			"display":"block"
  		});
  	});
  	
  	this.loadingImg.attr("src", this.loadingPicture);
  	this.body.append(this.loadingImg);
	},
	
	destroy: function(){
		window.clearInterval(this.timer);
		this.body.css({"background-color":""});
		this.instance.css({"display":"none","z-index":1});
		this.instance.empty();
		this.instance.remove();
		
		if(this.loadingImg){
			this.loadingImg.css({"display":"none","z-index":1});
			this.loadingImg.remove();
		}
	},
	getBrowserType : function(){
		
		var isIE11 = function(){
			var userAgent = navigator.userAgent.toLowerCase();
			return (!$.browser.msie) && (userAgent.indexOf("trident") > 0);
		};
		
		var browserType = 0;
		
		if($.browser.msie || isIE11()) {
			browserType = 3;
		} else if($.browser.mozilla && !isIE11()) {
			browserType = 2;
		} else if($.browser.safari) {
			browserType = 1;
		} else if($.browser.opera) {
			browserType = 4;
		};
		
		return browserType;
	},
	addGradient : function(item,beginColor, endColor){
		

		var browserType = this.getBrowserType();

		var sLeft = "",sMsLeft="0";
		var horz = true;
		if(horz) {sLeft = "left,";sMsLeft="1";}
		
		item.css({background: "linear-gradient("+ sLeft + beginColor +", "+ endColor +")"});
		switch(browserType){
			case 1:{
				item.css({background: "-webkit-linear-gradient("+ sLeft + beginColor +", "+ endColor +")"});
				break;
			}
			case 2:{
				item.css({background: "-moz-linear-gradient("+ sLeft + beginColor +", "+ endColor +")"});
				break;
			}
			case 3:{
				item.css({background: "-ms-linear-gradient("+ sLeft + beginColor +", "+ endColor +")"});
				item.css("filter", "progid:DXImageTransform.Microsoft.Gradient(GradientType="+ sMsLeft +", EndColorStr=" +
			endColor + ", StartColorStr=" + beginColor + ")");					
				break;
			}
			case 4:{
				item.css({background: "-o-linear-gradient("+ sLeft + beginColor +", "+ endColor +")"});
				break;
		
			}
		}	
	
		
	},
	colorSplit : function(color){
		var colorRGB = {r : 0, g : 0, b : 0};
		
		var red = "FF",green ="FF",blue = "FF";
		
		if(color.length == 7){
	
			red = color.substr(1, 2);
			green = color.substr(3, 2);
			blue = color.substr(5, 2);		
		
		}else if(color.length == 4){
			
			red = color.substr(1, 1);
			green = color.substr(2, 1);
			blue = color.substr(3, 1);
			
			red += red;
			green += green;
			blue += blue;
	
		}
		colorRGB.r = parseInt(red,16);
		colorRGB.g = parseInt(green,16);
		colorRGB.b = parseInt(blue,16);
		
		return colorRGB;
	},
	
	colorAdd :function(color, addR, addG, addB){
		var colorRGB = this.colorSplit(color);
		colorRGB.r = Math.min(colorRGB.r + addR, 255).toString(16);
		colorRGB.g = Math.min(colorRGB.g + addG, 255).toString(16);
		colorRGB.b = Math.min(colorRGB.b + addB, 255).toString(16);
		colorRGB.r = (colorRGB.r.length <= 1) ? '0' + colorRGB.r : colorRGB.r;
		colorRGB.g = (colorRGB.g.length <= 1) ? '0' + colorRGB.g : colorRGB.g;
		colorRGB.b = (colorRGB.b.length <= 1) ? '0' + colorRGB.b : colorRGB.b;
		return '#' + colorRGB.r + colorRGB.g + colorRGB.b;
	},
	initStatus : function(){
		window.clearInterval(this.timer);
		//this.stepTitle.text("Initialization...");
	},
	initBackground : function(){
		
		this.body.css({"background-color":this.loadingBackground});
		
		/*var beginColor,endColor,angle;
		
		try{
			beginColor = bookConfig.bgBeginColor;
			endColor = bookConfig.bgEndColor;
			angle = bookConfig.bgMRotation;
		}catch(err){
			beginColor = "#1F2232";
			endColor = "#1F2232";
			angle = 90;
		}
		
		if(beginColor == undefined) beginColor = "#1F2232";
		if(endColor == undefined) endColor = "#1F2232";
		if(angle == undefined) angle = 90;
		
		var angleStr = "0% 0%,100% 0%";
		switch(angle) {
			case 45:
				angleStr = "0% 0%,100% 100%";
				break;
			case 90:
				angleStr = "0% 0%,0% 100%";
				break;
			case 135:
				angleStr = "100% 0%,0% 100%";
				break;
			case 180:
				angleStr = "100% 0%,0% 0%";
			case 0:
				angleStr = "0% 0%,100% 0%";
				break;
		}
		
		var browserType = this.getBrowserType();
		
		
		if(browserType == 1) {
			this.body.css("background-image", "-webkit-gradient(linear," + angleStr + ",from(" + beginColor + "),to(" + endColor + "))");
			
		} else if(browserType == 2) {
			this.body.css("background-image", "-moz-linear-gradient(left " + _angle + "deg," + beginColor + "," + endColor + ")");
	
		} else if(browserType == 3) {
			this.body.css("filter", "progid:DXImageTransform.Microsoft.Gradient(GradientType=1, EndColorStr=" +
				endColor + ", StartColorStr=" + beginColor + ");");
		};*/
		
	}
};

var jsLoadingBar = new LoadingJS();
