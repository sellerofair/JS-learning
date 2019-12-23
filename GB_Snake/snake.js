"use strict"

class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    print() {
        const canvas = window.document.getElementById("canvas").innerHTML;
        window.document.getElementById("canvas").innerHTML = `${canvas}
        <rect x="${this.x * 10}" y="${this.y * 10}" width="10" height="10" stroke="black" fill="${this.color}"/>`;
    }
}

class HorizontalLine {
    constructor(x, y, length) {
        this.line = [];
        for (let i = 1; i <= length; i++) {
            this.line.push(new Point(x++, y, "red"));
        }
    }

    print() {
        this.line.forEach(function(item) {
            item.print();
        });
    }
}

class VerticalLine {
    constructor(x, y, length) {
        this.line = [];
        for (let i = 1; i <= length; i++) {
            this.line.push(new Point(x, y++, "red"));
        }
    }

    print() {
        this.line.forEach(function(item) {
            item.print();
        });
    }
}

function rect(point) {
    const canvas = window.document.getElementById("canvas").innerHTML;
    window.document.getElementById("canvas").innerHTML = `${canvas}
    <rect x="${point.x * 10}" y="${point.y * 10}" width="10" height="10" stroke="black" fill="${point.color}"/>`;
}

let snake = [];

snake.push(new Point(1, 3, "white"));
snake.push(new Point(1, 4, "white"));
snake.push(new Point(2, 4, "white"));
snake.push(new Point(3, 4, "white"));
snake.push(new Point(4, 4, "white"));

snake.forEach(function(item) {
    item.print();
});

let goal = new Point(8, 10, "yellow");
goal.print();

let HL1 = new HorizontalLine(2, 20, 10);

HL1.print();

let VL1 = new VerticalLine(2, 20, 10);

VL1.print();