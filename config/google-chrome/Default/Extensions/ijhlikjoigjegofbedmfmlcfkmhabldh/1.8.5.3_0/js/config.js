var daddy = "https://www.espncricinfo.com";

var duration = 1; //duration for polling in minutes

function getUrl() {
	var url = daddy + "/ci/content/rss/extension2.json";
	if(localStorage["newsFilter"] && localStorage["newsFilter"] == 1) {
		//house keeping for older version
		var team = localStorage["team"];
		if(!isNaN(team) && team > 0) {
			localStorage["team1"] = team;
			localStorage.removeItem("team");
		}

		//newer version with 2 teams
		var team1 = localStorage["team1"];
		var team2 = localStorage["team2"];

		var params = [];
		if(team1 && !isNaN(team1)) {
			params.push("t=" + team1);
		}

		if(team2 && !isNaN(team2)) {
			params.push("t2=" + team2);
		}

		var qs = params.join("&");
		if(qs) {
			url = url + "?" + qs;
		}
	}
	return url;
}

