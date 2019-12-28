"use strict"

class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    move(offset, direction) {
        switch (direction) {
            case Direcrion.LEFT:
                this.x -= offset;
                break;
            case Direcrion.RIGHT:
                this.x += offset;
                break;
            case Direcrion.UP:
                this.y -= offset;
                break;
            case Direcrion.DOWN:
                this.y += offset;
        }
    }

    draw() {
        const canvas = window.document.getElementById("canvas").innerHTML;
        window.document.getElementById("canvas").innerHTML = `${canvas}
        <rect x="${this.x * 10}" y="${this.y * 10}" width="10" height="10" stroke="black" fill="${this.color}"/>`;
    }

    clear() {
        this.color = "black";
        this.draw();
    }

    isHit(point) {
        return point.x === this.x && point.y === this.y;
    }
}

class Figure {
    constructor() {
        this.list = [];
    }

    draw() {
        this.list.forEach(function(item) {
            item.draw();
        });
    }
}

class HorizontalLine extends Figure {
    constructor(x, y, length) {
        super();
        for (let i = 1; i <= length; i++) {
            this.list.push(new Point(x++, y, "red"));
        }
    }
}

class VerticalLine extends Figure {
    constructor(x, y, length) {
        super();
        for (let i = 1; i <= length; i++) {
            this.list.push(new Point(x, y++, "red"));
        }
    }
}

class Snake extends Figure {
    constructor(tail, length, direction) {
        super();
        for (let i = 0; i < length; i++) {
            let p = new Point(tail.x, tail.y, tail.color)
            p.move(i, direction);
            this.list.push(p);
        }

        this.direction = direction;
    }

    move() {
        let tail = this.list.shift();
        let head = this.getNextPoint();
        this.list.push(head);
        tail.clear();
        head.draw();
    }

    getNextPoint() {
        let head = this.list[this.list.length - 1];
        let nextPoint = new Point(head.x, head.y, head.color);
        nextPoint.move(1, this.direction);
        return nextPoint;
    }

    handleKey(key) {
        switch (key) {
            case "ArrowLeft":
                if (snake.direction != Direcrion.RIGHT){
                    snake.direction = Direcrion.LEFT;
                }
                break;
            case "ArrowRight":
                if (snake.direction != Direcrion.LEFT){
                    snake.direction = Direcrion.RIGHT;
                }
                break;
            case "ArrowUp":
                if (snake.direction != Direcrion.DOWN){
                    snake.direction = Direcrion.UP;
                }
                break;
            case "ArrowDown":
                if (snake.direction != Direcrion.UP){
                    snake.direction = Direcrion.DOWN;
                }
                break;
            case "Enter":
                theGame = setInterval(running, 100);
                break;
            case "Escape":
                clearInterval(theGame);
        }
    }

    eat(food) {
        let head = this.getNextPoint();
        if (head.isHit(food)) {
            food.color = head.color;
            this.list.push(food);
            return true;
        } else {
            return false;
        }
    }
}

class FoodCreator {
    constructor(mapWidth, mapHeight, color) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.color = color;
    }
    
    createFood() {
        const x = Math.round(Math.random() * (field.width - 1)) + 1;
        const y = Math.round(Math.random() * (field.height - 1)) + 1;
        return new Point(x, y, this.color);
    }
}

class Walls {
    constructor() {
        
    }
}

function running() {
    if (snake.eat(food)) {
        food = foodCreator.createFood();
        food.draw();
    } else {
        snake.move();
    }
}

const field = {
    width: 50,
    height: 50
}

const Direcrion = {
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT"),
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN")
};

document.body.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" id="canvas" width="${field.width * 10 + 20}" height="${field.height * 10 + 20}" fill="black">
        <rect x="0" y="0" width="${field.width * 10 + 20}" height="${field.height * 10 + 20}" fill="black"/>
    </svg>
    <script src="./snake.js"></script>
`

let theGame;

document.addEventListener("keydown", function(event) {
    snake.handleKey(event.code);
});

(new HorizontalLine(0, 0, field.width + 2)).draw();
(new VerticalLine(0, 0, field.width + 2)).draw();
(new HorizontalLine(0, field.width + 1, field.width + 2)).draw();
(new VerticalLine(field.width + 1, 0, field.width + 2)).draw();

let p1 = new Point(2, 2, "white");

let snake = new Snake(p1, 4, Direcrion.RIGHT);
snake.draw();

let foodCreator = new FoodCreator (field.width, field.height, "yellow");

let food = foodCreator.createFood();
food.draw();