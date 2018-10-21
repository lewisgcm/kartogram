const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const AwesomeTypescriptLoader = require('awesome-typescript-loader');

var base_config = {
    mode: 'development',
    devtool: "source-map",
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json", ".html", ".css" ],
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
    entry: './src/public/App.tsx',
    output: {
        path: __dirname + "/build/public",
        filename: "bundle.js"
    },
    target: 'web',
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, modules: true, localIdentName: "[local]___[hash:base64:5]" } },
                    'sass-loader'
                ]
            }
        ]
    },
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