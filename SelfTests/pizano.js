"use strict"

// Даны целые числа 1 <= n <= 10^18 и 2 <= m <= 10^5
// Необходимо найти остаток от деления n-го числа Фибоначчи на m.

function fib(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        let a = 0;
        let b = 1;
        let c = 1;
        for (let i = 2; i < n; i++) {
            a = b;
            b = c;
            c = a + b;
        }
        return c;
    }
}

let n = 100;
let m = 25;

let sequence = [0, 1];
let i = 1;
do {
    i++;
    sequence.push((sequence[i - 1] + sequence[i - 2]) % m);
} while (sequence[i] != 1 || sequence[i - 1] != 0);

console.log(sequence);
console.log(`Period = ${sequence.length - 2}`);
console.log(`Index = ${n % (sequence.length - 2)}`);
console.log(`F(${n}) % ${m} =`);
console.log(`${fib(n)} % ${m} =`);
console.log(fib(n) % m);
console.log(sequence[n % (sequence.length - 2)]);