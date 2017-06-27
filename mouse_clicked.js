function mouse_clicked(hotkey = -69){
	if(in_box(width-45, height-45, 30, 30) || hotkey == 'o'){
		if(sound_sound){
			icon_clicked_sound.play();
		}
		settings_shown = !settings_shown;
	}
	if(settings_shown){
		if(in_box(width-170, height-260, 20, 20)){
			sound_sound = !sound_sound;
		}
		if(in_box(width-170, height-230, 30, 30)){
			music_sound = !music_sound;
		}
	}

	// for general store item selling slicks
	if(running_general_store){
		// see if an item inside the inventory screen was clicked
	    if(in_box(width - 650, height - 220, 540, 180)){
	        for (var k = 0; k < items.length; k++) {
	            if(in_box(width - 650 + ((k % 18)* 30), height - 220 + (Math.floor(k/18)* 35), 30, 30)){
	                alertify.error("Item sold for 2 gold...");
	                // for sound effect of getting item
	                if(sound_sound){
	                    item_pickup_sound.volume = 0.5;
	                    item_pickup_sound.playMode('restart');
	                    item_pickup_sound.play();
	                }
	                items_sold.push(items[k]);
	                items.splice(k, 1);
	                num_coins+=2;
	            }
	        }
	    // for exit button
	    }
	    if(in_box(width - 170, 20, 150, 50)){
	    	// exit back to main game here
	    	running_general_store = false;
	    	y-=10;
	    	items_sold = [];
	    	if(sound_sound){
				select_mode_sound.play();
			}

	    }
	    // for sell all button
	    if(in_box(width/2 + 300, height/2 + 100, 75, 25) && !settings_shown){
	    	if(items.length > 0){
	    		var total = 0;
		    	items_sold = items_sold.concat(items);
		    	for (var k = items.length - 1; k >= 0; k--) {
		    		num_coins += 2;
		    		total += 2;
		    	}
		    	alertify.error("All items sold for " + total + " gold...");
	            // for sound effect of getting item
	            if(sound_sound){
	                item_pickup_sound.volume = 0.5;
	                item_pickup_sound.playMode('restart');
	                item_pickup_sound.play();
	            }
		    	items = [];
	    	}else{
	    		alertify.error("You don't have anything to sell...");
	    		if(sound_sound){
	                failure_sound.volume = 0.5;
	                failure_sound.playMode('restart');
	                failure_sound.play();
	            }
	    	}
	    }
	    // for undo one button
	    if(in_box(width/2 + 300, height/2 + 135, 75, 25) && !settings_shown){
	    	if(items_sold.length > 0){
	    		items.push(items_sold.pop());
	    		num_coins -= 2;
	    		alertify.success("Item added back!");
	    		if(sound_sound){
	                item_dropped_sound.volume = 0.5;
	                item_dropped_sound.playMode('restart');
	                item_dropped_sound.play();
	            }
	    	}else{
	    		alertify.error("Nothing to undo...");
	    		if(sound_sound){
	                failure_sound.volume = 0.5;
	                failure_sound.playMode('restart');
	                failure_sound.play();
	            }
	    	}
	    }
	    // for undo all button
	    if(in_box(width/2 + 300, height/2 + 170, 75, 25) && !settings_shown){
	    	if(items_sold.length > 0){
	    		for (var k = items_sold.length - 1; k >= 0; k--) {
		    		items.push(items_sold[k]);
		    	}
		    	num_coins -= items_sold.length*2;
		    	alertify.success(items_sold.length + " items added back!");
		    	items_sold = [];
	    		if(sound_sound){
	                item_dropped_sound.volume = 0.5;
	                item_dropped_sound.playMode('restart');
	                item_dropped_sound.play();
	            }
	    	}else{
	    		alertify.error("Nothing to undo...");
	    		if(sound_sound){
	                failure_sound.volume = 0.5;
	                failure_sound.playMode('restart');
	                failure_sound.play();
	            }
	    	}
	    }
	}

	// for end of turtle mini_game so you can play agin or leave
	if(mini_game_playing && game_over){
		if(in_box(width/2 - 75, height/2 + 50, 150, 50)){
			if(num_coins > 0){
				if(sound_sound){
					select_mode_sound.play();
				}
				// play again here
				reset_mini_game();
			}else{
				alertify.error("Sorry, you don't have any gold left to bet...");
			}
			
		}else if(in_box(width/2 - 75, height/2 + 120, 150, 50)){
            if(sound_sound){
				select_mode_sound.play();
			}
			// exit back to main game here
			y-=10;
			reset_mini_game();
			mini_game_playing = false;
		}
	}
	if(choosing_mode && !mini_game_playing && !running_general_store){
		if(in_box(width/2 - 150, height/2 + 113, 300, 70)){
			button_clicked_lag = 12;
			if(sound_sound){
				select_mode_sound.play();
			}
			choosing_mode = false;
			exploration_mode = false;
		}else if(in_box(width/2 - 150, height/2 + 13, 300, 70)){
			button_clicked_lag = 12;
            if(sound_sound){
				select_mode_sound.play();
			}
			choosing_mode = false;
			exploration_mode = true;

		}
	}else{
		if(!exploration_mode){
			// to delete things
			if (keyIsDown(8)){
				// to clear all on screen
				if(keyIsDown(16)){
					for (var k = solid_objects.length - 1; k >= 0; k--) {
						if(solid_objects[k].x > - x - 100 && solid_objects[k].x < - x + width && solid_objects[k].y > - y - 100 && solid_objects[k].y < - y + height){
							solid_objects.splice(k, 1)
						}
					}
				}
				// to clear an individual object
				for (var k = solid_objects.length - 1; k >= 0; k--) {
					if(solid_objects[k].bump(x - mouseX + width/2, y - mouseY + height/2)){
						solid_objects.splice(k, 1)
					}
				}
			} // for adding trees
			else if(keyIsDown(16)){
				if(keyIsDown(49)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 50, 1, 0));
				}else if(keyIsDown(50)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 50, 1, 1));
				}else if(keyIsDown(51)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 50, 1, 2));
				}else if(keyIsDown(52)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 50, 1, 3));
				}else if(keyIsDown(53)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 50, 1, 4));
				}else if(keyIsDown(54)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 50, 1, 5));
				}
			} // for adding buildings
			else if(keyIsDown(18)){
				if(keyIsDown(49)){
					solid_objects.push(new solid_object(-x + mouseX - 75, -y + mouseY - 150, 0));
				}else if(keyIsDown(50)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 150, 2, 0));
				}else if(keyIsDown(51)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 150, 2, 1));
				}else if(keyIsDown(52)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 150, 2, 2));
				}else if(keyIsDown(53)){
					solid_objects.push(new solid_object(-x + mouseX - 50, -y + mouseY - 150, 2, 3));
				}else if(keyIsDown(54)){
					solid_objects.push(new solid_object(-x + mouseX - 75, -y + mouseY - 75, 3, 0));
				}else if(keyIsDown(55)){
					solid_objects.push(new solid_object(-x + mouseX - 75, -y + mouseY - 80, 3, 1));
				}else if(keyIsDown(56)){
					solid_objects.push(new solid_object(-x + mouseX - 100, -y + mouseY - 120, 3, 2));
				}else if(keyIsDown(57)){
					solid_objects.push(new solid_object(-x + mouseX - 80, -y + mouseY - 30, 3, 3));
				}
			}
			
		}else{
			// see if inventory bag was clicked
		    if(in_box(width-40, 10, 30, 40) || hotkey == 'i'){
		        if(sound_sound){
		            icon_clicked_sound.volume = 0.5;
		            icon_clicked_sound.playMode('restart');
		            icon_clicked_sound.play();
		        }
		        inventory_shown = !inventory_shown
		    // see if compass icon was clicked
		    }else if(in_box(10, 10, 50, 50) || hotkey == 'm'){
		        if(sound_sound){
		            icon_clicked_sound.volume = 1.5;
		            icon_clicked_sound.playMode('restart');
		            icon_clicked_sound.play();
		        }
		        map_shown = !map_shown;
		    // see if an item inside the inventory screen was clicked
		    }else if(inventory_spots > 0 && inventory_shown && in_box(width-200, 7, 190, 293)){
		        for (var k = 0; k < 81; k++) {
		            if(mouseX > width - 195 + ((k % 9)* 20) && mouseX < width - 195 + ((k % 9)* 20) + 20 && mouseY > 80 + (Math.floor(k/9)* 25) && mouseY < 80 + (Math.floor(k/9)* 25) + 20 && k < inventory_spots){
		                npc_list.push(new npc(-x + width/2 + random(-30, 30), -y + height/2 + random(30, 40), items[k]));
		                alertify.error("Item dropped");
		                // for sound effect of getting item
		                if(sound_sound){
		                    item_dropped_sound.volume = 0.5;
		                    item_dropped_sound.playMode('restart');
		                    item_dropped_sound.play();
		                }
		                items.splice(k, 1);
		            }
		        }
		    }else if(inventory_spots < 81){
		        for (var k = npc_list.length - 1; k >= 0; k--) {
		            if(npc_list[k].item_click(x, y)){
		                //check if item is within players grab circle
		                if(Math.sqrt((mouseX-width/2)*(mouseX-width/2) + (mouseY-height/2)*(mouseY-height/2)) < 75){
		                    items.push(npc_list[k].character_select);
		                    npc_list.splice(k, 1);
		                    alertify.success("Item added to inventory");
		                    items.sort(function(a, b) {
		                      return a - b;
		                    });
		                    // for sound effect of getting item
		                    if(sound_sound){
		                        item_pickup_sound.volume = 0.5;
		                        item_pickup_sound.playMode('restart');
		                        item_pickup_sound.play();
		                    }
		                }else{
		                    range = 100;
		                }
		            }
		        }
		    // to show red flash if inventory is full
		    }else if(inventory_spots == 81){
		        range = -100;
		    }
		}
	}
}

function in_box(corner_x, corner_y, box_width, box_height, x = mouseX, y = mouseY){
	return (x > corner_x && x < corner_x + box_width && y > corner_y && y < corner_y + box_height);
}