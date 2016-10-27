!function(){
	$().ready(function(){
		showHideMenu();
		
		$("#Phonenum").blur(function(){
			checkPhonenum("#Phonenum");			//检查手机号
		})
		
		
		$("#identifyingCode").blur(function(){
			if(checkPhonenum("#Phonenum")||checkEmail("#Email")){						//检查手机号通过后再检查验证码
				checkIdentifyingCode("#identifyingCode")		//检查验证码
			}
		})
		
		$("#password").blur(function(){
			checkPassword("#password");		//检查密码
		})
		
		$("#confirm").blur(function(){			//确认密码
			confirmPassword("#confirm")
		})
		
		$("#Email").blur(function(){
			checkEmail("#Email")
		})
		
		submitCheck();			//提交时做一遍全盘检查，没错则可以提交
		
		passwordStrength();			//键盘输入密码时检测密码强度
		
		chooseType();			//当选择不同的注册类型时，显示内容不同
	})
}();

function submitCheck(){
	$(".regbtn").click(function(){
		checkPhonenum("#Phonenum")
		checkEmail("#Email")
		if(checkPhonenum("#Phonenum")||checkEmail("#Email")){
			checkIdentifyingCode("#identifyingCode");
			if(checkIdentifyingCode("#identifyingCode")){
				checkPassword("#password")
				if(checkPassword("#password")){
					confirmPassword("#confirm")
					if(confirmPassword("#confirm")){
						alert("注册成功！")
					}else{
						addtips(".regbtn","您的注册信息存在错误,请修改")
					}
				}else{
					addtips(".regbtn","您的注册信息存在错误,请修改")
				}
			}else{
				addtips(".regbtn","您的注册信息存在错误,请修改")
			}
		}else{
			addtips(".regbtn","您的注册信息存在错误,请修改")
		}
	})
}

function confirmPassword(ipt){
	if($(ipt).val()!=$("#password").val()){
		addtips(ipt,"密码与确认密码不一致")
		$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
	}else{
		$(ipt).css({"border-color":"#E0E0E0","color":"#333"})
		return true
	}
}

function chooseType(){
	$(".regTitle .email").click(function(){				//当选择不同的注册类型时，显示内容不同
		$(this).css({"background-color":"#EB1C24"})
		$(".regTitle .phoneNum").css({"background-color":"#999"})
		$(".regInfoBlock").first().children(".infoBlockTips").html("输入邮件地址作为您的华为帐号，用于登录、重设密码、验证身份。")
		$(".regInfoBlock").first().children(".regInfoLine").first().children(".lineLeft").html("邮箱地址：")
		
		$($(".regInfoBlock").first().children(".regInfoLine").first().children(".lineRight").children()[0])
			.css({"display":"none"})
		$($(".regInfoBlock").first().children(".regInfoLine").first().children(".lineRight").children()[1])
			.css({"display":"none"})
		$($(".regInfoBlock").first().children(".regInfoLine").first().children(".lineRight").children()[2])
			.css({"display":"inline-block"})
	})
	$(".regTitle .phoneNum").click(function(){
		$(this).css({"background-color":"#EB1C24"})
		$(".regTitle .email").css({"background-color":"#999"})
		$(".regInfoBlock").first().children(".infoBlockTips").html("输入手机号作为您的华为帐号，用于登录、重设密码、验证身份。")
		$(".regInfoBlock").first().children(".regInfoLine").first().children(".lineLeft").html("手机号：")
		
		$($(".regInfoBlock").first().children(".regInfoLine").first().children(".lineRight").children()[0])
			.css({"display":"inline-block"})
		$($(".regInfoBlock").first().children(".regInfoLine").first().children(".lineRight").children()[1])
			.css({"display":"inline-block"})
		$($(".regInfoBlock").first().children(".regInfoLine").first().children(".lineRight").children()[2])
			.css({"display":"none"})
	})
}

function passwordStrength(){
	$("#password").keyup(function(){			//输入密码时同时检测密码强度
		$(".strength").css({"background-color":"#F7F7F7","color":"#999"})
		if($("#password").val().length>=8&&$("#password").val().length<=32){
			switch(checkStrength($("#password").val()))
			{
				case 0:
					$(".strength").css({"background-color":"#F7F7F7","color":"#999"})
					$($(".strength").get(0)).css({"background-color":"#EB1C24","color":"#fff"})
					break;
				case 1:
					$(".strength").css({"background-color":"#F1D93A","color":"#fff"})
					$($(".strength").get(2)).css({"background-color":"#F7F7F7","color":"#999"})
					break;
				case 2:
					$(".strength").css({"background-color":"#63B418","color":"#fff"})
					break;
				default:
					$(".strength").css({"background-color":"#F7F7F7","color":"#999"})
			}
		}
	})
}

function checkEmail(ipt){
	var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if($(ipt).val().length<5||$(ipt).val().length>50||reg.test($(ipt).val())!=true){
		addtips(ipt,"对不起，您输入的电子邮箱错误")
		$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
	}else{
		addtips(ipt,"该电子邮箱未被使用，可以顺利注册",true)
		$(ipt).css({"border-color":"#E0E0E0","color":"#333"})
		return true;
	}
}

