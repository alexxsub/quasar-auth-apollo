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

export default {
  name: 'Upload2',
  data () {
    return {
      fileID: ''
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
      fetch('http://localhost:4001/upload2', { method: 'POST', body: formData })
        .then((response) => {
          // console.log(response)
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
      this.$q.notify({
        message: this.$t('messages.notuploaded'),
        caption: info,
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }],
        type: 'negative'
      })
    },
    onUploaded (info) {
      this.$q.notify({
        message: this.$t('messages.uploaded'),
        caption: info,
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }],
        type: 'positive'
      })
    }
  }
}
</script>
