<template>
  <q-page class="flex flex-center">

 js upload
  </q-page>
</template>

<script>
export default {
  name: 'Upload2',
  methods: {
    onFailed (info) {
      var el = document.createElement('html')
      el.innerHTML = info.xhr.response
      el.getElementsByTagName('body')
      this.$q.notify({
        message: this.$t('messages.notuploaded'),
        caption: el.innerText,
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }],
        type: 'negative'
      })
    },
    onUploaded (info) {
      this.$q.notify({
        message: this.$t('messages.uploaded'),
        caption: info.files[0].name,
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }],
        type: 'positive'
      })
    }
  }
}
</script>
