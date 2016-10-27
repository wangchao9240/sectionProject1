!function(){
	$().ready(function(){
//		---------topNav-----------
		topNav_JsonStyle()		//顶部导航数据的获取以及动态样式的写入
		vertical_align($(".logo"),$(".searchBox"));
		vertical_align($(".search"),$(".searchBox"));
//		--------topNav End---------
//		--------search----------
		searchJson();						//获取此模块Json数据的函数
		searchIpt();						//控制搜索框默认文字样式的函数
		my_cartStyle();						//控制“我的购物车”和“我的商城”样式
		dropCart_count();					//计算“我的购物车”商品总价
		dropcart_AddLine();					//动态获取下拉菜单购物车的金额合计等信息
		mouseMove_Mycart();					//控制鼠标移入移出“我的商城”、“我的购物车”的显示隐藏；
		drop_cartClose();					//控制“我的购物车”下拉菜单关闭按钮时动态刷新的内容
		qrCodeAnimate();					//控制二维码的动态效果
//		-------search End---------
//		--------nav-------------
		navJson();							//获取此模块Json数据的函数
		navHotNew_icon();					//设置中部nav NEW HOT图标位置的函数
		sideBarBox();						//设置侧边栏位置的函数
		sideBarStyle();						//设置侧边栏及hot图标样式的函数
		sideBarMouseMove();					//侧边栏鼠标移入显示隐藏效果
//		-------nav End----------
	})
}()



function topNav_JsonStyle(){
	$(topNav_left).each(function(){		//向左侧顶部导航写入数据
		if(this.titleLeft=="软件应用"){
			$("<li><a href='##'>"+this.titleLeft+"</a><span class='arrow'></span></li>").appendTo($(".topNav_left>ul"));
		}else{
			$("<li><a href='##'>"+this.titleLeft+"</a></li>").appendTo($(".topNav_left>ul"));
		}
	})
	
	$(topNav_right).each(function(i){	//向右侧顶部导航写入数据
		if(i==0){
			$("<li class='log'></li>").appendTo(".topNav_right>ul");
			$(this.titleRight).each(function(a){
				$(".log").append("<a href='##'>"+this.log+"</a>")
			})
		}else if(this.titleRight=="网站导航"){
			$("<li><a href='##'>"+this.titleRight+"</a><span class='arrow'></span></li>").appendTo($(".topNav_right>ul"));
		}else{
			$("<li><a href='##'>"+this.titleRight+"</a></li>").appendTo($(".topNav_right>ul"));
		}
	});
	
	$(".topNav_left>ul li,.topNav_right>ul li").each(function(i){		//添加后面竖线
		if(i<$(".topNav_left>ul li,.topNav_right>ul li").length-1){
			$(this).after("<span class='topNavLeftLine'>|</span>");
		}
	})
	
	$(appStore).each(function(i){			//为应用市场写入内容
		if(i==0){
			$("<li><a href='##'>"+this.dropMenu_left+"<span class='arrow'></span></a></li>").appendTo(".topNav_left .topNav_dropMenu ul")
		}else{
			$("<li><a href='##'>"+this.dropMenu_left+"</a></li>").appendTo(".topNav_left .topNav_dropMenu ul");
		}
	})
	
	$(webNav).each(function(i){			//为应用市场写入内容
		if(i==0){
			$("<li><a href='##'>"+this.dropMenu_right+"<span class='arrow'></span></a></li>").appendTo(".topNav_right .topNav_dropMenu ul")
		}else{
			$("<li><a href='##'>"+this.dropMenu_right+"</a></li>").appendTo(".topNav_right .topNav_dropMenu ul");
		}
	})
	
	$(".arrow").parent()			//鼠标移入移出显示下拉菜单效果
		.mouseenter(function(){
			$(this).children("span")[0].setAttribute("style","background: url(img/arrowicon_active.png) left top no-repeat;")
			$($($(this).parents()[0]).prev()).css({"display":"block"})
		})
		
	$(".topNav_dropMenu").mouseleave(function(){
		$(this).next().children("li").children(".arrow")[0].setAttribute("style","background: url(img/arrowicon.png) left top no-repeat;")
		$(this).css({"display":"none"})
	})
}

