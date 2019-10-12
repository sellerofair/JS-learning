"use strict";

let list = [];

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

function deleteItem(removable) {

    list.splice(removable, 1);

    if (list.length == 0) cleanOutputField()
    else refreshOutputField();

    document.getElementById("inputField").focus();
}

function cleanOutputField() {
    document.getElementById("outputField").innerHTML = "";
    list = [];
}