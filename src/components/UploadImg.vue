<template>
<q-card
:style="computedStyle">
<img ref="previewImg2021" :src="computedSrc"/>

    <q-btn
          class="absolute"
          style="top: 5px; right: 5px;"
          size="xs"
          round
          color="primary"
          icon="add"
          @click="inputFile" />
         <q-btn
          class="absolute"
          style="top: 120px; right: 5px;"
          size="xs"
          round
          color="negative"
          icon="delete"
          @click="deleteFile" />
          <input style="visibility: hidden;"  ref="fileInput2021" type="file"  @change="previewFile()" />
</q-card>
</template>
<script>
const defaultnoimg = require('assets/no-avatar.jpg')
export default {
  name: 'UploadImg',
  props: {
    url: {
      type: String,
      required: true
    },
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '150'

    },
    height: {
      type: String,
      default: '150'

    },
    noimg: {
      type: String,
      default: ''
    },
    notuploaded: {
      type: String,
      default: 'messages.notuploaded'
    },
    uploaded: {
      type: String,
      default: 'messages.uploaded'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    computedNoImg () {
      return this.noimg === '' ? defaultnoimg : this.noimg
    },
    computedSrc () {
      return this.src === '' ? this.computedNoImg : `${process.env.PREFIX_URL}${this.src}`
    },
    computedStyle () {
      return `width:${this.width}px;height:${this.height}px;border-radius: 5%`
    }
  },

  methods: {
    previewFile () {
      const preview = this.$refs.previewImg2021,
        file = this.$refs.fileInput2021.files[0],
        reader = new FileReader()

      reader.onloadend = function () {
        preview.src = reader.result
      }

      if (file) {
        reader.readAsDataURL(file)
      } else {
        preview.src = defaultnoimg
      }
    },
    uploadFile (notify) {
      return new Promise((resolve, reject) => {
        var file = this.$refs.fileInput2021.files[0]
        var formData = new FormData()
        formData.append('file', file)
        fetch(this.url, { method: 'POST', body: formData })
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              return response.json()
            } else {
              throw Error(`${response.url} ${response.status} (${response.statusText})`)
            }
          })
          .then(data => {
            if (data.status) {
              if (notify) this.onUploaded(data.file)
              resolve(data.file)
            }
          })
          .catch((error) =>
            reject(error)
          )
      })
    },
    inputFile () {
      const f = this.$refs.fileInput2021
      f.click()
    },

    deleteFile () {
      const preview = this.$refs.previewImg2021
      preview.src = this.computedNoImg
    },
    onError (info) {
      this.$q.notify({
        message: this.$t(this.notuploaded),
        caption: info,
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }],
        type: 'negative'
      })
    },
    onUploaded (info) {
      this.$q.notify({
        message: this.$t(this.uploaded),
        caption: info,
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }],
        type: 'positive'
      })
    }
  }
}
</script>
<style>

</style>
