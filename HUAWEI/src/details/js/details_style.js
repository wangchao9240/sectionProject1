!function(){
	$().ready(function(){
		hoverSideBar();
//		-------fixedbox-------
		fixedBox();
//		-----fixedbox End----
//		----head----
//		----headRight---
		qrCodePhone();			//手机购买鼠标移入移出时显示二维码
		servHoverStyle();		//"购买信息"鼠标移入移出时的效果
		

		initializtion();			//初始化页面，第一遍载入数据，给li Img赋值click方法 给默认选中按钮加入选中样式
		clickBorderRed(".headRight_bottom .middle_info .thubmUl li");		//给缩略图里的IMG赋值一次选中样式点击事件即可，以后不会对它的内容进行修改替换
		getClickRedBorder();			//给右边每一行li里都加上鼠标点击icon选中事件
//		---headRight End---
//		---headleft---
//		(左侧列表移动红框已放入getDetailJson函数中,为了使其每次重载页面都重新调用此方法)
		if($(".head_left").height()>$(".head_right").height()){				//两边谁高中间的分割线就给谁加上
			$(".head_left").css({"border-right": "1px solid #DEDEDE"})
		}else{
			$(".head_right").css({"border-left": "1px solid #DEDEDE"})
		}
		
		enLargeImg();			//调用一次放大镜函数，给warp附上放大镜方法
		
//		---headleft End---
//		---head End---

//		---info---
		addInfoLeftJson();			//给左侧信息层添加json数据
		
		addInfoRightJson();			//给右侧信息层添加json数据（5个选项卡数据）
		
		infoRightMethods();				//数据添加完毕后，给信息层的左右侧添加方法（主要给右侧添加方法）
		
		addConsultJson();		//给咨询表格添加json数据（右下侧Consult）,因为consult方法中需要用到json中添加改变的变量，因此将conslut和announce方法合并到addJson中
//		---info End--
//		---packageBox---
//		packageBoxJson(package1)
		
		
//		commandPagBoxJson(commandPagBox1)
		
		
		
//		---packageBox End---

	})
}()

function consultAnnounceMethod(idx){
	//		--consult定义方法--
		listSet(".consultBox",".consultBox .listTitle","click")		//定义consult的选项卡事件
		$(".consultBox .listTitle").css({"position":"relative"})		//预先设置，使滚轮下滑标题跟随时可以直接设置top值
		$("<a href='##'>发表咨询>></a>").appendTo($(".consultBox .listTitle"))		//在咨询菜单里右上角添加“发表咨询”按钮
		for(var i=0;i<$(".consultBox .pageChangesBox").length+idx;i++){			//给每个发表咨询里的翻页列表附上方法
			var a=".consultBox .pageChangesBox"+i;
			changePagesStyle(".consultBox .pageChangesBox"+i);
		}
	//		---announce定义方法--
		$(".submitBtn button")
			.mousedown(function(){
				$(this).css({
					"background-color":"#EAEAEA"
				})
				if($(".announceInfoContainer .textArea textarea").val().length<10){
					$(".submitBtn span").css({
						"display":"inline-block"
					})
				}else{
					$(".submitBtn span").css({
						"display":"none"
					})
				}
			})
			.mouseup(function(){
				$(this).css({
					"background-color":"#f8f8f8"
				})
			})
//		--定义方法 End--
}

