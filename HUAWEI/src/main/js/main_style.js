!function(){
	$("").ready(function(){
//		----foucs-----
		foucsJson();			//获取轮播图的路径数据
		foucsImgCenter();		//使轮播图居中显示
		foucsMove(".foucsBox");			//轮播图动画效果
//		----foucs End-----
//		----middleBox-------
		middleOptionsJson();
		addMiddleOption_line();	//给middleOptions的左盒子加分割线效果
		commandJson(hotCommand,".hotCommand");			//推荐Json数据
		commandBoxStyle();		//为commandbox添加边线及文字居中
		middleFoucs();			//middle轮播图的Json数据和样式
//		---middleBox End---
//		------infoContainerBox-----
		$(infoAJson).each(function(){			//用Json数据添加出数据结构
			$("<div class='infoBlock'><div class='titleBox clearfix'><p>"+this.title+"</p><ul class='clearfix'></ul><ul class='more'><a href='##'><li>更多</li></a></ul></div><div class='infobox clearfix'><div class='infobox_left'></div><div class='infobox_right'></div></div></div>")
				.appendTo($(".infoContainer"))
			$(this.info).each(function(){
				$("<li><a href='##'>"+this.info+"</a></li>").appendTo($($(".infoBlock .titleBox").last().children()[1]))
			})
			$(this.info_left).each(function(){
				$("<a href='##'><img src='"+this.src+"'/></a>").appendTo($(".infobox .infobox_left").last())
			})
			commandJson(this.info_right,$(".infobox_right").last())
			infoBoxStyle();						//每添加一组整理一次样式
		})
//		----infoContainerBox End---
//		-------fixedbox-------
		fixedBox();
//		-----fixedbox End----
	})
}()


function foucsJson(){
	$(foucsImg_src).each(function(i){
		$("<li class='hide'><a href='##'><img src='"+this.src+"'/></a></li>").appendTo($(".foucsBox .foucsBoxContainer>ul"))
		$("<div class='foucsControl'>"+(i+1)+"</div>").appendTo(".foucsBox .foucsControlBox")	//根据数据创建控制按钮
	})
	$(".foucsBoxContainer>ul li").first().attr("class","show")
}

function foucsImgCenter(){
	$(".foucsBox .foucsBoxContainer>ul").css({
		"margin-left":($("body").width()-1920)/2
	})
}

