import { Notify } from 'quasar'
function showError (message) {
  Notify.create({
    message,
    position: 'top',
    type: 'negative',
    icon: 'error'
  })
}
function showMsg (message) {
  Notify.create({
    message,
    position: 'top',
    color: 'positive',
    icon: 'done'
  })
}
export { showError, showMsg }
