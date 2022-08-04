function startGame() {
    // fixing a small bug
    let gameBtn = document.getElementById("startBtn");
    gameBtn.value = "restart";
    if (gameBtn.value === "restart") {
        gameBtn.addEventListener("click", function () {
            location.reload();
        });
    }
    // creating the canvas screen
    const canvas = document.getElementById("draw");
    canvas.style.backgroundColor = "yellow";
    const ctx = canvas.getContext("2d");
    // random function
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let rand = getRndInteger(20, 30);
    //  creating the game object template
    function gameObjects(arg1, arg2, arg3, arg4, arg5) {
        this.x = arg1;
        this.y = arg2;
        this.width = arg3;
        this.height = arg4;
        this.color = arg5;
        this.speedY = 0;
        this.speedX = 0;
        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.newPos = function () {
            this.y += this.speedY;
            this.x += this.speedX;
        };
    }
    //  creating the game objects
    let player = new gameObjects(100, 150, 20, 20, "black");
    let obstacles = new gameObjects(280, 150 - rand + 20, 20, rand, "grey");
    let time = 500;
    let score = Number(document.getElementById("score").innerHTML);
    // increase the speed as the score increases
    function increaseSpeed() {
        if (score > 5) {
            time = 50;
        } else if (score > 20) {
            time = 10;
        }
    }
    // move player
    player.upMovement = function () {
        let upBtn = document.getElementById("moveUp");
        upBtn.style.display = "block";
        upBtn.addEventListener("click", function movePlayerUp() {
            let playerY = player.y + 20;
            function clearPlayer() {
                ctx.clearRect(100, playerY - 20, 20, 20);
            }
            player.y = player.y - player.height;
            setTimeout(clearPlayer, 10);
            player.draw();
            setTimeout(function () {
                document.getElementById("moveDown").click();
            }, time + 500);
        });
    };
    // move plaver down automatically
    player.downMovement = function () {
        let downBtn = document.getElementById("moveDown");
        downBtn.addEventListener("click", function movePlayerDown() {
            let playerY = player.y - 20;
            function clearPlayer() {
                ctx.clearRect(100, playerY + 20, 20, 20);
            }
            player.y = player.y + player.height;
            setTimeout(clearPlayer, 10);
            player.draw();
        });
    };
    // move obatacles
    obstacles.move = function () {
        let obstaclesX = obstacles.x + 5;
        function clearObstacles() {
            ctx.clearRect(obstaclesX - 5, 150 - rand + 20, 20, rand);
        }
        obstacles.draw();
        obstacles.x = obstacles.x - obstacles.width;
        setTimeout(clearObstacles, time);
        setTimeout(clearObstacles, time);
        if (
            obstacles.x == player.x - 20 &&
            obstacles.y + rand - 20 == player.y
        ) {
            dectectHit();
        } else if (obstacles.x == -40) {
            respawnObs();
        }
    };
    // creating the ground
    function ground() {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "black"; // Grey path
        ctx.moveTo(0, 180);
        ctx.lineTo(300, 180);
        ctx.stroke(); // Draw it
    }
    // collision detection
    function dectectHit() {
        function restartGame() {
            window.alert("GAME OVER" + " " + `your score is ${score}`);
            location.reload();
        }
        setTimeout(restartGame, 100);
    }
    // respawn obstacle
    function respawnObs() {
        document.getElementById("score").innerHTML = score++;
        obstacles.x = 280;
    }
    ground();
    player.draw();
    player.upMovement();
    player.downMovement();
    increaseSpeed();
    var myInterval = setInterval(obstacles.move, time);
}
//startGame();
