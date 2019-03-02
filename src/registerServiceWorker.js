/* eslint-disable no-console */

import { register } from 'register-service-worker'

const dispatchEvent = (name, meta, timeout = 8000) => {
  setTimeout(() => {
    const event = new Event(name)

    if (meta) {
      event.meta = meta
    }

    document.dispatchEvent(event)
  }, timeout)
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      // console.log(
      //   'App is being served from cache by a service worker.\n' +
      //   'For more details, visit https://goo.gl/AFskqB'
      // )
    },
    registered (registration) {
      registration.update()
    },
    cached () {
      // console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      dispatchEvent('sw:update')
      dispatchEvent('sw:update', undefined, 8000 * 5)
    },
    offline () {
      // console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
