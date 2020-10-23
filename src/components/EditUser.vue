<template>
 <div class="q-pa-md" style="max-width: 500px">
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

</div>
</template>

<script>
import bus from '../event-bus'
export default {
  name: 'EditUser',
  data () {
    return {
      editedItem: {
        id: '',
        username: '',
        email: ''
      }
    }
  },
  methods: {
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
