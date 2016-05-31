console.log("Webpack config file loaded!");

var CopyWebpackPlugin = require('copy-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // uses our init.js for entry point
  entry: __dirname + '/client/index.js',

  output: {
    // outputs pack to bundle js.
    path: __dirname + '/build',
    filename: "bundle.js",
    sourceMapFilename: 'bundle.map'
  },

  devtool: '#source-map',
  
  module: {
    loaders: [
      { 
        // runs all jsx through babel
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']     
      },
      { 
        // loads all css through style-loader
        test: /\.css$/,
        loader: "style-loader!css-loader" 
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin
    ([
      {
        from: __dirname + '/client/index.html',
        to: __dirname + '/build/index.html'
      }
    ])
  ]
    // plugins: [new HtmlWebpackPlugin({
    //  title: 'My App',
    //  filename: ''
    // })]

};