function vertical_align(box,parentBox){
	box.css({
		"margin-top":(parentBox.height()-box.height())/2
	})
}


function searchJson(){
	$(drop_logUl).each(function(){			//“我的商城”中下拉菜单添加数据
		$("<li><a href='##'>"+this.dropMenu_log+"</a></li>").appendTo(".drop_logUl ul")
	})
	$(iptsut).each(function(){				//搜索框中默认推荐爆款手机添加数据
		$("<li><a href='##'>"+this.iptSut+"</a></li>").appendTo($(".iptsut"))
	})
	$(dropCart).each(function(){			//购物车下拉菜单内容的加入
		$("<div class='drop_cartInfo'><div class='row'><div class='col-xs-3'><a href='##'><img src='"+this.dropCart_img+"'/></a></div><div class='col-xs-8'><a href='##'>"+this.dropCart_text+"</a><div class='cartPrice'><span class='cart_price'>￥"+this.dropCart_price+"</span>&ensp;&times;&ensp;"+this.dropCart_count+"</div></div><div class='col-xs-1'>&times;</div></div></div>")
			.prependTo(".drop_cart")
	})
	$(qrCode).each(function(i){				//二维码添加数据
		$("<div class='qrcode'><a href='##'><img src='"+this.qrCode_src+"'/><span class='qrcode_text'>"+this.qrCode_text+"</span></a></div>").appendTo($(".qrcodeBox"))
		if(i==0){
			$("<div class='qrcode_control qrcode_active control1'>").appendTo($(".qrcodeBox"))
		}else{
			$("<div class='qrcode_control control"+(i+1)+"'></div>").appendTo($(".qrcodeBox"))
		}
	})
}

function searchIpt(){
	$(".iptsut").css({						//设置搜索框默认文字位置
		"left":405-$(".iptsut").width()
	})	
	$(".searchIpt")							//获得焦点和有值时不显示文字
		.focus(function(){
			$(".iptsut").css({
				"display":"none"
			})
		})
		.blur(function(){
			if($(this).val().length==0){
				$(".iptsut").css({
					"display":"block"
				})
			}
		})
}

function dropcart_AddLine(){
	$(".drop_cartInfo").css({"border-bottom":"0"})
	if($(".drop_cartInfo").length>1){
		$(".drop_cartInfo").each(function(i){
			if(i!=$(".drop_cartInfo").length-1){
				$(this).css({"border-bottom":"1px solid #EDEDED"})
			}
		})
	}
}

function dropCart_count(){
	$(".drop_cartCount").html($(".drop_cartInfo").length);
	var sum=0;
	$(".drop_cartInfo").each(function(){
		sum+=$(".cart_price").html().split("￥")[1]-0;
	})
	$(".drop_cartMoney").html("￥"+sum);
}

function mouseMove_Mycart(){
	$(".mall")										//鼠标移入移出“我的商城”显示隐藏
		.mouseenter(function(){
			$(".mall_dropDown").css({"display":"block"})
		})
		.mouseleave(function(){
			$(".mall_dropDown").css({"display":"none"})
		})
	$(".mall_dropDown")
		.mouseenter(function(){
			$(this).css({"display":"block"})
		})
		.mouseleave(function(){
			$(this).css({"display":"none"})
		})
		
	$(".cart")										//鼠标移入移出“我的商城”显示隐藏
		.mouseenter(function(){
			$(".drop_cartbox").css({"display":"block"})
		})
		.mouseleave(function(){
			$(".drop_cartbox").css({"display":"none"})
		})
	$(".drop_cartbox")
		.mouseenter(function(){
			$(this).css({"display":"block"})
		})
		.mouseleave(function(){
			$(this).css({"display":"none"})
		})
}

