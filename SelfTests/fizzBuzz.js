"use strict";

function fizzBuzz(n = 10) {
    for (let i = 1; i < n + 1; i++) {
        let element;
        if (i % 15 === 0) {
            element = "fizzbuzz";
        } else if (i % 5 === 0){
            element = "buzz";
        } else if (i % 3 === 0) {
            element = "fizz";
        } else {
            element = i;
        }
    
        console.log(element);
    }
}

fizzBuzz();

fizzBuzz(100);