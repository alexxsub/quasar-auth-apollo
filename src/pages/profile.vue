<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 500px">
    <upload-img ref="Uploader"
       :src="editedItem.avatar"
       url="upload2"
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
              <role-select  v-model="editedItem.roles" >
        </role-select>
         <q-checkbox
          v-model="changepassword"
          label="Change password"
        />
        <q-input
                ref="password"
                autocomplete="on"
                square
                clearable
                v-model="form.password"
                :type="passwordFieldType"
                lazy-rules
                :rules="signup?[this.required,this.short]:null"
                :label="$t('auth.password')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                ref="repassword"
                autocomplete="on"
                v-if="signup"
                square
                clearable
                v-model="form.repassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="[this.required,this.short,this.match]"
                :label="$t('auth.repassword')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
    </div>
  </q-page>
</template>

<script>
import UploadImg from 'components/UploadImg.vue'
import RoleSelect from 'components/RoleSelect.vue'
import { CURRENT_USER } from 'src/queries'
export default {
  name: 'Profile',
  components: { UploadImg, RoleSelect },
  data () {
    return {
      basicinput: 'test',
      changepassword: false,
      editedItem: {
        avatar: '',
        username: '',
        email: '',
        roles: []
      }
    }
  },
  apollo: {
    getUser: {
      query: CURRENT_USER,
      update: function (data) {
        this.editedItem = Object.assign({}, data.getCurrentUser)
      }
    }
  },
  methods: {

  },
  created () {

  }
}
</script>
