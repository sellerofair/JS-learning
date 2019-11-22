"use strict";

function newNameMatch(isFolder, name, folder) {
    for (let item of folder.content) {

        const folderNameMatch = isFolder && item instanceof Folder && item.name.toLowerCase() === name.toLowerCase();
        const fileNameMatch = !isFolder && item instanceof File && `${item.name}.${item.extention}`.toLowerCase() === name.toLowerCase();

        if (folderNameMatch || fileNameMatch) return true;
    }
    
    return false;
}

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
                    ${element instanceof File 
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

class Root {
    constructor() {
        this.name = "ROOT";
        this.content = [];
        this.selected = false;
    }
}

class Folder {
    constructor(name = "New Folder") {
        this.name = name;
        this.content = [];
        this.selected = false;
    }
}

class File {
    constructor(name = "Empty File.txt") {
        this.name = name.slice(0, name.lastIndexOf("."));
        this.extention = name.slice(name.lastIndexOf(".") + 1);
        this.selected = false;
    }
}

function changebleItem(path) {
    let changeable = tree;
    
    if (path.length > 0) {
        for (let i = 0; i < path.length; i++) {
            changeable = changeable.content[path[i]];
        }
    }
    return changeable;
}

function changeSelection(newPath) {

    changebleItem(selectedPath).selected = false;
    changebleItem(newPath).selected = true;
    
    selectedPath = newPath;

    printTree(tree);
}

function addItem(isFolder, name) {
    const workFolder = changebleItem(selectedPath);
    if (!(workFolder instanceof File)) {
        if (newNameMatch(isFolder, name, workFolder)) {
            alert(`${isFolder ? "Папка" : "Файл"} с таким именем существует!`);
        } else {
            if (isFolder) {
                workFolder.content.push(new Folder(name));
            } else {
                workFolder.content.push(new File(name));
            }
        }
    
        printTree(tree);
    } else {
        alert("Не выбрана папка")
    }
}

function addFolder() {
    const name = prompt("Введите имя новой папки", "New folder");
    if (name != null) {
        addItem(true, name ? name : "New folder");
    }
}

function addFile() {
    const name = prompt("Введите имя нового файла", "New file.txt");
    if (name != null) {
        addItem(false, name ? name : "New file.txt");
    }
}

let tree = new Root();

let selectedPath = [];

addItem(true, "FOLDER_1");
addItem(true, "FOLDER_2");
addItem(false, "file1.txt");
addItem(false, "file2.html");

changeSelection([0]);

addItem(true, "FOLDER_3")
addItem(false, "file3.html");
addItem(false, "file4.js");
addItem(false, "file5.css");

changeSelection([1]);

addItem(false, "file9.txt");
addItem(false, "file10.txt");

changeSelection([0, 0]);

addItem(false, "file6.html");
addItem(false, "file7.js");
addItem(false, "file8.css");

printTree(tree);