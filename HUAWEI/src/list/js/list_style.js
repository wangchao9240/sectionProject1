!function(){
	$("").ready(function(){
//		----nav-----
		hoverSideBar();		//覆盖、调整原先主页的sideBar样式，使其添加背景色、透明层、鼠标移入移出效果等，使其适应其他页面
//		--nav End---
//		---classify---
		classifyJsonStyle();		//对classify（分类） Json数据的获取以及样式的微调
//		---classify End---
//		--infoContainer---
		commandJson(info_right,$(".infoContainer"))			//导入商品信息数据
		infoContainerStyle();			//对商品信息间距、标题盒子居中的调整
		changePagesStyle();				//对右下方切换页数小盒子的鼠标移入移出事件的调整
//		--infoContainer End--
//		-------fixedbox-------
		fixedBox();
//		-----fixedbox End----
		
	})
}();

function hoverSideBar(){
	$(".sideBarBox .sideBar")				//这里先将原来的sideBar背景色设置为透明
		.css({
			"background-color":"transparent"
		})
	$(".sideBarBox .sideBar").children("a")		//将sideBar标题a设置为白字
		.css({"color":"#fff"})
	$(".sideBarHotIcon").css({"box-shadow":"none"})		//将hot小图标阴影去掉
		
	$(".sideBarBox").clone()					//赋值一层sideBar使其在原sideBar下方
		.css({
			"z-index":1
		})
		.appendTo(".NavContainer")
	$(".sideBarBox").last()						//给下方的sideBar添加背景色、hover效果等
		.css({
			"background-color":"#333",
			"opacity":0.75
		})
	$(".sideBarBox").first().children(".sideBar").each(function(i){
		$(this)
			.mouseenter(function(){
				$($(".sideBarBox").last().children(".sideBar").get(i))
					.css({
						"background-color":"#222"
					})
			})
			.mouseleave(function(){
				$($(".sideBarBox").last().children(".sideBar").get(i))
					.css({
						"background-color":"#333"
					})
			})
	})										//添加背景色、hover效果完毕
	$(".allProducts")						//为其添加鼠标移入移出是使sideBar显示和隐藏
		.mouseenter(function(){
			$(".sideBarBox").css({"display":"block"})
			$(this).css({
				"background":"url(./img/listUpIcon.PNG) 220px center no-repeat",
				"background-color":"#C81118"
			})
		})
		.mouseleave(function(){
			$(".sideBarBox").css({"display":"none"})
			$(this).css({
				"background":"url(./img/listDownIcon.PNG) 220px center no-repeat",
				"background-color":"#C81118"
			})
		})
	$(".sideBarBox")
		.mouseenter(function(){
			$(".sideBarBox").css({"display":"block"})
			$(".allProducts").css({
				"background":"url(./img/listUpIcon.PNG) 220px center no-repeat",
				"background-color":"#C81118"
			})
		})
		.mouseleave(function(){
			$(".sideBarBox").css({"display":"none"})
			$(".allProducts").css({
				"background":"url(./img/listDownIcon.PNG) 220px center no-repeat",
				"background-color":"#C81118"
			})
		})									//添加鼠标移入移出、显示隐藏事件完毕
}


function classifyJsonStyle(){
	$(classify).each(function(){			//从json数据中取出数据并向页面中添加classify元素
		$("<div class='classify'><dl><dt>"+this.title+"</dt></dl></div>").appendTo($(".classifyBox"))
		$(this.info).each(function(){
			$("<dd><a href='##'>"+this.text+"</a></dd>").appendTo($(".classify").last().children())
		})
	})
	$(".classify").each(function(i){				//classify的一些样式调整
		if(i==$(".classify").length-1){
			$(this).css({"margin-top":-1})											//第二排盒子向上偏移1px时边框线重合，不产生2px边框
			$(this).children().children("dd").children("a").each(function(a){		//第二排排序中每个a后的小图片的添加
				if(a>0){
					$(this).css({
						"background":"url(./img/classifyIcon"+a+".PNG) right center no-repeat",
						"padding-right":"12px"
					})
					
				}
			})
		}
		$(this).children().children("dd").first().children("a").css({"color":"#C81118"})	//每个盒子第一个a元素颜色为红色
	})
}

function commandJson(json,box){
	$(json).each(function(){
		if(this.has=="false"){				//如果无货，则将“选购”按钮内容替换为到货通知
			$("<div class='infoBlock clearfix'><div class='commandBox'><a href='##'><div class='productContainer'><img src='"+this.src+"'/><div class='titlebox'><p class='title'>"+this.title+"</p><p class='proPrice'>￥"+this.proPrice+"</p></div></div></a></div><div class='infoButtonBox clearfix'><div class='buy'>到货通知</div><div class='comment'>"+this.comment+"人评价</div></div></div>")
			.appendTo(box)
		}else{								//如果有货，则不改变“选购按钮内容”
			$("<div class='infoBlock clearfix'><div class='commandBox'><a href='##'><div class='productContainer'><img src='"+this.src+"'/><div class='titlebox'><p class='title'>"+this.title+"</p><p class='proPrice'>￥"+this.proPrice+"</p></div></div></a></div><div class='infoButtonBox clearfix'><div class='buy'>选购</div><div class='comment'>"+this.comment+"人评价</div></div></div>")
				.appendTo(box)
		}
		if(this.red){						//如果json数据中有标题红字部分，则向该商品的标题中添加红字标签
			$(".infoBlock").last().children(".commandBox").children().children().children(".titlebox").children(".proPrice").css({"margin-top":23})
			$("<span class='redFont'>"+this.red+"<span>")
				.appendTo($(".infoBlock").last().children(".commandBox").children().children().children(".titlebox").children(".title"))
		}
		if(this.icon){						//如果此商品有icon，则向该商品的中上部添加该标签
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

function infoContainerStyle(){
	$(".infoContainer .titlebox").each(function(){		//标题盒子的居中
		$(this).css({
			"left":($(".infoContainer .productContainer").width()-$(this).width())/2
		})
	})
	$(".infoBlock").each(function(i){				//每个盒子在每一行的右间距（每第5个盒子无间距）
		if((i+1)%5!=0||i==0){
			$(this).css({
				"margin-right":(1200-224*5)/4
			})
		}
	})
}

function changePagesStyle(){
	$(".pagesContainer .pagesChange").each(function(i){			//给按钮切换小盒子附上背景图片及鼠标移入移出效果
		$(this).css({
			"background":"url(./img/changePages"+(i+1)+".png) left top no-repeat"
		})
		if(i==2){
			$(this)
				.mouseenter(function(){
					$(this).css({
						"background":"url(./img/changePages"+3+"_active.png) left top no-repeat",
						"border":"none",
						"cursor":"pointer"
					})
				})
				.mouseleave(function(){
					$(this).css({
						"background":"url(./img/changePages"+3+".png) left top no-repeat",
						"border": "1px solid #DEDEDE"
					})
				})
		}
		if(i==3){
			$(this)
				.mouseenter(function(){
					$(this).css({
						"background":"url(./img/changePages"+4+"_active.png) left top no-repeat",
						"border":"none",
						"cursor":"pointer"
					})
				})
				.mouseleave(function(){
					$(this).css({
						"background":"url(./img/changePages"+4+".png) left top no-repeat",
						"border": "1px solid #DEDEDE"
					})
				})
		}
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