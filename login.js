var logged_in = false;
var username = "Nemo";
var password = null;

document.addEventListener("DOMContentLoaded", function(event) { 
  welcome_prompt();
});

function check_username(username_entered){
  if(username_entered == null){
    alertify.success("Enjoy the game!");
    logged_in = true;
    num_coins = 100;
    x = -1878;
    y = -2634;
  }else{
    database.ref("/users/" + username_entered).once('value', function(snapshot) {
      if((snapshot.val() !== null)){
        alertify.prompt("<b style='font-size: 20px'>Password:</b>", function(evt, value) { check_password(value, username_entered); }, 'password');
      }else{
        alertify.error("Username doesn't exist! Try again...");
        welcome_prompt();
      }
    });
  }
}

function check_password(password_entered, username_entered){
  if(password_entered == null){
      welcome_prompt();
    }else{
    var realpass;
    database.ref('/users/' + username_entered).once('value').then(function(snapshot) {
      realpass = snapshot.val().password;
      if(realpass === password_entered){
        num_coins = snapshot.val().gold;
        x = snapshot.val().xpos;
        y = snapshot.val().ypos;
        logged_in = true;
        username = username_entered;
        password = snapshot.val().password;
        alertify.success("Welcome " + username_entered + "!");
      }else{
        alertify.error("Wrong password! Try Again...");
        check_username(username_entered);
      }
    });
  }
}

function welcome_prompt(){
  alertify.prompt("<h1 style='font-size: 30px'>Welcome to Kingdom's Edge!</h1><div>Sign in below with your username or <a href='signup.html'>Sign up</a>!</div><p style='font-size: 10px'>(If you'd like to play without signing in simply press cancel.)</p><b style='font-size: 20px'>Username:</b>", function(evt, value) { check_username(value); }, 'username');
}






