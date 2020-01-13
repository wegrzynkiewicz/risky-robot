const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: './src/entry/index.js',
        suite: './src/entry/suite.js',
    },
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/entry/index.html',
            filename: 'index.html',
            chunks: ["index"],
        }),
        new HtmlWebpackPlugin({
            template: './src/entry/suite.html',
            filename: 'suite.html',
            chunks: ["suite"],
        }),
        new webpack.EnvironmentPlugin([
            'INSPECTOR_METADATA_ENABLED'
        ]),
    ],
    module: {
        rules: [
            {
                test: new RegExp("\\.(vert|frag)$"),
                use: 'raw-loader',
            },
            {
                test: new RegExp("\\.html$"),
                loader: "html-loader"
            }
        ]
    }
};
