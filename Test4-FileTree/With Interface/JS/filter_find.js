"use strict";

// Filter ==>

function extentionsListRefresh(folder = tree) {
    for (let item of folder.content) {
        if (item.type === "File") {
            if (extentionsList[item.extention] === undefined) {
                extentionsList[item.extention] = false;
            }
        } else {
            extentionsListRefresh(item);
        }
    }
}

function extentionsListPrint() {
    extentionsListRefresh();
    
    let code = "";
    for (let key in extentionsList) {
        code += `\n<input type="checkbox" onclick="changeFilterSelection('${key}')"${extentionsList[key] ? " checked" : ""}>.${key}<br>`
    }
    window.document.getElementById("extentions").innerHTML = code;
}

function showHideFilter() {
    if (list.style.display === "none") {
        extentionsListPrint();
        list.style.display = "block";
    } else {
        list.style.display = "none";
    }
}

// function focusFilter() {
//     if (list.style.display === "block") {
//         list.focus();
//     }
// }

// function hideFilter() {
//     console.log(event.target.id);
//     if (event.target.id != "extentions") {
//         list.style.display = "none";
//     }
// }

function changeFilterSelection(ext) {
        extentionsList[ext] = event.target.checked;
}

function checkExtentions() {
    let checkedExtentions = [];
    for (let key in extentionsList) {
        if (extentionsList[key]) {
            checkedExtentions.push(key);
        }
    }

    return checkedExtentions;
}

function showFilteredFiles(result) {
    window.document.getElementById("resultPrintField").innerHTML =
    `<table>${
    result.reduce((code, item) => `${code}
        <tr>
            <td>${item.name}</td>
            <td>${item.path}</td>
        </tr>`, "")}
    </table>`
}

function filter() {
    const checkedExtentions = checkExtentions();
    let result = [];
    let path = [];

    let subFilter = function(folder = tree) {
        path.push(folder.name);
        for (let item of folder.content) {
            if (item.type === "File") {
                for (let ext of checkedExtentions) {
                    if (item.extention.toLowerCase() === ext.toLowerCase()) {
                        result.push({
                            name: `${item.name}.${item.extention}`,
                            path: path.join("/")
                        });
                    }
                }
            } else {
                subFilter(item);
            }
        }
        path.pop();
    }

    subFilter();

    showFilteredFiles(result);
}

// <== Filter

// Find ==>

function find() {
    const query = window.document.getElementById("searchField").value;
    let result = [];
    let path = [];

    let subFinder = function(folder = tree) {
        path.push(folder.name);
        for (let item of folder.content) {
            if (item.type === "File") {
                if (`${item.name}.${item.extention}`.toLowerCase().includes(query.toLowerCase())) {
                    result.push({
                        name: `${item.name}.${item.extention}`,
                        path: path.join("/")
                    });
                }
            } else {
                if (item.name.toLowerCase().includes(query)) {
                    result.push({
                        name: `${item.name}/`,
                        path: path.join("/")
                    });
                }

                subFinder(item);
            }
        }
        path.pop();
    }
    
    if (query) {
        subFinder();
        showFilteredFiles(result);
    } else {
        alert("Пустой запрос");
        window.document.getElementById("searchField").focus();
    }
}

// <== Find