const fs = require('fs'),
  webpack = require('webpack'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));

module.exports = {
  output: {
    filename: project.scripts.dist.filename.prod
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin(project.styles.dist.filename.prod)
  ]
}
