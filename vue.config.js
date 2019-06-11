const version = require('./package.json').version
const now = Math.round(Date.now() / 6000).toString(36)

process.env.VUE_APP_VERSION = `${version}-${now}`

module.exports = {
  configureWebpack: {
    node: { Buffer: false },
    optimization: {
      splitChunks: {
        cacheGroups: {
          html2canvas: {
            priority: 9,
            test: /\/html2canvas/,
            name: 'html2canvas',
            chunks: 'all'
          },
          downloadjs: {
            priority: 8,
            test: /\/downloadjs/,
            name: 'buefy',
            chunks: 'all'
          },
          buefy: {
            priority: 7,
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
      importScripts: ['/precache-sw.js'],
      skipWaiting: true
    }
  }
}