function my_cartStyle(){
	$("<div class='cart_arrow'></div>")		//我的购物车右上角商品数量
		.css({
			"width":"11px",
			"height":"15px",
			"background-color":"#C81118",
			"position":"absolute",
			"right":6,
			"top":-7,
			"color":"#fff",
			"font-size":12,
			"line-height":"15px"
		})
		.html($(".drop_cartInfo").length)
		.appendTo($(".cart_count"))
	
	$("<div></div>")						//我的购物车下拉细节弥补覆盖边线
		.css({
			"position":"absolute",
			"top":-2,
			"right":0,
			"background-color":"#fff",
			"width":$(".my_cart").width()/2,
			"height":5
		})
		.appendTo($(".drop_cartbox"))
	
	
	
	$(".mall,.cart")						//控制鼠标移动时中间分割线长短
		.mouseenter(function(){
			$(".cartLine").css({
				"height":"100%",
				"margin-top":"0"
			})
		})
		.mouseleave(function(){
			$(".cartLine").css({
				"height":"12px",
				"margin-top":"12px"
			})
		})

	$(".drop_logUl li").each(function(i){			//“我的商城”li内容分割线的控制
		if(i%2==0){
			$(this).css({
				"border-right":"1px solid #EDEDED"
			})
		}
	})
}

function drop_cartClose(){
	$(".drop_cartInfo .col-xs-1").click(function(){
		$($(this).parents()[1]).remove()
		dropcart_AddLine();
		dropCart_count();
		$(".cart_arrow").html($(".drop_cartInfo").length)		//我的购物车右上角商品数量
		if($(".drop_cartInfo").length==0){						//如果没有商品显示另一份图标
			$(".drop_cartbox").html("")
			$("<div class='drop_cartIcon'>您的购物车是空的，赶紧选购吧！</div>").appendTo($(".drop_cartbox"))
			$(".drop_cartIcon").css({
					"margin-top":($(".drop_cartbox").height()-$(".drop_cartIcon").height())/2,
					"margin-left":($(".drop_cartbox").width()-$(".drop_cartIcon").width())/2
				})
		}
	})
}

function qrCodeAnimate(){
	$(".qrcode_control").each(function(i){
		$(".qrcode").css({"display":"none"})
		$($(".qrcode").get(0)).css({"display":"block","opacity":1})
		$(this)
			.mouseenter(function(){
				$(".qrcode_control").removeClass("qrcode_active")
				$(this).addClass("qrcode_active")
				if($(this).attr("class").match("control1")!=null){
					$(".qrcode").css({"display":"none"})
					$($(".qrcode").get(0))
						.css({"display":"block","opacity":0})
						.animate({"opacity":1},500)
				}else{
					$(".qrcode").css({"display":"none"})
					$($(".qrcode").get(1))
						.css({"display":"block","opacity":0})
						.animate({"opacity":1},500)
				}
			})
			.css({
				"top":20+i*15
			})
	})
}

function navJson(){
	$(navLi).each(function(){
		if(this.title=="荣耀品牌日"){
			$("<li class='hot'>"+this.title+"</li>").appendTo($(".NavContainer ul"))
		}else if(this.title=="荣耀8"){
			$("<li class='new'>"+this.title+"</li>").appendTo($(".NavContainer ul"))
		}else{
			$("<li>"+this.title+"</li>").appendTo($(".NavContainer ul"))
		}
	})
	$(sideBarLi).each(function(){
		$("<div class='sideBar'><a href='##'>"+this.title+"</a><div class='sideBarInfo'></div></div>").appendTo($(".sideBarBox"))
		$("<div class='sideBarContainer'><div class='sideBar_countHeight'></div><div class='sideBar_command'><span>推荐商品</span></div></div>").appendTo($(".sideBarBox"))
	})
	
}

