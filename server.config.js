module.exports = {
  target: 'web',
  debug: true,
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
    { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
    { test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  }
};