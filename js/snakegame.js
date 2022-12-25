import { iscollideBottom, detectCollision } from "./engine/collisions.mjs";
document.addEventListener("DOMContentLoaded", function () {

    // constant game data
    const GAMEDATA  = {
        ground1:{
            xPos:0,
            yPos:512,
            width: 896,
            height: 128
        }
    }

    var canvas = document.getElementById("canvas");

    canvas.width = 2560;
    canvas.height = 640;

    canvas.style.top = canvas.offsetTop + "px"
    canvas.style.left = canvas.offsetLeft + "px"
    
    // console.log(canvas.clientWidth)
    
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");

    // camera
    var camera = document.getElementById("camera");
    // console.log(camera.clientWidth)

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
    var gravity = {x: 0, y: 0.8};

    // player position
    var player = {
        pos: {
            x: 0, 
            y: 10
        }, 
        vel: {x: 7, y: 0}, // velocity
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

        if(code === "KeyA"){
            updatePlayerLeftPos()
        }
        
        else if(code === "KeyD"){
            currentAnimationState = animationStates.running;
            updatePlayerRightPos()

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
        if(spriteColumn >= 6){
            spriteColumn = 0
        }
        spriteColumn++;
    }



    function updatePlayerLeftPos(){
        var camerAbsoluteXPos = Math.abs(parseInt(canvas.style.left));
        var viewCenterX = (camerAbsoluteXPos + (camera.clientWidth/2))-150
        var viewLimitLeft = 0;
        if(player.pos.x > 0){
            player.pos.x -= player.vel.x;
        }
        

        if((camerAbsoluteXPos > viewLimitLeft) && (player.pos.x <= viewCenterX)){
            canvas.style.left = (parseInt(canvas.style.left) + player.vel.x) + "px" 
        }

    }

    function updatePlayerRightPos(){
        var camerAbsoluteXPos = Math.abs(parseInt(canvas.style.left));
        var viewCenterX = camerAbsoluteXPos + (camera.clientWidth/2);
        var viewLimitRight = canvas.clientWidth - camera.clientWidth;

        if(player.pos.x < viewLimitRight){
            player.pos.x += player.vel.x; 
        }

        if((camerAbsoluteXPos < viewLimitRight) && (player.pos.x >= viewCenterX)){
            canvas.style.left = (parseInt(canvas.style.left) - player.vel.x) + "px"
        }
    }



    function updatePlayerGravity(deltaValue){
        var isColliding = iscollideBottom( player.pos.y + 128, GAMEDATA.ground1.yPos)

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
        // update player variables
        playerUpadate(deltaValue)
        
    }

    function draw(){
        ctx.clearRect(0, 0, width, height);

        // ctx.fillStyle = 'rgba(0,0,255,0.5)';
        // ctx.fillRect(GAMEDATA.ground1.xPos, GAMEDATA.ground1.yPos, GAMEDATA.ground1.width, GAMEDATA.ground1.height);

        // ctx.fillStyle = 'rgba(0,255,255,0.5)';
        // ctx.fillRect(player.pos.x, player.pos.y, frameWidth * scale , frameHeight * scale);
        
        
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


    window.requestAnimationFrame(gameLoop)

});