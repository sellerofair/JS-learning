"use strict";

function nameMatch(isFolder, name, folder) {
    for (let item of folder.content) {
        if (isFolder && item instanceof Folder && item.name === name
            || !isFolder && item instanceof File && item.name === name
            ) return true;
    }
    return false;
}

class Folder {
    constructor(name = "New Folder") {
        this.name = name;
        this.content = [];
    }

    rename(newName) {
        this.name = newName;
    }

    addFolder(name = "New Folder") {
        if (nameMatch(true, name, this)) {
            alert("Папка с таким именем существует!");
        } else {
            this.content.push(new Folder(name));
        }
    }

    addFile(name = "Empty File.txt") {
        if (nameMatch(false, name, this)) {
            alert("Файл с таким именем существует!");
        } else {
            this.content.push(new File(name));
        }
    }

}

class File {
    constructor(name = "Empty File.txt") {
        this.name = name.slice(0, name.lastIndexOf("."));
        this.extention = name.slice(name.lastIndexOf(".") + 1);
    }

    rename(newName) {
        this.name = newName.slice(0, newName.lastIndexOf("."));
        this.extention = newName.slice(newName.lastIndexOf(".") + 1);
    }

}

let tree = new Folder("ROOT");