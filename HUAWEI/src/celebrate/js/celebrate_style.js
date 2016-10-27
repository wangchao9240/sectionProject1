!function(){
	$().ready(function(){
		addJson();
		$("body>*").each(function(){				//给body下的第一层元素加上容器背景图片居中的样式，并且容器大小和屏幕同大
			if($(this).attr("class")!="fixedBox"){
				imgBgfixer($(this))
			}
		})
		adjustImgMargin();			//遍历每个container，调整每张图片之间的间距
		backToTop();			//返回顶部盒子功能和鼠标滚轮下滑到一定高度时固定效果
	})
}();

function backToTop(){
	$(window).scroll(function(){
		if(($(".infoLine1").offset().top-$(document).scrollTop())<21){
			$(".fixedBox").css({
				"position":"fixed",
				"top":21,
			})
		}else{
			$(".fixedBox").css({
				"position":"absolute",
				"top":61+472,
			})
		}
	})
	
	$(".topBtn").click(function(){
		var tm;
		tm=setInterval(function(){
			if($("body").scrollTop()==0){
				clearInterval(tm)
			}
			window.scrollTo(0,$("body").scrollTop()-200)
		},5)
	})
}

function adjustImgMargin(){
	setTimeout(function(){
		$(".infoContainer").each(function(){
			var imgWidth=0;
			$(this).children("a").children("img").each(function(){
				imgWidth+=$(this).width()
			})
			$(this).children("a").children("img").css({
				"margin-right":($(this).width()-imgWidth)/($(this).children("a").children("img").length-1)
			})
			$(this).children("a").children("img").last().css({
				"margin-right":0
			})
		})
	},800)
}

function addJson(){
	$(imgSrc).each(function(i){
		$("<div class='infoLine"+(i+1)+"'><div class='infoContainer clearfix'></div></div>")
			.appendTo("body")
		$(".infoLine"+(i+1)).css({
			"background-image":"url("+this.bgSrc+")",
			"height":this.height
		})
		$(this.line).each(function(){
			$("<a href='##'><img src='"+this.src+"'/></a>").appendTo($(".infoContainer").last())
		})
	})
}

function imgBgfixer(box){
	box.css({"width":$(window).width(),"background-repeat":"no-repeat"})
	box.css({
		"background-position":"-"+(1920-$(window).width())/2+"px 0"
	})
}
