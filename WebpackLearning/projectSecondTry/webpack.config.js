"use strict";

const NOD_ENV = process.env.NOD_ENV || "development";
const webpack = require("webpack")

module.exports = {
    entry: "./home",
    output: {
        filename: "build.js",
        library: "home"
    },

    mode: "development",

    watch: NOD_ENV == "development",
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NOD_ENV == "development" ? "chip-inline-module-source-map" : null,

    plugins: [
        new webpack.DefinePlugin({
            NOD_ENV: JSON.stringify(NOD_ENV)
        })
    ]
}