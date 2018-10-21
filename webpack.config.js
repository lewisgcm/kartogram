const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const AwesomeTypescriptLoader = require('awesome-typescript-loader');

var base_config = {
    mode: 'development',
    devtool: "source-map",
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json", ".html" ],
        plugins: [
            new AwesomeTypescriptLoader.TsConfigPathsPlugin()
        ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};

var ui = Object.assign({}, base_config, {
    entry: './src/public/index.tsx',
    output: {
        path: __dirname + "/build/public",
        filename: "bundle.js"
    },
    target: 'web',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public/index.html', context: 'src' }
        ])
    ]
});

var server = Object.assign({}, base_config, {
    entry: './src/server.ts',
    output: {
        path: __dirname + "/build",
        filename: "server.js"
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    }
});

module.exports = [
    ui, server
];