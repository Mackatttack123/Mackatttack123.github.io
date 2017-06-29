/*
TODO: 
1. Have alert for when you die or set a new high score or to tell how much gold you won...
have high score saved in data base...

2. Make you have to pay a fish to win
*/

var player_dragon;
var dragon_srite_sheet;
var dragon_lair_background;
var arrow_image;
var arrows = [];
var arrow_dodging_mini_game_setup = true;
var arrow_dodging_mini_score;

var starting_wall;
var start_arrow_x;
var start_arrow_y;
var dragon_hit = false;

var arrow_dodging_game_payed = false;
var explosion_sheet, dragon_srite_sheet_no_bomb, dragon_master_image, dragon_master_house_backgound;
var explosion_sheet_i = 0;
var explosion_sheet_j = 0;
var end_explosion = false;
var explosion_sound;
var game_over_arrow_dodging_game = false;
var arrow_dodging_mini_game_playing = false;
var running_arrow_dodging_mini_game_intro = false;

function run_arrow_dodging_mini_game_intro(){
    if(arrow_dodging_mini_game_playing){
    	run_arrow_dodging_mini_game();
    }else{
    	// check to see if background music should be played
	    music_handler();
		clear();
		image(dragon_master_house_backgound, 0, 0, width, height, 0, 0, 1024, 604);
		image(dragon_master_image, 360, 210, 250, 370, 0, 0, 400, 600);
		fill(255);
		strokeWeight(10);
		stroke(0);
		textSize(20);
		text("I was wondering if you could help me out...You see\n"
			+ "I got this dragon egg from my friend down south\n"
			+ "and it just hatched. I was hoping you could help\n"
			+ "train my new pet in arial avoidance! All you have\n"
			+ "to do is make sure the arrows don't hit the explosive\n"
			+ "I strapped to his back. Oh and don't worry the bomb\n"
			+ "won't kill him...only stun him a bit...he's tough...\n"
			+ "I'll make sure to pay you well.\n", 50, 50);

		// for buttons
		strokeWeight(2);
		fill(200);
		rect(width - 170, 20, 150, 50, 20);
		fill(0, 100, 0);
		rect(80, 270, 200, 50, 20);
		fill(0);
		noStroke();
		textSize(30);
		text("EXIT", width - 135, 55);
		textSize(20);
		text("Play Dragon Trainer", 90, 302);


		// for coin icon display
		stroke(0);
	    fill(0, 255, 0);
	    textSize(20);
	    strokeWeight(3);
	    image(gold_icon, 0, height - 50, 80, 50, 0, 0, 250, 182);
	    text(num_coins, 10, height - 15);
    }
    
}

