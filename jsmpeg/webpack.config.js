const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'electron-main',
  node: {
	fs: 'empty',
	net: 'empty',
	child_process:'empty'
  },
  module: {
 }
};