function addConsultJson(){
	//		--conslut添加数据--
		var idx=0;
		$(consult).each(function(i){
			$("<li>"+this.list+"</li>").appendTo($(".consultBox .listTitle ul"))
			$("<div class='listInfo'><div class='tipsTitle'><span>温馨提示：</span>"+this.tips+"</div><div class='infoBlockContainer'><div class='pageChangesBox"+i+" pageChangesBox clearfix'><div class='commentCount'>共<span>"+this.commentCount+"</span>条</div><div class='pagesContainer'><div class='pagesChange'></div><div class='pagesChange'></div><ul class='clearfix'><a href='##'><li>1</li></a><a href='##'><li>2</li></a><a href='##'><li>3</li></a><a href='##'><li>4</li></a><a href='##'><li>5</li></a><a href='##'><li>...</li></a><a href='##'><li>"+this.until+"</li></a></ul><div class='pagesChange'></div><div class='pagesChange'></div></div></div></div></div>")
				.appendTo($(".consultBox .listInfoBox"))
			if(this.consult==null){
				$(".consultBox .listInfoBox .listInfo").last().children(".infoBlockContainer").html("")
				$("<div class='infoNull'>暂无相关内容</div>").appendTo($(".consultBox .listInfoBox .listInfo").last().children(".infoBlockContainer"))
				idx++;
			}
			$(this.consult).each(function(){
				if(this.vip=="2"){
					$("<div class='infoBlock'><div class='titleContainer'><div class='user vip2'>"+this.name+"</div><div class='time'>"+this.time+"</div></div><div class='consultContainer'><span>咨询内容：</span>"+this.text+"</div><div class='replyContainer clearfix'><div class='reply'>"+this.reply+"</div><div class='replyTime'>"+this.replyTime+"</div></div></div>")
						.prependTo($(".consultBox .listInfoBox .listInfo").last().children(".infoBlockContainer"))
				}else{
					$("<div class='infoBlock'><div class='titleContainer'><div class='user vip0'>"+this.name+"</div><div class='time'>"+this.time+"</div></div><div class='consultContainer'><span>咨询内容：</span>"+this.text+"</div><div class='replyContainer clearfix'><div class='reply'>"+this.reply+"</div><div class='replyTime'>"+this.replyTime+"</div></div></div>")
						.prependTo($(".consultBox .listInfoBox .listInfo").last().children(".infoBlockContainer"))
				}
			})
		})
//		--consult添加数据 End--
		consultAnnounceMethod(idx)		//这里定义了右侧底部的consult和announce方法
}

function infoRightMethods(){
//		---info_right方法---
//		(后设置方法)
		$(".delateBtn").click(function(){				//点击删除按钮 将最近浏览过的商品删除
			$($(this).parents()[1]).remove()
		})
		$(".info_left .hotInfo .redFont").each(function(){					//使底部价格一直冲齐最下方
			$(this).css({
				"margin-top":$(this).parent().height()-$(this).prev().height()-$(this).height()
			})
		})
		
		$(".info_left dl").each(function(){						//给每个小标签加上颜色（前3红色，后面灰色）
			$(this).children("dd").children(".countArrow").each(function(a){
				if(a<3){
					$(this).css({
						"border-top": "23px solid #C81118"
					})
				}else{
					$(this).css({
						"border-top": "23px solid #666"
					})
				}
			})
		})
		
		listSet(".info_right",".info_right .listContainer .listTitle","click")			//设置列表函数，第一个参数传其父容器，第二个参数传触发方法
		changePagesStyle();								//底部翻页按钮的样式函数
		$(".blockLeft").each(function(){
			if($(this).hasClass("vip")){
				$(this).css({
					"position":"relative"
				})
				$("<div class='vip2Icon'></div>").appendTo($(this))
			}
		})
		
		
		$(window).scroll(function(){							//鼠标滚轮下滑时顶部list跟随滚动效果，并且在title后面添加加入购物车按钮
			if($(".info_right").offset().top<($("body").scrollTop()||$(document).scrollTop())){
				$(".addCartBtn").remove();
				$("<div class='addCartBtn'>加入购物车</div>").appendTo($(".info_right .listTitle"));
				$(".info_right .listTitle").css({
					"position":"relative",
					"z-index":3,
					"top":$("body").scrollTop()-$(".info_right").offset().top-1
				})
			}
			if(($(".info_right").offset().top>($("body").scrollTop()||$(document).scrollTop()))){
				$(".addCartBtn").remove();
				$(".info_right .listTitle").css({"position":"static"})
			}
		})
		
		$(".info_right .mainList li").click(function(){				//点击主选项卡时，如果点击的用户评价，则下面的用户评价克隆框隐藏，否则显示
			for(var i=0;i<$(".info_right .mainList li").length;i++){
				var a;
				if($(".info_right .mainList li").get(i)==this){
					a=i;
				}
			}
			if(a==1){
				$(".listContainerCloneBox").css({"display":"none"})
			}else{
				$(".listContainerCloneBox").css({"display":"block"})
			}
		})
		
		$(".list2Container").clone().appendTo(".listContainerCloneBox")			//用户评价克隆框
		changePagesStyle(".listContainerCloneBox");		//给新克隆出来的底部翻页按钮的再设置一遍样式函数
//		---info_right方法 End---
}

