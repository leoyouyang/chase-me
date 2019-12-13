var xPos, yPos, fxPos, fyPos, pcount, ccount, num, fxtemp, fytemp, startTime, currentTime, time, currentBoy, boy, boy_r, coin, bg, fv, leveltext, v, startimage, tutorialImg, startflag, getcoin, myFont;

function preload() {
  boy_l = loadImage('assets/boy_l.png');
  boy_r = loadImage('assets/boy_r.png');
  boy_u = loadImage('assets/boy_u.png');
  boy_d = loadImage('assets/boy_d.png');
  coin = loadImage('assets/coin.png');
  bg = loadImage('assets/background.jpg');
  level_n = loadImage('assets/level_n.jpg');
  level_e = loadImage('assets/level_e.jpg');
  level_h = loadImage('assets/level_h.jpg');
  tutorialImg = loadImage('assets/tutorial.jpg');
  getcoin = loadSound('assets/getcoin.mp3');
  myFont = loadFont('assets/MiniSet2.ttf');
}

function setup() {
  createCanvas(500, 500);
  
  currentBoy = boy_l;
  startimage = level_n;

  xPos = 0;
  yPos = 250;

  fxPos = 250;
  fyPos = 250;

  pcount = 0;
  ccount = 0;
  
  fv = 2;
  v = 3;
  startflag = 0;

  num = rannum();

  fill(0);
  noStroke();
  imageMode(CENTER);
  textFont(myFont);
}

function draw() {
  image(startimage, 250, 250, 500, 500);
  currentTime = millis();

  if (startflag == 0) {
    //let the player to choose a difficult level
    diffLevel();
    
    //press "enter" to go to the tutorial
    if (keyIsDown(13)){
      startflag = 1;
    }
    
  }
  
  else if (startflag == 1) {
    //show the tutorial
    image(tutorialImg, 250, 250, 500, 500);
    if (keyIsDown(32)){
      startflag = 2;
      startTime = millis();
    }
  }
  
  else if (startflag == 2){
    //start the game
    image(bg, 250, 250, 500, 500);
    time = (currentTime - startTime) / 1000;

    //move the player
    movePlayer();

    //move the coin
    moveCoin();

    //check for a collision and respond appropriately
    checkCollision();

    //display the time
    displayTime();
    
    //quit the game when pressing ESC
    if (keyIsDown(27)){
      setup();
    }
  }

}

function displayTime() {
  gametime = int(time);
  text("# of catches: " + pcount, 20, 25);
  text("# of get aways: " + ccount, 20, 45);
  text("Time game has been running: " + gametime, 20, 65);
  text("Press ESC to quit", 374, 25);
}

function diffLevel() {

  //select the level
  if (keyIsDown(69)) {
  fv = 1;
  startimage = level_e;
  //leveltext = "Your difficulty level is  <Easy>.";
  }

  else if (keyIsDown(78)) {
  fv = 2;
  startimage = level_n;
  //leveltext = "Your difficulty level is  <Normal>.";
  }

  else if (keyIsDown(72)) {
  fv = 3;
  startimage = level_h;
  //leveltext = "Your difficulty level is  <Hard>.";
  }
}

function rannum() {
  //create a random number
  var num = int(random(1, 5));
  return num;
}

// function updateRange(clickedRange) {
//   // grab the range data as an integer
//   v = int(clickedRange.value);
// }

function movePlayer() {
  if (keyIsDown(65)) {
    currentBoy = boy_l;
    xPos -= v;
    fxPos += fv;
    if (fxtemp == fxPos){
      fxPos += fv;
      fyPos += fv;
    }
  }
  if (keyIsDown(68)) {
    currentBoy = boy_r;
    xPos += v;
    fxPos -= fv;
    if (fxtemp == fxPos){
      fxPos -= fv;
      fyPos -= fv;
    }
  }
  if (keyIsDown(87)) {
    currentBoy = boy_u;
    yPos -= v;
    fyPos += fv;
    if (fytemp == fyPos){
      fyPos += fv;
      fxPos += fv;
    }
  }
  if (keyIsDown(83)) {
    currentBoy = boy_d;
    yPos += v;
    fyPos -= fv;
    if (fytemp == fyPos){
      fyPos -= fv;
      fxPos -= fv;
    }
  }

  if (xPos > width) {
    xPos = 0;
  }
  if (xPos < 0) {
    xPos = width;
  }
  if (yPos > height) {
    yPos = 0;
  }
  if (yPos < 0) {
    yPos = height;
  }
  image(currentBoy, xPos, yPos, 28, 28);
}

function moveCoin() {
  if(num == 1){
      fxtemp = fxPos;
      fxPos += fv;
  }
  else if(num == 2){
      fxtemp = fxPos;
      fxPos -= fv;
  }
  else if(num == 3){
      fytemp = fyPos;
      fyPos += fv;
  }
  else if(num == 4){
      fytemp = fyPos;
      fyPos -= fv;
  }

  if (fxPos > width || fxPos < 0) {
    fxPos = 250;
    ccount += 1;
    if(num == 1){
      xPos = 0;
      yPos = 250;
    }
    else if(num == 2){
      xPos = 250;
      yPos = 0;
    }
    else if(num == 3){
      xPos = 500;
      yPos = 250;
    }
    else if(num == 4){
      xPos = 250;
      yPos = 500;
    }
    num = rannum();
  }

  if (fyPos > height || fyPos < 0) {
    fyPos = 250;
    ccount += 1;
    if(num == 1){
      xPos = 0;
      yPos = 250;
    }
    else if(num == 2){
      xPos = 250;
      yPos = 0;
    }
    else if(num == 3){
      xPos = 500;
      yPos = 250;
    }
    else if(num == 4){
      xPos = 250;
      yPos = 500;
    }
    num = rannum();
  }
  image(coin, fxPos, fyPos, 26, 26);
}

function checkCollision() {
  var d =dist(xPos, yPos, fxPos, fyPos);
  if (d<25) {
    pcount += 1;
    getcoin.play();
    fxPos = 250;
    fyPos = 250;

    //give the character a new initial point
    if(num == 1){
      xPos = 0;
      yPos = 250;
    }
    else if(num == 2){
      xPos = 250;
      yPos = 0;
    }
    else if(num == 3){
      xPos = 500;
      yPos = 250;
    }
    else if(num == 4){
      xPos = 250;
      yPos = 500;
    }
    num = rannum();
  }
}
