function call (...args) {
  if (!window.ga) {
    return
  }

  window.ga(...args)
}

const send = (...args) => {
  call('send', ...args)
}

const set = (...args) => {
  call('set', ...args)
}

call.send = send
call.set = set

const install = Vue => {
  Object.defineProperty(Vue.prototype, '$ga', {
    get: () => call
  })
}

export { send, set, install }
export default install
