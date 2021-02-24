<template>
  <q-page padding>
{{globalprops.expand}}
    <div class="q-pa-md">

    <q-table
       virtual-scroll
      :title="$t('userstable')"
      :data="data"
      :columns="i18ncolumns"
      row-key="id"
      class="my-table"
    >
    <!--
    <template v-slot:top-left>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
    </template> -->
    <template v-slot:top-right>
        <q-btn color="secondary" icon="add" @click="newRecord" :label="$t('add')" />
    </template>
    <template v-slot:body="props">
        <q-tr   @click="expand(props)" :props="props">
          <q-td >
      <q-avatar>
      <q-img v-if="!props.row.avatar" src="~assets/no-avatar.jpg" />
      <q-img v-else-if="props.row.avatar" :src="props.row.avatar" />
      <q-badge v-if="props.row.roles.includes('admin')" dense round color="orange" floating transparent>
          <q-icon
            name="mdi-crown"
          />
        </q-badge>
      </q-avatar>
          </q-td>
          <q-td>
            <a href='#' @click="editRecord(props.row)">{{props.row.username}}</a>
          </q-td>
          <q-td>
            {{props.row.email}}
          </q-td>
          <q-td>
            <role-chips
            :roles="props.row.roles"
            />
          </q-td>
          <q-td>
            <q-icon v-if="props.row.enabled" name="mdi-account-check" style="color: green;font-size: 2em;" />
            <q-icon v-else-if="!props.row.enabled" name="mdi-account-cancel" style="color: red;font-size: 2em;" />
            </q-td>

        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="full-width row">
              <q-btn class="offset-1" key="xl-1" rounded size="xs" color="positive" icon="edit" @click="editRecord(props.row)" :label="$t('edit')" />
              <q-btn class="offset-1" key="xl-2" rounded size="xs" color="negative" icon="delete" :label="$t('delete')" @click="deleteRecord(props.row.id)" />
              <q-toggle
                size="xs"
                class="offset-1"
                v-model="enabled"
                checked-icon="mdi-account-check"
                unchecked-icon="mdi-account-cancel"
                color="red"
                :label="$t('enabled')"
             />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  </q-page>
</template>

<script>
import RoleChips from 'components/RoleChips.vue'
import bus from '../event-bus'
export default {
  name: 'Users',
  components: { RoleChips },
  data () {
    return {
      globalprops: {},
      enabled: false,
      data: [
        {
          id: 1,
          avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
          username: 'John Smith',
          email: 'john@mail.ru',
          enabled: true,
          roles: ['admin']
        },
        {
          id: 2,
          avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
          username: 'Big Boss',
          email: 'boss@mail.ru',
          enabled: 'true',
          roles: ['director', 'manager']
        },
        {
          id: 3,
          avatar: 'https://randomuser.me/api/portraits/men/87.jpg',
          username: 'Black Manager',
          email: 'manager@mail.ru',
          enabled: true,
          roles: ['manager']
        },
        {
          id: 4,
          avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
          username: 'Looser Manager',
          email: 'looser@mail.ru',
          enabled: false,
          roles: []
        },
        {
          id: 5,
          avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
          username: 'Looser Manager',
          email: 'looser@mail.ru',
          enabled: false,
          roles: []
        }
      ]
    }
  },
  methods: {
    expand (p) {
      this.globalprops.expand = (p.expand && this.globalprops.expand)
      p.expand = !p.expand
      this.globalprops = p
    },
    newRecord () {
      bus.$emit('newRecord')
    },
    editRecord (row) {
      event.stopPropagation()
      bus.$emit('editRecord', row)
    },
    deleteRecord (id) {
      bus.$emit('deleteRecord', id)
    }
  },
  computed: {
    i18ncolumns () {
      const columns = [
        {
          name: 'avatar',
          align: 'left'
        },
        { name: 'username', align: 'left', label: this.$t('username') },
        { name: 'email', align: 'left', label: this.$t('email') },
        { name: 'roles', align: 'left', label: this.$t('roles') },
        { name: 'enabled', align: 'left' }

      ]
      return columns
    }
  }
}
</script>
<style>

</style>
