class Cell {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.bee = false;
        this.revealed = false;
        this.neighbours = Infinity;
        this.edges = [];
    }

    reveal() {
        this.revealed = true;

        if (this.neighbours == 0) {
            for (let n of this.edges) {

                if (!grid[n.id].revealed) {
                    grid[n.id].reveal();
                }
            }
        }
    }
};

Cell.prototype.show = function () {

    stroke(255);
    fill(127);
    rect(xOffset + blockSize * this.x, yOffset + blockSize * this.y, blockSize, blockSize);

    push();
    if (this.revealed) {
        if (this.bee) {
            stroke(10);
            fill(190, 3, 3);
            ellipse(xOffset + blockSize * this.x + blockSize / 2, yOffset + blockSize * this.y + blockSize / 2, blockSize / 2)
        } else {

            fill(61);
            rect(xOffset + blockSize * this.x, yOffset + blockSize * this.y, blockSize, blockSize);
            if (this.neighbours) {
                fill(255);
                textAlign(CENTER, CENTER);
                textSize(blockSize * 0.6);
                textFont('Times New Romanq');
                text(this.neighbours, xOffset + blockSize * this.x, yOffset + blockSize * this.y, blockSize, blockSize);
            }
        }
    }
    pop();
}

Cell.prototype.countBees = function () {

    if (this.bee) return;

    this.neighbours = 0;
    for (let i = 0; i < 8; i++) {
        let k = this.x + dx[i];
        let j = this.y + dy[i];
        if (k < 0 || j < 0 || k >= blocksX || j >= blocksY) {
            continue;
        }

        if (!grid[blocksX * j + k].bee) {
            this.edges.push(grid[blocksX * j + k]);
        } else {
            this.neighbours++;
        }
    }
}

Cell.prototype.contains = function (x, y) {

    let containsX = (x > (xOffset + this.x * blockSize) && x < (xOffset + (this.x + 1) * blockSize));
    let containsY = (y > (yOffset + this.y * blockSize) && y < (yOffset + (this.y + 1) * blockSize));
    return containsX && containsY;
}