function run_arrow_dodging_mini_game(){
	if(arrow_dodging_mini_game_setup){
		dragon_srite_sheet = loadImage('images/dragon_sprite_sheet.gif');
		dragon_srite_sheet_no_bomb = loadImage('images/dragon_sprite_sheet_copy.gif');
		dragon_lair_background = loadImage('images/dragon_lair_background.jpg');
		arrow_image = loadImage('images/arrow.png');
		explosion_sheet = loadImage('images/explosion.png');
		explosion_sound = loadSound('audio/explosion.wav');
		arrow_dodging_mini_game_setup = false;
		player_dragon = new dragon(400, 300, 0);
		arrows = [];
		dragon_hit = false;
		explosion_sheet_i = 0;
		explosion_sheet_j = 0;
		end_explosion = false;
		game_over_arrow_dodging_game = false;
		arrow_dodging_game_payed = false;
	}
	clear();
	background(0);
	// check to see if background music should be played
    music_handler();
	image(dragon_lair_background, 0, 0, width, height, 0, 0, 640, 480);

	// for dragon dispay and movemnt
	player_dragon.show();
	if(!dragon_hit){
		player_dragon.forward();
		dragon_movement_controls();
	}else{
		if(player_dragon.size > 0.6){
			player_dragon.size-=0.005;
			player_dragon.rotateLeft();
			player_dragon.rotateLeft();
			// for expolsion
			if(!end_explosion){
				image(explosion_sheet, player_dragon.x - 30, player_dragon.y - 30, 50, 50, explosion_sheet_i, explosion_sheet_j, 100, 100);
				if(explosion_sheet_i < 800){
					explosion_sheet_i += 100;
				}else{
					explosion_sheet_i = 0;
					if(explosion_sheet_j < 800){
						explosion_sheet_j += 100;
					}else{
						end_explosion = true;
					}
				}
			}	
		}else{
			game_over_arrow_dodging_game = true;
		}
	}

	for (var k = arrows.length - 1; k >= 0; k--) {
		arrows[k].show();
		arrows[k].move();
		// get rid of arrow that go out of bounds and add in new ones
		if(!in_box(-100, -100, 1000, 800, arrows[k].x, arrows[k].y)){
			arrows.splice(k, 1);
			starting_wall = k%4;
			start_arrow_x;
			start_arrow_y;

			if(starting_wall == 0){
				start_arrow_x = -99;
				start_arrow_y = random(-100, 800);
			}else if(starting_wall == 1){
				start_arrow_x = 900;
				start_arrow_y = random(-100, 800);
			}else if(starting_wall == 2){
				start_arrow_x = random(-100, 1000);
				start_arrow_y = -99;
			}else if(starting_wall == 3){
				start_arrow_x = random(-100, 1000);
				start_arrow_y = 700;
			}
			arrows.push(new arrow(start_arrow_x, start_arrow_y, random(0, 360), random(1.5, 3)));
		}

	}
	if(frameCount % 120 == 0){
		if(starting_wall == 2){
			start_arrow_x = -99;
			start_arrow_y = random(-100, 800);
		}else if(starting_wall == 1){
			start_arrow_x = 900;
			start_arrow_y = random(-100, 800);
		}else if(starting_wall == 3){
			start_arrow_x = random(-100, 1000);
			start_arrow_y = -99;
		}else if(starting_wall == 0){
			start_arrow_x = random(-100, 1000);
			start_arrow_y = 700;
		}
		arrows.push(new arrow(start_arrow_x, start_arrow_y, random(0, 360), random(1.5, 3)));
	}

	for (var k = arrows.length - 1; k >= 0; k--) {
		/*noFill();
		strokeWeight(1);
		stroke(0, 255, 0);
		ellipse(player_dragon.x, player_dragon.y, 25, 25);
		ellipse(arrows[k].x, arrows[k].y, 1, 1);*/
		if(!dragon_hit && Math.sqrt((arrows[k].x-player_dragon.x)*(arrows[k].x-player_dragon.x) + (arrows[k].y-player_dragon.y)*(arrows[k].y-player_dragon.y)) < 12.5){
			dragon_hit = true;
			arrows.splice(k, 1);
			if(sound_sound){
	            explosion_sound.volume = 1.0;
	            explosion_sound.playMode('restart');
	            explosion_sound.play();
	        }
		}
	}

	if(game_over_arrow_dodging_game){
		if(!arrow_dodging_game_payed){
			num_coins+=Math.floor(arrow_dodging_mini_score*0.3);
			alertify.success("You were payed " + Math.floor(arrow_dodging_mini_score*0.3) + " gold!")
			arrow_dodging_game_payed = true;
		}
		textSize(75);
		strokeWeight(10);
		stroke(1);
		text("score: " + arrow_dodging_mini_score, width/2 - 150, height/2 - 100);
		fill(200);
		strokeWeight(2);
		rect(width/2 - 75, height/2 + 50, 150, 50, 20);
		rect(width/2 - 75, height/2 + 120, 150, 50, 20);
		fill(0);
		noStroke();
		textSize(20);
		text("Play Again", width/2 - 50, height/2 + 80);
		text("Leave...", width/2 - 35, height/2 + 150);
	}

	// keeps track of score
	textSize(25);
	fill(255);
	if(!dragon_hit){
		arrow_dodging_mini_score = arrows.length;
	}
	if(!game_over_arrow_dodging_game){
		strokeWeight(10);
		stroke(1);
		text("score: " + arrow_dodging_mini_score, 30, 50);
	}

	// for coin icon display
	stroke(0);
    fill(0, 255, 0);
    textSize(20);
    strokeWeight(3);
    image(gold_icon, 0, height - 50, 80, 50, 0, 0, 250, 182);
    text(num_coins, 10, height - 15);
}

function arrow(x, y, angle, speed){
	this.speed = speed;
	this.x = x;
	this.y = y;
	this.angle = angle;

	this.sprite_sheet = arrow_image;

	this.show = function() {
		push();
		translate(this.x, this.y);
		rotate(radians(this.angle));
		image(this.sprite_sheet, -8, 0, 16, 40, 0, 0, 253, 966);
		pop();
	}

	this.move = function() {
		this.x += sin(radians(this.angle)) * speed;
		this.y -= cos(radians(this.angle)) * speed;
	}
}

function dragon(x, y, angle){
	this.x = x;
	this.y = y;
	this.i = 0;
	this.j = 420;
	this.angle = angle;
	this. size = 1;

	this.show = function() {
		if(dragon_hit){
			this.sprite_sheet = dragon_srite_sheet_no_bomb;
		}else{
			this.sprite_sheet = dragon_srite_sheet;
		}
		push();
		translate(this.x, this.y);
		rotate(radians(this.angle));
		image(this.sprite_sheet, -35*this.size, -35*this.size, 70*this.size, 70*this.size, this.i , this.j, 75, 70);
		pop();
	}


	this.rotateRight = function() {
		if(this.angle < 360){
			this.angle += 5;
		}
		else{
			this.angle = 0
		}
	}

	this.rotateLeft = function() {
		if(this.angle > 0){
			this.angle -= 5;
		}
		else{
			this.angle = 360
		}
	}

	this.forward = function() {
		this.x += sin(radians(this.angle)) * 2;
		this.y -= cos(radians(this.angle)) * 2;
	}
}

function dragon_movement_controls(){
	var dragon_speed = 2;
	if (keyIsDown(65)){ // A key
        player_dragon.rotateLeft();
    }else if (keyIsDown(68)){ // D key
        player_dragon.rotateRight();
    }
    if(frameCount % 5 == 0){
        if(player_dragon.i < 675){
            player_dragon.i += 75;
        }
        else{
            player_dragon.i = 0;
        }
    }

    if(player_dragon.x > width - 35){
    	player_dragon.x -= dragon_speed;
    }
    if(player_dragon.x < 35){
    	player_dragon.x += dragon_speed;
    }
    if(player_dragon.y > height - 35){
    	player_dragon.y -= dragon_speed;
    }
    if(player_dragon.y < 35){
    	player_dragon.y += dragon_speed;
    }
}