"use strict";

module.exports = {
    entry: "./home",
    output: {
        filename: "build.js",
        library: "home"
    },

    mode: "development",

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
}