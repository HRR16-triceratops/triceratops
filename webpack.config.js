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
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
      { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
      { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
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