function foucsMove(box){
	var idx=0;
	var tm;
	clearInterval(tm);
	tm=setInterval(function(){
		if(idx==$(box+" .foucsBoxContainer li").length){					//如果运动到图片最后一个 则再从第一个开始
			idx=0;
		}
		$($(box+" .foucsBoxContainer li").get(idx))						//把将要消失的图片放上面，使其透明度变0 动画效果，完成动画后将其display设为hide
			.css({"z-index":"1"})
			.animate({"opacity":0},1000,function(){
				$(this)
					.css({"opacity":1})
					.attr("class","hide")
			})
		if(idx==$(box+" .foucsBoxContainer li").length-1){				//把要显示出来的图片放在动画层的后一层，以出现过渡效果
			$($(box+" .foucsBoxContainer li").get(0))
				.css({"z-index":0})
				.attr("class","show")
				
			$(box+" .foucsControl").removeClass("foucsControl_active")				//使控制按钮可以跟随轮播图运动
			$($(box+" .foucsControl").get(0)).addClass("foucsControl_active")		//使控制按钮可以跟随轮播图运动
			
		}else{
			$($(box+" .foucsBoxContainer li").get(idx+1))				//把要显示出来的图片放在动画层的后一层，以出现过渡效果
				.css({"z-index":0})
				.attr("class","show")
				
			$(box+" .foucsControl").removeClass("foucsControl_active")				//使控制按钮可以跟随轮播图运动
			$($(box+" .foucsControl").get(idx+1)).addClass("foucsControl_active")	//使控制按钮可以跟随轮播图运动
			
		}
		idx++;
	},3000)
	
	
	$(".foucsBox .foucsControlBox").css("right",$(".searchBox").css("margin-left"))			//设置放置控制按钮的位置
	
	$(box+" .foucsControl").first().addClass("foucsControl_active")			//使初始控制按钮变红
	
	$(".foucsBoxContainer")								//mouseenter和mouseleave的效果
		.mouseenter(function(){
			clearInterval(tm)
		})
		.mouseleave(function(){
			var tm1;
			clearTimeout(tm1);
			setTimeout(function(){						//延时3秒重新启动定时器
				clearInterval(tm);
				tm=setInterval(function(){
					if(idx==$(box+" .foucsBoxContainer li").length){
						idx=0;
					}
					$($(box+" .foucsBoxContainer li").get(idx))
						.css({"z-index":"1"})
						.animate({"opacity":0},1000,function(){
							$(this)
								.css({"opacity":1})
								.attr("class","hide")
						})
					if(idx==$(box+" .foucsBoxContainer li").length-1){
						$($(box+" .foucsBoxContainer li").get(0))
							.css({"z-index":0})
							.attr("class","show")
							
						$(box+" .foucsControl").removeClass("foucsControl_active")				//使控制按钮可以跟随轮播图运动
						$($(box+" .foucsControl").get(0)).addClass("foucsControl_active")		//使控制按钮可以跟随轮播图运动
						
					}else{
						$($(box+" .foucsBoxContainer li").get(idx+1))
							.css({"z-index":0})
							.attr("class","show")
							
						$(box+" .foucsControl").removeClass("foucsControl_active")				//使控制按钮可以跟随轮播图运动
						$($(box+" .foucsControl").get(idx+1)).addClass("foucsControl_active")	//使控制按钮可以跟随轮播图运动
					}
					idx++;
				},3000)
			},3000)
		})
		
	$(box+" .foucsControl").each(function(i){				//控制按钮鼠标移入移出
		$(this).mouseenter(function(){					
			$(box+" .foucsBoxContainer li").stop(true,true)				//先停掉所做的动画
			$(box+" .foucsControl").removeClass("foucsControl_active")				
			$($(box+" .foucsControl").get(i)).addClass("foucsControl_active")			//给鼠标移入的控制按钮换背景色
			if(idx==i){													//如果两次都是一个按钮则不触发动画效果
				$($(box+" .foucsBoxContainer li").get(idx))
					.css({"z-index":"1","opacity":1})
					.attr("class","show")
			}else{
				$($(box+" .foucsBoxContainer li").get(idx))					//触发动画效果，同理上
					.css({"z-index":"1"})
					.animate({"opacity":0},1000,function(){
						$(this)
							.css({"opacity":1})
							.attr("class","hide")
							
						var hideAll=true;								//如果在某段时间图片全处于隐藏状态
						$(box+" .foucsBoxContainer li").each(function(){
							if($(this).attr("class")=="show"){
								hideAll=false;
							}
						})
						if(hideAll){
							$($(box+" .foucsBoxContainer li").get(idx))			//显示当前控制按钮激活的图片
								.css({"z-index":0})
								.attr("class","show")	
						}
					})
			}
			idx=i;												//给idx赋值，让其往后继续走动
			$($(box+" .foucsBoxContainer li").get(idx))				
				.css({"z-index":0})
				.attr("class","show")
		})
	})
}

function addMiddleOption_line(){
	$(".middle_options li").css({
		"width":$(".middle_options").width()/3,
		"height":$(".middle_options").height()/2
	})
	$(".middle_options li").each(function(i){
		if(i<3){
			$(this).css({
				"border-bottom":"1px solid #EEEEEE"
			})
		}
		if((i!=($(".middle_options li").length)/2-1)&&(i!=$(".middle_options li").length-1)){
			$(this).css({
				"border-right":"1px solid #EEEEEE"
			})
		}
	})
}

