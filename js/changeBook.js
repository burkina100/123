var changeBook = function(element) {
		var name = element.getAttribute("name");
		var nameCollect = name.substr(0, name.length-1);
		var bookImage = document.getElementById(nameCollect);
		var num = bookImage.style.backgroundImage.lastIndexOf(nameCollect);
		var str = bookImage.style.backgroundImage.substr(0, num);
		bookImage.style.backgroundImage = str + name + '.png")';
};