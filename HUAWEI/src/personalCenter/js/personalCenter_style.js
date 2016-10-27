!function(){
	$().ready(function(){
//		----nav-----
		hoverSideBar();		//覆盖、调整原先主页的sideBar样式，使其添加背景色、透明层、鼠标移入移出效果等，使其适应其他页面
//		--nav End---
//		---personalLeftJson---
		personalJson();			//添加左侧列表的信息
//		---personalLeftJosn End---

//		---personalLeftMethods---
		$(".blockList .num").parent("li")			//控制左侧列表的样式
			.css({"position":"relative"})
//		---personalLeftMethods End---

//		---personalRightJson---
		listRightJson();
//		---personalRightJson End---

//		---personalRightMethods---

		$(".userSafeInfo ul li").first().css({"padding-left":0})
		$(".userSafeInfo ul li").last().css({"border-right":0})
		
//		------userVipIcon-----
		addVipIcon();			//给用户头像上添加vip等级
//		-----userVipIcon-----
		$(".personalInfoBlock .blockLeft a").css({"margin-top":($(".blockLeft").height()-100)/2})	//信息块里的图片竖直方向上居中
//		---personalRightMethods End---

//		---rencently---
		$(".recent").each(function(i){				//最近浏览商品第4个，右边距设成0，使其不被挤下去
			if((i+1)%4==0&&i!=0){
				$($(".recent").get(i)).css({"padding-right":0})
			}
		})
//		---rencently End---

//		-------fixedbox-------
		fixedBox();
//		-----fixedbox End----
	})
}();

function addVipIcon(){
	$(".vip").css({"position":"relative"}).append($("<div class='vipIcon'></div>"))
	switch(listRight.title.userVip){
		case "0":
			$(".vipIcon").css({"background":"url(./img/vip0.png) left top no-repeat"});
			break;
		case "2":
			$(".vipIcon").css({"background":"url(./img/vip2.png) left top no-repeat"});
			break;
		default:
			$(".vipIcon").css({"background":"url(./img/vip2.png) left top no-repeat"});
	}
}

function listRightJson(){
	$(listRight.title).each(function(){				//添加头部信息（标题、经验值、我的特权等信息）
		$("<div class='rightTitle clearfix'><div class='userPic vip'><img src='"+this.userPic+"'/></div><div class='userInfo'><p>"+this.userName+"，欢迎您!</p><div class='userSafeInfo'>我的经验值：<ul class='clearfix'></ul></div><div class='myPrivilege'>我的特权：</div></div></div>")
			.prependTo($(".personalRight"))
		$("<li><a href='##'>"+this.exp[0].text+"</a></li><li class='validate'><a href='##'>"+this.exp[1].text+"</a></li><li class='validate'><a href='##'>"+this.exp[2].text+"</a></li><li class='validate'><a href='##'>"+this.exp[3].text+"</a></li><li>优惠券<a href='##'>"+this.exp[4].text+"</a>张</li><li>站内信<a href='##'>"+this.exp[5].text+"</a>条</li>")
		.appendTo(".userSafeInfo ul")
		$(this.privilege).each(function(){
			$("<div class='privilege'><a href='##'><img src='"+this.src+"'/></a></div>").appendTo($(".myPrivilege"))
		})
	})
	$(listRight.info).each(function(){				//添加待支付订单和待评价列表里的内容
		if(this.num=="0"){
			$("<div class='personalInfoContainer'><div class='infoContainerTitle clearfix'><div class='titleLeft'><span>"+this.title+"（<a href='##'>"+this.num+"</a>）</span></div><a class='titleRight' href='##'>更多&ensp;></a></div><div class='personalInfoBlock clearfix'><span>您暂时没有待评价订单。</span><a href='##'>挑选喜欢的商品去>></a></div></div>")
				.appendTo($(".personalRight"))
		}else{
			$("<div class='personalInfoContainer'><div class='infoContainerTitle clearfix'><div class='titleLeft'><span>"+this.title+"（<a href='##'>"+this.num+"</a>）</span></div><a class='titleRight' href='##'>更多&ensp;></a></div></div>")
				.appendTo($(".personalRight"))
			$(this.info).each(function(){
				$("<div class='personalInfoBlock clearfix'><div class='blockLeft'><a href='##'><img src='"+this.src+"'/></a><span>订单号："+this.listNum+"</span></div><div class='blockMiddle'><span>¥"+this.price+"</span></div><div class='blockMiddleRight'><a href='##'>订单详情</a></div><div class='blockRight'><span>立即支付</span></div></div>")
					.appendTo($(".personalInfoContainer").last())
			})
		}
	})
	$(listRight.recently).each(function(){			//添加最近浏览的商品信息
		$("<div class='recent'><a href='##'><img src='"+this.src+"'/></a><div class='recentName'><a href='##'>"+this.text+"</a></div><div class='recentPrice'>￥"+this.price+"</div></div>")
			.appendTo($(".recentlyInfo"))
	})
}

function personalJson(){
	$(listLeft).each(function(){
		$("<div class='personalBlock'><div class='blockTitle'><span>"+this.title+"</span></div><div class='blockList'><ul></ul></div></div>")
			.appendTo($(".personalLeft"))
		$(this.info).each(function(){
			if(this.num){
				$("<a href='##'><li>"+this.text+"<div class='num'>"+this.num+"</div></li></a>").appendTo($(".personalLeft .personalBlock").last().children(".blockList").children("ul"))
			}else{
				$("<a href='##'><li>"+this.text+"</li></a>").appendTo($(".personalLeft .personalBlock").last().children(".blockList").children("ul"))
			}
		})
	})
}

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