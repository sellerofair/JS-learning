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
            case Direcrion.RIGHT:
                this.x += offset;
            case Direcrion.UP:
                this.y -= offset;
            case Direcrion.DOWN:
                this.y += offset;
        }
    }

    print() {
        const canvas = window.document.getElementById("canvas").innerHTML;
        window.document.getElementById("canvas").innerHTML = `${canvas}
        <rect x="${this.x * 10}" y="${this.y * 10}" width="10" height="10" stroke="black" fill="${this.color}"/>`;
    }
}

class Figure {
    constructor() {
        this.list = [];
    }

    print() {
        this.list.forEach(function(item) {
            item.print();
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
    }
}

const Direcrion = {
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT"),
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN")
};

(new HorizontalLine(0, 0, 52)).print();
(new VerticalLine(0, 0, 52)).print();
(new HorizontalLine(0, 51, 52)).print();
(new VerticalLine(51, 0, 52)).print();

let p1 = new Point(2, 2, "white");

let snake = new Snake(p1, 8, Direcrion.RIGHT);
snake.print();

let goal = new Point(8, 10, "yellow");
goal.print();