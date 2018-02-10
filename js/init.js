$(document).ready(function() {
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
			account: "abc",
			password: "123"
		}
	];
	localStorage.setItem("user", JSON.stringify(user));

	//登入畫面
	var loginMenu = $("#loginMenu");
	$("#loginBtn").click(function() {
		// loginMenu.css("display", "block");
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
				break;
			case "registRepeat":
				hint("帳號重複，請重新註冊。", "red");
				break;
			case "registFail":
				hint("第二次密碼輸入不同，請重新輸入。", "red");
				break;
			case "loginSuccess":
				hint("登入成功。", "green");
				break;
			case "loginFail":
				hint("帳號或密碼有誤。", "red");
				break;
		}
		
	});

	$("#cancel").click(alreadyLogIn);

	// 註冊或登入提示訊息
	function hint(hintText, hintColor) {
		$("#registHint").text(hintText);
		$("#registHint").css("color", hintColor);
	}

	// 已登入或註冊
	function alreadyLogIn() {
		$("#account")[0].value = "";
		$("#password")[0].value = "";
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