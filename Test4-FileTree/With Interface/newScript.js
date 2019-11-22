"use strict";

function newNameMatch(isFolder, name, folder) {
    for (let item of folder.content) {

        const folderNameMatch = isFolder && item instanceof Folder && item.name.toLowerCase() === name.toLowerCase();
        const fileNameMatch = !isFolder && item instanceof File && `${item.name}.${item.extention}`.toLowerCase() === name.toLowerCase();

        if (folderNameMatch || fileNameMatch) return true;
    }
    
    return false;
}

function printTree(tree) {

    let printFolder = function(folder) {
        return `<li class="folder"><span${folder.selected ? ` class="selected"` : ""}>${folder.name}</span>
            <ul>
                ${folder.content.reduce((code, element) => `${code}
                ${element instanceof File 
                    ? `<li class="file">
                        <span${folder.selected ? ` class="selected"` : ""}>${element.name}.${element.extention}</span>
                    </li>`
                    : printFolder(element)}
            </ul>`, "")}
        </li>`
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

let tree = new Root();

printTree(tree);