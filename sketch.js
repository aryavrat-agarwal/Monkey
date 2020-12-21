var ground, groundImage;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var time;
var score;
var PLAY=0;
var END=1;
var gameState=PLAY;
var restart;
function preload(){
  

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,300);
  monkey = createSprite(40,200,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(200,300,600,20);
  ground.x=ground.width/2;
  ground.velocityX=-6;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
  time=0;
  
  restart = createSprite(300,140,15,15);

}


function draw() {
  background("#9CCCEC");
  
  text("survival time : "+time,100,50);
  text("Score : "+score,100,80);
  
  if(gameState===PLAY){
    restart.visible=false;
    if(keyDown("space")&&monkey.y>220){
      monkey.velocityY=-15;
      }
    monkey.velocityY=monkey.velocityY+0.9;
    
    time=time+Math.round(getFrameRate()/62);
    if(foodGroup.isTouching(monkey)){
      score=score+1;
    }
    if(ground.x < 300){
      ground.x = ground.width/2;
     }
    monkey.collide(ground);
    
    spawnFoods();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  else if(gameState===END){
    restart.visible=true;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    text("reset",250,146)
    
     if(mousePressedOver(restart)) {
      reset();
    }

  }
  
  
  
  
   drawSprites();
}
function spawnFoods() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(610,120,40,10);
    banana.y = Math.round(random(100,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(650,280,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX=-4;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;

  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  time=0;
  score = 0;
  
}




