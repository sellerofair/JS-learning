"use strict";

function newNameMatch(isFolder, name) {
    for (let item of workFolder.content) {

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

function checkWorkFolder() {
    if (!(workFolder instanceof File)) {
        return true;
    } else {
        alert("Не выбрана папка");
        return false;
    }
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
    let itemIndex = selectedPath.pop();
    let removableItem = changeableItem(selectedPath);
    removableItem.content.splice(itemIndex, 1);

    changeSelection(selectedPath);

    printTree(tree);
}

function extentionsListRefresh(folder) {
    for (let item of folder.content) {
        if (item instanceof File) {
            extentionsList[item.extention] = true;
        } else {
            extentionsListRefresh(folder)
        }
    }
}

function extentionsListPrint() {
    for (key in extentionsList) {
        delete extentionsList[key];
    }
    extentionsListRefresh(tree);
    let code = "";
    for (key in extentionsList) {
        code += `<option id="${key}"}>.${key}</option>\n`
    }
    window.document.getElementById("extentions").innerHTML = code;
}

function showHideFilter() {
    const list = window.document.getElementById("extentions").style.display;
    if (list === "none") {
        extentionsListPrint();
        window.document.getElementById("extentions").style.display = "block"
    } else {
        window.document.getElementById("extentions").style.display = "none"
    }
}

let tree = new Root;

tree.content[0] = new Folder("Music");
tree.content[0].content[0] = new File("bing.mp3");
tree.content[0].content[1] = new File("bang.flac");

tree.content[0].content[3] = new Folder("Rock");
tree.content[0].content[3].content[0] = new File("nananana.mp3");
tree.content[0].content[3].content[1] = new File("The Sharpest Lives.mp3");
tree.content[0].content[3].content[2] = new File("Over and Over.flac");

tree.content[0].content[4] = new Folder("Rap");
tree.content[0].content[4].content[0] = new File("skja.mp3");
tree.content[0].content[4].content[1] = new File("rrrraattttata.mp3");
tree.content[0].content[4].content[2] = new File("hey yo.flac");

tree.content[1] = new Folder("Images");
tree.content[1].content[0] = new File("something.img");
tree.content[1].content[1] = new File("anything.jpg");

tree.content[1].content[3] = new Folder("Photos");
tree.content[1].content[3].content[0] = new File("me.png");
tree.content[1].content[3].content[1] = new File("wife.jpg");
tree.content[1].content[3].content[2] = new File("daughter.gif");

tree.content[1].content[4] = new Folder("Pictures");
tree.content[1].content[4].content[0] = new File("forest.png");
tree.content[1].content[4].content[1] = new File("mountain.jpg");
tree.content[1].content[4].content[2] = new File("sea.gif");

tree.content[2] = new File("info.txt");
tree.content[3] = new File("readme.pdf");

let selectedPath = [];

let workFolder;

let extentionsList = {};

changeSelection(selectedPath);

printTree(tree);

let filterVisiability = false;