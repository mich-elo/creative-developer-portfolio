var canvas = document.getElementById("canvas");
canvas.width = "300"
canvas.height = "500"
var width = canvas.width;
var height = canvas.height;

var ctx = canvas.getContext("2d");


// loading images
var loadedImages = []

for(var i = 0; i < 8; i++){
    loadedImages[i] = new Image();
    loadedImages[i].onload = function() {
        // console.log("Image Loaded");
    };
    loadedImages[i].src = `../assets/images/run/run${i+1}.png`;
}

var idleAnimationImages = []

for(var i = 0; i < 17; i++){
    idleAnimationImages[i] = new Image();
    idleAnimationImages[i].onload = function() {
        // console.log("Image Loaded");
    };
    idleAnimationImages[i].src = `../assets/images/idle/idle${i+1}.png`;

}

// load image sprite
var imgSpriteSheet = new Image();

imgSpriteSheet.onload = function() {
    console.log("Image Loaded");
};
imgSpriteSheet.src = `../assets/images/worrior.png`;


// load single
var testimage = new Image();
testimage.onload = function() {
    // console.log("Image Loaded");
};
testimage.src = `../assets/images/test.png`;



let secondsPassed;
let oldTimeStamp;

let scale = 1;
let frameWidth = 128;
let frameHeight = 128;


var fps = 16;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var deltaValue;

// garvity
var gravity = {x: 0, y: 0.5};

// player position
var player = {
    pos: {x: 0, y: height - frameHeight}, // position
    vel: {x: 6, y: 0}, // velocity
}

let spriteColumn = 0;
let yposition = 20;

var animationStates = {
    running:'running',
    idle:"idle"
}


var currentAnimationState = animationStates.running

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;

    if(code === "KeyW"){
        
    }
    else if(code === "KeyA"){
        player.pos.x -= player.vel.x
    }
    
    else if(code === "KeyD"){
        currentAnimationState = animationStates.running;
        player.pos.x += player.vel.x; 
        console.log(player.pos.x)
    }

    else if(code === "KeyS"){
    }

    else{
        
    }

}, false);


window.addEventListener("keyup", (even)=>{
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
    if(spriteColumn >= 15){
        spriteColumn = 0
    }
    spriteColumn++;
}

function playerUpadate(deltaValue){
    yposition = yposition + ( deltaValue * 40 );


    if(player.pos.y >= (height - frameHeight)){
        player.pos.y = height - frameHeight;
        player.vel.y = 0;
    }else{
        // gravity
        player.vel.y += gravity.y;
        player.pos.y += player.vel.y
    }

    //player animations
    if(currentAnimationState === animationStates.running){
        playRunAnimation();
    }
    else{
        playIdleAnimation()
    }
}





function update(deltaValue){
    // update player variables
    playerUpadate(deltaValue)
    
}

function draw(){
    ctx.clearRect(0, 0, width, height)
    
    //draw player
    if(currentAnimationState === animationStates.running){
        ctx.drawImage(loadedImages[spriteColumn], player.pos.x, player.pos.y, frameWidth * scale , frameHeight * scale );
    }
    else{
        ctx.drawImage(idleAnimationImages[spriteColumn], player.pos.x, player.pos.y, frameWidth * scale , frameHeight * scale );
    }
}


function gameLoop(timeStamp) {

    window.requestAnimationFrame(gameLoop)
    
    now = Date.now();
    delta = now - then;
    deltaValue = delta / 1000;

    if(delta > interval){
        then = now - (delta % interval);

        // ... Code for Drawing the Frame ...

        update(deltaValue);
        draw();

    }
}


window.requestAnimationFrame(gameLoop)
