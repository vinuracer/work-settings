

function getStuff(data) {
    $.getJSON(getUrl(), {}, gotStuff);
}

function gotStuff(data) {
	linksArray = [];
	
	var r = document.getElementById('r'),
	res = document.createDocumentFragment(),
	country = (data && data.header) ? ' - ' + data.header : '';
	
	$('.ln').text("Latest News" + country);
	
	if(data && data.news){
		var news = data.news;
		for(var i=0, len=news.length; i<len; i++){
			var currentNews	= news[i];
			var img = document.createElement('img');
			img.src = 'img/plus.gif';
			img.width = '9';
			img.height='9';
			img.className ='pm';
			img.id='i_' + i;
			res.appendChild(img);
			var a = document.createElement('a');
			a.className="nlink";
			a.href = "https://www.espncricinfo.com/" + currentNews.b + "/content/story/" + currentNews.id + ".html?" + data.track;
			linksArray.push(a.href);
			a.innerText = currentNews.t;
			res.appendChild(a);
			var b = document.createElement('br');
			res.appendChild(b);
			var p = document.createElement('p');
			p.innerText = currentNews.s;
			p.id = 'p_' + i;
			res.appendChild(p);
		}
	}
	r.parentNode.insertBefore(res,r);

	res = document.createDocumentFragment();
	if(data && data.specials){
		var specials = data.specials;
		for(var i=0, len=specials.length; i<len; i++){
			var current	= specials[i];
			var p = document.createElement('p');
			if(current.i){
				var a2 = document.createElement('a');
				a2.href = current.l;
				a2.className="nlink2";			
				var img = document.createElement('img');
				img.src = current.i;
				a2.appendChild(img);
				p.appendChild(a2);
			}
			var a = document.createElement('a');
			a.href = current.l;
			a.className="nlink";
			a.innerText = current.t;
			p.appendChild(a);
			var b = document.createElement('br');
			p.appendChild(b);		
			var t = document.createTextNode(current.s.replace(/<.*?>/g, ''));
			p.appendChild(t);
			res.appendChild(p)
		}
	}
	
	document.getElementById('items').appendChild(res);
	
	if(data && data.matches){
		var matches = data.matches,
		len = matches.length;		
		//var checklist = localStorage["checklist"];
		for(var i=0; i<len; i++){
			var match = matches[i],
			tr = document.createElement('tr'),
			td = document.createElement('td'),
			ch = document.createElement('input');
			ch.type = 'checkbox';
			ch.title = 'Follow this match';
			ch.className = 'c';
			ch.id = match.id;
			td.appendChild(ch);
			var td2 = document.createElement('td');		
			/*if(typeof checklist !== "undefined" && checklist.indexOf(match.id) > -1){
				ch.checked = "checked";
			}else{
				console.log(checklist);
			}*/
			tr.appendChild(td);
		
			var a = document.createElement('a');
			a.href = "https://www.espncricinfo.com/" + match.c + "/engine/current/match/" + match.id + ".html?" + data.track;
			a.id = 'alink'+match.id;
			var s1 = document.createElement('span');
			s1.innerText = match.b1;

			var s2 = document.createElement('span');
			s2.innerText = match.b1d.replace('&amp;','&').replace('&nbsp;',' ');
			s2.style.color = 'black';

			var s3 = document.createElement('span');
			s3.innerText = ' v ';
			s3.style.color = 'black';
		
			var s4 = document.createElement('span');
			s4.innerText = match.b2;
				
			var s5 = document.createElement('span');
			s5.innerText = match.b2d.replace('&amp;','&').replace('&nbsp;',' ');
			s5.style.color = 'black';
		
			a.appendChild(s1);
			a.appendChild(s2);
			a.appendChild(s3);
			a.appendChild(s4);   	
			a.appendChild(s5);   	
		
			var s6 = document.createElement('span'),
			text = '';
			s6.className = 'res';
		
			if(match.state){
				text = match.state;
			}else if(match.r){
				text = match.r
			}else if(match.s =='current' && match.w){
				text = 'Last Wicket: ' + match.w
			}else if(match.s =='current' && match.r){
				text = match.r;
			}
			s6.innerText = text;
			td2.appendChild(a);
			var br = document.createElement('br');
			if(match.s == 'dormant' && match.t) {			
				var s7 = document.createElement('span');
				s7.innerHTML += '  ' + match.t;
				s7.style.fontSize = '11px';
				td2.appendChild(s7);	
			}		
			td2.appendChild(br);
			td2.appendChild(s6);	
			tr.appendChild(td2);
			document.getElementById('table').appendChild(tr);
			//alert($('table').find('input:checked'));
		}
	}else{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerText = 'No major matches going on';
			tr.appendChild(td);
			document.getElementById('table').appendChild(tr);	
	}
	
	$('.loader').hide();
	$('div.b').show();
	
    $('a:not([href=#])').click(showStory);
    $('img.pm').click(showHide);
    $("div.scrollable").scrollable({size:1, navi:'div#nav div.navi', prev:'div#nav a.prev', next:'div#nav a.next'});
    $("div#nav a.next,div#nav a.prev").click(function(c){c.preventDefault();});
	var bg = chrome.extension.getBackgroundPage();
	var arrDiff;
	if(bg !== 'null'){
		arrDiff = bg.getDelta(linksArray, true);
	}
	var checklist = new Array();
    $('div.b2 input:checkbox').each(
        function() { //check the boxes that the user had selected the last time
            var matchId = $(this).attr('id');
            if(bg.matches[matchId]) {
                $(this).attr("checked", 1);
                var score = $('#'+'alink'+matchId).text();
                if(score != "") {
                    var wickets = bg.wicketCount(score);
                    if(bg.matches[matchId].wicketCount < wickets) {
                        $('#'+'alink'+matchId).css({"fontWeight": "bold"});
                        //bg.hideWicketAlert();
                        bg.matches[matchId].wicketCount = wickets;
                    }
                }
            }
            localStorage["matches"] = JSON.stringify(bg.matches);
        }
    ).click(
        function() {
            bg.matches = {};
            $('div.b2 input:checked').each(
                function() {
                    var matchId = $(this).attr('id');
					/*if(checklist.indexOf(matchId) === -1){
						checklist.push(matchId);
					}*/
                    var score = $('#'+'alink'+matchId).text();
                    var wickets = bg.wicketCount(score);
                    bg.matches[matchId] = { wicketCount: wickets }
                }
            );
			/*$('div.b2 input:checkbox:not(:checked)').each(
                function(c) {
                    var matchId = $(this).attr('id');
					if(checklist[c] === matchId){
						checklist[c] = '';
						checklist.clean("");
					}
				 }
            );*/
            bg.makeTooltip();
            localStorage["matches"] = JSON.stringify(bg.matches);        
			//localStorage["checklist"] = checklist;
        }
    );
 Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};   
    bg.makeTooltip();
    bg.hideBadge();
	bg.hideWicketAlert();

    if(arrDiff) {
        $('#result div.b:eq(1)').children('a').each(function() {
            for(var i=0; i < arrDiff.length; i++) {
                if(arrDiff[i] == $(this).attr("href")) {
                    $(this).css({fontWeight:"bold"});
                    break;
                }
            }
        });
    }
}

function showHide() {
    var id = $(this).attr('id');
    var num = id.split("_")[1];
    var pid = "p_" + num;
    if($('#' + pid).css('display') == 'none') {
        $('#' + pid).slideDown("fast");
        $(this).attr({src: 'img/minus.gif'});
    }
    else {
        $('#' + pid).slideUp("fast");
        $(this).attr({src: 'img/plus.gif'});
    }
}

function showStory() {
    var url = $(this).attr('href');
    chrome.tabs.create({"url":url});
    return false;
}
function checkLocalStorage(){
	//create for the first time
	//localStorage.setItem("firstRun", "1.7.2");
	localStorage.setItem("matches", "");
	localStorage.setItem("oldLinks", "");

	if(!localStorage["firstRun"] || localStorage["firstRun"] != "1.7.2") {
		$('div#firstRun').css("display", "block");
		localStorage["alert"] = "icon";
	}
}

$(document).ready(function() { setTimeout(getStuff, 100) });
$(document).ready(function() { checkLocalStorage(); });