function addInfoRightJson(){
	//		----右侧数据----
	$(info_right).each(function(){
	$(this.list).each(function(){				//添加list几个标题的数据
		$("<li>"+this.text+"</li>").appendTo($(".info_right .listContainer .mainList"))
	})
//	-------选项卡1--------
	$(this.srcTab1).each(function(i){			//添加第一页选项卡中的数据
		if(i==0){
			$("<a href='##'><img src='"+this.src+"'/></a>").appendTo($(".info_right .list1Container"))
		}else{
			$("<img src='"+this.src+"'/>").appendTo($(".list1Container"))
		}
	})
//	------选项卡1 End-----

//	---选项卡2---
	$(this.infoTab2).each(function(){
		$("<p class='point'>98<span>%</span></p>").prependTo($(".list2Container .commentTitleLeft"))
		$(this.influen).each(function(){
			$("<span class='influenTetx'>"+this.text+"<span class='count'>("+this.num+")</span></span>")
				.appendTo($(".list2Container .influen"))
		})
		$(this.commentBlock).each(function(){
			$("<div class='commentBlock'><div class='blockLeft vip'><img src='img/defaultface_user_small.png'/><p>"+this.name+"</p></div><div class='blockRight'><div class='blockTitle clearfix'><div class='starsBox'></div><div class='influenBox'><div class='influen'></div></div><span class='time'>"+this.time+"</span></div><div class='blockComment'>"+this.comment+"</div><div class='blockReply'><span>华为商城回复：</span>"+this.reply+"</div></div></div>")
				.appendTo($(".list2Container .commentBlockBox"))
			$(this.tips).each(function(){
				$("<span class='influenTetx'>"+this.text+"</span>").appendTo($(".list2Container .commentBlock").last().children(".blockRight").children(".blockTitle").children(".influenBox").children(".influen"))
			})
		})
	})
//	---选项卡2 End---
	
//	--选项卡3---
	$(this.infoTab3).each(function(){
		$("<div class='parameterBox'><div class='parTitle'>"+this.title+"</div></div>").appendTo($(".list3Container"))
		$(this.info).each(function(){
			$("<div class='parDetails'><div class='parDetailsTitle'>"+this.title+"</div><div class='parDetailsText'>"+this.text+"</div></div>")
				.appendTo($(".list3Container .parameterBox").last())
		})
	})
//	--选项卡3 End--
//	---选项卡4---
	$("<div>"+this.infoTab4.text+"</div>").appendTo(".list4Container")
//	--选项卡4 End--
//	--选项卡5--
	$(this.infoTab5).each(function(){
		if(this.src){
			$("<div>"+this.text+"<a href='##'>"+this.src+"</a></div>").appendTo(".list5Container")
		}else{
			$("<div>"+this.text+"</div>").appendTo(".list5Container")
		}
	})
//	--选项卡5 End--
	})
	$("<p class='redFont'><span>荣耀8 视频操作指南：</span><span><a href='##'>http://v.youku.com/v_show/id_XMTY0NTYyMzY3Ng==.html?f=27674400</a></span></p><p class='listText'>※本网站尽可能地提供准确的信息。本网站内所涉及的产品图片与实物可能有细微区别，效果演示图和示意图仅供参考（图片为合成图、模拟演示图），有关产品的外观（包括但不限于颜色）请以实物为准。</p><p class='listText'>※限于篇幅，本网站中所包含的信息（包括但不限于产品规格、功能说明等）可能不完整，请以有关产品使用说明书的具体信息为准。</p>")
		.appendTo($(".listContainer .list1Container"))			//在后面给第一页添加文字
//	--右侧数据添加完毕--
}

function addInfoLeftJson(){
	$(infoLeft).each(function(){			//先添加数据
//	-----给左边添加数据-----
		if(this.recent){			//如果这是最近浏览项，则给它加一个删除按钮
			$("<dl><dt>"+this.title+"<div class='delateBtn'></div></dt></dl>").appendTo($(".infoBoxContainer .info_left"))
			$(this.info).each(function(){
				$("<dd><div><a href='##'><img src='"+this.src+"'></a><div class='hotInfo'><p><a href='##'>"+this.title+"</a></p><p class='redFont'>￥"+this.price+"</p></div></div></dd>")
					.appendTo($(".infoBoxContainer .info_left dl").last())
			})
		}else{
			$("<dl><dt>"+this.title+"</dt></dl>").appendTo($(".infoBoxContainer .info_left"))
			$(this.info).each(function(i){
				$("<dd><div class='countArrow'><div>"+(i+1)+"</div></div><div><a href='##'><img src='"+this.src+"'></a><div class='hotInfo'><p><a href='##'>"+this.title+"</a></p><p class='redFont'>￥"+this.price+"</p></div></div></dd>")
					.appendTo($(".infoBoxContainer .info_left dl").last())
			})
		}
//	----左边添加数据完毕-----
	})
}

