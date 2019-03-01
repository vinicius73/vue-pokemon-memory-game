const version = require('./package.json').version
const now = Math.round(Date.now() / 6000).toString(36)

process.env.VUE_APP_VERSION = `${version}-${now}`

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          buefy: {
            priority: 5,
            test: /\/buefy/,
            name: 'buefy',
            chunks: 'all'
          },
          'lodash-es': {
            priority: 6,
            test: /\/lodash-es/,
            name: 'lodash-es',
            chunks: 'all'
          }
        }
      }
    }
  },
  pwa: {
    name: 'Pokémon - Memory Game',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true
    }
  }
}
