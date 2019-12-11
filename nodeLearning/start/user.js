"use strict"

class User {
    constructor(name) {
        this.name = name;
    }

    hello(who) {
        console.log(`${this.name} say Hello to ${who.name}`)
    }
}

exports.User = User;