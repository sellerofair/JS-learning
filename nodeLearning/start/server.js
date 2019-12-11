"use strict"

class User {
    constructor(name) {
        this.name = name;
    }

    hello(who) {
        console.log(`${this.name} say Hello to ${who.name}`)
    }
}

let bob = new User("Bob");
let jack = new User("Jack");

bob.hello(jack);
jack.hello(bob);