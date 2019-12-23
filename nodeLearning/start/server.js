"use strict"

require("./user");

let bob = new User("Bob");
let jack = new User("Jack");

bob.hello(jack);
jack.hello(bob);