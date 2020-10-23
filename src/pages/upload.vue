<template>
  <q-page class="flex flex-center">
   <q-uploader
        multiple
        url="http://localhost/upload"
        style="max-width: 300px"
      />
  </q-page>
</template>

<script>
export default {
  name: 'Upload'
}
</script>
