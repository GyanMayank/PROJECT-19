var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostJumping, ghostImg, ghostJumpingImg;
var invisibleBlockGroup, invisibleBlock;
var gameIsOver,gameIsOverImg
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJumpingImg = loadImage("ghost-jumping.png")
  gameIsOverImg = loadImage("game-over.jpg")
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;

  ghost = createSprite(300,300)
  ghost.addImage("ghostRunnner", ghostImg)
  ghost.addImage("ghostJumping", ghostJumpingImg)

  ghost.scale=0.4

  
  gameIsOver=createSprite(300,300)
  gameIsOver.addImage("gameIsOver",gameIsOverImg)

  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
  doorsGroup=new Group()
 
}

function draw() {
  background(200);

  ghost.changeImage("ghostRunnner", ghostImg)

  if(gameState=="play"){

    gameIsOver.visible=false

    if(keyDown("space")){
      ghost.velocityY=-10
      ghost.changeImage("ghostJumping", ghostJumpingImg)
    }

    tower.velocityY=3

    if(tower.y > 400){
      tower.y = 300
    }

    ghost.velocityY+=0.5

    if(keyDown(LEFT_ARROW)){
      ghost.x-=5
    }

    if(keyDown(RIGHT_ARROW)){
      ghost.x+=5
    }

    if(invisibleBlockGroup.isTouching(ghost)){
    ghost.velocityY=0
    }

    if(climbersGroup.isTouching(ghost)){
    gameState="over"
    }

    ghost.visible=true

    climbersGroup.visible=true
    doorsGroup.visible=true

  }  

  
  if(gameState=="over"){
    gameStateOver()
  }
  
  ghost.setCollider("rectangle",-20,23,150,250)
  ghost.debug=true
  
  spawnHolder()

  drawSprites()
}

function spawnHolder(){

  if(frameCount%200==0){

    var rand=Math.round(random(100,500))

    invisibleBlock = createSprite(rand, 40, 100, 1)
    invisibleBlock.velocityY=3
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlockGroup.visible=false

    door = createSprite(rand, -10)
    door.addImage("door", doorImg)
    door.velocityY=3
    doorsGroup.add(door)
  
    climber = createSprite(rand, 50)
    climber.addImage("climber", climberImg)
    climber.velocityY=3
    climbersGroup.add(climber)

    ghost.depth=door.depth
    ghost.depth+=1

    climbersGroup.setColliderEach("rectangle",0,10,100,1);
    climber.debug=true

  }

}

function gameStateOver(){

  tower.velocityY=0

  gameIsOver.visible=true;
  gameIsOver.scale=0.6

  doorsGroup.setVelocityYEach(0)
  climbersGroup.setVelocityYEach(0)
  invisibleBlockGroup.setVelocityYEach(0)
  ghost.velocityY=0

  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  invisibleBlockGroup.destroyEach()
  ghost.visible=false

  if(mousePressedOver(gameIsOver)){
    reset()
  }
}

function reset(){
  
  gameState="play"
  
}
