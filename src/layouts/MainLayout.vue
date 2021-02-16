<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan-8">
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
          {{title}}
        </q-toolbar-title>

        <q-select
        borderless
        dark
        v-model="lang"
        map-options
        :options="langs"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="text-white"
      elevated
    >
    <q-scroll-area style="height: calc(100% - 120px); margin-top: 120px; ">
      <q-list>
        <my-menu
          v-for="link in menuData"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
       </q-scroll-area>
       <q-img class="absolute-top" src="~assets/material2.png" style="height: 120px">
          <div class="absolute-top bg-transparent">
            <q-avatar class="q-mb-sm">
              <img :src="user.avatar">
            </q-avatar>
            </div>
            <div class="absolute-bottom bg-transparent">
            <div class="text-weight-bold">{{user.username}}</div>
            <div>{{user.email}}</div>
            </div>
            <div class="absolute-bottom-right bg-transparent">
             <q-btn round color="secondary" icon="logout" />
             </div>

        </q-img>
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
        <q-btn dense
      color="red"
      size="md"
      flat
      icon="close"
      class="q-mr-sm text-white"
      @click="btnClose"/>
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

   <q-footer elevated class="bg-cyan-8">
      <q-toolbar class="text-white">
        <q-toolbar-title class="text-center text-caption">
          &copy; 2020-{{ new Date().getFullYear() }} —
          {{$t('copyright')}}&nbsp;&nbsp;Alexx Sub&nbsp;&nbsp;
          <q-icon name="mdi-github" style="color: white;font-size: 1em;" />&nbsp;
          <a class="text-caption text-white" href="https://github.com/alexxsub/quasar-auth-apollo.git" target="_blank">github</a>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
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
      user: {
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        username: 'Johm Smit',
        email: 'john@mail.ru'
      },
      lang: this.$i18n.locale,
      leftDrawerOpen: true,
      drawerOpen: false,
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
        type: 'negative',
        icon: 'error'
      })
    },
    btnClose () {
      this.drawerOpen = false
    },
    btnSave () {
      this.drawerOpen = false
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
  // apollo backend data
  apollo: {},
  computed: {
    title () {
      return this.$t('title')
    },
    menuData () {
      return [
        {
          title: this.$t('menu.home.title'),
          caption: this.$t('menu.home.caption'),
          icon: 'home',
          link: '/#'
        },
        {
          title: this.$t('menu.upload.title'),
          caption: this.$t('menu.upload.caption'),
          icon: 'cloud_upload',
          link: '/upload'
        },
        {
          title: this.$t('menu.upload2.title'),
          caption: this.$t('menu.upload2.caption'),
          icon: 'file_upload',
          link: '/upload2'
        },
        {
          title: this.$t('menu.users.title'),
          caption: this.$t('menu.users.caption'),
          icon: 'people',
          link: '/users'
        },
        {
          title: this.$t('menu.director.title'),
          caption: this.$t('menu.director.caption'),
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
          title: this.$t('menu.data.title'),
          caption: this.$t('menu.data.caption'),
          icon: 'mdi-table-eye',
          link: '/table'
        }

      ]
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
