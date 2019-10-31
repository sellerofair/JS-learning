"use strict";

function check(str) {
    const directString = str.toLowerCase();
    return directString === directString.split("").reverse().join("");
}

alert (check("asdfghjhgfdsa"));

alert (check("jhjvlgjhkb"));