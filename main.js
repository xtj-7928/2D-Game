let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

// 游戏元素
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballRadius = 10;
let ballSpeedX = 2;
let ballSpeedY = -2;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;

// 按键监听
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') 
    {
        rightPressed = true;
    } 
    else if (e.key === 'Left' || e.key === 'ArrowLeft') 
    {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') 
    {
        rightPressed = false;
    } 
    else if (e.key === 'Left' || e.key === 'ArrowLeft') 
    {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) 
    {
      paddleX = relativeX - paddleWidth/2;
    }
}

// 绘制球
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// 绘制球拍
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// 绘制分数
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

// 更新游戏画面
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();

    // 更新球的位置
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 碰撞检测
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) 
    {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY - ballRadius < 0) 
    {
        ballSpeedY = -ballSpeedY;
    } 
    else if (ballY + ballRadius > canvas.height - paddleHeight) 
    {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) 
        {
            ballSpeedY = -ballSpeedY;
            score++;
        } 
        else if (ballY + ballRadius > canvas.height) 
        {
            // 游戏结束：重置球位置和分数
            alert('Game Over! Final Score: ' + score);
            document.location.reload();
        }
    }

    // 更新球拍的位置
    if (rightPressed && paddleX < canvas.width - paddleWidth) 
    {
        paddleX += 7;
    } 
    else if (leftPressed && paddleX > 0) 
    {
        paddleX -= 7;
    }

    requestAnimationFrame(draw);

}

draw();