"use strict";

let selectedParent = "";

function generateChildren(base) {
    return base.reduce((code, child) =>
        code + `        <div hidden="true" id="${child.title}" class="child">${child.title}</div>\n`
    , `    <div class="string">\n`) + `    </div>`;
}

function generate(base) {

    let parents = base.reduce((code, parent) =>
        code + `        <div id="${parent.title}" onclick="selectParent()" class="parent">${parent.title}</div>\n`
        , `    <div class="string">\n`) + `    </div>`;

    let children = base.reduce((code, parent) => code + generateChildren(parent.children), "\n");

    document.body.innerHTML = parents + children;
}

function changeChildren(selection, setHidden) {
    let children = config.filter(item => item.title == selection)[0].children;
    for (let child of children) {
        document.getElementById(child.title).hidden = setHidden;
    }
}

function selectParent() {
    const newSelection = event.target.id;
    if (selectedParent == newSelection) {
        changeChildren(selectedParent, true);
        selectedParent = "";
    } else {
        if (selectedParent != "") {
            changeChildren(selectedParent, true);
        }
        changeChildren(newSelection, false);
        selectedParent = newSelection;
    }
}