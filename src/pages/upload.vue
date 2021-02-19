<template>
  <q-page>
     <div class="q-pa-md">
    <div class="q-gutter-y-md" style="width: 400px">
    <q-tabs
        v-model="tab"
        class="text-teal"
      >
        <q-tab name="quasar"  label="Quasar" />
        <q-tab name="custom"  :label="$t('custom')" />
 </q-tabs>
 <q-tab-panels v-model="tab" animated>
   <q-tab-panel name="quasar">
      <q-uploader
        multiple
        url="http://localhost:4001/upload"
        style="max-width: 300px"
        @uploaded="onUploaded"
        @failed="onFailed"
      />
     </q-tab-panel>
     <q-tab-panel name="custom" style="overflow:hidden">
       <upload-img ref="Uploader"
       url="http://localhost:4001/upload2"
       />
       <q-btn style="width:150px" :label="$t('upload')" color="primary" icon="file_upload" @click="uploadFile" />
       </q-tab-panel>
   </q-tab-panels>
   </div>
   </div>
  </q-page>
</template>
import MyMenu from 'components/MyMenu.vue'
<script>

import UploadImg from 'components/UploadImg.vue'
export default {
  name: 'Upload',
  components: { UploadImg },
  data () {
    return {
      tab: 'quasar'
    }
  },
  methods: {
    uploadFile () {
      this.$refs.Uploader.uploadFile()
    },
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
