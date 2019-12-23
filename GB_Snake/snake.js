"use strict"

function rect(x, y, color) {
    const canvas = window.document.getElementById("canvas").innerHTML;
    window.document.getElementById("canvas").innerHTML = `${canvas}
    <rect x="${x * 10}" y="${y * 10}" width="10" height="10" stroke="black" fill="${color}"/>`;
}

let x1 = 1;
let y1 = 3;
rect(x1, y1, "white");

let x2 = 4;
let y2 = 5;
rect(x2, y2, "yellow");