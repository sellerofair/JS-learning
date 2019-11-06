"use strict"

function baseCreator(arg1 = "", arg2 = "") {
    return `${arg1}${arg2}`.split("").sort().join("");
}

function addFengs(feng1, feng2, list) {

    const mul = feng1 * feng2;
    const mulBase = baseCreator(mul);
    const numbersBase = baseCreator(feng1, feng2);

    if (mulBase === numbersBase) {
        if (mul in list) {
            list[mul].push([feng1, feng2]);
        } else {
            list[mul] = [[feng1, feng2]];
        }
    }

}

function printVampires (list) {
    for (let key in list) {
        let fengsString = "";

        for (let fengs of list[key]) {
            fengsString += ` = ${fengs[0]} + ${fengs[1]}`
        }

        console.log(`${key}${fengsString}`)
    }
}

function vampireFinder (fengsLength = 2) {

    let vampires = {};

    for (let number1 = 10 ** (fengsLength - 1); number1 < 10 ** fengsLength; number1++) {
        for (let number2 = number1; number2 < 10 ** fengsLength; number2++) {

            if (number1 % 10 === 0 && number2 % 10 === 0) continue;

            addFengs(number1, number2, vampires);
            
        }    
    }

    printVampires(vampires);

    console.log("----");

    if (Object.keys(vampires).length === 0) {
        console.log ("Числа вампиры не найдены");
    } else {
        console.log (`${fengsLength * 2}-значных чисел вампиров: ${Object.keys(vampires).length}`);
    }
}

vampireFinder(1);