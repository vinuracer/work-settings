var oldLinks = [];
    var newLinks = [];
    var matches = {};
	var notifications = {};

    var timer = null;
    var strDefaultTitle = "ESPN Cricinfo - Cricket news, features and live scores";
    
	var canvas, canvasContext, imgIcon;
	var size = 0.9;
	var delta = -0.1;
	var cycles = 0;
	var timeout = 25;
	chrome.browserAction.setTitle({"title": strDefaultTitle});
 
  $(window).load(function() {
        if(localStorage["oldLinks"]) {
            var strLinks = localStorage["oldLinks"];
            oldLinks = JSON.parse(strLinks);

            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(fetchNew, 100);
        }
        else {
            //first time user - potentially every story is unread
            showBadge("7");
        }

        if(localStorage["matches"]) {
            var strMatches = localStorage["matches"];
            matches = JSON.parse(strMatches);
        }
	   
	   	imgIcon = $('#icon')[0];
		canvas = $('#canvas')[0];
 		canvasContext = canvas.getContext('2d');
    });

 	function beat() {
		if(canvasContext){
			canvasContext.save();
			canvasContext.clearRect(0,0, canvas.width, canvas.height);
			canvasContext.translate(canvas.width/2, canvas.height/2);
			canvasContext.scale(size, size);
			canvasContext.drawImage(imgIcon, -Math.ceil(canvas.width/2), -Math.ceil(canvas.height/2));
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0,
			canvas.width,canvas.height)});
		}
		if(size <= 0.9 && size >= 0.5) {
        	size += delta;
        	setTimeout(beat, timeout);
    	}
    	else if((size > 0.9 || size < 0.5) && cycles < 3) {
        	//console.log(size);
        	delta = delta * -1;
        	size += delta;
        	timeout = 30;
        	setTimeout(beat, timeout);
        	cycles ++;
    	}
		else {
			cycles = 0;
			size = 0.9;
			delta = -0.1;
			timeout = 25;
			chrome.browserAction.setIcon({"path":"icon19_fow.png"});
		}
	}

    function makeTooltip() {
    var arrTitle = [],
		scores = JSON.parse(localStorage.getItem('scores'));
		if(scores){
			for(var match in scores){
				var m = scores[match],
        score = $('<div />').html(m.score).text();
        score = m.score.replace('&','& ').replace('&nbsp;',' '),
        w = m.w,
		res = m.r,
        w = $('<div />').html(m.w).text();
        s = m.s,
        s = $('<div />').html(m.s).text();
				state = m.state,
				sub = '';
				if(s != 'dormant'){
					if(state){
						sub = state;
					}else if(match.r){
						sub = match.r		
					}else if(s =='current' && w){
						sub = w;
					}
					if(s =='current' && (m.r.length > 0)){
						sub = m.r;
					}
					sub = (sub!='') ? '\n[' + sub + ']' : '';
					arrTitle.push(score + sub);
				}

			}
		}
		//arrTitle.push(strDefaultTitle);
        if(arrTitle.length > 0) {                                
            chrome.browserAction.setTitle({"title": arrTitle.join("\n")});
        }else {
            chrome.browserAction.setTitle({"title": strDefaultTitle});
        }
    }

    function makeWicketAlert() {
    var scores = JSON.parse(localStorage.getItem('scores'));
        for(var matchId in matches) {
            matchId = parseInt(matchId,10);
            var score = (scores[matchId] && scores[matchId].score) || '';
            if(score != "") { 
                var wickets = wicketCount(score);
                //console.log(wickets);
                //Swicthed from (!= to <)
                if(matches[matchId] && matches[matchId].wicketCount != wickets) {
					       showWicketAlert(matchId);
                }
				
                /*
				//temp condition for 10th wicket alert
                if(matches[matchId] && (matches[matchId].wicketCount == 9 ) && (wickets == 0 )) {
                 scores[matchId].w = "All out";
                 localStorage["scores"] = JSON.stringify(scores);
                 showWicketAlert(matchId);
                }*/
            }				
        }
    }
   
  function getMatch(matchId) {
		var scores = JSON.parse(localStorage.getItem('scores'));
		var score = scores[matchId].score.replace('&amp;','&').replace('&nbsp;',' ');
    var w = scores[matchId].w.replace('Last Wicket: ','');
    score = $('<div />').html(score).text();
    w = $('<div />').html(w).text();
		var link = scores[matchId].link;
		return '<a href="' + link + '">aa' + score + '</a><br/> <span style="font-size:80%">' + w + '</span>';
	}

    function wicketCount(score) {
        var re = /\s\d+\/(\d+)[d\s]?/g;
        var wickets = 0;
        while(re.exec(score)) {
            var num = RegExp.$1;
            if(!isNaN(num)) {
                wickets += parseInt(num);
            }
        }

        return wickets;
    }

    function getDelta(data, reset) {
        var arrLinks = data;
  		newLinks = data;
        var arrDiff;


        if(oldLinks.length > 0) {
            arrDiff = diffArrays(arrLinks, oldLinks);
        }
        else {
            arrDiff = arrLinks; //first time user - mark every story as unread
        }

        if(reset) {
            if(arrLinks.length > 0) {
                oldLinks = arrLinks;
                localStorage["oldLinks"] = JSON.stringify(oldLinks);
            }
            
            if(timer) {
                clearTimeout(timer);
            }
            
            timer = setTimeout(fetchNew, 1000 * 60 * duration);
        }
        
        return arrDiff;
    }
    
    function fetchNew() {
        $.ajax({ type: "GET",
                 url: getUrl(),
                 dataType: "json",
                 error: function(req, textStatus, err) {
                     //keep the timer going
                     if(timer) {
                         clearTimeout(timer);
                     }
                     //timer = setTimeout(fetchNew, 1000 * 60 * duration);
                     timer = setTimeout(fetchNew, 10 * 60 * duration);
                 },
                 success: function(data) {
      					var linksArray = [],
      					news = data && data.news,
      					matches = data && data.matches,
      					scores = {};
                //console.log(matches);
      					if(matches){
      						for(var i=0; i<matches.length;i++){
      							match = matches[i];
      							var score = match.b1 + match.b1d + ' v ' + match.b2 + match.b2d;
      							scores[match.id] = {
      								score : $('<div />').html(score).text(),
      								w : (match.w) ? 'Last Wicket: ' + $('<div />').html(match.w).text() : '',
      								link : "https://www.espncricinfo.com/" + (match.c || 'ci') + "/engine/current/match/" + match.id + ".html?" + data.track,
      								s : $('<div />').html(match.s).text(),
      								state : match.state,
      								r : match.r		
      							}
                  }
                  localStorage.setItem("scores",JSON.stringify(scores));
                  localStorage["scores"] = JSON.stringify(scores);
                  /*for(var i=0; i<matches.length;i++){
                    setWicketCount(match.id);
                  }*/
      					}
      					if(news){
      						for(var i=0, len=news.length; i<len; i++){
      							var currentNews	= news[i];
      							linksArray.push("https://www.espncricinfo.com/" + currentNews.b + "/content/story/" + currentNews.id + ".html?" + data.track);
      						}
      					}
                       var arrLinks = linksArray;
                       var arrDiff = diffArrays(arrLinks, oldLinks);
                       //console.log(arrDiff.length);
                       if(arrDiff.length > 0) {
                           var n = arrDiff.length + "";
                           showBadge(n);
                       }
                       else {
                           hideBadge();
                       }
                       makeTooltip();
                       makeWicketAlert();
                       if(timer) {
                           clearTimeout(timer);
                       }
                       timer = setTimeout(fetchNew, 1000 * 60 * duration);
                   }
               });
    }

    function showBadge(txt) {
        chrome.browserAction.setBadgeBackgroundColor({color:[0,200,0,255]});
        chrome.browserAction.setBadgeText({ text: txt });
    }

    function hideBadge() {
        chrome.browserAction.setBadgeText({ text: "" });
    }

    function showWicketAlert(matchId) {
	  // notify(matchId); add for debug mv_2
    //chrome.browserAction.setIcon({ path: "icon19_fow.png" });

		if(localStorage["alert"] == "icon") {
			beat();
			//setting title for wicket alert
			if(typeof localStorage.getItem('scores') !== "undefined"){
				var scores = JSON.parse(localStorage.getItem('scores'));
				var matchSelected = JSON.parse(localStorage.getItem('matches'));
				var lastwicket = scores[matchId].w;
				chrome.browserAction.setTitle({"title": lastwicket});
			}
		}
		else {
			  notify(matchId);
  			//in case of desktop notifications, bring the wicket count upto speed
  			//otherwise the notification will keep popping.
      }
		setWicketCount(matchId);
    }
    function setWicketCount(matchId){
      //console.log('====',matchId,localStorage.getItem('scores'));
      if(typeof localStorage.getItem('scores') !== "undefined"){
        var scores = JSON.parse(localStorage.getItem('scores'));
        var count = wicketCount(scores[matchId].score);
        matches[matchId] = { wicketCount: count };
        localStorage["matches"] = JSON.stringify(matches);
      }
    }
	  function notify(matchId) {
		//console.log('inside notify',matchId);	//1
		//console.log(notifications);		//2
		if(notifications[matchId] && notifications[matchId].cancel) {
			notifications[matchId].cancel();
		}
		//console.log('notify first condition success'); 	//3
		if(typeof notifications[matchId] !== "undefined"){
			//console.log('inside web notify old'); 	//3
			notifications[matchId] = webkitNotifications.createHTMLNotification(chrome.extension.getBackgroundPage().getMatch(matchId));
			notifications[matchId].show();
		}else{
			//console.log('inside notify new condition');  //4
			//New notification popup manifest v2
			var scores = JSON.parse(localStorage.getItem('scores'));
			var scoreMsg = scores[matchId].score+'\n'+scores[matchId].w;
      var scoreTxt = $('<div />').html(scoreMsg).text();
      scoreMsg = scoreMsg.replace('&','& ');
			var notifyWicketOpt = {
			  type: "basic",
			  title: "Wicket Alert",
			  message: scoreTxt,
			  iconUrl: "icon128_fow.png"
			}
			if((scoreMsg !== 'undefined')&&(scores[matchId].w.length > 0)){
				chrome.notifications.create("notifyChrome", notifyWicketOpt, callThis);
			}
			chrome.notifications.create("notifyChrome", notifyWicketOpt, callThis);
			chrome.notifications.clear("notifyChrome", callThis);
			makeTooltip();
			//end notification manifest v2
		}
	}
	//New callback notification manifest v2
	function callThis(){
		//alert("Notified");
	}
	//end callback
    function hideWicketAlert() {
        chrome.browserAction.setIcon({ path: "icon19.png" });
    }
    
    function diffArrays (A, B) {

        var arrDiff = [];
        
        A = A.sort();
        B = B.sort();


        for(var i = 0; i < A.length; i++) {
            var match = false;
            for(var j = 0; j < B.length; j++) {
                if(A[i] == B[j]) {
                    match = true;
                    break;
                }
            }
            if(!match) {
                arrDiff.push(A[i]);
            }
        }

        return arrDiff;
    }

	function launchLink(href) {
		chrome.tabs.create({"url": href});
	}