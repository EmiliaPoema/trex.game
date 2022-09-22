var PLAY=1;
var END=0;
var gameState = PLAY;
var trex ,trex_running;
var ground, groundImage;
var invisibleGround;
var cloud, cloudImage; 
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameOver, gameOverImg,restart,restartImg;
var trex_collided;
var jumpSound, checkPointSound, dieSound;

function preload(){
 
trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
trex_collided = loadImage("trex_collided.png");
groundImage = loadImage ("ground2.png");

cloudImage = loadImage ("cloud.png");

obstacle1 = loadImage ("obstacle1.png");
obstacle2 = loadImage ("obstacle2.png");
obstacle3 = loadImage ("obstacle3.png");
obstacle4 = loadImage ("obstacle4.png");
obstacle5 = loadImage ("obstacle5.png");
obstacle6 = loadImage ("obstacle6.png");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

jumpSound = loadSound ("jump.mp3");
checkPointSound = loadSound("checkPoint.mp3");
dieSound =loadSound ("die.mp3");

}

function setup(){
createCanvas(windowWidth,windowHeight);
  


  trex = createSprite (50, windowHeight-90, 20,50); 
  trex.addAnimation("running",trex_running);
  trex.x = 50;
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.7;

  ground = createSprite (windowWidth/2,windowHeight,1200,10);
  ground.addImage ("ground", groundImage);
  
  invisibleGround = createSprite(300,windowHeight+17,600,75);
  invisibleGround.visible = false;

  gameOver = createSprite(windowWidth/2,windowHeight/2+20);

  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(windowWidth/2,windowHeight/2-20);
restart.addImage(restartImg);
restart.scale = 0.5;

obstaclesGroup = new Group();
cloudsGroup = new Group ();

trex.debug=false;
trex.setCollider("rectangle", 0,0,40,40);
  score = 0;
}

function draw(){
 background(231)

 text ("pontuação: " + score, 20,30);

if(gameState === PLAY) {
gameOver.visible = false;
restart.visible =false;
  ground.velocityX = -(5 +3*score/100);
  score = score + Math.round(getFrameRate()/60);
  if (ground.x <0) {
   ground.x = ground.width/2;
 }
 if (score>0 && score%100===0){
checkPointSound.play()
 }
  if (touches.length >0 || keyDown("space")){
trex.velocityY = -10;
jumpSound.play();
touches = [];

 }

trex.velocityY = trex.velocityY +0.5;
spawnClouds(); 
spawnObstacles();
if (obstaclesGroup.isTouching(trex)) {
 dieSound.play();
gameState = END;
}
}
else if(gameState === END){
  gameOver.visible = true;
  restart.visible = true; 
ground.velocityX = 0;
trex.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation("collided", trex_collided);
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

if (mousePressedOver(restart)) {
  reset();
  }

}

 
 
 
trex.collide(invisibleGround);



drawSprites();
}

function reset(){
gameState = PLAY;
gameOver.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running", trex_running);
score=0;
}

function spawnClouds(){
  if (frameCount % 60 === 0){
cloud = createSprite(windowWidth,100,40,10);
cloud.addImage(cloudImage);
  cloud.velocityX = -3;
  cloud.y = Math.round(random(100,220));

  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;

  cloud.lifetime = 200;
//cloudsGroup.add(cloud);
}
 }
  function spawnObstacles(){
if (frameCount % 60 === 0){
obstacle = createSprite(windowWidth,windowHeight-30,10,40); 
obstacle.velocityX = -(6 + score/100); 
 var rand = Math.round(random(1,6));
  switch (rand){
  case 1: obstacle.addImage(obstacle1);
 break; 
 case 2: obstacle.addImage(obstacle2);
 break;
 case 3: obstacle.addImage(obstacle3);
 break; 
 case 4: obstacle.addImage(obstacle4); 
 break;
case 5: obstacle.addImage(obstacle5);
 break; 
 case 6: obstacle.addImage(obstacle6);
break;
 default: break;

 } 
 obstacle.scale = 0.8;
 obstacle.lifetime = 300;

 obstaclesGroup.add(obstacle);
 }
}


























