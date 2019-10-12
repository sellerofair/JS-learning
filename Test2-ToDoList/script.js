"use strict";

let list = [];

function addItem() {
    const item = document.getElementById("inputField").value;

    if (item == "") {
        alert("!!! Строка пуста !!!");
    } else {

        list.push(
            {
                title: item,
            }
        );
        document.getElementById("otputField").innerHTML = "<ul>\n"
        + list.reduce((code, string) => code + `    <li>${string.title}</li>\n`, "")
        + "</ul>";

        document.getElementById("inputField").value = "";
    }
}

function cleanOtputField() {
    document.getElementById("otputField").innerHTML = "";
    list = [];
}