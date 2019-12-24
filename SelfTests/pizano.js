"use strict"

// Даны целые числа 1 <= n <= 10^18 и 2 <= m <= 10^5
// Необходимо найти остаток от деления n-го числа Фибоначчи на m.

function pizano(n, m) {
    let sequence = [0, 1];
    let i = 1;
    do {
        i++;
        sequence.push((sequence[i - 1] + sequence[i - 2]) % m);
    } while (sequence[i] != 1 || sequence[i - 1] != 0);

    return sequence[n % (sequence.length - 2)];
}

let n = Math.floor(Math.random() * (10 ** 18));
let m = Math.floor(Math.random() * (10 ** 5));

console.log(`F(${n}) % F(${m}) = ${pizano(n, m)}`);