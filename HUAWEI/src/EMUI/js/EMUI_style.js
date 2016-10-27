!function(){
	$().ready(function(){
//		----添加数据------
		addJson();             //添加Json数据，包括了语言选择项以及底部四张图的标题、内容和背景图地址
//		---添加数据 End---
//		---设置方法---
		applyStyle();			//给应用市场添加底部红线、以及其下拉列表中的内容
		
		opacityDropDown();		//给两个下拉列表中添加黑色透明层的背景
			
		redPointMove();			//给首页菜单加入会移动的小红点样式
		
		$(".imgBox")				//设置底部四张图的宽度，可以自适应屏幕的大小
			.css({
				"width":($(window).width()-12)/4,
				"background-position-x":-(638-($(window).width()-12)/4)/2
			})
			.last().css({"margin":0})
		
		$(".footLeftBox .icon")				//底部四个按钮雪碧图的设置
			.each(function(i){
				$(this).css({
					"background": "url(img/emindex30.png) "+(-i*50)+"px top no-repeat"
				})
			})
			.mouseenter(function(){
				$(this).css({
					"background-position-y":-50
				})
			})
			.mouseleave(function(){
				$(this).css({
					"background-position-y":0
				})
			})
//		---设置方法 End---
	})
}()

function addJson(){
//		----添加数据------
	$(list.language).each(function(){				//给选择区域语言中添加选项
		$("<li><a href='##'>"+this.text+"</a></li>").appendTo($(".dropDwon ul"))
	})
	
	$(btmImg).each(function(i){
		$("<a href='##'><div class='imgBox'><div class='titleBox'><p>"+this.title+"</p><p>"+this.text+"</p></div></div></a>")
			.appendTo($(".imgBtmContainer"))
		$(".imgBtmContainer .imgBox").last().css({
			"background": "url("+this.src+") left top no-repeat"
		})
	})
//		---添加数据 End---
}

function applyStyle(){
	$(".topNavContainer ul a").each(function(){			//遍历顶部导航栏，如果是应用市场
		if($(this).hasClass("apply")){
			$(this).css({"position":"relative","color":"#fff"})		//给其下方加红线
			$(this).parent()
				.css({"position":"relative"})
				.addClass("applyContainer")
			$("<div class='redLine'></div>")
				.css({
					"position":"absolute",
					"width":$(this).width(),
					"bottom":0,
					"left":0,
					"border":"1px solid #C81118"
				})
				.appendTo($(this))
			$("<div class='applyDropDwon'><ul class='clearfix'></ul></div>")		//给其父li中加下拉菜单
				.appendTo($(this).parent())
			$(list.apply).each(function(){				//向下拉菜单内写入数据
				$("<li><a href='##'>"+this.text+"</a></li>").appendTo($(".applyDropDwon ul"))
			})
		}
	})
}

function opacityDropDown(){
	$(".dropDwon").clone()			//创建选择区域语言的透明背景
		.html("")
		.css({
			"background-color":"#000",
			"opacity":0.7,
			"z-index":1,
			"border-radius":"0 0 6px 6px"
		})
		.appendTo($(".selectLang"))
		
	$(".applyDropDwon").clone()			//创建选择软件应用的透明背景
		.html("")
		.css({
			"background-color":"#000",
			"opacity":0.7,
			"z-index":1,
			"border-radius":"0 0 6px 6px"
		})
		.appendTo($(".topNavContainer .applyContainer"))
}

function redPointMove(){
	$(".topMenuContainer .menu a")
		.mouseenter(function(){
			$(".topMenuContainer .menu a").removeClass("menuActive")
			$(this).addClass("menuActive")
			for(var i=0;i<$(".topMenuContainer .menu a").length;i++){
				if(this==$(".topMenuContainer .menu a").get(i)){
					$(".point").stop(true,true);
					$(".point").animate({"left":33+i*70},200)
				}
			}
		})
		.mouseleave(function(){
			$(".topMenuContainer .menu a").removeClass("menuActive")
			
		})
	$(".topMenuContainer .menu ul").mouseleave(function(){
		$(".point").stop(true,true);
		$(".point").animate({"left":33},200)
	})
}
