;$(document).ready(function() {
	//加入問候語
(function () {
	var greet = $("#greeting");
		var nowHour = new Date().getHours();
		if(nowHour >= 18) {
			greet.html("晚安，您好");
		}else if(nowHour >= 12) {
			greet.html("午安，您好");
		}else if(nowHour >= 6) {
			greet.html("早安，您好");
		}else {
			greet.html("現在是凌晨，請早點休息");
		}
	}());
	
	//載入後，將排行榜圖片加入mouseover事件
	$(".changeBookImage").mouseover(function() {
		var bookName = $(this).attr("name");
		var imageContainerId = bookName.substr(0, bookName.length-1);
		$("#" + imageContainerId).css("background-image", "url(images/books/" +
			imageContainerId + "/" + bookName + ".png)");
	});

	//載入左右滑動效果
	$('.owl-carousel').owlCarousel({
		loop: true,
		center: false,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause:true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: false
			},
			768: {
				items: 3,
				margin: 40,
				nav: true
			},
			1024: {
				item: 3,
				margin: 60,
				nav: true
			}
		}
	});

	//載入滑動效果
	window.sr = ScrollReveal({
		duration: 800,
		distance: "100px",
		reset: true
	});
	sr.reveal(".js-fadeInUp");
	sr.reveal(".js-fadeInRight", {
		origin: "left"
	});
	sr.reveal(".js-fadeInLeft", {
		origin: "right"
	});
	sr.reveal(".ranking-item.js-fadeInOrder", 100);
	sr.reveal(".other-item.js-fadeInOrder ",100)

	//預設帳號
	var user =[
		{
			account: "abc@gmail.com",
			password: "123"
		}
	];
	localStorage.setItem("user", JSON.stringify(user));

	//登入畫面
	var loginMenu = $("#loginMenu");
	$("#loginBtn").click(function() {
		// loginMenu.css("display", "block");
		changeToLogup();
		loginMenu.css("visibility", "visible");
		loginMenu.css("opacity", "1");
	});

	loginMenu.click(alreadyLogIn);
	$(".login-container").click(function(e) {
		e.stopPropagation();
	});

	// login-type監聽器
	$("#login-type").click(function(e) {
		var targetText = e.target.textContent;
		if(targetText === "註冊") {
			changeToLogup();
		} else if(targetText === "登入") {
			changeToLogin();
		}
		
	});

	// 切換為註冊
	function changeToLogup() {
		$("#changeLoginType").attr("class", "u-mb-32");
		var logupBtn = document.getElementById("registOrCheck");
		logupBtn.value = "註冊";
	}

	// 切換為登入
	function changeToLogin() {
		$("#changeLoginType").attr("class", "u-mb-32 u-display-n");
		var loginBtn = document.getElementById("registOrCheck");
		loginBtn.value = "登入";
	}

	// login監聽器
	$("#registOrCheck").click(function() {
		var success ;
		if(this.value === "註冊") {
			success = checkUser(1, $("#account")[0].value, $("#password")[0].value, $("#password2")[0].value);
		} else if(this.value === "登入") {
			success = checkUser(0, $("#account")[0].value, $("#password")[0].value, $("#password2")[0].value);
		}
		switch(success) {
			case "registSuccess":
				hint("恭喜您，註冊成功。", "green");
				alreadyLogIn();
				break;
			case "registRepeat":
				hint("帳號重複，請重新註冊。", "red");
				break;
			case "registFail":
				hint("第二次密碼輸入不同，請重新輸入。", "red");
				break;
			case "loginSuccess":
				hint("登入成功。", "green");
				alreadyLogIn();
				break;
			case "loginFail":
				hint("帳號或密碼有誤。", "red");
				break;
			case "acountFailed":
				hint("帳號不符合email格式", "red");
				break;
		}
		
	});

	$("#cancel").click(alreadyLogIn);

	// 註冊或登入提示訊息
	function hint(hintText, hintColor) {
		$("#registHint").text(hintText);
		if(hintColor){
			$("#registHint").css("color", hintColor);
		}
	}

	// 已登入或註冊
	function alreadyLogIn() {
		$("#account")[0].value = "";
		$("#password")[0].value = "";
		$("#password2")[0].value = "";
		hint("");
		loginMenu.css("visibility", "hidden");
		loginMenu.css("opacity", "0");
	}

	// 增加使用者
	function addUser(userAccount, userPassword, checkPassword) {
		var temp = {
			account: userAccount,
			password: userPassword
		};
		user.push(temp);
		localStorage.setItem("user", JSON.stringify(user));
	}

	// 檢查使用者
	function checkUser(addOrcheck, userAccount, userPassword, checkPassword) {
		var temp = JSON.parse(localStorage.getItem("user"));
		// 驗證mail的正規表達式
		// RegExp必須包在//裡面
		// ^比對字串的開頭，$比對字串的結尾
		// \w表示英數，等同[A-Za-z0-9]
		// \. 表示.，\為跳脫字元
		// \- 表示-，\為跳脫字元
		// | 代表or
		// +表示出現1次以上
		// *表示出現0次以上
		// [A-Z]表示大小A到Z
		// [A-Za-z0-9]表示大小寫英文及數字的組合
		var reg = new RegExp(/^\w+((\-\w+)|(\.\w+))*\@\w+((\.|\-)\w+)*\.[A-Za-z]+$/);
		// 驗證@前可以用英數字搭配.或-，但-跟.不會連續，也不會跟在@前後
		// 只會出現一個@，@後面則是以英數及-一次以上的搭配
		// 最後一定會是.跟大小寫數字的搭配，如.com .tw .jp .uk等等
		if(!userAccount.match(reg)) {
			return "acountFailed";
		}
		for(var i = 0; i < temp.length; i ++) {
			if(addOrcheck === 0) {
				// 確認使用者資料已存在
				if(temp[i].account === userAccount){
					if(temp[i].password === userPassword) {
						return "loginSuccess";
					}
				}
			}else if (addOrcheck === 1) {
				// 檢查註冊使用者是否重複
				if(temp[i].account === userAccount) {
					return "registRepeat";
				}
				if(userPassword === checkPassword) {
					addUser(userAccount, userPassword);
					return "registSuccess";
				} else {
					return "registFail";
				}
			}
		}
		return "loginFail";
	}
});