function checkPassword(ipt){
	var reg=/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])^[\x00-\xff]{8,32}$/;
	if($(ipt).val().length!=0){
		if($(ipt).val().length<8&&$(ipt).val().length>32){			//输入字符串小于8
			addtips(ipt,"请输入8~32字符")
			$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
		}else{
			if(reg.test($(ipt).val())!= true) {
			 	$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
				addtips(ipt,"密码长度8~32位，至少包含1个大写字母、1个小写字母和1个数字，不与其它网站相同")
			}else{
				$(ipt).css({"border-color":"#E0E0E0","color":"#333"})
				return true;
			}
		}
	}else{
		addtips(ipt,"请输入您的密码")
		$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
	}
}


function checkStrength(text){
	var rules=[
		{
		    "reg":/\d+/,
		    "weight":"2"
		},
		{
		    "reg":/[a-z]+/,
		    "weight":"4"
		},
		{
		    "reg":/[A-Z]+/,
		    "weight":"8"
		},
		{
		    "reg":/[~!@#\$%^&*\(\)\{\};,.\?\/'/"]/,
		    "weight":"16"
		}
	];
	var weight=0;
	for(var j=0;j<rules.length;j++){
		if(rules[j].reg.test(text)){
	        weight+=rules[j].weight-0;
	    }
	}
	if(weight<=5)return 0;
	else if(weight<=12)return 1;
	else return 2;
}

function checkIdentifyingCode(ipt){
	var reg=/[0-9]{6}/;
	if($(ipt).val().length==0){
		$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
		addtips(ipt,"请输入短信验证码")
	}else{
		 if(reg.test($(ipt).val())!= true) {
		 	$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
			addtips(ipt,"验证码错误")
		}else{
			$(ipt).css({"border-color":"#E0E0E0","color":"#333"})
			return true;
		}
	}
}

function checkPhonenum(ipt){
	var reg=/^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|70)\d{8}$/;
	if($(ipt).val().length==0){
		addtips("#Phonenum","手机号为空，请正确填写")
	}else{
		 if (reg.test($(ipt).val())!= true) {
		 	$(ipt).css({"border-color":"#EB1C24","color":"#EB1C24"})
			addtips("#Phonenum","对不起，您输入的手机号可能不正确")
		}else{
			$(ipt).css({"border-color":"#E0E0E0","color":"#333"})
			return true;
		}
	}
}

function removeipts(ipt){
	$(ipt).parent("span").children(".tips").remove()
	$(ipt).parent("span").children(".tips").children(".tipsArrow").remove()
}

function addtips(ipt,text,success){
	removeipts(ipt)
	$(ipt).parent("span").css({"position":"relative"})
	if(success==true){
		$("<div class='tips'>"+text+"</div>")
			.css({
				"position":"absolute",
				"max-width":$(ipt).width()-5,
				"height":"auto",
				"top":$(ipt).height()-2,
				"left":5,
				"box-sizing":"border-box",
				"border-radius":6,
				"padding":5,
				"padding-left":30,
				"line-height":"15px",
				"color":"#008000",
				"background":"url(./img/successIcon.png) 4% center no-repeat",
				"background-color":"#F8F9D6"
			})
			.appendTo($(ipt).parent("span"))
	}else{
		$("<div class='tips'>"+text+"</div>")
			.css({
				"position":"absolute",
				"max-width":$(ipt).width()-5,
				"height":"auto",
				"top":$(ipt).height()-2,
				"left":5,
				"box-sizing":"border-box",
				"border-radius":6,
				"padding":5,
				"padding-left":30,
				"line-height":"15px",
				"color":"#EB1C24",
				"background":"url(./img/errorIcon.png) 4% center no-repeat",
				"background-color":"#F8F9D6"
			})
			.appendTo($(ipt).parent("span"))
	}
	$("<div class='tipsArrow'></div>")
		.css({
			"width":0,
			"height":0,
			"position":"absolute",
			"border":"none",
			"top":-7,
			"left":7,
			"border-left":"7px solid transparent",
			"border-right":"7px solid transparent",
			"border-bottom":"7px solid #F8F9D6"
		})
		.appendTo($(ipt).parent("span").children(".tips"))
	var tm;
	clearTimeout(tm);
	tm=setTimeout(function(){
//		removeipts(ipt)
	},3000)
}

function showHideMenu(){
	var idx=0;			//点击输入框显示隐藏的计数变量
	$(".area").clone()
		.addClass("areaClone")
		.css({
			"display":"none",
			"opacity":0,
			"position":"absolute",
			"bottom":-$(".area").height()-2,
			"left":-1,
			"border-radius":10,
			"background":"none",
			"background-color":"#fff"
		})
		.mouseenter(function(){
			$(this).css({"background-color":"#F7F7F7","cursor":"pointer"})
		})
		.mouseleave(function(){
			$(this).css({
				"background-color":"#fff"
			})
		})
		.appendTo($(".area"))
	$(".area").click(function(){
		if(idx==0){
			$(".areaClone").stop()
			$(".areaClone")
				.css({"display":"block"})
				.animate({"opacity":1},300)
			idx++;
		}else{
			$(".areaClone").stop()
			$(".areaClone")
				.animate({"opacity":0},150,function(){
					$(this).css({"display":"none"})
				})
			idx--;
		}
	})
	$(window).mousedown(function(e){
		if($(e.target).attr("class")!="area"){
			if(idx!=0){
				$(".areaClone").stop()
				$(".areaClone")
					.animate({"opacity":0},150,function(){
						$(this).css({"display":"none"})
					})
				idx--;
			}
		}
	})
}
