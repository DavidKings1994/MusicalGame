var webpack = require('webpack');

module.exports = {
    entry: [ __dirname + "/src/js/main.js"],
    output: {
        path: __dirname + "/dist/",
        publicPath: __dirname + "/public/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery'
        })
    ],
    resolve: {
        alias: {
            'jquery': __dirname + '/node_modules/jquery/dist/jquery.js'
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(png|jpg)$/, loader: 'file-loader' }
        ],
    }
};
