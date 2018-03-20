const fs = require('fs'),
  argv = require('yargs').argv,
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  project = JSON.parse(fs.readFileSync('./project.json', 'utf8')),
  env = argv.env || 'development';

module.exports = {
  entry: `${__dirname}/${project.scripts.source.entry}`,
  output: {
    path: `${__dirname}/${project.scripts.dist.root}`
  },
  module: {
    rules: [{
      test: /\.(styl|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { minimize: true } },
          'stylus-loader'
        ]
      })
    }, {
      test: /\.html$/,
      include: [`${__dirname}/${project.scripts.source.root}`],
      use: 'html-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      '@vue$': `${__dirname}/node_modules/vue/dist/vue.esm.js`,
      '@environment$': `${__dirname}/${project.environments.source.root}/${env}.js`,
      '@scripts': `${__dirname}/${project.scripts.source.root}`,
      '@styles': `${__dirname}/${project.styles.source.root}`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: project.index.source.file,
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([{
      from: project.images.source.files,
      to: project.images.dist.root
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ]
}
