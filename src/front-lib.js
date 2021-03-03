import { Notify } from 'quasar'
function showError (message) {
  Notify.create({
    message,
    position: 'top',
    type: 'negative',
    icon: 'error'
  })
}
function showMsg (message, caption) {
  Notify.create({
    message,
    position: 'top',
    caption,
    color: 'positive',
    icon: 'done'
  })
}
export { showError, showMsg }
