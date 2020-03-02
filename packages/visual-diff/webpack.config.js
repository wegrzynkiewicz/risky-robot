const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const plugins = [];
const entries = {};
const dataset = [];

glob.sync('./dataset/**/entry.js').map(filepath => {
    const suiteName = path.dirname(filepath).substr(10);
    entries[suiteName] = filepath;

    const plugin = new HtmlWebpackPlugin({
        title: suiteName,
        template: './src/entry/suite.ejs',
        filename: `${suiteName}.html`,
        chunks: ['commons', suiteName],
        config: JSON.stringify({
            suiteName,
        }),
    });
    plugins.push(plugin);

    dataset.push(suiteName);
});

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        index: './src/entry/index.js',
        ...entries,
    },
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/entry/index.ejs',
            filename: 'index.html',
            chunks: ['index'],
            config: JSON.stringify({
                dataset: dataset
            }),
        }),
        ...plugins,
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new webpack.EnvironmentPlugin([
            'INSPECTOR_METADATA_ENABLED'
        ]),
    ],
    module: {
        rules: [
            {
                test: new RegExp('\\.(vert|frag)$'),
                use: 'raw-loader',
            },
            {
                test: new RegExp('\\.html$'),
                loader: 'html-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    minSize: 0,
                    test: /core/,
                    name: 'commons',
                    chunks: 'all'
                }
            }
        }
    },
};
