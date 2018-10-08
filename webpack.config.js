const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'markup.min.js',
        libraryTarget: 'umd',
        library: 'markup',
        // Workaround to fix umd build, restore webpack v3 behaviour
        // https://github.com/webpack/webpack/issues/6677
        // https://github.com/webpack/webpack/issues/6642
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader',
            },
        ],
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    plugins: [
        new webpack.IgnorePlugin(/(jsdom|optional)$/),
    ],
    mode: 'production',
};
