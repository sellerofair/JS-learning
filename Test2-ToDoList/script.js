"use strict";

let list = [];

if (localStorage.length != 0) {
    list = JSON.parse(localStorage.cache);

    refreshOutputField();
}

function refreshOutputField() {
    document.getElementById("outputField").innerHTML = "<ul>\n"
        + list.reduce((code, string, index) => code
            + `    <li>`
            + `        <input type="checkbox" onchange="changeTaskState(${index})"${string.done ? " checked" : ""}>`
            + `        ${string.title}`
            + `        <input type="button" value="Удалить" onclick="deleteItem(${index})">`
            + `    </li>\n`, "")
        + "</ul>";
}

function addItem() {
    const item = document.getElementById("inputField").value;

    if (item === "") {
        alert("!!! Строка пуста !!!");
    } else {

        list.push(
            {
                title: item,
                done: false,
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

    if (list.length) refreshOutputField()
    else cleanOutputField();

    //list.length || cleanOutputField();
    //list.length && cleanOutputField();


    //list.length ? refreshOutputField() : cleanOutputField();

    document.getElementById("inputField").focus();
}

function changeTaskState(changeable) {
    list[changeable].done = event.target.checked;
    localStorage.setItem("cache", JSON.stringify(list));
}

function cleanOutputField() {
    document.getElementById("outputField").innerHTML = "";
    list = [];
    localStorage.clear();
}