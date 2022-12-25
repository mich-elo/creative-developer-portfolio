// view variables
var cameraAbsoluteXPos = Math.abs(parseInt(canvas.style.left));
var viewCenterX = cameraAbsoluteXPos + (camera.clientWidth/2);
var viewLimitRight = canvas.clientWidth - camera.clientWidth;
var viewLimitLeft = 0;

function cameraUpdate(){

    // limit left
    if((cameraAbsoluteXPos > viewLimitLeft) && (player.pos.x <= viewCenterX)){
        canvas.style.left = (parseInt(canvas.style.left) + player.vel.x) + "px" 
    }

    // limit right
    if((cameraAbsoluteXPos < viewLimitRight) && (player.pos.x >= viewCenterX)){
        canvas.style.left = (parseInt(canvas.style.left) - player.vel.x) + "px"
    }

}