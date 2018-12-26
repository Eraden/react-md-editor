const webpack = require("webpack");
const { resolve } = require("path");

const fs = require("fs");
const dotenv = require("dotenv");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackClearConsole = require("webpack-clear-console").WebpackClearConsole;

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = "development";

const debug = process.env.NODE_ENV === "development";

const plugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css", chunkFilename: "[id].css" }),
];

if (process.env.NODE_ENV !== "development") {
    plugins.push(new WebpackClearConsole());
}

module.exports = {
    entry:     {
        "md-editor": "./src/MarkdownEditor.jsx",
    },
    devtool:   "source-map",
    output:    {
        publicPath: "/",
        path:       resolve(__dirname, "lib"),
        filename:   "[name].js",
        // hashFunction: require('metrohash').MetroHash64
    },
    mode:      process.env.NODE_ENV,
    module:    {
        rules: [
            {
                test:    /\.css$/,
                use:     [
                    // 'style-loader',
                    {
                        loader:  MiniCssExtractPlugin.loader,
                        options: { publicPath: "../" }
                    },
                    {
                        loader:  "css-loader",
                        options: {
                            importLoaders: 1,
                            modules:       false,
                            sourceMap:     debug,
                        },
                    },
                ],
                exclude: /node_modules|modules/,
            },
            {
                test: /\.modules\.css$/,
                use:  [
                    // 'style-loader',
                    {
                        loader:  MiniCssExtractPlugin.loader,
                        options: { publicPath: "../" }
                    },
                    {
                        loader:  "css-loader",
                        options: {
                            modules:        true,
                            sourceMap:      debug,
                            importLoaders:  0,
                            localIdentName: "[path][name]__[local]",
                        }
                    }
                ]
            },
            {
                test:    /\.jsx?$/,
                use:     [
                    {
                        loader: "babel-loader",
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/i,
                use:  [
                    "file-loader",
                    {
                        loader: "image-webpack-loader"
                    }
                ]
            }
        ],
    },
    resolve:   {
        extensions: [
            ".wasm",
            ".mjs",
            ".js",
            ".jsx",
            ".json",
            ".css",
            ".modules.css",
            ".png",
            ".jpg",
            ".jpeg",
            ".gif",
            ".svg",
        ],
        alias:      {
            actions:      resolve(__dirname, "src", "actions"),
            components:   resolve(__dirname, "src", "components"),
            images:       resolve(__dirname, "src", "images"),
            reducers:     resolve(__dirname, "src", "reducers"),
            sagas:        resolve(__dirname, "src", "sagas"),
            sources:      resolve(__dirname, "src", "sources"),
            translations: resolve(__dirname, "src", "translations"),
            spec:         resolve(__dirname, "spec"),
        },
    },
    plugins,
    devServer: {
        port:               9000,
        index:              "index.html",
        inline:             true,
        contentBase:        "/",
        historyApiFallback: true,
        proxy:              {
            "/api": "http://127.0.0.1:3678",
        },
    },
};
