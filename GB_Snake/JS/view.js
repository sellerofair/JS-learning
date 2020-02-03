"use strict"

Point.draw = function() {
    const canvas = window.document.getElementById("canvas").innerHTML;
    window.document.getElementById("canvas").innerHTML = `${canvas}
    <rect x="${this.x * 10}" y="${this.y * 10}" width="10" height="10" stroke="black" fill="${this.color}"/>`;
}

function refreshField() {
    document.getElementById("field").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" id="canvas" width="${field.width * 10 + 20}" height="${field.height * 10 + 20}" fill="black">
            <rect x="0" y="0" width="${field.width * 10 + 20}" height="${field.height * 10 + 20}" fill="black"/>
        </svg>
    `
    walls.draw();
    p1 = new Point(2, 2, "white");
    snake = new Snake(p1, 4, Direcrion.RIGHT);
    snake.draw();
    food = foodCreator.createFood(snake);
    food.draw();
}

document.addEventListener("keydown", function(event) {
    snake.handleKey(event.code);
});

let walls = new Walls(field.width, field.height);

let foodCreator = new FoodCreator (field.width, field.height, "yellow");

refreshField();