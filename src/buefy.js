import { Notification } from 'buefy/dist/components/notification'
import { Icon } from 'buefy/dist/components/icon'
import { Loading } from 'buefy/dist/components/loading'
import { Switch } from 'buefy/dist/components/switch'

export function install (Vue) {
  Vue.component('b-notification', Notification)
  Vue.component('b-icon', Icon)
  Vue.component('b-loading', Loading)
  Vue.component('b-switch', Switch)
}
