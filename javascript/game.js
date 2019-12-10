/* Game */
let canvas = document.getElementById("canvas").getContext('2d');
let map  = {
    gameMap: [
        [5, 0, 1, -2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4],
        [0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
        [0, 1, -2, 1, 0, 0, 1, 0, 0, 1, 1, 0, -2, 1],
        [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1], 
        [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 6, 7, 1, -2],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 8, 9, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, -2, 1, -1],
    ],
    tileSize: 50, 
}

let column = 0;
let row = 0;

let player = {
    x: 0,
    y: 0,
};

let time = 90;
let totalPoints = -1; // To account for initial call

let sound = new Audio('sounds/sound-wall.wav');

//Load event
document.getElementById("startGame").addEventListener("click", function(){
    runGame();
});

function runGame() {
    updatePoints()
    drawGame(map, canvas);
    countdown(time);
};

//Draw game
function drawGame(map, canvas)
{
    for (var column = 0; column < map.gameMap.length; column++) {
        for (var row = 0; row < map.gameMap[column].length; row++) {
            switch(map.gameMap[column][row]) {
                case -2:
                    canvas.drawImage(point, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case -1:
                    player.x = column;
                    player.y = row;
                    canvas.drawImage(playerImg, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 0:
                    canvas.drawImage(space, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 1:
                    canvas.drawImage(wall, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 2:
                    canvas.drawImage(img2, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 3:
                    canvas.drawImage(targetImg, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 4:
                    canvas.drawImage(openTargetImg, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 5:
                    canvas.drawImage(lockedTargetImg, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 6:
                    canvas.drawImage(shipTopLeft, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 7:
                    canvas.drawImage(shipTopRight, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 8:
                    canvas.drawImage(shipBottomLeft, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
                case 9:
                    canvas.drawImage(shipBottomRight, row*map.tileSize, column*map.tileSize, map.tileSize, map.tileSize);
                    break;
            }
        }
    }
}

// Assets
let space = new Image(); //Space Background
space.src="images/space-tile.jpg";

let wall = new Image(); //Background
wall.src = "images/wall.jpg";

let img2 = new Image(); //Background
img2.src = "";

let playerImg = new Image(); // Player
playerImg.src = "images/captain-marvel.png";

let targetImg = new Image(); // Target
targetImg.src = "https://freepngimg.com/thumb/target/6-2-target-picture.png";

let openTargetImg = new Image(); // Target
openTargetImg.src = "images/tesseract.jpg";

let lockedTargetImg = new Image(); // Target
lockedTargetImg.src = "https://freerangestock.com/sample/117888/yellow-lock-symbol.jpg";

let shipTopLeft = new Image(); //Wrecked Spaceship
shipTopLeft.src = "images/top_left.png";

let shipTopRight = new Image(); //Wrecked Spaceship
shipTopRight.src = "images/top_right.png";

let shipBottomLeft = new Image(); //Wrecked Spaceship
shipBottomLeft.src = "images/bottom_left.png";

let shipBottomRight = new Image(); //Wrecked Spaceship
shipBottomRight.src = "images/bottom_right.png";

let point = new Image(); //Wrecked Spaceship
point.src = "images/tile-star.jpg";

window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: //Key Left
            if(canWeMove(player.x, player.y - 1) === true) {
                // Old position
                map.gameMap[player.x][player.y] = 0

                // New position
                map.gameMap[player.x][player.y - 1] = -1;

                drawGame(map, canvas);
            } else {
                sound.play();
             }
            break;
        case 38: //Key Up
        if(canWeMove(player.x - 1, player.y) === true) {
            // Old position
            map.gameMap[player.x][player.y] = 0

            // New position
            map.gameMap[player.x - 1][player.y] = -1;

            drawGame(map, canvas);
        } else {
            sound.play();
         }
            break;
        case 39: //Key right
        if(canWeMove(player.x, player.y + 1) === true) {
            // Old position
            map.gameMap[player.x][player.y] = 0

            // New position
            map.gameMap[player.x][player.y + 1] = -1;

            drawGame(map, canvas);
        } else {
            sound.play();
         }
            break;
        case 40: //Key Down
        if(canWeMove(player.x + 1, player.y) === true) {
            // Old position
            map.gameMap[player.x][player.y] = 0

            // New position
            map.gameMap[player.x + 1][player.y] = -1;

            drawGame(map, canvas);
        } else {
            sound.play();
         }
            break;
        default:
            break;
    }
})

function canWeMove(x, y) {
    if (map.gameMap[x] || map.gameMap[y] !== undefined) {
        switch(map.gameMap[x][y]) {
        case -2:
            map.gameMap[x][y] = 0;
            updatePoints();
        case -1:
        case 0:
            return true;
        case 3:
            winner();
            return true;
        case 4:
            map.gameMap[0][0] = 3;
        return true;
        default:
            return false;
        }
    } else {
        return false;
    }
}

function countdown(duration) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById('countdown').textContent = minutes + ":" + seconds;

    if (--timer < 0) {
        timer = duration;
    }   
    if(--timer === 0) {
        new Audio('loser.mp3').play();
        if (window.confirm('Are you a real superhero? Try again!')) {
            resetGame()
        }
    }
    
    }, 1000);
}

function updatePoints() {
    totalPoints++;

    let pointDivs = document.querySelectorAll('.point-value');

    pointDivs.forEach(function(div) {
        div.textContent = totalPoints;
    }); 
}

function winner() {
    new Audio('winner.mp3').play();

    let scoreDiv = document.getElementById("totalScore");
    let scoreHiddenInput = document.getElementById("scoreInput");

    scoreDiv.classList.add("show");
    scoreDiv.style.display = "block";
    scoreHiddenInput.value = totalPoints;
}