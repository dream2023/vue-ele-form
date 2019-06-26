module.exports = {
  css: { extract: false },
  configureWebpack: {
    entry: './example/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
