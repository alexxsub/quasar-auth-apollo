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
      <my-password v-if="changepassword"/>
       <div class="row">
      <div class="col">
       <q-btn
              unelevated
              size="md"
              color="white"
              @click="cancel"
              class="text-red"
              :label="$t('cancel')"
            />
      </div>
        <div class="col">
        <q-btn

              unelevated
              size="md"
              color="primary"
              @click="reset"
              class="text-white"
              :label="$t('reset')"
            />
      </div>
      <div class="col">
        <q-btn

              unelevated
              size="md"
              color="secondary"
              @click="save"
              class="full-width text-white"
              :label="$t('save')"
            />
      </div>
    </div>

    </div>
  </q-page>
</template>

<script>
import UploadImg from 'components/UploadImg.vue'
import RoleSelect from 'components/RoleSelect.vue'
import MyPassword from 'components/MyPassword.vue'
import { CURRENT_USER } from 'src/queries'
export default {
  name: 'Profile',
  components: { UploadImg, RoleSelect, MyPassword },
  data () {
    return {
      changepassword: false,
      currentUser: {},
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
        this.currentUser = Object.assign({}, data.getCurrentUser)
      }
    }
  },
  methods: {
    save () {

    },
    cancel () {
      this.$router.go(-1)
    },
    reset () {
      this.editedItem = Object.assign({}, this.currentUser)
    }
  },
  created () {

  }
}
</script>
