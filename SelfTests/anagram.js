"use strict";

function baseCreator(str) {
    return str.toLowerCase().match(/\p{L}/gu).sort().join("");
}

function anagram(str1 = "", str2 = "") {
    let string1 = baseCreator(str1);
    let string2 = baseCreator(str2);
    return string1 === string2;
}

alert(anagram("привет, как дела?", "д ела как * при +5 вет"));