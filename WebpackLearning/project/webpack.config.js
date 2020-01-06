"use strict";

module.exports = {
    entry: "./home.js",
    output: {
        filename: "build.js",
        library: "home"
    },

    mode: "none",
    watch: true,

    devtool: "source-map"
}