"use strict";

let tree = {ROOT: []};

function check(str) {
    const directString = str.toLowerCase();
    return directString === directString.split("").reverse().join("");
}