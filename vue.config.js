module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './src/index.pug',
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
}
