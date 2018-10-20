const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        ui: "./src/ui/index.tsx",
        server: "./src/server.ts"
    },
    output: {
        ui: {
            path: __dirname + "/build/public",
            filename: "ui-bundle.js"
        },
        server: {
            path: __dirname + "/build",
            filename: "server.js"
        }
    },
    devtool: "source-map",
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json", ".html" ]
    },
    target: 'node',
    /*node: {
        console: true,
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs:  'empty'
    },*/
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'ui/index.html', context: 'src' }
        ])
    ]
};