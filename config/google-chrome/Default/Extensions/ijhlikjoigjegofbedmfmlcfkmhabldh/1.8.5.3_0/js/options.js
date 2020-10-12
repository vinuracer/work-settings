$(document).ready(function() {
			var team1 = getTeam(1);
			var team2 = getTeam(2);
			var notify = localStorage["alert"];
			notify = notify ? notify : "icon";

			if(!localStorage["firstRun"] || localStorage["firstRun"] != "1.7.2") {
				localStorage["firstRun"] = "1.7.2";
				$('sup#newLabel').show();
			}
			$('#closebtn').click(function(){
				window.open('', '_self', '');window.close();
			});
			$('#clearcheckboxes').click(function(c){
				c.preventDefault();
				var className = $(this).attr("class");
				if(className === "enabled"){
					clear();
				}
			});
			$('input:radio[value=' + notify + ']').attr('checked', 1);

			if(localStorage["newsFilter"] == 1) {
				toggleFilterUI(true);
				$('input#filter').attr('checked', 1);
			}

			if(team1 || team2) {
				$('input:radio').filter('[name=team1][value=' + team1 + ']').attr('checked', 1).end().filter('[name=team2][value=' + team2 + ']').attr('checked', 1);

				//Don't allow the same team to be primary and secondary
				//Disable team2 checkbox that has same value as team1
				exclusivityToggle(team1);
			}

			$('input:radio[name=alert]').click(function() {
				localStorage["alert"] = $(this).val();
			});

			$('input#filter').click(function() {
				if($(this).is(':checked')) {
					toggleFilterUI(true);
					localStorage["newsFilter"] = 1;
					exclusivityToggle(getTeam(1));
				}else {
					toggleFilterUI(false);
					localStorage["newsFilter"] = 0;
				}
			});

			$('input:radio[name=team1]').click(function() {
				$('input:radio[name=team2]:disabled').attr('disabled', false).parent().next().children('label').css('color', '#000');
				var val = $(this).val();
				setTeam(1, val);
				exclusivityToggle(val);
			});
			
			$('input:radio[name=team2]').click(function() {
				setTeam(2, $(this).val());	
			});
		});

		function exclusivityToggle(val) {
			var id = $('input:radio[name=team2][value=' + val + ']').attr({'checked':false, 'disabled':true}).attr("id");
			$('label[for=' + id + ']').css('color', '#777');

		}

		function toggleFilterUI(flag) {
			var color, disabled;
			if(flag) {
				color = '#000';
				disabled = false;
				$('#clearcheckboxes').removeClass('disabled').addClass('enabled');
			}
			else {
				color = '#777';
				$('#clearcheckboxes').removeClass('enabled').addClass('disabled');
				disabled = true;
			}

			$('input:radio[name*=team]').attr('disabled', disabled);
			$('th').css('color', color);
			$('table.teams label').css('color', color);
		}
		function getTeam(index) {
			if(!index) {
				index = 1;
			}

			var team = localStorage["team" + index];
			if(!isNaN(team) && parseInt(team) > 0) {
				return team;
			}
			return 0;
		}

		function setTeam(index, team) {
			if(!index) {
				index = 1;
			}

			if(!isNaN(team) && parseInt(team) > 0) {
				localStorage["team" + index] = team;
			}
			else {
				localStorage.removeItem("team" + index);
			}
		}

		function clear() {
			$('input:radio[name=team2]:checked').attr('checked', false);
			setTeam(2, 0);
		}
		