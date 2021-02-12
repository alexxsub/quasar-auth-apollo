<template>
  <q-page class="flex flex-center">
   <q-uploader
        multiple
        url="http://localhost:4001/upload"
        style="max-width: 300px"
        @uploaded="onUploaded"
      />
  </q-page>
</template>

<script>
export default {
  name: 'Upload',
  methods: {
    onUploaded (info) {
      this.$q.notify({
        message: 'Файл успешно загружен!',
        caption: info.files[0].name,
        color: 'secondary'
      })
      console.log(info)
    }
  }
}
</script>
