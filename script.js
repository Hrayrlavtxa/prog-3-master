let socket = io();
const n = 28
const m = 40
const side = 30;

function setup() {
    frameRate(5);
    createCanvas(m * side, n * side);
    background('#acacac');
}

function drawGame(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                fill("green");
            }
            else if (matrix[y][x] === 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] === 2) {
                fill("yellow");
            }
            else if (matrix[y][x] === 3) {
                fill("red")
            }
            else if (matrix[y][x] === 4) {
                fill("#99582a")
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("matrix", drawGame)
