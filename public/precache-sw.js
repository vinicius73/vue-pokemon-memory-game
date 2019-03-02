self.workbox.precaching.precache([
  'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css'
])

const handler = new self.workbox.strategies.CacheFirst({
  cacheName: 'image-cache'
})

self.workbox.routing.registerRoute(
  new RegExp('\\.png$'),
  handler
)
self.workbox.routing.registerRoute(
  new RegExp('\\.jpg$'),
  handler
)
