/* eslint-disable no-process-env */

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const plugins = [];
const entries = {};
const dataset = [];

for (const filepath of glob.sync('./dataset/**/entry.js')) {
    const suiteName = path.dirname(filepath).substr(10);
    entries[suiteName] = filepath;

    const plugin = new HtmlWebpackPlugin({
        chunks: ['commons', suiteName],
        config: JSON.stringify({suiteName}),
        filename: `${suiteName}.html`,
        template: './src/entry/suite.ejs',
        title: suiteName,
    });
    plugins.push(plugin);

    dataset.push(suiteName);
}

module.exports = {
    entry: {
        index: './src/entry/index.js',
        ...entries,
    },
    externals: {
        vue: 'Vue',
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                test: new RegExp('\\.(?<ext>vert|frag)$', 'u'),
                use: 'raw-loader',
            },
            {
                loader: 'html-loader',
                test: new RegExp('\\.html$', 'u'),
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    minSize: 0,
                    name: 'commons',
                    test: new RegExp('core', 'u'),
                },
            },
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            config: JSON.stringify({dataset}),
            filename: 'index.html',
            template: './src/entry/index.ejs',
        }),
        ...plugins,
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
        new webpack.EnvironmentPlugin([
            'INSPECTOR_METADATA_ENABLED',
        ]),
    ],
    watch: true,
};
