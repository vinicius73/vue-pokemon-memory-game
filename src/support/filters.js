import { padStart, toInteger, toSafeInteger } from 'lodash-es'
const padHour = (value) => padStart(value, 2, 0)

const secToTimeStr = (val, showHour = true) => {
  const seconds = toInteger(val)
  const result = []

  if (showHour) {
    result.push(padHour(Math.floor(seconds / 3600))) // hours
    result.push(padHour(Math.floor(seconds / 60) % 60)) // minutes
  } else {
    result.push(padHour(Math.floor(seconds / 60))) // hours | minutes
  }

  result.push(padHour(seconds % 60))

  return result.join(':')
}

const getNavigatorLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0]
  }
  return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en'
}

const defLanguage = getNavigatorLanguage()

const numberFormat = (value, options = {}) => {
  return toSafeInteger(value).toLocaleString(defLanguage, options)
}

export function install (Vue) {
  Vue.filter('secToTimeStr', secToTimeStr)
  Vue.filter('number', numberFormat)
}
