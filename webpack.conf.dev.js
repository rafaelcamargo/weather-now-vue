const fs = require('fs'),
  webpack = require('webpack'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));

module.exports = {
  devtool: 'eval',
  output: {
    filename: project.scripts.dist.filename.dev
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(project.styles.dist.filename.dev)
  ],
  devServer: {
    hot: true,
    contentBase: `${__dirname}/${project.index.dist.root}`,
    port: 7000
  }
}
