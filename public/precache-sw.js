self.workbox.precaching.precache([
  'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css'
])

const imgRgx = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i)

const handler = new self.workbox.strategies.CacheFirst({
  cacheName: 'image-cache'
})

const matchFunction = ({ url }) => {
  return imgRgx.test(url.href)
}

self.workbox.routing.registerRoute(
  matchFunction,
  handler
)
