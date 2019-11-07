"use strict";

class Folder {
    constructor(name = "New Folder") {
        this.name = name;
        this.content = [];
    }

    rename(newName) {
        this.name = newName;
    }

    addFolder(name) {
        this.content.push(new Folder(name))
    }

    addFile(name) {
        this.content.push(new File(name))
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