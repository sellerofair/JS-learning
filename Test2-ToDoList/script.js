"use strict";

let list = [];

if (localStorage.length != 0) {
    list = JSON.parse(localStorage.cache);

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

        list.push(
            {
                title: item,
            }
        );

        localStorage.setItem("cache", JSON.stringify(list));
        
        refreshOutputField();

        document.getElementById("inputField").value = "";
        document.getElementById("inputField").focus();
    }
}

function deleteItem(removable) {

    list.splice(removable, 1);

    localStorage.setItem("cache", JSON.stringify(list));

    if (list.length == 0) cleanOutputField()
    else refreshOutputField();

    document.getElementById("inputField").focus();
}

function cleanOutputField() {
    document.getElementById("outputField").innerHTML = "";
    list = [];
    localStorage.clear();
}