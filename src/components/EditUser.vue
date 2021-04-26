
<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
 <div class="q-pa-md" style="max-width: 500px">
      <upload-img ref="Uploader"
       v-model="editedItem.avatar"
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
  <q-select
      square
      :label="$t('roles')"
      v-model="editedItem.roles"
      use-chips
      multiple
      :options="filterOptions"
      @filter="onFilter">
      <template v-slot:prepend>
        <q-icon name="mdi-account-key" />
      </template>
        <template v-slot:selected-item="scope">
          <q-chip
            removable
            dense
            :color="role(scope.opt).color"
            @remove="scope.removeAtIndex(scope.index)"
            :tabindex="scope.tabindex"
            text-color="white"
            :icon="role(scope.opt).icon"
          >
            {{ $t(scope.opt)}}
          </q-chip>

        </template>
        <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
             <q-item-section avatar>
                <q-icon :name="role(scope.opt).icon" />
             </q-item-section>
              <q-item-section>
                <q-item-label v-html="$t(scope.opt)" ></q-item-label>
              </q-item-section>
            </q-item>
          </template>
    </q-select>
      <q-checkbox
      v-model="editedItem.enabled"
      :label="$t('enabled')" />

</div>
</template>

<script>
import bus from '../event-bus'
import { showError, showMsg } from '../front-lib'
import UploadImg from 'components/UploadImg.vue'
import TypeRoles from 'components/TypeRoles'
import { MODIFY_USER } from 'src/queries'
export default {
  name: 'EditUser',
  components: { UploadImg },
  data () {
    return {
      render: false,
      filterOptions: this.stringOptions,
      editedItem: {},
      defaultItem: {
        _id: '',
        avatar: '',
        username: '',
        fullname: '',
        email: '',
        enabled: false,
        roles: []
      }
    }
  },
  computed: {
    stringOptions () {
      return TypeRoles.map(i => i.value)
    }
  },
  methods: {

    role (key) {
      return TypeRoles.filter(i => i.value === key)[0]
    },
    // фильтрация записей при выборе ролей на карточке пользователя
    onFilter (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.stringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = this.stringOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    editRecord (item) {
      // need only default structure
      this.editedItem = Object.assign({}, this.defaultItem)
      for (var key in this.editedItem) {
        this.editedItem[key] = item[key]
      }
      this.render = true
    },
    newRecord () {
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    saveRecord () {
      this.$refs.Uploader.uploadFile(false)
        .then(file => {
          const input = {
            input: this.editedItem
          }
          if (file !== '')input.input.avatar = file
          this.$apollo
            .mutate({
              mutation: MODIFY_USER,
              variables: input
            })
            .then(data => {
              this.drawerOpen = false
              const message = this.editedItem.id === ''
                ? this.$t('recordadded')
                : this.$t('recordupdated')
              showMsg(message)
              return true
            })
            .catch(error => {
              showError(error.message)
              return false
            })
        })
    }
  },
  created () {
    bus.$on('editRecord', this.editRecord)
    bus.$on('newRecord', this.newRecord)
  }
}
</script>
