const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './src/index.pug',
    },
  },

  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.join(__dirname, '/src'),
      },
    },
  },
}
