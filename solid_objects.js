function solid_object(x, y, object_select, secondary_select = 0){

	this.x = x;
	this.y = y;
	this.object_select = object_select;
	this.i = 0;
	this.j = 0;
	this.i_width;
	this.j_height;
	this.sheet;

	this.hit_box_x;
	this.hit_box_y;
	this.hit_box_height;
	this.hit_box_width;

	this.drawn = false;

	this.depth;

	this.moveable = false;

	// turret
	if(object_select == 0){
		this.sheet = turret_sheet;
		this.i = 0;
		this.j = 0;
		this.hit_box_x = this.x + 18;
		this.hit_box_y = this.y + 125;
		this.hit_box_width = 87;
		this.hit_box_height = 55;
		this.depth = this.y + 170
	} // trees
	else if(object_select == 1){
		this.sheet = trees_sheet;
		this.hit_box_width = 35;
		this.hit_box_height = 20;
		if(secondary_select == 0){
			this.i = 15;
			this.hit_box_x = this.x + 52;
			this.hit_box_y = this.y + 85;
		}else if(secondary_select == 1){
			this.i = 136;
			this.hit_box_x = this.x + 49;
			this.hit_box_y = this.y + 87;
		}else if(secondary_select == 2){
			this.i = 238;
			this.hit_box_x = this.x + 49;
			this.hit_box_y = this.y + 87;
		}else if(secondary_select == 3){
			this.i = 345;
			this.hit_box_x = this.x + 67;
			this.hit_box_y = this.y + 87;
		}else if(secondary_select == 4){
			this.i = 478;
			this.hit_box_x = this.x + 37;
			this.hit_box_y = this.y + 80;
		}else if(secondary_select == 5){
			this.i = 584;
			this.hit_box_x = this.x + 51;
			this.hit_box_y = this.y + 85;
		}
		this.depth = this.y + 90;
		this.j = 0
	} // houses
	else if(object_select == 2){
		this.hit_box_x = this.x;
		this.hit_box_y = this.y + 70;
		this.hit_box_width = 105;
		this.hit_box_height = 115;
		this.depth = this.y + 170
		this.sheet = buildings3_sheet;
		if(secondary_select == 0){
			this.i = 27;
			this.j = 0;
		}else if(secondary_select == 1){
			this.i = 140;
			this.j = 0;
		}else if(secondary_select == 2){
			this.i = 252;
			this.j = 0;
		}else if(secondary_select == 3){
			this.i = 364;
			this.j = 0;
		}	
	}else if(object_select == 3){
		this.sheet = buildings3_sheet;
		if(secondary_select == 0){
			this.hit_box_x = this.x + 3;
			this.hit_box_y = this.y + 70;
			this.hit_box_width = 135;
			this.hit_box_height = 80;
			this.depth = this.y + 130
			this.i = 0;
			this.j = 235;
			this.i_width = 130;
			this.j_height = 160;
		}else if(secondary_select == 1){
			this.hit_box_x = this.x - 3;
			this.hit_box_y = this.y + 80;
			this.hit_box_width = 140;
			this.hit_box_height = 77;
			this.depth = this.y + 145
			this.i = 151;
			this.j = 225;
			this.i_width = 130;
			this.j_height = 175;
		}else if(secondary_select == 2){
			this.hit_box_x = this.x - 5;
			this.hit_box_y = this.y + 70;
			this.hit_box_width = 175;
			this.hit_box_height = 112;
			this.depth = this.y + 160
			this.i = 300;
			this.j = 230;
			this.i_width = 160;
			this.j_height = 190;
		}else if(secondary_select == 3){
			this.hit_box_x = this.x - 5;
			this.hit_box_y = this.y + 47;
			this.hit_box_width = 175;
			this.hit_box_height = 40;
			this.depth = this.y + 65
			this.i = 130;
			this.j = 400;
			this.i_width = 160;
			this.j_height = 95;
		}	
	}

	this.show = function(x1, y1){
		stroke(3);
		noFill();
		if(object_select == 0){
			image(this.sheet, x1 + this.x, y1 + this.y, 120, 200, this.i, this.j, 100, 145);
			//rect(x1 + this.hit_box_x, y1 + this.hit_box_y, this.hit_box_width, this. hit_box_height);
		}else if(object_select == 1){
			image(this.sheet, x1 + this.x, y1 + this.y, 130, 128, this.i, this.j, 121, 128);
			//rect(x1 + this.hit_box_x, y1 + this.hit_box_y, this.hit_box_width, this. hit_box_height);
		}else if(object_select == 2){
			image(this.sheet, x1 + this.x, y1 + this.y, 98, 200, this.i, this.j, 98, 220);
			//rect(x1 + this.hit_box_x, y1 + this.hit_box_y, this.hit_box_width, this. hit_box_height);
		}else if(object_select == 3){
			image(this.sheet, x1 + this.x, y1 + this.y, this.i_width, this.j_height, this.i, this.j, this.i_width, this.j_height);
			//rect(x1 + this.hit_box_x, y1 + this.hit_box_y, this.hit_box_width, this. hit_box_height);
		}
		this.drawn = true;
	}

	this.bump = function(x2, y2, for_player = false){
		return (- x2 + width/2 > this.hit_box_x && - x2 + width/2 < this.hit_box_x + this.hit_box_width && - y2 + height/2 > this.hit_box_y && - y2 + height/2 < this.hit_box_y + this.hit_box_height);
	}
}