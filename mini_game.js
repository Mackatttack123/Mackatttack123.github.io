// All for turtle mini game
var setup_turtles = true;
var answered = false;
var player_bet = 0;
var player_turtle_num = 0;
var waiting_for_bet = true;
var turtles = [];
var game_over = false;
var winner;
var payed = false;

function run_mini_game(){
	clear();
	background(0);
	image(stone_background, 0, 0, 800, 600, 0, 0, 1024, 1024);
	ellipseMode(CENTER);
	noFill();
	strokeWeight(10);
	stroke(0);
	ellipse(width/2, height/2, 500, 500);
	// get the players bet
	if(!answered){
		alertify.prompt( 'How much gold would you like to bet?', function(evt, value) { check_bet(value); }, '1'); 
		answered = true;        
	}else if(!waiting_for_bet){
		fill(255);
		textSize(20);
		text("Betting: " + player_bet + " gold on turtle #" + player_turtle_num , 10, 25);
		// creates the turtles in there stating places
		if(setup_turtles){
			for(var k = 0; k < 8; k++){
				turtles.push(new turtle(width/2, height/2, random(0, 360), k));
			}
			setup_turtles = false;
		}
		// show all the turtles
		for (var k = turtles.length - 1; k >= 0; k--) {
			turtles[k].show();
			if(!game_over){
				turtles[k].random_walk();
			}
			if(Math.sqrt((turtles[k].x-width/2)*(turtles[k].x-width/2) + (turtles[k].y-height/2)*(turtles[k].y-height/2)) > 250){
				game_over = true;
				winner = k + 1;
			}
		}
		if(game_over){
			if(winner == player_turtle_num){
				fill(0, 255, 0);
				text("Congrats you won " + (player_bet * 5) + " gold!", width/2 - 120, height/2);
				if(!payed){
					num_coins+=(player_bet*5);
					payed = true;
				}
			}else{
				fill(255, 0, 0);
				text("Turtle #" + winner +  " won...you lose " + player_bet + " gold!", width/2 - 140, height/2);
			}
			fill(200);
			strokeWeight(2);
			rect(width/2 - 75, height/2 + 50, 150, 50, 20);
			rect(width/2 - 75, height/2 + 120, 150, 50, 20);
			fill(0);
			noStroke();
			text("Play Again", width/2 - 50, height/2 + 80);
			text("Leave...", width/2 - 35, height/2 + 150);
		}
	}

	// for coin icon display
	stroke(0);
    fill(0, 255, 0);
    textSize(20);
    strokeWeight(3);
    image(gold_icon, 0, height - 50, 80, 50, 0, 0, 250, 182);
    text(num_coins, 10, height - 15);
}

function reset_mini_game(){
	setup_turtles = true;
	answered = false;
	player_bet = 0;
	player_turtle_num = 0;
	waiting_for_bet = true;
	turtles = [];
	game_over = false;
	winner;
	payed = false;
}

function check_bet(bet){
	if(bet == null){
		alertify.error("No gold was bet");
		y-=10;
		reset_mini_game();
		mini_game_playing = false;
	}else{
		// make sure the bet was actually a whole number and not letters or a float
		if(bet.match(/^[0-9]+$/) != null && bet == Math.floor(bet)){
			if(bet <= 0){
				alertify.error("you can't bet " + bet + "! Try Again.");
				answered = false;
			}else if(bet > num_coins){
				alertify.error("You don't have " + bet + " gold to bet! Try Again.")
				answered = false;
			}else if(bet > 500){
				alertify.error("sorry you can't bet more then 500 gold...Try Again.");
				answered = false;
			}else{
				alertify.success("You bet " + bet + " gold")
				player_bet = bet; 
				num_coins-=bet;
				alertify.prompt('Which turtle would you like to bet on? (1-8)', function(evt, value) { check_turtle_pick(value); }, '1'); 
			}
		}else{
			alertify.error("We only bet gold in whole numbers here...Try Again." )
			answered = false;
		}
	}
}

function check_turtle_pick(turtle_num){
	if(turtle_num == null){
		alertify.error("The gold has alreafy been bet. Please choose a turtle.");
		alertify.prompt('Which turtle would you like to bet on? (1-8)', function(evt, value) { check_turtle_pick(value); }, '1');
	}else{
		// make sure the bet was actually a whole number and not letters or a float
		if(turtle_num.match(/^[0-9]+$/) != null && turtle_num == Math.floor(turtle_num)){
			if(turtle_num < 1 || turtle_num > 8){
				alertify.error("There is no turtle number " + turtle_num + "...Try Again.");
				alertify.prompt('Which turtle would you like to bet on? (1-8)', function(evt, value) { check_turtle_pick(value); }, '1');
			}else{
				alertify.success("You're betting on turtle #" + turtle_num + "!")
				player_turtle_num = turtle_num; 
				waiting_for_bet = false;
				}
		}else{
			alertify.error("You must pick a number 1-8...Try Again." )
			alertify.prompt('Which turtle would you like to bet on? (1-8)', function(evt, value) { check_turtle_pick(value); }, '1');
		}
	}
}

function turtle(x, y, angle, character_select){
	this.x = x;
	this.y = y;
	this.character_select = character_select;

	this.i = (144 * (this.character_select % 4));
	this.j;
	
	this.sprite_sheet = turtle_sheet;
	this.angle = angle;

	if(this.character_select <= 3){
		this.j = 144;
	}else{
		this.j = 336;
	}
	this.i_moved = this.i + 48;
	this.j_moved = this.j;

	this.show = function() {
		push();
		translate(this.x, this.y);
		rotate(radians(this.angle));
		image(this.sprite_sheet, -30, -40, 60, 60, this.i_moved, this.j_moved, 48, 48);
		if(character_select == player_turtle_num - 1){
			fill(255, 0, 0);
		}
		textSize(15);
		strokeWeight(3);
		text(character_select + 1, -5, 3)
		pop();
	}


	this.rotateRight = function() {
		if(this.angle < 360){
			this.angle += 5;
		}
		else{
			this.angle = 0
		}
		if(frameCount % 8 == 0){
            if(this.i_moved < this.i + 96){
                this.i_moved += 48;
            }
            else{
                this.i_moved = this.i;
            }
        }
	}

	this.rotateLeft = function() {
		if(this.angle > 0){
			this.angle -= 5;
		}
		else{
			this.angle = 360
		}
		if(frameCount % 8 == 0){
            if(this.i_moved < this.i + 96){
                this.i_moved += 48;
            }
            else{
                this.i_moved = this.i;
            }
        }
	}

	this.forward = function() {
		if(frameCount % 3 == 0){
			this.x += sin(radians(this.angle)) * 2;
			this.y -= cos(radians(this.angle)) * 2;
			this.i_moved - 48;
			if(frameCount % 4 == 0){
	            if(this.i_moved < this.i + 96){
	                this.i_moved += 48;
	            }
	            else{
	                this.i_moved = this.i;
	            }
	        }
	    }
	}

	this.random_walk = function(){
		var num = Math.floor(random(0, 15));
		if(num <= 2){
			this.rotateRight()
		}else if(num <= 5){
			this.rotateLeft()
		}else{
			this.forward();
		}
	}
}