function changePagesStyle(box){
	if(box==null){
		box=".list2Container";
	}
	$(box+" .pagesContainer .pagesChange").each(function(i){			//给按钮切换小盒子附上背景图片及鼠标移入移出效果
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

function listSet(parent,box,trigger){
	$("<div class='redLineTop'></div><div class='whiteLineBtm'></div>").appendTo($(box+" li").first())
	$(box+" .redLineTop").css({"width":$(box+" li").first().width()+50,"height":1})
	$(box+" .whiteLineBtm").css({"width":$(box+" li").first().width()+50,"height":1})
	$(box+" li").first().css({"color":"#C81118"})
	findRedLineAndGetListShow(parent)				//默认样式使第一个页面显示
	
	$(box).delegate("li",trigger,function(){
		$(box+" .redLineTop").remove();				//这是对样式的设置
		$(box+" .whiteLineBtm").remove();
		$("<div class='redLineTop'></div><div class='whiteLineBtm'></div>").appendTo($(this))
		if(box.match("commandPagBox")||box.match("packageBox")){
			$(box+" li").css({"color":"#333"})
			$(this).css({"color":"#C81118"})
		}
		$(box+" .redLineTop").css({"width":$(this).width()+50,"height":1})
		$(box+" .whiteLineBtm").css({"width":$(this).width()+50,"height":1})
		findRedLineAndGetListShow(parent)
	})
}

function findRedLineAndGetListShow(parent){
	for(var i=0;i<$(parent+" .listContainer .listTitle li").length;i++){
		if($($(parent+" .listContainer .listTitle li")[i]).children(".redLineTop").length!=0){
			$(parent+" .listInfoBox .listInfo").css({"display":"none"})
			$($(parent+" .listInfoBox .listInfo").get(i)).css({"display":"block"})
		}
	}
}

function initializtion(){			//初始化
	$(detailsInfo).each(function(){				//这是第一遍刷新，往里面添加数据同时给li附加click事件
		$("<li><a href='##'><img src='"+this.src+"'/><p>"+this.classify+"</p></a></li>").appendTo(".headRight_bottom .middle_info .thubmUl")
		if(this.chosen){			//先加载魅海蓝里的内容
			$(".headRight_bottom .middle_info .thubmUl li").last().children().children("img").css({"border-color":"#C81118"})	//为默认选中的盒子加上边框
			$(".headRight_bottom .middle_info .thubmUl li").last()						//为默认选中的盒子加上左下角icon
				.css({"position":"relative"})
				.append("<span class='leftBottom_icon'></span>")
			$(".headRight_bottom .middle_info .thubmUl .leftBottom_icon").css({"top":31})
			getDetailJson(this);
		}
	})
}

function addHeadBorder(){
	if($(".head_left").height()>$(".head_right").height()){				//两边谁高中间的分割线就给谁加上
		$(".head_left").css({"border-right": "1px solid #DEDEDE"})
	}else{
		$(".head_right").css({"border-left": "1px solid #DEDEDE"})
	}
}

function clickBorderRed(containLi){
	$(containLi).each(function(){			//这里是对图片进行的点击后对页面做出的修改
		$(this).click(function(){
			if(!$(this).hasClass("lack")){					//如果无货，则不进行小icon的移动 不进行接下来的工作
				var is=this;
				$(containLi+" .leftBottom_icon").remove()		//现将其下的图标清除
				if($(containLi+" img").length!=0){
					getDetailJson(detailsInfo[getImgIdxLi($(containLi),is)])			//利用getIdx获取点到第几张图片，之后再从Json中取出几来修改数据
					$(containLi+" img").css({"border-color":"#B2B2B2"})		//先将所有图片的边框颜色重置
					$(this).children().children("img").css({"border-color":"#C81118"})			//后再给点击的图片设置颜色
					$(this).css({"position":"relative"})
					$("<span class='leftBottom_icon'></span>")
						.css({"top":31})
						.appendTo($(this))
					getClickRedBorder();			//给新刷新出来的元素重新赋值上click事件
				}else{
					$(containLi).css({"border-color":"#B2B2B2"})			//如果底下没有img的话，点击变色
					$(this).css({"border-color":"#C81118"})
					$(this).css({"position":"relative"})
					$("<span class='leftBottom_icon'></span>")
						.css({"top":14})
						.appendTo($(this))
				}
			}
			var a=getJsonIdx($(".thubmUl li"))+""+getJsonIdx($(".standard li"))+""+getJsonIdx($(".rom li"))+""+getJsonIdx($(".package li"));	//获取坐标
			getDetailJson(eval("(Json"+a+")"))		//刷新页面，赋值坐标
			getClickRedBorder();			//给新附上的按钮赋值click事件
		})
	})
}

function getJsonIdx(box){					//此函数是为了checkBox里的按钮进行点击时，使其知道应该取Json中的第几组数据
	for(var i=0;i<box.length;i++){
		if($(box.get(i)).children("span").hasClass("leftBottom_icon")){
			return i
		}
	}
}

function getClickRedBorder(){						//对clickBorderRed方法的引用
	clickBorderRed(".headRight_bottom .middle_info .standard li");
	clickBorderRed(".headRight_bottom .middle_info .rom li");
	clickBorderRed(".headRight_bottom .middle_info .package li");
}

function getImgIdxLi(targetLi,isLi){			//获取到当前所点击的li及其在当前行li中的位置，返回其idx
	for(var i=0;i<targetLi.length;i++){
		if(isLi==targetLi.get(i)){
			return i;
		}
	}
}

function getDetailJson(jsonA){
	if(jsonA.title){
		$(".location p").html(jsonA.title)						//修改location处的标题
		$(".headRight_top .title").html(jsonA.title)				//修改标题
		
	}
	if(jsonA.subTitle){
		$(".headRight_top .subtitle").html(jsonA.subTitle)		//修改副标题
		
	}
	if(jsonA.price){
		$(".headRight_middle .price").html("￥"+jsonA.price+".00")		//修改价格
		
	}
	if(jsonA.giftInfo){
		$(".redFont .middle_info div").html("")					//先清空优惠信息里的东西
		$(jsonA.giftInfo).each(function(){
			$("<span>配&ensp;<a href='##'>"+this.text+"</a></span>").appendTo($(".redFont .middle_info div"))		//修改优惠信息
		})
		
	}
	if(jsonA.num){
		$(".middle_info .proNum").html(jsonA.num)			//修改商品编号
		
	}
	if(jsonA.count){
		$(".middle_info .stars").css({"width":jsonA.count.stars*15})
		$(".middle_info .comment a").html("共"+jsonA.count.comment+"条评论")		//修改商品评分
		
	}
	if(jsonA.standard){
		$(".checkBox .standard").html("")
		$(jsonA.standard).each(function(){
			if(this.disabled){
				$("<li class='lack'>"+this.text+"</li>").appendTo($(".checkBox .standard"))
			}else{
				$("<li><a href='##'>"+this.text+"</a></li>").appendTo($(".checkBox .standard"))
				if(this.chosen){
					defalutChosenLi(".checkBox .standard")
				}
				
			}
		})
	}
	if(jsonA.rom){
		$(".checkBox .rom").html("")
		$(jsonA.rom).each(function(){
			if(this.disabled){
				$("<li class='lack'>"+this.text+"</li>").appendTo($(".checkBox .rom"))
			}else{
				$("<li><a href='##'>"+this.text+"</a></li>").appendTo($(".checkBox .rom"))
				if(this.chosen){
					defalutChosenLi(".checkBox .rom")
				}
			}
		})
	}
	if(jsonA.package){
		$(".checkBox .package").html("")
		$(jsonA.package).each(function(){
			if(this.disabled){
				$("<li class='lack'>"+this.text+"</li>").appendTo($(".checkBox .package"))
			}else{
				$("<li><a href='##'>"+this.text+"</a></li>").appendTo($(".checkBox .package"))
				if(this.chosen){
					defalutChosenLi(".checkBox .package")
				}
			}
		})
	}
	if(jsonA.serv){
		$(".checkBox .serv").html("")
		$(".checkBox .safeBox").html("")
		$("<li>"+jsonA.serv.title+"</li>").appendTo($(".checkBox .serv"))
		$(jsonA.serv.text).each(function(){
			$("<li class='safeBox'>"+this.info+"</li>").appendTo($(".checkBox .serv"))
		})
	}
	if(jsonA.connect){
		$(".checkBox .connect").html("")
		$(jsonA.connect).each(function(){
			$("<li><a href='##'>"+this.text+"</a></li>").appendTo($(".checkBox .connect"))
		})
	}
	if(jsonA.emlargeImg){
		$(".warp ul").html("");
		$(jsonA.emlargeImg).each(function(){
			$("<li><img src='"+this.src+"'/></li>").appendTo($(".warp ul"))
		})
	}
	if(jsonA.thumb){
		$(".thumbsBox .thumbsContainer ul")
			.html("")
			.css({"left":0})
		$(jsonA.thumb).each(function(){
			$("<li><img src='"+this.src+"'/></li>").appendTo($(".thumbsBox .thumbsContainer ul"))
		})
		handLeftStyle();			//缩略图坐下角鼠标移动框起红框
	}
	if(jsonA.getMeKnown){
		$(".canIbuyIt .buttonBox div").css({"display":"none"});		//先进行样式初始化
		$(".canIbuyIt .expri").css({"display":"none"});
		
		$(".canIbuyIt .buttonBox .getMeKonwn").css({"display":"inline-block"});
		$(".canIbuyIt .expri").css({"display":"block"});
	}
	if(jsonA.buy){
		$(".canIbuyIt .buttonBox div").css({"display":"none"});		//先进行样式初始化
		$(".canIbuyIt .expri").css({"display":"none"});
		
		$(".canIbuyIt .buttonBox .addCartBtn").css({"display":"inline-block"});
		$(".canIbuyIt .buttonBox .buyItNow").css({"display":"inline-block"});
	}
	if(jsonA.joinPurchase){
		$(".canIbuyIt .buttonBox div").css({"display":"none"});		//先进行样式初始化
		$(".canIbuyIt .expri").css({"display":"none"});
		
		$(".canIbuyIt .buttonBox .joinPurchase").css({"display":"inline-block"});
	}
	if(jsonA.commandPagBox){
		$(".commandPagBox").css({"display":"block"})
		commandPagBoxJson(jsonA.commandPagBox)
	}else{
		$(".commandPagBox").css({"display":"none"})
	}
	if(jsonA.packageBox){
		packageBoxJson(jsonA.packageBox)
		$(".packageBox").css({"display":"block"})
	}else{
		$(".packageBox").css({"display":"none"})
	}
	var thumbText=$($(".thubmUl li").get(getJsonIdx($(".thubmUl li")))).children().children("p").html();
	var standardText=$($(".standard li").get(getJsonIdx($(".standard li")))).children("a").html();
	var romText=$($(".rom li").get(getJsonIdx($(".rom li")))).children("a").html();
	var packageText=$($(".package li").get(getJsonIdx($(".package li")))).children("a").html();
	$(".canIbuyIt .yourChoice").html(thumbText+"/"+standardText+"/"+romText+"/"+packageText);				//在这里显示显示用户选择了什么套餐
}

function defalutChosenLi(box){
	$(box+" li").last()
		.css({"border-color":"#C81118","position":"relative"})
	$("<span class='leftBottom_icon'></span>")
		.css({"top":14})
		.appendTo($(box+" li").last())
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

function qrCodePhone(){
	$("<span class='triangle'></span><span class='triangle'></span>").appendTo(".qrcodePhone")
	$(".triangle").last().css({
		"bottom":-9,
		"border-top-color":"#fff"
	})
	$(".qrcodeBuy")
		.mouseenter(function(){
			$(".qrcodePhone").css({"display":"block"})
		})
		.mouseleave(function(){
			$(".qrcodePhone").css({"display":"none"})
		})
}

function clickIconChosen(){
	
}

function servHoverStyle(){
	$(".serv")
	.mouseenter(function(){
		$(".safeBox").css({"display":"block"})
	})
	.mouseleave(function(){
		$(".safeBox").css({"display":"none"})
	})
}

function handLeftStyle(){
	$(".thumbsContainer li").each(function(i){
		if(i==0){								//先让第一张图片显示为Block
			$($(".warp li").get(i)).css({"display":"block"})
			$("<div class='redBorder'></div>").appendTo($(this))		//给第一个缩略图框上红框
			$(".showBox").css({
				"background":"url("+$($(".warp li").get(0)).children("img").attr("src")+") left top no-repeat"		//给showBox先加上背景
			})
		}
		$(this).css({"left":i*($(this).width()+34)})
		$(this)
			.mouseenter(function(){
				$(".warp li").css({"display":"none"})				//先让所有的大图隐藏
				$(".redBorder").remove();							//让红色选中框清除
				$($(".warp li").get(i)).css({"display":"block"})		//显示选中大图
				$("<div class='redBorder'></div>").appendTo($(this))	//框中选中缩略图
				$(".showBox").css({
					"background":"url("+$($(".warp li").get(i)).children("img").attr("src")+") left top no-repeat"		//给showBox先加上背景
				})
			})
	})
	
	var canImove=true;								//左右控制按钮
	$(".controlRight").click(function(){
		if($(".thumbsContainer ul")[0].offsetLeft>-($(".thumbsContainer li").length-6)*87){
			if(canImove){
				canImove=false;
				$(".thumbsContainer ul").stop(true,true);
				$(".thumbsContainer ul").animate({"left":$(".thumbsContainer ul")[0].offsetLeft-87},150,function(){
					canImove=true;
				})
			}
			
		}
	})
	$(".controlLeft").click(function(){				//左右控制按钮
		if($(".thumbsContainer ul")[0].offsetLeft!=0){
			if(canImove){
				canImove=false;
				$(".thumbsContainer ul").stop(true,true);
				$(".thumbsContainer ul").animate({"left":$(".thumbsContainer ul")[0].offsetLeft+87},150,function(){
					canImove=true;
				})
			}
		}
	})
}

function enLargeImg(){
	//	----------------moveBox-----------
	$(".warp").mouseenter(function(el){
		$(".moveBox,.showBox").stop(true,true);
		$(".showBox")
			.css({"display":"block"})
			.animate({"opacity":1},300)
		$(".moveBox")
			.css({"display":"block"})
			.animate({"opacity":0.4},300)
		
		
		var originTop=el.pageY-$(".warp").offset().top;
		var originLeft=el.pageX-$(".warp").offset().left;
		if(originTop<100){
			$(".moveBox").css({"top":0})
		}else{
			$(".moveBox").css({"top":$(".warp").height()-$(".moveBox").height()})
		}
		if(originLeft<100){
			$(".moveBox").css({"left":0})
		}else{
			$(".moveBox").css({"left":$(".warp").width()-$(".moveBox").width()})
		}
		$(this).mousemove(function(e){
//			-------使方框超过四个框角才开始移动------
			var leftTop=(e.pageX-$(".warp").offset().left<$(".moveBox").width()/2)&&(e.pageY-$(".warp").offset().top<$(".moveBox").height()/2);
			var rightTop=(e.pageX>$(".warp").offset().left+$(".warp").width()-$(".moveBox").width()/2)&&(e.pageY<$(".warp").offset().top+$(".moveBox").height()/2);
			var leftBtm=(e.pageX<$(".warp").offset().left+$(".moveBox").width()/2)&&(e.pageY>$(".warp").offset().top+$(".warp").height()-$(".moveBox").height()/2);
			var rightBtm=(e.pageX>$(".warp").offset().left+$(".warp").width()-$(".moveBox").width()/2)&&(e.pageY>$(".warp").offset().top+$(".warp").height()-$(".moveBox").height()/2);
			if(!leftTop&&!rightTop&&!leftBtm&&!rightBtm){
				$(".moveBox").css({
					"left":e.pageX-$(".warp").offset().left-$(".moveBox").width()/2,
					"top":e.pageY-$(".warp").offset().top-$(".moveBox").height()/2
				})
			}
//			----使方框不超过四边-----
			var top=$(".moveBox")[0].offsetTop<=0;
			if(top){
				$(".moveBox").css({"top":0})
			}
			var left=$(".moveBox")[0].offsetLeft<=0;
			if(left){
				$(".moveBox").css({"left":0})
			}
			var right=$(".moveBox")[0].offsetLeft>=$(".warp").width()-$(".moveBox").width();
			if(right){
				$(".moveBox").css({"left":$(".warp").width()-$(".moveBox").width()})
			}
			var btm=$(".moveBox")[0].offsetTop>=$(".warp").height()-$(".moveBox").height();
			if(btm){
				$(".moveBox").css({"top":$(".warp").height()-$(".moveBox").height()})
			}
//			----使方框不超过四边 End---
//			----计算百分比---
			var positionY=($(".moveBox")[0].offsetTop/($(".warp").height()-$(".moveBox").height()))*100;
			var positionX=($(".moveBox")[0].offsetLeft/($(".warp").width()-$(".moveBox").width()-8))*100;
			$(".showBox").css({
				"background-position-x":positionX+"%",
				"background-position-y":positionY+"%"
			})
//			---计算百分比 End---
//			----使方框超过四个框角才开始移动 End----
		})
	})
	.mouseleave(function(){
		$(".showBox")
			.css({"display":"none","opacity":0})
		$(".moveBox")
			.css({"display":"none","opacity":0})
	})
//		-------------moveBox End-----------------
}

function packageBoxJson(JsonYouWannaAdd){
	$(".packageBox .listTitle ul").html("");
	$(".packageBox .listInfoBox").html("")
	$(JsonYouWannaAdd).each(function(){
		$("<li>"+this.package+"</li>").appendTo($(".packageBox .listTitle ul"))
		$("<div class='listInfo'><div class='infoLeft'><ul class='clearfix'></ul></div><div class='infoRight'><div class='priceBox'><p>原定价：￥"+this.originPrice+".00</p><p>套装价：￥"+this.packagePrice+".00</p><p>共节省：￥"+this.save+".00</p><div class='addCart'>加入购物车</div></div></div></div>")
			.appendTo($(".packageBox .listInfoBox"))
		var is=(this.info.length)-1
		$(this.info).each(function(i){
			if(i==is){
				$("<li><div class='proThumb'></div><a href='##'><p>"+this.text+"</p></a></li>")
					.appendTo($(".packageBox .infoLeft").last().children("ul"))
				$(".packageBox .infoLeft").last().children("ul").children("li").last().children(".proThumb").css({
					"background": "url("+this.src+") left top no-repeat",
					"background-size":"100%"
				})
			}else{
				$("<li><div class='proThumb'></div><a href='##'><p>"+this.text+"</p></a><i></i></li>")
					.appendTo($(".packageBox .infoLeft").last().children("ul"))
				$(".packageBox .infoLeft").last().children("ul").children("li").last().children(".proThumb").css({
					"background": "url("+this.src+") left top no-repeat",
					"background-size":"100%"
				})
			}
		})
	})
	setTimeout(function(){
		listSet(".packageBox",".packageBox .listTitle","mousemove")
	},200)
}

function commandPagBoxJson(json){
	$(".commandPagBox .listTitle ul").html("")
	$(".commandPagBox .listInfoBox").html("");
	$(json).each(function(){
		$("<li>"+this.package+"</li>").appendTo($(".commandPagBox .listTitle ul"))
		$("<div class='listInfo'><div class='infoLeft'><ul class='clearfix'></ul></div><div class='infoRight'><div class='priceBox'><p class='hasCombind'>已搭配0件</p><p class='combindPrice'>组合价：￥2299.00</p><div class='addCart'>加入购物车</div></div></div></div>")
			.appendTo($(".commandPagBox .listInfoBox"))
		var is=(this.info.length)-1
		$(this.info).each(function(i){
			if(i==is){
				$("<li><div class='proThumb'></div><a href='##'><p>"+this.text+"</p></a></li>")
					.appendTo($(".commandPagBox .infoLeft").last().children("ul"))
				$(".commandPagBox .infoLeft").last().children("ul").children("li").last().children(".proThumb").css({
					"background": "url("+this.src+") left top no-repeat",
					"background-size":"100%"
				})
			}else{
				$("<li><div class='proThumb'></div><a href='##'><p>"+this.text+"</p></a><i></i></li>")
					.appendTo($(".commandPagBox .infoLeft").last().children("ul"))
				$(".commandPagBox .infoLeft").last().children("ul").children("li").last().children(".proThumb").css({
					"background": "url("+this.src+") left top no-repeat",
					"background-size":"100%"
				})
			}
			if(i!=0){
				$("<div class='ifCheck clearfix'><div class='checkBox'></div><div class='thisPrice'>￥"+this.price+".00</div>")
					.appendTo($(".commandPagBox .infoLeft li").last())
			}else{
				$("<div class='huaweiPrice'>华为价：￥"+this.price+"</div>").insertBefore($(".commandPagBox .infoLeft li").last().children("a"))
			}
		})
	})
	setTimeout(function(){
		listSet(".commandPagBox",".commandPagBox .listTitle","mousemove")
	},200)
	
	var idx=0;
	$(".ifCheck").each(function(){
		$(this).children().click(function(){
			if($(this).parent().children(".checkBox").hasClass("commandChecked")){
				$(this).parent().children(".checkBox").removeClass("commandChecked")
				var thisPrice=$(this).parent().children(".thisPrice").html().split("￥")[1].split(".00")[0]-0;
				var combindPrice=($(".commandPagBox .infoRight .combindPrice").html().split("￥")[1].split(".00")[0])-0;
				$(".commandPagBox .infoRight .combindPrice").html("组合价：￥"+(combindPrice-thisPrice)+".00")
			}else{
				$(this).parent().children(".checkBox").addClass("commandChecked")
				var thisPrice=$(this).parent().children(".thisPrice").html().split("￥")[1].split(".00")[0]-0;
				var combindPrice=($(".commandPagBox .infoRight .combindPrice").html().split("￥")[1].split(".00")[0])-0;
				$(".commandPagBox .infoRight .combindPrice").html("组合价：￥"+(thisPrice+combindPrice)+".00")
			}
			$(".commandPagBox .hasCombind").html("已搭配"+$(".commandPagBox .commandChecked").length+"件")
			
		})
	})
}
