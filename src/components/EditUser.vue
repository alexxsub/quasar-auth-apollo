<template>
 <div class="q-pa-md" style="max-width: 500px">
   {{editedItem}}
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
      input-debounce="0"
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
