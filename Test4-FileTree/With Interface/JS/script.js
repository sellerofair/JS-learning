"use strict";

// Classes ==>

class Root {
    constructor() {
        this.type = "Root"
        this.name = "ROOT";
        this.content = [];
        this.selected = false;
    }
}

class Folder {
    constructor(name = "New Folder") {
        this.type = "Folder"
        this.name = name;
        this.content = [];
        this.selected = false;
    }
}

class File {
    constructor(name = "Empty File.txt") {
        this.type = "File"
        this.name = name.slice(0, name.lastIndexOf("."));
        this.extention = name.slice(name.lastIndexOf(".") + 1);
        this.selected = false;
    }
}

// <== Classes

// Global things ==>

const list = window.document.getElementById("extentions");

let selectedPath = [];
let workFolder;
let extentionsList = {};

let tree = new Root;

// <== Global things