function middleOptionsJson(){
	$(middleOptions).each(function(){
		$("<li><a href='##'><img src='"+this.src+"' alt='' /><span>"+this.text+"</span></a></li>").appendTo(".middle_options>ul")
	})
	$(middleImg).each(function(){
		$("<div class='middleImg'><a href='##'><img src='"+this.src+"'/></a></div>").appendTo($(".middle_top"))
	})
}

function commandBoxStyle(){
	$(".commandBox").last().css({"border-right":"1px solid #e3e3e3"})
	$(".hotCommand .titlebox").css({
		"left":($(".hotCommand .productContainer").width()-$(".hotCommand .titlebox").width())/2
	})
}

function commandJson(json,box){
	$(json).each(function(){
		$("<div class='commandBox'><a href='##'><div class='productContainer'><img src='"+this.src+"'/><div class='titlebox'><p class='title'>"+this.title+"</p><p class='supTitle'>"+this.supTitle+"</p><p class='proPrice'>"+this.proPrice+"元</p></div></div></a></div>")
			.appendTo(box)
		if(this.icon){
			$(".commandBox").last()
				.css({"position":"relative"})
				.addClass(this.icon)
			$("<div class='proIcon'><div>")
				.css({
					"left":($(".productContainer").width()-70)/2
				})
				.appendTo($(".commandBox").last())
				
			switch(this.icon){
				case "gift":
					$(".proIcon").last().css({"background-color":"#01ABDF"}).html("买赠");
					break;
				case "new":
					$(".proIcon").last().css({"background-color":"#24CA44"}).html("新品");
					break;
				case "sale":
					$(".proIcon").last().css({"background-color":"#01ABDF"}).html("特惠");
					break;
				case "reduce":
					$(".proIcon").last().css({"background-color":"#FF6634"}).html("直降");
					break;
				case "hot":
					$(".proIcon").last().css({"background-color":"#FF6634"}).html("热卖");
					break;
				case "first":
					$(".proIcon").last().css({"background-color":"#FC3884"}).html("首发");
					break;
			}
			
		}
	})
}

function middleFoucs(){
	$(middleFoucsJson).each(function(i){
		$("<li class='hide'><a href='##'><img src='"+this.src+"'/></a></li>").appendTo($(".middleFoucs .foucsBoxContainer>ul"))
		$("<div class='foucsControl'></div>").appendTo(".middleFoucs .foucsControlBox")	//根据数据创建控制按钮
	})
	$(".middleFoucs .foucsBoxContainer>ul li").first().attr("class","show")
	foucsMove(".middleFoucs")
}

function infoBoxStyle(){
	$(".infobox_left").each(function(){
		if($(this).children().children().length==2){
			$(this).children().children().last().css({
				"margin-top":570-280*2
			})
		}
	})
	$(".infobox_right").each(function(){
		$(this).children()
			.each(function(i){
				if(i>3){
					$(this).css({
						"margin-top":($(".infobox").height()-$(".infobox_right .commandBox").height()*2)
					})
				}
			})
			.css({
				"margin-left":($(".infobox_right").width()-$(".infobox_right .commandBox").width()*4)/4
			})
	})
	$(".infobox_right .titlebox").css({
		"left":($(".infobox_right .productContainer").width()-$(".infobox_right .titlebox").width())/2
	})
}

function fixedBox(){
	$(".fixedbox div").each(function(i){
			$(this).css({"top":58*i})
		})
		$(document).scroll(function(){
			if($("body").scrollTop()<=$(window).height()){
				$(".top").stop()
				$(".top").animate({"opacity":0},3000,function(){
					$(this).css({"display":"none"})
				})
			}else{
				$(".top").stop()
				$(".top").css({"display":"block"})
				$(".top").animate({"opacity":1},1000)
			}
		})
		$(".top").click(function(){
			var tm;
			tm=setInterval(function(){
				if($("body").scrollTop()==0){
					clearInterval(tm)
				}
				window.scrollTo(0,$("body").scrollTop()-200)
			},5)
		})
}
