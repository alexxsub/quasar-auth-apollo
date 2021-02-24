<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 500px">
         <upload-img ref="Uploader"
       :src="editedItem.avatar"
       url="http://localhost:4001/upload2"
       />
        <q-input
                       square
                       clearable
                       v-model="editedItem.username"
                       lazy-rules
                       :rules="[]"
                       :label="$t('username')">
                  <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                       square
                       clearable
                       v-model="editedItem.email"
                       lazy-rules
                       :rules="[]"
                       type="text"
                       autogrow
                       :label="$t('email')">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
                <q-select
                readonly
                square
                :label="$t('roles')"
                v-model="editedItem.roles"
                use-chips/>
    </div>
  </q-page>
</template>

<script>
import UploadImg from 'components/UploadImg.vue'
export default {
  name: 'Profile',
  components: { UploadImg },
  data () {
    return {
      editedItem: {
        id: '',
        avatar: '',
        username: '',
        email: '',
        roles: []
      }
    }
  }
}
</script>
