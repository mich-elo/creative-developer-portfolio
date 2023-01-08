import { iscollideBottom, detectCollision } from "./engine/collisions.mjs";
import GAMEDATA from "./gamedata/gamedata.mjs";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var camera = document.getElementById("camera");

canvas.width = 2560;
canvas.height = 640;

canvas.style.top = canvas.offsetTop + "px";
canvas.style.left = canvas.offsetLeft + "px";

var width = canvas.width;
var height = canvas.height;

// images
var loadedImages = [];
var idleAnimationImages = [];


var frameWidth = 128;
var frameHeight = 128;


var fps = 16;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var deltaValue;

// garvity
var gravity = {x: 0, y: 0.8};

// player position
var player = {
    pos: {
        x: 0, 
        y: 10
    }, 
    vel: {x: 7, y: 10}, // velocity
}

var spriteColumn = 0;
var yposition = 20;

var animationStates = {
    running:'running',
    idle:"idle",
    jump:"jump"
}

var currentAnimationState = animationStates.idle


// view variables

var viewLimitRight = canvas.clientWidth - (camera.clientWidth);
var viewLimitLeft = 0;

// CONSTANTS
const JUMPHEIGHT = 100;


function init(){
    for(var i = 0; i < 8; i++){
        loadedImages[i] = new Image();
        loadedImages[i].onload = function() { };
        loadedImages[i].src = `../assets/images/run/run${i+1}.png`;
    }

    for(var i = 0; i < 17; i++){
        idleAnimationImages[i] = new Image();
        idleAnimationImages[i].onload = function() { };
        idleAnimationImages[i].src = `../assets/images/idle/idle${i+1}.png`;
    }
}

init();


document.addEventListener('keydown', (event) => {
    var code = event.code;

    if(code === "KeyA"){
        updatePlayerLeftPos()
    }
    
    if(code === "KeyD"){
        currentAnimationState = animationStates.running;
        updatePlayerRightPos()
    }

    if(code === "Space"){
        udatePlayerJump()
    }

}, false);


window.addEventListener("keyup", (event)=>{
    currentAnimationState = animationStates.idle
}, false)




function playRunAnimation(){
    // update run sprite
    if(spriteColumn >= 6){
        spriteColumn = 0
    }
    spriteColumn++;
}

function playIdleAnimation(){
    // update run sprite
    if(spriteColumn >= 6){
        spriteColumn = 0
    }
    spriteColumn++;
}

function playerJumpAnimaion(){}


function updatePlayerLeftPos(){
    if(player.pos.x > 0){
        player.pos.x -= player.vel.x;
    }
    cameraUpdateLeft()
}

function updatePlayerRightPos(){
    if(player.pos.x < canvas.clientWidth-120){
        player.pos.x += player.vel.x;
        console.log(player.pos.x)
    }
    cameraUpdateRight() 
}



function udatePlayerJump(){
    player.vel.y -= gravity.y;
    player.pos.y -= player.vel.y;
}


function updatePlayerGravity(deltaValue){
    var isColliding = iscollideBottom( 
        player.pos.y + 128, 
        GAMEDATA.ground1.yPos,
        player.pos.x,
        GAMEDATA.ground1.width + GAMEDATA.ground1.xPos,
        player.pos.x + 128,
        GAMEDATA.ground1.xPos
    )

    if(!isColliding){
        
        yposition = yposition + ( deltaValue * 40 );

        if(player.pos.y >= (height - frameHeight)){
            player.pos.y = height - frameHeight;
            player.vel.y = 0;
        }else{
            // gravity
            player.vel.y += gravity.y;
            player.pos.y += player.vel.y
        }
    }
    
}



function playerUpadate(deltaValue){
    updatePlayerGravity(deltaValue);
}


function update(deltaValue){

    var iscollide = detectCollision(
        player.pos.x,
        player.pos.x + 128,
        player.pos.y,
        player.pos.y + 128,
        GAMEDATA.ground1.xPos,
        GAMEDATA.ground1.width + GAMEDATA.ground1.xPos,
        GAMEDATA.ground1.yPos,
        GAMEDATA.ground1.height + GAMEDATA.ground1.yPos
    )
    
    playerUpadate(deltaValue)
    
}

function draw(){
    ctx.clearRect(0, 0, width, height);
    //draw player

    ctx.fillStyle = 'rgba(0,255,255,0.5)';
    ctx.fillRect(player.pos.x, player.pos.y, frameWidth, frameHeight);
    
    // if(currentAnimationState === animationStates.running){
    //     ctx.drawImage(loadedImages[spriteColumn], player.pos.x, player.pos.y, frameWidth, frameHeight );
    // }
    // else{
    //     ctx.drawImage(idleAnimationImages[spriteColumn], player.pos.x, player.pos.y, frameWidth, frameHeight);
    // }
}


function gameLoop(timeStamp) {

    window.requestAnimationFrame(gameLoop)
    
    now = Date.now();
    delta = now - then;
    deltaValue = delta / 1000;

    update(deltaValue);
    draw();

    // using this section to update animations
    if(delta > interval){
        then = now - (delta % interval);

        // ... Code for Drawing the Frame ...

        // update the images at the defined frames
        if(currentAnimationState === animationStates.running){
            playRunAnimation();
        }
        else{
            playIdleAnimation()
        }

    }
}


//  camera functions

function cameraUpdateLeft(){
    var cameraAbsoluteXPos = Math.abs(parseInt(canvas.style.left));
    var viewCenterX = cameraAbsoluteXPos + (camera.clientWidth/2);
    

    var offset = 100;
    // limit left
    if((cameraAbsoluteXPos > viewLimitLeft) && (player.pos.x <= (viewCenterX - offset))){
        canvas.style.left = (parseInt(canvas.style.left) + player.vel.x) + "px" 
    }
}

function cameraUpdateRight(){
    var cameraAbsoluteXPos = Math.abs(parseInt(canvas.style.left));
    var viewCenterX = cameraAbsoluteXPos + (camera.clientWidth/2);
    
    // limit right
    if((cameraAbsoluteXPos < viewLimitRight) && (player.pos.x >= viewCenterX)){
        canvas.style.left = (parseInt(canvas.style.left) - player.vel.x) + "px"
    }
    
}

window.requestAnimationFrame(gameLoop)
