var canvas = document.getElementById("canvas")
var width = canvas.width
var height = canvas.height
var ctx = canvas.getContext("2d")


var state = {
    x: width / 2,
    y: height / 2
}

function snakeBody(){}

var snakeBodyData = {
    color:"red",
    xPosition:0, 
    yPosition:0
}

function update(progress) {
    state.x += progress
  
    if (state.x > width) {
      state.x -= width
    }
}

function draw() {
    // Draw the state of the world
    
    ctx.clearRect(0, 0, width, height)
    
    // ctx.fillStyle = "blue"
    // ctx.fillRect(state.x - 5, state.y - 5, 100, 100)

    // ctx.fillStyle = "green"
    // ctx.fillRect(5, 5, 100, 100)

    // ctx.fillStyle = "pink"
    // ctx.fillRect(100, 5, 100, 100)

    for(var i = 0; i < 3; i++){
        ctx.fillStyle = "green"
        ctx.fillRect(state.x + (110 * i), 5, 100, 100)
    }
}

function loop(timestamp) {
    var progress = (timestamp - lastRender)/10

    update(progress)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

var lastRender = 0

window.requestAnimationFrame(loop)
