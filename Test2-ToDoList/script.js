"use strict";

let list = [];

function refreshOutputField() {
    document.getElementById("otputField").innerHTML = "<ul>\n"
    + list.reduce((code, string, index) => code + `    <li>${string.title} <input id="${index}"type="button" value="Удалить" onclick="deleteItem()"></li>\n`, "")
    + "</ul>";
}

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
        
        refreshOutputField();

        document.getElementById("inputField").value = "";
        document.getElementById("inputField").focus();
    }
}

function deleteItem() {
    const removable = +event.target.id;

    list.splice(removable, 1);

    refreshOutputField();

    document.getElementById("inputField").focus();
}

function cleanOtputField() {
    document.getElementById("otputField").innerHTML = "";
    list = [];
}