var url = window.location.href;
var re = /\?match=(\d+)/;
if(re.exec(url)) {
	if(!isNaN(RegExp.$1)) {
		var matchId = RegExp.$1;
		document.write(chrome.extension.getBackgroundPage().getMatch(matchId));
	}
}


window.onload = function () {
	var links = document.getElementsByTagName("a");
	var count = links.length;
	for(i = 0; i < count; i++) {
		links[i].addEventListener('click', doLaunch, true);
	}	
}

function doLaunch() {
	chrome.extension.getBackgroundPage().launchLink(this.href);
}