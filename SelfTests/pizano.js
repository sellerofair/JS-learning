"use strict"

// Даны целые числа 1 <= n <= 10^18 и 2 <= m <= 10^5
// Необходимо найти остаток от деления n-го числа Фибоначчи на m.

let stdin = process.openStdin();
stdin.on('data', function(data){

    let base = data.toString().split(" ");
    let n = BigInt(base[0]);
    let m = BigInt(base[1]);
    
    let sequence = [0n, 1n];
    let i = 1;
    do {
        i++;
        sequence.push((sequence[i - 1] + sequence[i - 2]) % m);
    } while (sequence[i] !== 1n || sequence[i - 1] !== 0n);
    
    console.log(Number(sequence[n % BigInt((sequence.length - 2))]));
});