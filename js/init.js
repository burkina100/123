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

	// 增加使用者
	function addUser(userAccount, userPassword) {
		var checkIfRepeat = checkUser(1, userAccount);
		// 值未回傳就執行
		console.log(checkIfRepeat);
		if((checkIfRepeat < 0) || (checkIfRepeat === undefined)) {
			return -1;
		}
		var temp = {
			account: userAccount,
			password: userPassword
		};
		user.push(temp);
		localStorage.setItem("user", JSON.stringify(user));
		return 0;
	}

	// 檢查使用者
	function checkUser(addOrcheck, userAccount, userPassword) {
		var temp = JSON.parse(localStorage.getItem("user"));
		for(var i = 0; i < temp.length; i ++) {
			if(addOrcheck === 0) {
				// 確認使用者資料已存在
				if(temp[i].account === userAccount){
					if(temp[i].account === userPassword) {
						return 0;
					}
				}
			}else if (addOrcheck === 1) {
				// 檢查註冊使用者是否重複
				if(temp[i].account === userAccount) {
					return -1;
				}
				return 0;
			}
			return -1;
		}
	}

	// 設定註冊／登入完成文字
	function setIfSuccess(num) {

	}

	// 已登入或註冊
	function alreadyLogIn() {
		$("#account")[0].value = "";
		$("#password")[0].value = "";
		loginMenu.css("display", "none");
	}

	//登入畫面
	var loginMenu = $("#loginMenu");
	$("#loginBtn").click(function() {
		loginMenu.css("display", "block");
	})

	$("#regist").click(function() {
		var success = addUser($("#account")[0].value, $("#password")[0].value);
		if(success === 0) {
			$("#registSuccesOrNot").text("恭喜您，註冊成功。");
			$("#registSuccesOrNot").css("color", "green");
		}else {
			$("#registSuccesOrNot").text("帳號重複，請重新註冊。");
			$("#registSuccesOrNot").css("color", "red");
		}
	})

	$("#check").click(function() {
		var success = checkUser(0, $("#account")[0].value, $("#password")[0].value);
		if(success === 0) {
			$("#registSuccesOrNot").text("登入成功。");
			$("#registSuccesOrNot").css("color", "green");
		}else {
			$("#registSuccesOrNot").text("帳號或密碼有誤。");
			$("#registSuccesOrNot").css("color", "red");
		}
	})

	$("#cancel").click(alreadyLogIn);
});