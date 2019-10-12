"use strict";

let list = [];

if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
        list.push(
            {
                title: localStorage.getItem(i),
            }
        )
    }
    refreshOutputField();
}

function refreshOutputField() {
    document.getElementById("outputField").innerHTML = "<ul>\n"
    + list.reduce((code, string, index) => code + `    <li>${string.title} <input type="button" value="Удалить" onclick="deleteItem(${index})"></li>\n`, "")
    + "</ul>";
}

function addItem() {
    const item = document.getElementById("inputField").value;

    if (item == "") {
        alert("!!! Строка пуста !!!");
    } else {

        let addition = {
            title: item,
        };

        list.push(addition);

        localStorage.setItem(list.length - 1, item);
        
        refreshOutputField();

        document.getElementById("inputField").value = "";
        document.getElementById("inputField").focus();
    }
}

function deleteItem(removable) {

    list.splice(removable, 1);

    localStorage.removeItem(removable);

    if (list.length == 0) cleanOutputField()
    else refreshOutputField();

    document.getElementById("inputField").focus();
}

function cleanOutputField() {
    document.getElementById("outputField").innerHTML = "";
    list = [];
    localStorage.clear();
}