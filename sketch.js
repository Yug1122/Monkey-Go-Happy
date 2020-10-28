var PLAY =1 ;
var END = 0;
var gameState =1 ;
var reset;
var gameOver, gameOverImage;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score ;
var ground;
var background1,backgroundImage;

function preload(){
  
  
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameOverImage = loadImage ("gameOver.png");
  backgroundImage = loadImage("jungle.jpg");
}



function setup() {
  

  
  var survivalTime = 0; 
  monkey = createSprite(50,380,20,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
 
  
  ground = createSprite(200,400,800,20);
  ground.velocityX = -4;
  console.log(ground.x);

   FoodGroup = new Group();
   obstacleGroup = new Group();

  background1 = createSprite (200,200,800,20);
  background1.addImage( "background",backgroundImage);
  background1.scale =0.5;
  background1.velocityX =-4;

score = 0; 

}


function draw() {
  background("white"); 
   
  if (ground.x<0){
    ground.x = ground.width/2;  
  }
  if (gameState === PLAY ){
     stroke("black");                                   
  textSize(18);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime : "+ survivalTime,110,50);
    text ("Score : "+ score , 320,30)
   spawnFood(); 
  spawnObstacles();
   
if (keyDown("space")&&monkey.y>=359.3){
  
  monkey.  velocityY =- 12  ; 
}
    monkey.velocityY = monkey.velocityY + 0.8; 
    
    console.log(monkey.y)
    if (obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.destroy();
      gameState = END;
    }

}
  if(gameState === END){
   gameOver = createSprite(200,200);
    gameOver.addImage ("gameOver",gameOverImage);  
    gameOver.scale = 0.5;
    background("white");
    
  }


  
 
   monkey.depth = background1.depth;
   monkey.depth = monkey.depth+1;
  
   ground.depth = background1.depth ;
   ground.depth = ground.depth+1;
  monkey.collide(ground);
  
 reset();
 
  
  drawSprites();
  

  if (FoodGroup.isTouching(monkey)){
    score = score+1;  
    FoodGroup.destroyEach();
    switch(score){
   case 10 : monkey.scale = 0.12;
           break;
   case 20 :monkey.scale = 0.14;
           break;
   case 30 : monkey.scale = 0.16;
          break; 
   case 40 :monkey.scale = 0.18;
        break;
  default:break;
  }
  }
  
  
}
 
   
   
    
function spawnFood(){
  if (frameCount%80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(250,330);
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth+1;
    banana.addImage("banana",bananaImage)   ;
    banana.scale = 0.05;
    FoodGroup.add(banana);
}
 
}
function spawnObstacles(){
  if (frameCount%300 === 0){
    obstacle = createSprite(800,380,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.15
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle); 
  }
}

function reset(){
  if(background1.x<150){
    background1.x = 200;
    
  }
}