function sideBarStyle(){
	$(".sideBar").css({
		"height":$(".sideBarBox").height()/$(sideBarLi).length
	})
	
	$(".sideBarInfo").each(function(i){
		var is=this;
		$(sideBarLi[i].titleInfo).each(function(){
			if(this.icon){
				$("<a href='##' class='sideBarHot'>"+this.info+"</a>")
					.css({"position":"relative"})
					.appendTo($(is));
			}else{
				$("<a href='##'>"+this.info+"</a>").appendTo($(is));
			}
		})
		$(sideBarLi[i].detail).each(function(){
			if(this.icon){
				$("<div class='sideBar_info2'><a href='##' class='sideBarHot'>"+this.info+"</a></div>")
					.appendTo($($(".sideBarContainer .sideBar_countHeight").get(i)))
				$(".sideBar_info2 a").css({
					"position":"relative"
				})
			}else{
				$("<div class='sideBar_info2'><a href=##'>"+this.info+"</a></div>").appendTo($($(".sideBarContainer .sideBar_countHeight").get(i)))
			}
		})
		if($(sideBarLi[i].command).length==0){
			$($($(".sideBarContainer").get(i)).children()[1]).css({"display":"none"})
		}
		$(sideBarLi[i].command).each(function(){
			$("<a href='##'>"+this.info+"</a>").appendTo($($(".sideBar_command").get(i)))
		})
	})
	
	$(".sideBarContainer").each(function(i){
		$($(".sideBar_command").get(i)).css({
			"margin-top":($(".sideBarContainer").height()-$(sideBarLi[i].detail).length*$(".sideBar_info2").height()-(65+$(sideBarLi[i].command).length*20))
		})
		if($(".sideBarContainer").height()-$(sideBarLi[i].detail).length*$(".sideBar_info2").height()-(65+$(sideBarLi[i].command).length*20)<20){
			$(this).clone()
				.addClass("clone"+i)
				.css({
					"left":480
				})
				.appendTo(".sideBarBox")
			$($(this).children()[1]).css({"display":"none"})
			$($(".clone"+i).children()[0]).css({
				"visibility": "hidden"
			})
		}
	})
	
	$("<div class='sideBarHotIcon'>H<div>")
		.css({"position":"absolute"})
		.appendTo($(".sideBarHot"))
}

function navHotNew_icon(){
	$(".NavContainer>ul .hot")
		.css({
			"position":"relative"
		})
		.append("<div class='hotIcon'>HOT</div>")
	
	$(".NavContainer>ul .new")
		.css({
			"position":"relative"
		})
		.append("<div class='newIcon'>NEW</div>")
}

function sideBarBox(){
	$(".sideBarBox").css({
		"top":$(".allProducts").offset().top+$(".allProducts").height(),
		"left":$(".allProducts").offset().left
	})
}

function sideBarMouseMove(){
	$(".sideBar").each(function(i){
		$(this).mouseenter(function(){
			$(".sideBarContainer").css({"display":"none"});
			if(($(".sideBarContainer").height()-$(sideBarLi[i].detail).length*$(".sideBar_info2").height()-(65+$(sideBarLi[i].command).length*20)<20)){
				$(".clone"+i).css({"display":"block"});
			}
			$($(".sideBarContainer").get(i)).css({"display":"block"});
		})
		$(this).mouseleave(function(){
			$(".sideBarContainer").css({"display":"none"});
		})
		$(".sideBarContainer").mouseenter(function(){
			$(this).css({"display":"block"});
		})
		$(".sideBarContainer").mouseleave(function(){
			$(this).css({"display":"none"});
		})
		if($(".clone"+i).length>0){
			$($(".sideBarContainer").get(i))
				.mouseenter(function(){
					$(this).css({"display":"block"});
					$(".clone"+i).css({"display":"block"});
				})
				.mouseleave(function(){
					if($(".clone"+i).attr("style").match("block")){
						$(".clone"+i).css({"display":"none"});
					}
				})
			$(".clone"+i)
				.mouseenter(function(){
					$($(".sideBarContainer").get(i)).css({"display":"block"});
					$(this).css({"display":"block"});
				})
				.mouseleave(function(){
					if($($(".sideBarContainer").get(i)).attr("style").match("block")){
						$($(".sideBarContainer").get(i)).css({"display":"none"});
					}
				})
		}
	})
}
