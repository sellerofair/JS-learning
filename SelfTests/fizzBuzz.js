"use strict";

function fizzBuzz(n = 10) {
    for (let i = 1; i < n + 1; i++) {
        let element = i % 15 === 0 ? "fizzbuzz" :
            i % 5 === 0 ? "buzz" :
            i % 3 === 0 ? "fizz" :
            i;
    
        console.log(element);
    }
}

fizzBuzz();

fizzBuzz(100);