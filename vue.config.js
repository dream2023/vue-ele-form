const path = require('path')

module.exports = {
  css: { extract: false },
  outputDir: 'docs',
  configureWebpack: {
    entry: './example/main.js',
    output: {
      libraryExport: 'default'
    },
    resolve: {
      // 设置别名
      alias: {
        'vue-ele-form': path.resolve(__dirname, './')
      }
    }
  }
}
