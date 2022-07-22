
var grid = [];
var blocksX = 20;
var blocksY = 20;

let blockSize;
let xOffset;
let yOffset;
let maxBlocks = 100;
let totalBees = 40;
let headerSize = 100

let dx = [0, -1, 0, 1, -1, 1, -1, 1];
let dy = [1, 0, -1, 0, -1, 1, 1, -1];
let flag;

function preload() {
    flag = loadImage("flag.png");
}

function setup() {

    window.canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())

    setBlocks();

    blocksY = 20
    blocksX = 15;

    blockSize = min(width / blocksX, height / blocksY);

    blockSize = min(canvas.width / blocksX, (canvas.height - headerSize) / blocksY);

    console.log(blockSize)

    xOffset = (width - blockSize * blocksX) / 2;
    yOffset = (height - blockSize * blocksY) / 2 + headerSize / 8;

    let count = 0;
    for (let j = 0; j < blocksY; j++) {
        for (let i = 0; i < blocksX; i++) {
            grid.push(new Cell(i, j, count++));
        }
    }

    // pick totalBees Spots
    for (let n = 0; n < totalBees; n++) {
        let i = floor(random(grid.length));
        while (grid[i].bee) {
            i = floor(random(grid.length));;
        }
        grid[i].bee = true
    }

    for (let j = 0; j < grid.length; j++) {
        grid[j].countBees();
    }

    background(0);

    fill(200);
    textSize(headerSize / 3);
    textAlign(CENTER, CENTER);
    text("Minesweeper", 0, 0, canvas.width, headerSize / 2);

    fill(120);
    textSize(blockSize * 0.33);
    textAlign(LEFT, CENTER);
    text("Right Click - to add Flag*", 20, canvas.height - 30);
}

function setBlocks() {
    let testBlockSize = 1;
    while (true) {
        if (floor(canvas.width / testBlockSize) * floor((canvas.height - headerSize) / testBlockSize) < maxBlocks) {

            blockSize = testBlockSize;
            blocksX = floor(canvas.width / blockSize) - floor(canvas.width / blockSize) % 2;
            blocksY = floor((canvas.height - headerSize) / blockSize) - floor((canvas.height - headerSize) / blockSize) % 2;
            return;
        } else {
            testBlockSize++;
        }
    }
}

function draw() {

    fill(255);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function GameOver() {
    for (let i = 0; i < grid.length; i++) {
        if (!grid[i].revealed) {
            grid[i].reveal();
        }
    }
}

function mousePressed(event) {
    if (mouseButton === LEFT) {
        for (let i = 0; i < grid.length; i++) {
            if (!grid[i].revealed && grid[i].contains(mouseX, mouseY)) {

                grid[i].reveal();
                if (grid[i].bee) {
                    GameOver();
                }
            }
        }
    } else {
        for (let i = 0; i < grid.length; i++) {
            if (!grid[i].revealed && grid[i].contains(mouseX, mouseY)) {
                grid[i].flag = true;
            }
        }
    }
}

function windowResized() {

    resizeCanvas(windowWidth, windowHeight);
    blockSize = min(canvas.width / blocksX, (canvas.height - 100) / blocksY);
    xOffset = (width - blockSize * blocksX) / 2;
    yOffset = (height - blockSize * blocksY) / 2;

}