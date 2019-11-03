const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/entry/start.js',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dist.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './templates/index.html'
        })
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
