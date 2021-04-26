<template>
  <q-layout  view="lHh Lpr lFf">
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
          {{$t('title')}}
        </q-toolbar-title>
        <q-select
        borderless
        dark
        v-model="lang"
        map-options
        :options="languages"
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
          v-for="link in i18nMenu"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
       </q-scroll-area>
       <q-img class="absolute-top" src="~assets/material2.png" style="height: 120px">
          <div class="absolute-top bg-transparent">
            <q-avatar  class="q-mb-sm">
              <img :src="computedUrl(currentUser.avatar)">
            </q-avatar>
            </div>
            <div class="absolute-bottom bg-transparent">
            <router-link
              class="routerlink"
              to="profile">
              <div class="text-weight-bold">{{currentUser.fullname===''||currentUser.fullname===null?currentUser.username:currentUser.fullname}}</div>
            </router-link>
            <div>{{currentUser.email}}</div>
            </div>
            <div class="absolute-bottom-right bg-transparent">
             <q-btn round color="secondary" icon="logout" @click="logOut" />
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
      <q-toolbar-title>{{$t(this.title)}}</q-toolbar-title>
      <q-btn dense
      color="secondary"
      :label="$t('save')"
      icon="save"
      class="q-mr-sm text-white"
      @click="btnSave"/>
    </q-toolbar>
    <edit-user v-model="editedItem" ref="editUser" ></edit-user>

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
import { showError } from '../front-lib'
import EditUser from 'components/EditUser.vue'
import { CURRENT_USER, MENU } from 'src/queries'
const noimg = require('assets/no-avatar.jpg')
import { langs } from '../i18n'
export default {
  name: 'HomeLayout',
  components: { MyMenu, EditUser },
  data () {
    return {
      currentUser: {},
      editedItem: {},
      lang: this.$i18n.locale,
      leftDrawerOpen: true,
      drawerOpen: false,
      title: 'addrecord'
    }
  },
  // apollo graphql backend data
  apollo: {
    getMenu: {
      query: MENU,
      fetchPolicy: 'no-cache'
    },
    getUser: {
      query: CURRENT_USER,
      update: function (data) {
        this.currentUser = Object.assign({}, data.getCurrentUser)
      }
    }
  },
  methods: {

    computedUrl (url) {
      return url === '' || url === null ? noimg : `${process.env.BASE_URL}${url}`
    },
    showErrorProxy (msg) {
      if (msg[0] === '_') {
        const m = msg.split('_')
        msg = this.$t(m[1])
      }
      showError(msg)
    },
    logIn () {
      this.$router.push('/login')
    },
    logOut () {
      // clear token in localstorage
      localStorage.setItem('token', '')
      // clear cash of apollo client
      this.$root.$apolloProvider.defaultClient.cache.data.clear()
      this.$router.push('/login')
    },

    btnClose () {
      this.drawerOpen = false
    },
    btnSave () {
      this.drawerOpen = this.$refs.editUser.saveRecord()
    },
    editRecord (row) {
      this.title = 'updaterecord'
      this.editedItem = Object.assign({}, row)
      this.drawerOpen = true
    },
    newRecord (row) {
      this.title = 'addrecord'
      this.drawerOpen = true
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang.value
      import('quasar/lang/' + lang.value).then(language => {
        this.$q.lang.set(language.default)
      })
    }
  },
  mounted () {
    // close edit drawer dialog pressing 'esc' key
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.drawerOpen = false
      }
    })
  },

  computed: {
    languages () {
      return langs.map(el => {
        return {
          value: el.id,
          label: el.name
        }
      })
    },
    i18nMenu () {
      return this.getMenu
        ? this.getMenu.map(el => {
          el.title = this.$t(`menu.${el.name}.title`)
          el.caption = this.$t(`menu.${el.name}.caption`)
          return el
        }) : []
    }
  },
  created () {
    bus.$on('newRecord', this.newRecord)
    bus.$on('editRecord', this.editRecord)
    bus.$on('Error', this.showErrorProxy)
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
.routerlink{
  display: block;
  color: rgb(252, 250, 250);
}
</style>
