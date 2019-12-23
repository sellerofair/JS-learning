"use strict"

let phrases = require("./ru");

class User {
    constructor(name) {
        this.name = name;
    }

    hello(who) {
        console.log(`${this.name}: ${phrases.Hello}, ${who.name}`);
    }
}

global.User = User;