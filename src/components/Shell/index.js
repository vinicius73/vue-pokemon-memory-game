const ShellHeader = () => import(/* webpackChunkName: "app-shell-fragment" */'./Header.vue')
const ShellFooter = () => import(/* webpackChunkName: "app-shell-fragment" */'./Footer.vue')
const ShellAlertDone = () => import(/* webpackChunkName: "app-shell-fragment" */'./AlertDone.vue')
const ShellAlertError = () => import(/* webpackChunkName: "app-shell-fragment" */'./AlertError.vue')

export default {
  ShellHeader,
  ShellFooter,
  ShellAlertDone,
  ShellAlertError
}
