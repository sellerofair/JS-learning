"use strict"

class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Figure {
    constructor() {
        this.list = [];
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
}

class FoodCreator {
    constructor(mapWidth, mapHeight, color) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.color = color;
    }
}

class Walls {
    constructor(mapWidth, mapHeight) {
        this.list = [];
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;

        this.list.push(new HorizontalLine(0, 0, this.mapWidth + 2));
        this.list.push(new VerticalLine(0, 0, this.mapHeight + 2));
        this.list.push(new HorizontalLine(0, this.mapHeight + 1, this.mapWidth + 2));
        this.list.push(new VerticalLine(this.mapWidth + 1, 0, this.mapHeight + 2));
    }

    draw() {
        wallsDraw(this);
    }
}

const field = {
    width: 10,
    height: 20
}

const Direcrion = {
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT"),
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN")
};

let theGame;

let p1

let snake

let food

let play = false;

let steps = 0;