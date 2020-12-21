 var score = 0
var survivalTime=0
 
var PLAY = 1
var END = 0 
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground 

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400)
  monkey = createSprite(50,300,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.2
  monkey.setCollider("circle",0,0,250)
  
  ground = createSprite(1,380,1600,50)
  ground.velocityX=-6
  ground.x=ground.width/2
  FoodGroup = new Group()
  obstacleGroup = new Group()
  
}


function draw() {
background("lightblue")
  text("SCORE "+score,20,20)
    monkey.collide(ground)
   text("Survival Time = "+survivalTime,200,20) 
 
  
  if(gameState===PLAY){
  
  if(keyDown("space")&&monkey.y>155){
  monkey.velocityY=-12
 
 }
    if(ground.x<0){
      ground.x=ground.width/2
    }
  monkey.velocityY = monkey.velocityY+0.8
  
  if(frameCount%10===0){
 survivalTime = survivalTime+1
 
 } 
  if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach()
  score = score+1
  }
  SpawnObstacles()  
  SpawnFood()  
  }
  if(monkey.isTouching(obstacleGroup)){
  gameState=END
  FoodGroup.destroyEach()
  }
  if(gameState===END){
    obstacleGroup.setVelocityXEach(0)
   ground.velocityX=0
    FoodGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1)
    textSize(20)
   monkey.velocityY=0
    text("GAME OVER ",200,200)
  }
   drawSprites()
  
}

function SpawnObstacles(){
if(frameCount%300===0){
  obstacle=createSprite(400,320,20,20)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-6
  obstacle.lifetime=100
  obstacle.scale=0.2
  
  
  obstacleGroup.add(obstacle)
}
 

}
  

function SpawnFood(){

if(frameCount%80===0){
banana = createSprite(400,Math.round(random(120,200)),20,20)
banana.addImage(bananaImage)
banana.lifetime=100
banana.velocityX=-6
banana.scale=0.1
FoodGroup.add(banana)

}

 





}



