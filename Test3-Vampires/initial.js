"use strict"

function baseCreator(arg1 = "", arg2 = "") {
    return `${arg1}${arg2}`.split("").sort().join("");
}

function vampireFinder () {

    let count = 0;
    
    for (let number1 = 10; number1 < 100; number1++) {
        for (let number2 = number1; number2 < 100; number2++) {

            const mul = number1 * number2;
            const mulBase = baseCreator(mul);
            const numbersBase = baseCreator(number1, number2);

            if (mulBase === numbersBase) {
                console.log (`${mul} = ${number1} * ${number2}`);
                count++;
            }
        }    
    }

    console.log("----");
    console.log (`Всего чисел вампиров: ${count}`);
}

vampireFinder();