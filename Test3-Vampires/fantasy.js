"use strict"

function baseCreator(arg1 = "", arg2 = "") {
    return `${arg1}${arg2}`.split("").sort().join("");
}

// Добавил возможность выбора длины "клыков" (множителей)
// Еще по описанию нужно исключать числа, у которых оба множителя оканчиваются на 0
// У одного числа может быть несколько вариантов пар, поэтому использую объект

function vampireFinder (fengsLength = 2) {

    let vampires = {};

    for (let number1 = Math.pow(10, fengsLength - 1); number1 < Math.pow(10, fengsLength); number1++) {
        for (let number2 = number1; number2 < Math.pow(10, fengsLength); number2++) {

            if (number1 % 10 === 0 && number2 % 10 === 0) continue; // исключение двух чисел, оканчивающихся на 0

            const mul = number1 * number2;
            const mulBase = baseCreator(mul);
            const numbersBase = baseCreator(number1, number2);

            if (mulBase === numbersBase) {
                if (mul in vampires) {
                    vampires[mul].push([number1, number2]);
                } else {
                    vampires[mul] = [[number1, number2]];
                }
            }
        }    
    }

    for (let key in vampires) {
        let fengsString = "";
        for (let fengs of vampires[key]) {
            fengsString += ` = ${fengs[0]} + ${fengs[1]}`
        }
        console.log(`${key}${fengsString}`)
    }

    console.log("----");

    if (Object.keys(vampires).length === 0) {
        console.log ("Числа вампиры не найдены");
    } else {
        console.log (`${fengsLength * 2}-значных чисел вампиров: ${Object.keys(vampires).length}`);
    }
}

vampireFinder(4);