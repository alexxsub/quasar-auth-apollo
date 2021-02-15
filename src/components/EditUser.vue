<template>
 <div class="q-pa-md" style="max-width: 500px">
  <div>
  <q-img style="height: 150px; width: 150px;border-radius: 5%"  :src="editedItem.avatar">
  <template v-slot:error>
    <div class="absolute-full flex flex-center bg-negative text-white">
      <a style="color:white;" target="blank" :href="editedItem.avatar" >{{ $t('cantloadimg') }}</a>
      <q-icon class="absolute all-pointer-events" size="xl" name="error" color="white" style="top: 8px; left: 8px" />
      <div class="absolute-bottom-right transparent">
          <q-btn size="xs" round color="primary" icon="mdi-image" @click="uploadAvatar" />
      </div>
      <div class="absolute-top-right transparent">
          <q-btn size="xs" round color="negative" icon="delete" @click="deleteAvatar" />
      </div>
    </div>
  </template>
      <div class="absolute-bottom-right transparent">
        <q-btn size="xs" round color="primary" icon="mdi-image" @click="uploadAvatar" />
      </div>
      <div class="absolute-top-right transparent">
        <q-btn size="xs" round color="negative" icon="delete" @click="deleteAvatar" />
      </div>
  </q-img>
  </div>
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
      @filter="onFilter">
      <template v-slot:prepend>
        <q-icon name="mdi-account-key" />
      </template>
          <template v-slot:selected-item="scope">
          <q-chip
            removable
            dense
            @remove="scope.removeAtIndex(scope.index)"
            :tabindex="scope.tabindex"
            color="white"
            text-color="primary"
            class="q-ma-none"
          >
            <q-avatar color="primary" text-color="white" :icon="scope.opt.icon"/>
            {{ $t(scope.opt.value) }}
          </q-chip>
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

export default {
  name: 'EditUser',
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
          value: 'admin',
          icon: 'mdi-crown'
        },
        {
          value: 'manager',
          icon: 'mdi-account-hard-hat'
        },
        {
          value: 'director',
          icon: 'mdi-account-cowboy-hat'
        }
      ]
    }
  },
  methods: {
    uploadAvatar () {
      const num = Math.floor(Math.random() * Math.floor(100))
      this.editedItem.avatar = `https://randomuser.me/api/portraits/men/${num}.jpg`
    },
    // удаляем аватарку с карточки пользователя
    deleteAvatar () {
      this.editedItem.avatar = require('assets/no-avatar.jpg')
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
