function icon_display(){
    // for inventory icon display
    if(inventory_shown){
        stroke(0);
        strokeWeight(3);
        fill(175, 175, 175, 200);
        rect(width - 200, 7, 190, 300);
        fill(0, 0, 0, 250);
        rect(width - 200, 7, 190, 60);
        noStroke();
        textSize(26);
        fill(255);
        text("Inventory", width - 170, 45);
        var spots = 0;
        // displays items in inventory
        for (var k = 0; k <= items.length - 1; k++) {
            var item_select = (-items[k]) - 1;
            var x_select = (34.08 * (item_select % 23));
            var y_select = (34.1 * (Math.floor(item_select / 19)));
            image(items_sheet, width - 195 + ((k % 9)* 20), 80 + (Math.floor(k/9)* 25), 20, 20, x_select, y_select, 34.08, 34.1);
            fill(255);
            textSize(8);
            //text("x" + multiplier, width - 190 + (((k - multiplier + 1) % 9)* 20), 105 + (Math.floor((k - multiplier + 1)/9)* 25));
            spots++
        }
        inventory_spots = spots;
    }
    image(inventory_icon, width - 45, 15, 30, 40, 0, 0, 529, 720);
    fill(255);
    textSize(10);
    strokeWeight(0.5);
    text(items.length, width - 33, 45);


    // for coins
    fill(0, 255, 0);
    textSize(20);
    strokeWeight(3);
    image(gold_icon, 0, height - 50, 80, 50, 0, 0, 250, 182);
    text(num_coins, 10, height - 15);


    // compass icon display
    if(map_shown){
        noStroke();
        fill(0, 0, 0, 200);
        rect(7, 7, height - 14, height - 14)
        image(small_map, 10, 10, height - 20, height - 20);
        fill(0, 0, 0, 75);
        rect(7, 7, height - 14, height - 14)
        for (var k = npc_list.length - 1; k >= 0; k--) {
            if(npc_list[k].character_select >= 0){
                // people are blue dots
                fill(0,0,255);
            }else{
                // items are black dots
                fill(0,0,0);
            }
            ellipse(10 + npc_list[k].x * ((height - 20) / map_height_and_width), 10 + npc_list[k].y * ((height - 20) / map_height_and_width), 5, 5);
        }
        for (var k = solid_objects.length - 1; k >= 0; k--) {
            if(solid_objects[k].object_select == 0 || solid_objects[k].object_select == 2 || solid_objects[k].object_select == 3){
                // for turrets
                fill(255,255,255);
                rect(13 + solid_objects[k].x * ((height - 20) / map_height_and_width), 13 + solid_objects[k].y * ((height - 20) / map_height_and_width), 10, 10);
            }else if(solid_objects[k].object_select == 1 && solid_objects[k].x > 0 && solid_objects[k].x < 4900 && solid_objects[k].y > 0 && solid_objects[k].y < 4850){
                // for trees
                //fill(0, 255, 0);
                //ellipse(10 + solid_objects[k].x * ((height - 20) / map_height_and_width), 10 + solid_objects[k].y * ((height - 20) / map_height_and_width), 5, 5); 
            }
        }
        fill(255,0,0);
        ellipse(10 - ((x - width/2) * ((height - 20) / map_height_and_width)), 10 - ((y -  height/2) * ((height - 20) / map_height_and_width)), 5, 5);
    }
    image(compass_icon, 15, 15, 50, 50, 0, 0, 513, 512);

    // for health icon display
    /*image(heart_icon, 15, height - 35, 25, 25, 0, 0, 420, 420);
    image(heart_icon, 40, height - 35, 25, 25, 0, 0, 420, 420);
    image(heart_icon, 65, height - 35, 25, 25, 0, 0, 420, 420);
    image(heart_icon, 90, height - 35, 25, 25, 0, 0, 420, 420);
    image(heart_icon, 115, height - 35, 12.5, 25, 0, 0, 210, 420);*/
}
