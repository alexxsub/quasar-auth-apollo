<template>
 <div class="q-pa-md" style="max-width: 500px">
   {{stringOptions}}
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
                       @change = "onChange"
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
                       @change = "onChange"
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
      emit-value
      map-options
      multiple
      :options="filterOptions"
      @change = "onChange"
      @filter="onFilter">
      <template v-slot:prepend>
        <q-icon name="mdi-account-key" />
      </template>
          <template v-slot:selected-item="scope">
          <!--<q-chip
            removable
            dense
            color="orange"
            @remove="scope.removeAtIndex(scope.index)"
            :tabindex="scope.tabindex"
            text-color="primary"
            class="q-ma-none"
          >
            <q-avatar color="primary" text-color="white" :icon="scope.opt.icon"/>
            {{ scope.opt.label }}
          </q-chip>-->
          <role-chips
            :removable=true
            :scope = "scope"
            :roles = "scope.opt"
          />
        </template>
        <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
             <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
             </q-item-section>
              <q-item-section>
                <q-item-label v-html="$t(scope.opt.value)" ></q-item-label>
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
import UploadImg from 'components/UploadImg.vue'
import RoleChips from 'components/RoleChips.vue'
export default {
  name: 'EditUser',
  components: { UploadImg, RoleChips },
  data () {
    return {
      filterOptions: this.stringOptions,
      editedItem: {
        id: '',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        username: '',
        email: '',
        enabled: false,
        roles: []
      }
    }
  },
  computed: {
    stringOptions () {
      return [
        {
          value: 'admin'
        },
        {
          value: 'manager'
        },
        {
          value: 'director'
        }
      ]
    }
  },
  methods: {

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
    onChange () {
      this.$emit('edited', this.editedItem)
    },
    setEditedItem (item) {
      this.editedItem = Object.assign({}, item)
    }
  },
  created () {
    // fire onClick record of table
    bus.$on('editRecord', this.setEditedItem)
    bus.$on('resetRecord', this.setEditedItem)
  }
}
</script>
