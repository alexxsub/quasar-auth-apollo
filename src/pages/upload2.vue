<template>
<q-page class="flex flex-center">
    <q-card style="width:150px;height:150px;border-radius: 5%">
      <img ref="previewImg" src="~assets/no-avatar.jpg"/>
        <q-btn
          class="absolute"
          style="top: 5px; right: 5px;"
          size="xs"
          round
          color="primary"
          icon="mdi-image"
          @click="inputFile" />
         <q-btn
          class="absolute"
          style="top: 120px; right: 5px;"
          size="xs"
          round
          color="negative"
          icon="delete"
          @click="deleteFile" />
    </q-card>

  <q-btn round color="primary" icon="file_upload" @click="uploadFile" />

  <input style="visibility: hidden;"  ref="fileInput" type="file"  @change="previewFile()" />

  </q-page>
</template>

<script>
import { showError, showMsg } from 'src/front-lib'
export default {
  name: 'Upload2',
  data () {
    return {
    }
  },

  methods: {
    previewFile () {
      const preview = this.$refs.previewImg,
        file = this.$refs.fileInput.files[0],
        reader = new FileReader()

      reader.onloadend = function () {
        preview.src = reader.result
      }

      if (file) {
        reader.readAsDataURL(file)
      } else {
        preview.src = require('assets/no-avatar.jpg')
      }
    },
    uploadFile () {
      var file = this.$refs.fileInput.files[0]
      var formData = new FormData()
      formData.append('file', file)
      fetch(process.env.BASE_URL + 'Upload2', { method: 'POST', body: formData })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json()
          } else {
            throw Error(`${response.url} ${response.status} (${response.statusText})`)
          }
        })
        .then(data => {
          if (data.status) {
            this.onUploaded(data.file)
          }
        })
        .catch((error) => {
          this.onError(error.toString())
        })
    },
    inputFile () {
      const f = this.$refs.fileInput
      f.click()
    },
    deleteFile () {
      const preview = this.$refs.previewImg
      preview.src = require('assets/no-avatar.jpg')
    },
    onError (info) {
      showError(this.$t('messages.notuploaded'), info)
    },
    onUploaded (info) {
      showMsg(this.$t('messages.uploaded'), info)
    }
  }
}
</script>
