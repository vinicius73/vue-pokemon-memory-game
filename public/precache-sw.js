self.workbox.precaching.precache([
  'https://cdn.materialdesignicons.com/3.5.95/css/materialdesignicons.min.css',
  'https://cdn.materialdesignicons.com/3.5.95/fonts/materialdesignicons-webfont.eot?v=3.5.95'
])

const imgRgx = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i)

const handler = new self.workbox.strategies.CacheFirst({
  plugins: [
    new self.workbox.cacheableResponse.Plugin({
      statuses: [0, 200, 304]
    })
  ],
  cacheName: 'images'
})

const matchFunction = ({ url }) => {
  return imgRgx.test(url.href)
}

self.workbox.routing.registerRoute(
  matchFunction,
  handler
)
