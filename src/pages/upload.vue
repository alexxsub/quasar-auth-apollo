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
        :url="computedUrl('upload')"
        style="max-width: 300px"
        @uploaded="onUploaded"
        @failed="onFailed"
      />
     </q-tab-panel>
     <q-tab-panel name="custom" style="overflow:hidden">
       <upload-img ref="Uploader"
       :url="computedUrl('upload2')"
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
import { showError, showMsg } from 'src/front-lib'
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
    computedUrl (url) {
      return `${process.env.BASE_URL}${url}`
    },
    uploadFile () {
      this.$refs.Uploader.uploadFile(true)
    },
    onFailed (info) {
      var el = document.createElement('html')
      el.innerHTML = info.xhr.response
      el.getElementsByTagName('body')
      showError(this.$t('messages.notuploaded'), el.innerText)
    },
    onUploaded (info) {
      showMsg(this.$t('messages.uploaded'), info)
    }
  }
}
</script>
