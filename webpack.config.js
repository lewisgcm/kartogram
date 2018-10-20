const CopyWebpackPlugin = require('copy-webpack-plugin')

var base_config = {
    devtool: "source-map",
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json", ".html" ]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};

var ui = Object.assign({}, base_config, {
    entry: './src/ui/index.tsx',
    output: {
        path: __dirname + "/build/public",
        filename: "ui-bundle.js"
    },
    target: 'web',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'ui/index.html', context: 'src' }
        ])
    ]
});

var server = Object.assign({}, base_config, {
    entry: './src/server.ts',
    output: {
        path: __dirname + "/build",
        filename: "server.js"
    },
    target: 'node'
});

module.exports = [
    ui, server
];