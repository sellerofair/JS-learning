"use strict";

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

    printTree();
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
        if (confirm("Удалить выбранный элемент?")) {
            let itemIndex = selectedPath.pop();
            let removableItem = changeableItem(selectedPath);
    
            removableItem.content.splice(itemIndex, 1);
        
            changeSelection(selectedPath);
            printTree();    
        }
    } else {
        alert("Не выбран удаляемый элемент");
    }
}

// <== Tree changing