const { resolve } = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = "development";

const debug = process.env.NODE_ENV === "development";

const plugins = [
    new MiniCssExtractPlugin({ filename: "MarkdownEditor.css" }),
];

module.exports = {
    entry:   "./src/MarkdownEditor/index.jsx",
    devtool: "source-map",
    output:  {
        path:           resolve(__dirname, "lib"),
        filename:       "MarkdownEditor.js",
        library:        "MarkdownEditor",
        libraryTarget:  'umd',
        umdNamedDefine: true
    },
    mode:    "development",
    module:  {
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
                            localIdentName: "[path][name]_[hash:base64]_[local]",
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
    resolve: {
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
        ]
    },
    plugins
};
