<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
<div>
  <q-select
      :readonly="readonly"
      square
      :label="$t('roles')"
      :value="value"
      @input="handleInput"
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
</div>
</template>
<script>
import TypeRoles from 'components/TypeRoles'
export default {
  name: 'RoleSelect',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterOptions: this.stringOptions
    }
  },

  computed: {
    stringOptions () {
      return TypeRoles.map(i => i.value)
    }
  },
  methods: {
    handleInput (v) {
      this.$emit('input', v)
    },
    role (key) {
      return TypeRoles.filter(i => i.value === key)[0]
    },

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
    }

  }
}
</script>
