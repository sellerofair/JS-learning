"use strict";

// Tree printing ==>

function spanOptions(element, path) {
    return `onclick="changeSelection(${JSON.stringify(path)})"${element.selected ? ` class="selected"` : ""}`
}

function printTree() {

    let level = -1;
    let path = [];

    let printFolder = function(folder = tree) {
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
            ${printFolder()}
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

    printTree();
}

// <== Tree printing

changeSelection(selectedPath);
printTree();