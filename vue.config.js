const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  outputDir: '../public',
  indexPath: '../resources/views/app.blade.php',
  publicPath: '/',
}