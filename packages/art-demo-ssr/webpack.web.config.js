const path = require('path');

module.exports = {
  entry: './client/home/index.tsx',
  output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              include: path.join(__dirname, 'client'),
              test: /\.(ts|tsx)$/,
              use: 'babel-loader'
          }
      ]
  },
  resolve: {
      extensions: ['.js', '.jsx', '.tsx']
  },
};