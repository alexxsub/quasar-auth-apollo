<template>
  <q-page padding>

    <div class="q-pa-md">

    <q-table
       virtual-scroll
      :title="$t('userstable')"
      :data="data"
      :columns="i18ncolumns"
      row-key="name"
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
        <q-tr :props="props">
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
            :scope="props"
            :roles="props.row.roles"
            />
          </q-td>
          <q-td>
            <q-icon v-if="props.row.enabled" name="mdi-account-check" style="color: green;font-size: 2em;" />
            <q-icon v-else-if="!props.row.enabled" name="mdi-account-cancel" style="color: red;font-size: 2em;" />
            </q-td>
            <q-td>
            <q-td >
              <q-btn size="sm" color="red"   round icon="delete" @click="deleteItem(props.row)"/>
            </q-td>
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
      data: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
          username: 'John Smith',
          email: 'john@mail.ru',
          enabled: true,
          roles: ['admin']
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
          username: 'Big Boss',
          email: 'boss@mail.ru',
          enabled: 'true',
          roles: ['director', 'manager']
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/87.jpg',
          username: 'Black Manager',
          email: 'manager@mail.ru',
          enabled: true,
          roles: ['manager']
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
          username: 'Looser Manager',
          email: 'looser@mail.ru',
          enabled: false,
          roles: []
        },
        {
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
    newRecord () {
      bus.$emit('newRecord')
    },
    editRecord (row) {
      bus.$emit('editRecord', row)
    },
    deleteItem () {

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
        { name: 'enabled', align: 'left' },
        { name: 'actions', label: '' }
      ]
      return columns
    }
  }
}
</script>
<style>

</style>
