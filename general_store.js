
var running_general_store = false;
var items_sold = [];

function run_general_store(){
	clear();
	background(0);
	// check to see if background music should be played
    music_handler();
	image(general_store_background, 0, 0, 800, 600, 0, 0, 750, 422);
	image(store_manager, 210, 200, 230, 300, 0, 0, 359, 470);
	fill(255);
	strokeWeight(10);
	stroke(0);
	textSize(20);
	text("Welcome to my store traveler. I'm currently\nin the process or reorganizing my shop's inventory"
		+ "\nso sadly I have nothing to sell you. But, I'll\ntell you what...I'll buy any item you have, no \nmatter"
		+ " its condition, for 2 gold...", 50, 50);

	text("Your items:", width - 650, height - 230);
	textSize(12);
	text("(Click an item to sell it)", width - 650, height - 20);

	fill(175, 175, 175, 200);
	strokeWeight(1);
	rect(width - 650, height - 220, 540, 180);
	// displays items in inventory
    for (var k = 0; k <= items.length - 1; k++) {
        var item_select = (-items[k]) - 1;
        var x_select = (34.08 * (item_select % 23));
        var y_select = (34.1 * (Math.floor(item_select / 19)));
        image(items_sheet, width - 650 + ((k % 18)* 30), height - 220 + (Math.floor(k/18)* 35), 30, 30, x_select, y_select, 34.08, 34.1);
    }

    // for buttons
	strokeWeight(2);
	fill(200);
	rect(width - 170, 20, 150, 50, 20);
	fill(0, 150, 0);
	rect(width/2 + 300, height/2 + 100, 75, 25, 20);
	fill(150, 0, 0);
	rect(width/2 + 300, height/2 + 135, 75, 25, 20);
	rect(width/2 + 300, height/2 + 170, 75, 25, 20);
	fill(0);
	noStroke();
	textSize(13);
	text(" Sell All", width/2 + 313, height/2 + 117);
	text("Undo One", width/2 + 308, height/2 + 152);
	text("Undo All", width/2 + 313, height/2 + 188);
	textSize(30);
	text("EXIT", width - 135, 55);

    // for coin icon display
	stroke(0);
    fill(0, 255, 0);
    textSize(20);
    strokeWeight(3);
    image(gold_icon, 0, height - 50, 80, 50, 0, 0, 250, 182);
    text(num_coins, 10, height - 15);

}