var _ = require('lodash');
var serverConfig = require('./server.config');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = _.extend({
  plugins: [
    new UglifyJsPlugin()
  ]
}, serverConfig);