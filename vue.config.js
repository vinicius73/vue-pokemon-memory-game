const version = require('./package.json').version
const now = Math.round(Date.now() / 6000).toString(36)

process.env.VUE_APP_VERSION = `${version}-${now}`

module.exports = {
  pwa: {
    name: 'Pokémon - Memory Game',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
}
