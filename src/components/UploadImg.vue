<template>
<q-card
:style="computedStyle">
<q-img
ref="previewImg2021"
:src="previewSrc"
placeholder-src="~assets/no-avatar.jpg"
:ratio="1"
style="border-radius: 8px"
>
<template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Cannot load image
        </div>
</template>
</q-img>
    <q-btn
          v-if="previewSrc===''"
          class="absolute"
          style="top: 5px; right: 5px;"
          size="xs"
          round
          color="primary"
          icon="add"
          @click="inputFile" />
         <q-btn
         v-if="previewSrc!==''"
          class="absolute"
          style="top: 120px; right: 5px;"
          size="xs"
          round
          color="negative"
          icon="delete"
          @click="deleteFile" />
          <input
           style="visibility: hidden;"
           ref="fileInput2021"
           type="file"
           @change="previewFile()" />
</q-card>
</template>
<script>

import { showError, showMsg } from 'src/front-lib'

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
      previewSrc: ''
    }
  },

  watch: {
    src (val) {
      this.previewSrc = this.computedUrl(val === undefined ? '' : val)
    }
  },
  computed: {
    computedStyle () {
      return `width:${this.width}px;height:${this.height}px;border-radius: 8px`
    }
  },

  methods: {
    computedUrl (url) {
      return `${url === '' ? '' : process.env.BASE_URL + url}`
    },
    previewFile () {
      const file = this.$refs.fileInput2021.files[0]

      if (file) {
        this.previewSrc = window.URL.createObjectURL(file)
      } else {
        this.previewSrc = ''
      }
    },
    uploadFile (notify) {
      return new Promise((resolve, reject) => {
        var file = this.$refs.fileInput2021.files[0]
        if (!file) resolve('')
        else {
          var formData = new FormData()
          formData.append('file', file)
          fetch(this.computedUrl(this.url), { method: 'POST', body: formData })
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
            .catch((error) => reject(error))
        }
      })
    },
    inputFile () {
      const f = this.$refs.fileInput2021
      f.click()
    },

    deleteFile () {
      window.URL.revokeObjectURL(this.previewSrc)
      this.previewSrc = ''
    },
    onError (info) {
      showError(this.$t(this.notuploaded), info)
    },
    onUploaded (info) {
      showMsg(this.$t(this.uploaded), info)
    }
  }
}
</script>
<style>

</style>
