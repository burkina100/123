(function () {
	var greet = document.getElementById("greeting");
	var nowHour = new Date().getHours();
	if(nowHour >= 18) {
		greet.innerHTML = "晚安，您好";
	}else if(nowHour >= 12) {
		greet.innerHTML = "午安，您好";
	}else if(nowHour >= 6) {
		greet.innerHTML = "早安，您好";
	}else {
		greet.innerHTML = "現在是凌晨，請早點休息";
	}
}());