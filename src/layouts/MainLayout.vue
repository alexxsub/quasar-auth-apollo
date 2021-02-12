<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          SPA authentication and authorization demo
        </q-toolbar-title>

        <div><q-select
        borderless
        dark
        v-model="lang"
        map-options
        :options="langs"
        /></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="text-white"
      elevated
    >
      <q-list>
        <my-menu
          v-for="link in menuData"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
<q-drawer
      v-model="drawerOpen"
      :width="500"
      side="right"
      bordered
      overlay
      content-class="bg-grey-1"
    >
     <q-toolbar class="bg-grey-2">
      <q-toolbar-title>{{formTitle}}</q-toolbar-title>
      <q-btn dense
      color="secondary"
      :label="$t('save')"
      icon="save"
      class="q-mr-sm text-white"
      @click="btnSave"/>
    </q-toolbar>
    <edit-user @edited="onEdited"></edit-user>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MyMenu from 'components/MyMenu.vue'
import bus from '../event-bus'
import EditUser from 'components/EditUser.vue'

export default {
  name: 'MainLayout',
  components: { MyMenu, EditUser },
  data () {
    return {
      lang: this.$i18n.locale,
      leftDrawerOpen: true,
      drawerOpen: true,
      langs: [
        {
          label: 'Русский',
          value: 'ru'
        },
        {
          label: 'English',
          value: 'en-us'
        }
      ],
      editedItem: {
        id: '',
        username: '',
        email: ''
      },
      defaultItem: {
        id: '',
        username: '',
        email: ''
      }
    }
  },
  methods: {
    logIn () {
      this.$router.push('/login')
    },
    showError (message) {
      this.$q.notify({
        message,
        color: 'red',
        icon: 'error'
      })
    },
    btnSave () {

    },
    resetEditedItem () {
      this.editedItem = Object.assign({}, this.defaultItem)
      bus.$emit('resetRecord', this.defaultItem)
    },
    onEdited (item) {
      this.editedItem = Object.assign({}, item)
    },
    editRecord (row) {
      this.editedItem = Object.assign({}, row)
      this.drawerOpen = true
    }
  },
  watch: {
    drawerOpen (val) {
      if (!val) this.resetEditedItem()
    },
    lang (lang) {
      this.$i18n.locale = lang.value
      import('quasar/lang/' + lang.value).then(language => {
        this.$q.lang.set(language.default)
      })
    }
  },
  mounted () {
    // close dialog pressing 'esc'
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.drawerOpen = false
      }
    })
  },
  apollo: {},
  computed: {
    menuData () {
      return [
        {
          title: 'Upload',
          caption: 'Upload files demo',
          icon: 'cloud_upload',
          link: '/upload'
        },
        {
          title: 'Users',
          caption: 'List of users',
          icon: 'people',
          link: '/users'
        },
        {
          title: 'For director',
          caption: 'Context for director role',
          icon: 'mdi-account-cowboy-hat',
          link: '/director'
        },
        {
          title: this.$t('menu.manager.title'),
          caption: this.$t('menu.manager.caption'),
          icon: 'mdi-account-hard-hat',
          link: '/manager'
        },
        {
          title: 'Data table',
          caption: 'Data table for roles',
          icon: 'mdi-table-eye',
          link: '/table'
        }

      ]
    },
    i18ncolumns () {
      const columns = [
        // description columns
        {
          name: 'phone', // key
          label: this.$t('phone'), // head label of column
          align: 'left',
          field: row => row.phone, // field in DB, simple like <field: 'phone'>
          format: val => `${val}`, // change value
          sortable: true, // sortable
          style: 'width: 40%'
        },
        {
          label: this.$t('name'),
          align: 'left',
          sortable: true,
          field: 'name',
          name: 'name',
          style: 'width: 40%'
        },
        {
          name: 'actions',
          label: '',
          field: 'actions',
          style: 'width: 20%'
        }
      ]
      return columns
    },
    formTitle () {
      return this.editedItem.id === ''
        ? this.$t('addrecord')
        : this.$t('updaterecord')
    }
  },
  created () {
    bus.$on('editRecord', this.editRecord)
    bus.$on('deleteRecord', this.deleteRecord)
    bus.$on('Error', this.showError)
    bus.$on('Login', this.logIn)
  }
}
</script>
<style>
.q-drawer {
    background-image: url('~assets/lake.jpg') !important;
    background-size: cover !important;
  }
  .q-drawer__content {
    background-color: rgba(1, 1, 1, 0.75);
  }

</style>
