/*
TODO:

1. make it so you can enter buildings

2. add mini games (turtle races with betting?)----> triggered when in a building?

3. add money? trading with npcs?

4. make certain mini games require money or items to play

5. have items pop up randomly and then diapear after so much time
*/
var canvas;

var backdrop, small_map;

var i;
var j;
var x;
var y;
var player_direction;
var player_img;
var npc_list = [];
var music_checkbox, sound_checkbox;
var background_audio = [];
var current_track;
var intro_track;
var item_pickup_sound, icon_clicked_sound, item_dropped_sound, select_mode_sound;
var loading_gif;
var inventory_icon, compass_icon, heart_icon, settings_icon, gold_icon;
var checked_box_icon, unchecked_box_icon;

var range = 0;

var items = [];
var num_coins;
var inventory_spots = 0;

var items_sheet, trees_sheet, babies_sheet, shadow1, shadow2, turtle_sheet;
var people_sheets = [];

var turret_sheet, buildings3_sheet;

var solid_objects = [];
var all_things = [];

var map_height_and_width = 5000;

var red_button_up, red_button_down, title_screen_background, stone_background;

var mini_game_playing = false;

// use this to seed maps so they always generate the same
var seed = 97656;
function random_num_seed(){
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function preload(){
    // for when loading 
    loading_gif = createImg('images/loading_cube.gif');
    loading_gif.style("height", "100px");
    loading_gif.style("width", "100px");
    loading_gif.position(windowWidth/2 - 55, windowHeight/2 - 70);

    //load sprite sheets and other images
    trees_sheet = loadImage('images/trees.png')
    items_sheet = loadImage('images/items.png');
    for (var k = 0; k < 8; k++) {
        people_sheets[k] = loadImage('images/people' + (k + 1)+ '.png');
    }

    shadow1 = loadImage('images/circle_shadow1.png');
    shadow2 = loadImage('images/circle_shadow2.png');

    red_button_up = loadImage('images/red_button_unclicked.png');
    red_button_down = loadImage('images/red_button_clicked.png');
    title_screen_background = loadImage('images/title_screen_background.png');

    backdrop = loadImage('images/large_map_all_grass.png')
    small_map = loadImage('images/small_map_all_grass.png')
    player_img = loadImage('images/people1.png');
    inventory_icon = loadImage('images/inventory_bag.png');
    compass_icon = loadImage('images/compass.png');
    heart_icon = loadImage('images/heart.png');
    settings_icon = loadImage('images/gears.png');
    gold_icon = loadImage('images/gold_pile.png');
    checked_box_icon = loadImage('images/checked_box.png');
    unchecked_box_icon = loadImage('images/unchecked_box.png');

    turret_sheet = loadImage('images/turrets.png');
    buildings3_sheet = loadImage('images/buildings3.png');

    // load sounds
    for(var k = 1; k < 6; k++){
        background_audio.push(loadSound('audio/Medieval_Music' + k + '.mp3'));
    }
    current_track = background_audio[Math.floor(random(0, 5))];
    icon_clicked_sound  = loadSound('audio/icon_clicked.mp3');
    item_pickup_sound = loadSound('audio/money_bag.wav');
    item_dropped_sound = loadSound('audio/cardboard_box.wav');
    intro_track = loadSound('audio/medieval_introduction.wav');
    select_mode_sound = loadSound('audio/select_mode.wav');

    // for mini game
    stone_background = loadImage('images/stone.jpeg');
    turtle_sheet = loadImage('images/turtles.png');
}

function setup() {
    canvas = createCanvas(800, 600);

    player_direction = 0;
    i = 0;
    j = 0;

    // Move the canvas so it's inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    // bondary trees
    for (var k = -250; k < 0; k++) {
        solid_objects.push(new solid_object(-50, -(k + 5) * 20, 1, Math.floor(random_num_seed()*10%6))); 
    }
    for (var k = -250; k < 0; k++) {
        solid_objects.push(new solid_object(4950, -(k + 5) * 20, 1, Math.floor(random_num_seed()*10%6))); 
    }
    for (var k = -250; k < 0; k++) {
        solid_objects.push(new solid_object(-k * 20, -50 + random(0, 1), 1, Math.floor(random_num_seed()*10%6))); 
    }
    for (var k = -250; k < 0; k++) {
        solid_objects.push(new solid_object(-k * 20, 4870 + random(0, 1), 1, Math.floor(random_num_seed()*10%6))); 
    }

    // no trees in the middle stone place
    /*for (var k = solid_objects.length - 1; k >= 0; k--) {
        if(solid_objects[k].x > 1600 && solid_objects[k].x < 3400 && solid_objects[k].y > 1600 && solid_objects[k].y < 3400 && solid_objects[k].object_select == 1){
            solid_objects.splice(k, 1);
        }
    }*/
}

var player_drawn = false;
var inventory_shown = false;
var map_shown = false
var settings_shown = false;

var exploration_mode = true;
var choosing_mode = true;
var button_clicked_lag = 0;

var music_sound = true;
var sound_sound = true;

function draw(){
    if(frameCount < 150){
        loading_screen();
    }else{
        if(logged_in){
            loading_gif.style("visibility", "hidden");
            clear();
            background(0);
            if(choosing_mode || button_clicked_lag > 0){
                textFont("apple chancery");
                mode_choosing_screen();
            }else{
                //textFont("Georgia");
                intro_track.stop();
                if(exploration_mode){
                    run_eploration_mode();
                }
                else{
                    run_creative_mode();
                }
            } 
            // for settings icon
            if(settings_shown){
                stroke(0);
                strokeWeight(3);
                fill(175, 175, 175, 200);
                rect(width - 200, height - 280, 190, 270);
                fill(0, 0, 0, 250);
                rect(width - 200, height - 60, 190, 50);
                noStroke();
                textSize(26);
                fill(255);
                text("Options", width - 170, height - 30);
                if(sound_sound){
                    image(checked_box_icon, width - 170, height - 260, 20, 20, 0, 0, 300, 300);
                }else{
                    image(unchecked_box_icon, width - 170, height - 260, 20, 20, 0, 0, 300, 300);
                }
                fill(0);
                textSize(20);
                text("Sound", width - 140, height - 243);
                if(music_sound){
                    image(checked_box_icon, width - 170, height - 230, 20, 20, 0, 0, 300, 300);
                }else{
                    image(unchecked_box_icon, width - 170, height - 230, 20, 20, 0, 0, 300, 300);
                }
                text("Music", width - 140, height - 213);
            }
            image(settings_icon, width - 50, height - 50, 35, 35, 0, 0, 1024, 915); 
            writeUserData();
        }else{
            background(0);
        }
        
    }
}

function writeUserData() {
    if(password != null){
        firebase.database().ref('users/' + username).set({
          gold: num_coins,
          xpos: x,
          ypos: y,
          password: password
        });
    }
}

function mode_choosing_screen(){
    if(music_sound && sound_sound){
        if(!intro_track.isPlaying()){
            intro_track.play();
        }
    }else{
        intro_track.pause();
    }
    textSize(25);
    fill(230);
    noStroke();
    image(title_screen_background, 0, 0, width, height, 0, 0, 1604, 1200);
    // to show button click animation
    if(button_clicked_lag > 0){
        if(button_clicked_lag > 1){
            if(!exploration_mode){
                image(red_button_down, width/2 - 150, height/2 + 50);
                image(red_button_up, width/2 - 155, height/2 - 75);
            }else{
                image(red_button_up, width/2 - 150, height/2 + 50);
                image(red_button_down, width/2 - 155, height/2 - 75);
            }
        }else{
            image(red_button_up, width/2 - 150, height/2 + 50);
            image(red_button_up, width/2 - 155, height/2 - 75);
        }
        button_clicked_lag--;
    }else{
        image(red_button_up, width/2 - 150, height/2 + 50);
        image(red_button_up, width/2 - 155, height/2 - 75);
    }
    text("Exploration Mode", width/2 - 101, height/2 + 23);
    text("Creative Mode", width/2 - 85, height/2 + 146);
    textSize(15);
    text("            (Beta v1.09)", width/2 - 95, height/2 + 41);
    text("         (Coming Soon)", width/2 - 85, height/2 + 166);
    fill(255);
    textSize(80);
    text("Kingdom's Edge", width/2 - 285, height/2 - 150);

    // HOT KEYS
    if(frameCount % 10 == 0){
        // options hotkey is 'o'
        if(keyIsDown(79)){
            mouse_clicked('o');
        }
    }
}

function loading_screen(){
    background(0);
    fill(255);
    strokeWeight(10);
    textSize(32);
    text("LOADING...", width/2 - 80, height/2 + 70);
}

var setup_creative_mode = true;
function run_creative_mode(){
    if(setup_creative_mode){
        // trees
        for (var k = -2000; k < 0; k++) {
            solid_objects.push(new solid_object(random_num_seed()*4800, random_num_seed()*4800, 1, Math.floor(random_num_seed()*10%6))); 
        }
        setup_creative_mode = false;
        character_speed = 10;
    }

    // check to see if background music should be played
    music_handler();

    // put down background
    image(backdrop, x, y);

    // sort lists by depth and combine them
    sort_array(npc_list);
    sort_array(solid_objects);
    all_things = npc_list.concat(solid_objects);
    sort_array(all_things);
    
    // all the depth perception work for npcs / player / and objects 
    display_all();

    // remove an npc if thay walk out of bounds / off the map
    for (var k = npc_list.length - 1; k >= 0; k--) {
        if(npc_list[k].x < 0 || npc_list[k].x > 4950 || npc_list[k].y < 0 || npc_list[k].y > 4950){
            npc_list.splice(k, 1);
        }
    }

    // all player movement and collision is controled in here
    player_movement();
}

var setup_exploration_mode = true;
function run_eploration_mode(){

    if(!mini_game_playing){
        if(setup_exploration_mode){
            // create people npcs
            for (var k = 0; k < 500; k++) {
                npc_list.push(new npc(random_num_seed() * map_height_and_width, random_num_seed() * map_height_and_width, k%63)); 
            }
            // purge some of the seed numbers 
            for(var k = 0; k < 1000; k++){
                var num = random_num_seed();
            }
            // create item npcs
            for (var k = -500; k < 0; k++) {
                npc_list.push(new npc(random(0, map_height_and_width), random(0, map_height_and_width), -Math.floor(random(0, 300)))); 
            }
            // turrets
            for (var k = 0; k < 5; k++) {
                solid_objects.push(new solid_object(random_num_seed() * 4800, random_num_seed() * 4800, 0)); 
            }
            // houses
            for (var k = 0; k < 20; k++) {
                solid_objects.push(new solid_object(random_num_seed() * 4000 + 500, random_num_seed() * 4000 + 50, Math.floor(random_num_seed()*10%2+2), Math.floor(random_num_seed()*10%4))); 
            }
            // trees
            for (var k = -2000; k < 0; k++) {
                solid_objects.push(new solid_object(random_num_seed() * 4800, random_num_seed() * 4800, 1, Math.floor(random_num_seed()*10%6))); 
            }
            setup_exploration_mode = false;
        }

        player_drawn = false;
        for (var w = solid_objects.length - 1; w >= 0; w--) {
            solid_objects[w].drawn = false;
        }

        // check to see if background music should be played
        music_handler();

        // put down background
        image(backdrop, x, y);

        // for range circle display if things are out of reach or iventory is full
        range_circle();

        // sort lists by depth and combine them
        sort_array(npc_list);
        sort_array(solid_objects);
        all_things = npc_list.concat(solid_objects);
        sort_array(all_things);
        
        // all the depth perception work for npcs / player / and objects 
        display_all();

        
        for (var k = npc_list.length - 1; k >= 0; k--) {
            // remove an npc if thay walk out of bounds / off the map
            if(npc_list[k].x < 0 || npc_list[k].x > 4950 || npc_list[k].y < 0 || npc_list[k].y > 4950){
                npc_list.splice(k, 1);
            }
            var npc_character_select;
            try{
                npc_character_select = all_things[k].character_select
            }catch(TypeError){
                npc_character_select = 0;
                print("caught character_select");
            }
            //check if player walked over item so they can be picked up
            if(inventory_spots < 81 && npc_character_select < 0 && npc_list[k].x + x > width/2 - 25 && npc_list[k].x + x < width/2 + 10 && npc_list[k].y + y > height/2 - 15 && npc_list[k].y + y < height/2 + 15){
                items.push(npc_list[k].character_select);
                npc_list.splice(k, 1);
                items.sort(function(a, b) {
                  return a - b;
                });
                // for sound effect of getting item
                if(sound_sound){
                    item_pickup_sound.volume = 0.5;
                    item_pickup_sound.playMode('restart');
                    item_pickup_sound.play();
                }
                alertify.success("Item added to inventory");
            }else if(inventory_spots == 81){
                range = -100;
            }

        }

        // to make items apear and disapear
        if(frameCount % 5 == 0){
            var num = Math.floor(random(10, npc_list.length - 1));
            if(npc_list[num].character_select < 0){
                npc_list.splice(num, 1);
                // make sure there is always 300 item
                for (var k = npc_list.length - 1; k < 800; k++) {
                    npc_list.push(new npc(random(0, map_height_and_width), random(0, map_height_and_width), Math.floor(random(-300, -10))));
                }
            }
        }

        // for mini game
        fill(255);
        stroke(3);
        textSize(12);
        text("Turtle racing here!", x + 2405, y + 2190 + height);
        image(turtle_sheet, x + 2420, y + 2180 + height, 48, 48, 40, 0, 48, 48);

        // all player movement and collision is controled in here
        player_movement();

        // display all the icons last ontop of everything on the canvas
        icon_display();

        // HOT KEYS
        if(frameCount % 3 == 0){
            // map hotkey is 'm'
            if(keyIsDown(77)){
                mouse_clicked('m');
            }
            // inventory hotkey is 'i'
            if(keyIsDown(73)){
                mouse_clicked('i');
            }
            // options hotkey is 'o'
            if(keyIsDown(79)){
                mouse_clicked('o');
            }
        }

        // for mini game entrace
        if(in_box(x + 2300 + 120, y + 2300 + height - 90, 30, 55, width/2, height/2)){
            fill(255);
            stroke(3);
            textSize(20);
            if(num_coins > 0){
                text("Press 'e' to enter the turtle racing house...", width/2 - 170, height - 30);
                if(keyIsDown(69)){
                    alertify.alert("Welcome to the Turtle House! Here you can bet on turtle races and win more gold! Just be carful not to get addicted...Good Luck!", function(){ alertify.success("Let's race!"); });
                    mini_game_playing = true;
                }
            }else{
                text("Get some gold and them come back to play...", width/2 - 165, height - 30);
            }
        }
    }else{
        run_mini_game();
    }
        
}

function mousePressed(){
    mouse_clicked();
}

function music_handler(){
    if(current_track.currentTime() >= current_track.duration() - 3){
        current_track = background_audio[Math.floor(random(0, 5))];
    }
    if(music_sound && sound_sound){
        if(!current_track.isPlaying()){
            current_track.play();
        }
    }else{
        current_track.pause();
    }
}

function range_circle(){
    if(range > 0){
        noStroke();
        fill(200, 200, 0, range);
        ellipse(width/2, height/2, 150, 150);
        range-=1;
        if(range == 99){
            alertify.error("Out of range");
        }
    }else if(range < 0){
        noStroke();
        fill(200, 0, 0, -range);
        ellipse(width/2, height/2, 150, 150);
        range+=1;
        if(range == -99){
            alertify.error("inventory full!");
        }
    }

}

function display_all(){
    for (var k = all_things.length - 1; k >= 0; k--) {
        all_things[k].show(x, y);
        if(all_things[k].moveable){
            // make people npcs walk around
            all_things[k].direction(all_things[k].set_direction);
            if(Math.floor(Math.random() * 3) == 0){
                all_things[k].randomWalk();
            }
        }
            

        // set player image correctly in front or behind npcs
        var npc_depth;
        try{
            npc_depth = all_things[k].depth
        }catch(TypeError){
            npc_depth = height/2;
            print("caught npc_depth");
        }
        // for player depth corrections
        if(player_drawn == false){
            if(all_things[k].moveable && npc_depth + y + 12 >= height/2){
                image(player_img, width/2-18, height/2-30, 32, 48, i, j, 32, 48);
                player_drawn = true;
            }else if(npc_depth + y >= height/2){
                image(player_img, width/2-18, height/2-30, 32, 48, i, j, 32, 48);
                player_drawn = true;
            }
        }
    } 
    strokeWeight(2);
    textSize(10);
    fill(255);
    textFont("helvetica");
    text(username, width/2-(username.length*3), height/2 - 30);
    textFont("apple chancery");
}

function sort_array(array){
    array.sort(function(a, b) {
            return - parseFloat(a.depth) + parseFloat(b.depth);
        });
}

var character_speed = 3;

function player_movement(){
    // player movement (using WASD) and collision 
    if (keyIsDown(65)){
        j = 48;
        if(frameCount % 5 == 0){
            if(i < 64){
                i += 32;
            }
            else{
                i = 0;
            }
        }
        x+=character_speed;
        player_direction = 0
    }else if (keyIsDown(68)){
        j = 96;
        if(frameCount % 5 == 0){
            if(i < 64){
                i += 32;
            }
            else{
                i = 0;
            }
        }
        x-=character_speed;
        player_direction = 1;
    }else if (keyIsDown(87)){
        j = 144;
        if(frameCount % 5 == 0){
            if(i < 64){
                i += 32;
            }
            else{
                i = 0;
            }
        }
        y+=character_speed;
        player_direction = 2;
    }else if (keyIsDown(83)){
        j = 0;
        if(frameCount % 5 == 0){
            if(i < 64){
                i += 32;
            }
            else{
                i = 0;
            }
        }
        y-=character_speed;
        player_direction = 3;
    }else{
        i = 32;
        j = 0;
        player_direction = 3;
    }

    var bounce_back = character_speed + 1;

    for (var k = solid_objects.length - 1; k >= 0; k--) {
        if(solid_objects[k].bump(x, y) && exploration_mode){
            if(player_direction == 0){
                x-=bounce_back;
            }else if(player_direction == 1){
                x+=bounce_back;
            }else if(player_direction == 2){
                y-=bounce_back;
            }else if(player_direction == 3){
                y+=bounce_back;
            }
        }
    }
}