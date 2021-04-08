<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 500px">
    <upload-img ref="Uploader"
       v-model="editedItem.avatar"
       :url="url"
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
          v-model="editedItem.fullname"
          lazy-rules
          :rules="[]"
          :label="$t('fullname')">
          <template v-slot:prepend>
          <q-icon name="mdi-account-tie" />
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
              <role-select
                readonly
                v-model="editedItem.roles" >
              </role-select>
         <q-checkbox
          v-model="editedItem.changepassword"
          :label="$t('changepassword')"
        />
        <div v-if="editedItem.changepassword">
        <my-password
        :password_label="$t('oldpassword')"
        single="true"
        v-model="editedItem.oldpassword"
        />
      <my-password
      :password_label="$t('newpassword')"
      v-model="editedItem.newpassword"
      />
        <p class="text-grey-6">
              {{this.$t('auth.forgotpass')}}
            </p>
             </div>
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
              color="white"
              @click="reset"
              class="text-blue"
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
import { showError, showMsg } from '../front-lib'
import { CURRENT_USER, MODIFY_PROFILE } from 'src/queries'
export default {
  name: 'Profile',
  components: { UploadImg, RoleSelect, MyPassword },
  data () {
    return {
      url: 'upload2',
      currentUser: {},
      editedItem: {
        _id: '',
        avatar: '',
        username: '',
        fullname: '',
        email: '',
        roles: [],
        changepassword: false,
        oldpassword: '',
        newpassword: ''
      }
    }
  },
  apollo: {
    getUser: {
      query: CURRENT_USER,
      update: function (data) {
        Object.keys(this.editedItem).forEach(key => {
          if (key in data.getCurrentUser) this.editedItem[key] = data.getCurrentUser[key]
        })
        this.currentUser = Object.assign({}, this.editedItem)
      }
    }
  },
  methods: {
    save () {
      this.$refs.Uploader.uploadFile(false)
        .then(file => {
          const input = {
            input: this.editedItem
          }
          delete input.input.roles
          if (file !== '')input.input.avatar = file
          this.$apollo
            .mutate({
              mutation: MODIFY_PROFILE,
              variables: input
            })
            .then(data => {
              showMsg(this.$t('recordupdated'))
              return true
            })
            .catch(error => {
              showError(error.message)
              return false
            })
        })
    },
    cancel () {
      this.$router.go(-1)
    },
    reset () {
      this.editedItem = Object.assign({}, this.currentUser)
    }
  }

}
</script>
