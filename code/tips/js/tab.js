$(function () {
	$.fn.tabWeek = function(list,clickDay) {
			for (var i = 0; i < list.length; i++) {
				if(i>6){//控制不超过7天
					return false;
				}
				var obj=list[i];
				var contentStr='',contentCount=0;
				if(obj.contentList!=undefined){
					for (var j = 0; j < obj.contentList.length; j++) {
						var content=obj.contentList[j];
						contentStr+='<div class="info-item">'+content.name+'：'+'<a href="#" data-type="'+content.type+'">'+content.count+'</a></div>';
						contentCount+=content.count;
					};
				}
				var statusStr='',statusCount=0;
				if(obj.statusList!=undefined){
					for (var j = 0; j < obj.statusList.length; j++) {
						var status=obj.statusList[j];
						statusStr+='<div class="info-item">'+status.name+'：'+'<a href="#" data-type="'+status.type+'">'+status.count+'</a></div>';
						statusCount+=status.count;
					};
				}
				this.find(".week-row.content").append(' <div class="week-item">'+
				'  <div class="week-date">'+obj.date+'</div>'+
				'  <div class="week-body">'+
				'   <div class="week-day">'+
				'    <div class="week-left">'+obj.week+'</div>'+
				'    <div class="week-right">'+
				'     <span class="week-num">'+contentCount+'</span>单'+
				'    </div>'+
				'   </div>'+
				'   <div class="week-down">'+
				contentStr+
				'   </div>'+
				'  </div>'+
				' </div>');
				this.find(".week-row.status").append(' <div class="week-item">'+
				'  <div class="week-date">'+obj.date+'</div>'+
				'  <div class="week-body">'+
				'   <div class="week-day">'+
				'    <div class="week-left">'+obj.week+'</div>'+
				'    <div class="week-right">'+
				'     <span class="week-num">'+statusCount+'</span>单'+
				'    </div>'+
				'   </div>'+
				'   <div class="week-down">'+
				statusStr+
				'   </div>'+
				'  </div>'+
				' </div>');


			};


			$(".week-item").click(function(){
				$(".week-item").removeClass("active2");
				$(this).addClass("active2");
				if(typeof(clickDay)=="function"){
					var $date=$.trim($(this).find(".week-date").html());
					clickDay($date);
				}
			});
			$(".info-item a").click(function(){
				$(".week-item").removeClass("active2");
				$(this).parents(".week-item").addClass("active2");
				if(typeof(clickDay)=="function"){
					var $type=$.trim($(this).data("type"));
					var $date=$.trim($(this).parents(".week-item").find(".week-date").html());
					clickDay($date,$type);
				}
				return false;
			});
	}


			$(".tab-vertical .tab-item").click(function(){
				$(this).parents(".tab-vertical").find(".tab-item").removeClass("active");
				$(this).addClass("active");
				var index=$(this).index(".tab-item");
				if($.trim(index)==''){
					index=0;
				}
				var $top=index*157;
				$(this).parents(".tab-vertical").find(".week-bar").animate({top: "-"+$top+"px"}, 500);
			});
		
});