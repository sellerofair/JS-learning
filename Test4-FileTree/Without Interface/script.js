"use strict";

function newNameMatch(isFolder, name, folder) {
    for (let item of folder.content) {

        const folderNameMatch = isFolder && item instanceof Folder && item.name.toLowerCase() === name.toLowerCase();
        const fileNameMatch = !isFolder && item instanceof File && `${item.name}.${item.extention}`.toLowerCase() === name.toLowerCase();

        if (folderNameMatch || fileNameMatch) return true;
    }
    
    return false;
}

function defineIndex (folder, name) {
    
    let index = -1;
    
    for (let key in folder.content) {
        if (folder.content[key].name === name) {
            index = key;
        }
    }

    return index;
}

function levelMarker(level) {
    let marker = "";

    if (level > 0) {
        for (let i = 0; i < level; i++) {
            marker += "--"
        }
        marker += " ";
    }

    return marker;
}

function printTree(tree) {

    level = 0;

    let printFolder = function(folder) {
        console.log (`${levelMarker(level)}${folder.name}`);
        level += 1;
        for (let item of folder.content) {
            if (item instanceof Folder) {
                printFolder(item);
                level -=1;
            } else {
                console.log(`${levelMarker(level)}${item.name}.${item.extention}`);
            }
        }
    }
    printFolder(tree);
}

function find(tree, string, matchCase) {    // matchCase === true: учитывать регистр;
    
    let match = function(item) {
        return item.name.toLowerCase() != "root" && (matchCase && item.name.includes(string) || !matchCase && item.name.toLowerCase().includes(string.toLowerCase()));
    }

    let findFolder = function(folder) {
        
        if (match(folder)) {
            console.log(folder.name);
        }

        for (let item of folder.content) {
            if (item instanceof Folder) {
                findFolder(item);
            } else {
                if (match(item)) {
                    console.log(`${item.name}.${item.extention}`);
                }
            }
        }
    }

    findFolder(tree);
}

function filter(tree, extentions) {

    let match = function(item) {
        for (let ext of extentions) {
            if (item.extention.toLowerCase() === ext.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    let filterFolder = function(folder) {
        
        for (let item of folder.content) {
            if (item instanceof Folder) {
                filterFolder(item);
            } else {
                if (match(item)) {
                    console.log(`${item.name}.${item.extention}`);
                }
            }
        }
    }

    filterFolder(tree);
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
        if (newNameMatch(true, name, this)) {
            alert("Папка с таким именем существует!");
        } else {
            this.content.push(new Folder(name));
        }
    }

    addFile(name = "Empty File.txt") {
        if (newNameMatch(false, name, this)) {
            alert("Файл с таким именем существует!");
        } else {
            this.content.push(new File(name));
        }
    }

    delete(name) {
        const index = defineIndex(this, name);

        if (index === -1) {
            alert("Объект с таким именем не найден!");
        } else {
            this.content.splice(index, 1);
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

tree.addFolder("FOLDER_1");
tree.addFolder("FOLDER_2");
tree.content[0].addFolder("FOLDER_3")
tree.addFile("file1.txt");
tree.addFile("file2.html");
tree.content[0].addFile("file3.html");
tree.content[0].addFile("file4.js");
tree.content[0].addFile("file5.css");
tree.content[0].content[0].addFile("file6.html");
tree.content[0].content[0].addFile("file7.js");
tree.content[0].content[0].addFile("file8.css");
tree.content[1].addFile("file9.txt");
tree.content[1].addFile("file10.txt");