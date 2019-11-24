"use strict";

// Classes ==>

class Root {
    constructor() {
        this.type = "Root"
        this.name = "ROOT";
        this.content = [];
        this.selected = false;
    }
}

class Folder {
    constructor(name = "New Folder") {
        this.type = "Folder"
        this.name = name;
        this.content = [];
        this.selected = false;
    }
}

class File {
    constructor(name = "Empty File.txt") {
        this.type = "File"
        this.name = name.slice(0, name.lastIndexOf("."));
        this.extention = name.slice(name.lastIndexOf(".") + 1);
        this.selected = false;
    }
}

// <== Classes

// Tree printing ==>

function spanOptions(element, path) {
    return `onclick="changeSelection(${JSON.stringify(path)})"${element.selected ? ` class="selected"` : ""}`
}

function printTree(tree) {

    let level = -1;
    let path = [];

    let printFolder = function(folder) {
        level += 1;
             
        let folderCode = `<li class="folder"><span ${spanOptions(folder, path)}>${folder.name}</span>
            <ul>
                ${folder.content.reduce(function(code, element, index) {
                    path[level] = index;
                    return `${code}
                    ${element.type === "File" 
                        ? `<li class="file"><span ${spanOptions(element, path)}>${element.name}.${element.extention}</span></li>`
                        : printFolder(element)}`
                    }, "")}
            </ul>
        </li>`

        level -=1;
        path.pop();
        return folderCode;

    }

    document.getElementById("mainTreeField").innerHTML = 
        `<ul>
            ${printFolder(tree)}
        </ul>`;
}

function changeableItem(path) {
    let changeable = tree;
    
    if (path.length > 0) {
        for (let i = 0; i < path.length; i++) {
            changeable = changeable.content[path[i]];
        }
    }
    return changeable;
}

function changeSelection(newPath) {

    changeableItem(selectedPath).selected = false;
    changeableItem(newPath).selected = true;
    
    selectedPath = newPath;
    workFolder = changeableItem(selectedPath);

    printTree(tree);
}

// <== Tree printing

// Tree changing ==>

function checkWorkFolder() {
    if (workFolder.type != "File") {
        return true;
    } else {
        alert("Не выбрана папка");
        return false;
    }
}

function newNameMatch(isFolder, name) {
    for (let item of workFolder.content) {

        const folderNameMatch = isFolder && item.type === "Folder" && item.name.toLowerCase() === name.toLowerCase();
        const fileNameMatch = !isFolder && item.type ===  "File" && `${item.name}.${item.extention}`.toLowerCase() === name.toLowerCase();

        if (folderNameMatch || fileNameMatch) return true;
    }
    
    return false;
}

function addItem(isFolder, name) {
    if (newNameMatch(isFolder, name)) {
        alert(`${isFolder ? "Папка" : "Файл"} с таким именем существует!`);
    } else {
        if (isFolder) {
            workFolder.content.push(new Folder(name));
        } else {
            workFolder.content.push(new File(name));
        }
    }

    printTree(tree);
}

function addFolder() {
    if (checkWorkFolder()) {
        const name = prompt("Введите имя новой папки", "New folder");
        if (name != null) {
            addItem(true, name ? name : "New folder");
        }
    }
}

function addFile() {
    if (checkWorkFolder()) {
        const name = prompt("Введите имя нового файла", "New file.txt");
        if (name != null) {
            addItem(false, name ? name : "New file.txt");
        }
    }
}

function deleteItem() {
    if (workFolder.type != "Root") {
        let itemIndex = selectedPath.pop();
        let removableItem = changeableItem(selectedPath);
        removableItem.content.splice(itemIndex, 1);
    
        changeSelection(selectedPath);
    
        printTree(tree);
    } else {
        alert("Не выбран удаляемый элемент");
    }
}

// <== Tree changing

// Filter ==>

function extentionsListRefresh(folder) {
    for (let item of folder.content) {
        if (item.type === "File") {
            extentionsList[item.extention] = false;
        } else {
            extentionsListRefresh(item);
        }
    }
}

function extentionsListPrint() {
    for (let key in extentionsList) {
        delete extentionsList[key];
    }
    extentionsListRefresh(tree);
    let code = "";
    for (let key in extentionsList) {
        code += `<option id="${key}" onclick="changeFilterSelection()">.${key}</option>\n`
    }
    window.document.getElementById("extentions").innerHTML = code;
}

function showHideFilter() {
    const list = window.document.getElementById("extentions").style.display;
    if (list === "none") {
        extentionsListPrint();
        window.document.getElementById("extentions").style.display = "block";
    } else {
        window.document.getElementById("extentions").style.display = "none";
    }
}

function showFilter() {
    if (list.style.display === "none") {
        extentionsListPrint();
        list.style.display = "block";
    }
}

function focusFilter() {
    if (list.style.display === "block") {
        list.focus();
    }
}

function hideFilter() {
    list.style.display = "none";
}

function changeFilterSelection() {
    for (let key in extentionsList) {
        extentionsList[key] = window.document.getElementById(key).selected;
    }
}

function filter() {
    let fileredExtentions = [];
    for (let key in extentionsList) {
        if (extentionsList[key]) {
            fileredExtentions.push(key);
        }
    }

    console.log(fileredExtentions);
}

// <== Filter

// Global things ==>

const list = window.document.getElementById("extentions");

let selectedPath = [];

let workFolder;

let extentionsList = {};

let tree = new Root;

// <== Global things

changeSelection(selectedPath);

printTree(tree);