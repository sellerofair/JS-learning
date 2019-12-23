"use strict"

class Point {
    constructor(x, y, color) {
        this.x = x,
        this.y = y,
        this.color = color
    }

    print() {
        const canvas = window.document.getElementById("canvas").innerHTML;
        window.document.getElementById("canvas").innerHTML = `${canvas}
        <rect x="${this.x * 10}" y="${this.y * 10}" width="10" height="10" stroke="black" fill="${this.color}"/>`;
    }
}

function rect(point) {
    const canvas = window.document.getElementById("canvas").innerHTML;
    window.document.getElementById("canvas").innerHTML = `${canvas}
    <rect x="${point.x * 10}" y="${point.y * 10}" width="10" height="10" stroke="black" fill="${point.color}"/>`;
}

let point1 = new Point(1, 3, "white");
point1.print();

let point2 = new Point(4, 5, "yellow");
point2.print();