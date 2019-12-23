"use strict"

function fib(n) {
    let a = 0;
    let b = 1;
    let c = 1;

    for (let i = 2; i < n; i++) {
        a = b;
        b = c;
        c = (a + b) % 10;
    }

    console.log(c);
}

fib(696352);