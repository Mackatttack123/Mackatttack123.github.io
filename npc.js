function npc(x, y, character_select){

	// x and y for physical position
	this.x = x;
	this.y = y;
	this.set_direction = 4;
	this.depth;
	// i  and j for position of image to get from sprite sheet.
	this.i;
	this.j;
	this.i_moved;
	this.j_moved;

	this.character_select = character_select;
	this.sprite_sheet;
	this.shadow1 = shadow1;
	this.shadow2 = shadow2;
	this.animation_time = random(45, 60);

	this.moveable = true;

	if(this.character_select >= 0){
		// select correct character skin from sprite sheet if postive 
		this.sprite_sheet = people_sheets[Math.floor(this.character_select / 8)];

		this.i = (96 * (this.character_select % 4));

		if(this.character_select <= 3 || 
			(this.character_select > 7 && this.character_select <= 11) || 
			(this.character_select > 15 && this.character_select <= 19) || 
			(this.character_select > 23 && this.character_select <= 27)){
			this.j = 0;
		}else{
			this.j = 192;
		}

		this.i_moved = this.i + 32;
		this.j_moved = this.j;
	}// select correct item from sprite sheet if negative 
	else if(this.character_select < 0 && this.character_select > -430){
		//(429 possible items fomr this sheet...23x19)-8) ------> sprite size 34.08 wide by 34.1 tall
		var item_select = (-this.character_select) - 1
		this.sprite_sheet = items_sheet;
		this.i = (34.08 * (item_select % 23));
		this.j = (34.1 * (Math.floor(item_select / 19)));
		this.i_moved = this.i;
		this.j_moved = this.j;
	}
	
	this.show = function(x1, y1) {
		if(this.character_select >= 0){
			this.depth = this.y + 20; 
			image(this.sprite_sheet, x1 + this.x, y1 + this.y, 32, 48, this.i_moved, this.j_moved, 32, 48);
		}else if(this.character_select < 0 && this.character_select > -430){
			this.depth = this.y;
			// item animation
			if(frameCount % this.animation_time <= 15){
				image(this.shadow1, x1 + this.x - 10, y1 + this.y + 8, 40, 20, 0, 0, 300, 172); // shadow
				image(this.sprite_sheet, x1 + this.x, y1 + this.y, 20, 20, this.i_moved, this.j_moved, 34.08, 34.1);
			}
			else{
				image(this.shadow2, x1 + this.x - 10, y1 + this.y + 8, 40, 20, 0, 0, 300, 172); // shadow
				image(this.sprite_sheet, x1 + this.x - 2, y1 + this.y - 2, 23, 23, this.i_moved, this.j_moved, 34.08, 34.1);
			}
		}
		
	}

	// for character movements ----> down = 0; up = 3; left = 1; right = 2; still = anything else
	this.direction = function(d){
		var character_speed = 2.3;
		if(frameCount % 2 == 0 && this.character_select >= 0){
			this.j_moved = this.j + (48 * d);
			this.i_moved - 32;
			if(frameCount % 4 == 0){
	            if(this.i_moved < this.i + 64){
	                this.i_moved += 32;
	            }
	            else{
	                this.i_moved = this.i;
	            }
	        }
	        if(d == 0){
	        	this.y += character_speed;
	        }else if(d == 3){
	        	this.y -= character_speed;
	        }else if(d == 2){
	        	this.x += character_speed;
	        }else if(d == 1){
	        	this.x -= character_speed;
	        }else{
	        	this.still();
	        }
	    }
	    this.set_direction = d;
	}

	// for standstills
	this.still = function(){
		if(this.character_select >= 0){
			this.i_moved = this.i + 32;
			this.j_moved = this.j;
		}
	}

	this.randomWalk = function(){
		if(frameCount % 36 == 0){
			var num = Math.floor(Math.random() * 5);
			this.direction(num);
		}
	}

	this.item_click = function(x1, y1){
		if(this.character_select < 0){
			if(mouseX > x1 + this.x && mouseX < x1 + this.x + 20 && mouseY > y1 + this.y && mouseY < y1 + this.y + 20){
				return true;
			}
		}
	}

}