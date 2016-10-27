!function(){
	$("").ready(function(){
		topStyle();			//设置了顶层盒子的背景图及hover切换背景图
		$(footJson).each(function(){
			$("<div class='serviceBox'><dl><dt>"+this.title+"</dt></dl></div>").appendTo(".footMiddle")
			$(this.list).each(function(){
				$("<dd><a href='##'>"+this.text+"</a></dd>").appendTo($(".serviceBox").last().children())
			})
		})
		$(".serviceBox dt").each(function(i){
			$(this).css({
				"background":"url(./img/middleIcon"+(i+1)+".png) left top no-repeat"
			})
		})
		
		$(contactJson).each(function(){
			$("<span class='bottomLine'>|</span><li><a href='##'>"+this.text+"</a></li>").appendTo(".contact ul")
		})
		$("<span class='bottomLine'>|</span><li><a href='##' class='ask'>申请链接&ensp;&gt;&gt;</a></li>").appendTo(".contact ul")
	})
}()

function topStyle(){
	$(".topFourBox span").each(function(i){
		$(this).css({
			"background":"url(./img/icon"+(i+1)+".png) left center no-repeat"
		})
		.mouseenter(function(){
			$(this).css({
				"background":"url(./img/icon"+(i+1)+"_active.png) left center no-repeat"
			})
		})
		.mouseleave(function(){
			$(this).css({
				"background":"url(./img/icon"+(i+1)+".png) left center no-repeat"
			})
		})
	})
}
