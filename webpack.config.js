var join = require('path').join

module.exports = {
  entry: './src/frontend/index.ts',
  output: {
    path: join(__dirname, 'dist', 'frontend'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
    ]
  }
}
