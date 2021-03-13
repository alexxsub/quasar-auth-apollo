<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
<q-card
:style="computedStyle">
<q-img
:src="previewSrc"
placeholder-src="~assets/no-avatar.jpg"
:ratio="1"
style="border-radius: 8px"
>
<template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          {{this.$t('cantloadimg')}}
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
</q-card>
</template>
<script>

function fileDialogChanged () {
  [...this.files].forEach(file => {
    const event = new CustomEvent('previewFile', { detail: file })
    window.dispatchEvent(event)
  })
}
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
    previewFile (info) {
      if (info) {
        this.previewSrc = window.URL.createObjectURL(info.detail)
        window.removeEventListener('previewFile', this.previewFile, false)
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
      var inputElement = document.createElement('input')
      inputElement.type = 'file'
      inputElement.accept = 'image/jpg,image/jpeg, image/png, image/gif'
      inputElement.multiple = false
      window.addEventListener('previewFile', this.previewFile)
      inputElement.addEventListener('change', fileDialogChanged)
      inputElement.dispatchEvent(new MouseEvent('click'))
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
