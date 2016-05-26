console.log("my webpack config file loaded!");

// or replace with   var CopyWebpackPlugin = require('copy-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/client/js/init.js',
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            loaders: [ //loaders is Array, loader is string
                'babel-loader' // loads babel-core, which reads .babelrc,
                // which is where actual babel presets for transformations
                // exists. 
            ],
            test: /\.jsx?$/,
            exclude: /(node_modules)/
        }]
    },

    plugins: [
            new CopyWebpackPlugin([

                {
                    from: __dirname + '/client/html/'
                }
            ])
        ]
        // plugins: [new HtmlWebpackPlugin({
        // 	title: 'My App',
        // 	filename: ''
        // })]

};
