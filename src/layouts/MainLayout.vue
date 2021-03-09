<template>
<q-layout view="hHh lpR fFf">
  <div class="cloud">
    <img src="~assets/cloud-01.png" alt="cloud" class="cloud1">
    <img src="~assets/cloud-02.png" alt="cloud" class="cloud2">
    <img src="~assets/cloud-03.png" alt="cloud" class="cloud3">
    <img src="~assets/cloud-04.png" alt="cloud" class="cloud4">
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
</q-layout>
</template>

<script>

import { CURRENT_USER } from 'src/queries'
import bus from '../event-bus'
import { showError } from '../front-lib'
import { QSpinnerFacebook } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {

    }
  },
  // apollo graphql backend data
  apollo: {
    getUser: {
      query: CURRENT_USER,
      update: function (data) {
        this.$q.loading.hide()
        this.$router.push('/home')
      }
    }
  },
  methods: {
    logIn () {
      this.$q.loading.hide()
      this.$router.push('/login')
    },
    showErrorProxy (msg) {
      if (msg[0] === '_') {
        const m = msg.split('_')
        msg = this.$t(m[1])
      }
      showError(msg)
    }
  },
  created () {
    bus.$on('Error', this.showErrorProxy)
    bus.$on('Login', this.logIn)
  },
  mounted () {
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'yellow',
      spinnerSize: 140,
      backgroundColor: 'blue'
    })
  }

}
</script>
<style>
.cloud {
    overflow: hidden;
    position: relative;
    width:100%;
    padding-bottom: 56.25%;
    height: 0;
    background: url('~assets/mountain.jpg');
    background-size: cover;
}
.cloud img {
    width: 100%;
    left: 0;
    top: 0;
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
}
@-webkit-keyframes animCloud {
    from {
        -webkit-transform: translateX(100%)
    }
    to {
        -webkit-transform: translateX(-100%)
    }
}
@-moz-keyframes animCloud {
    from {
        -moz-transform: translateX(100%)
    }
    to {
        -moz-transform: translateX(-100%)
    }
}
@keyframes animCloud {
    from {
        -webkit-transform: translateX(100%);
        -moz-transform: translateX(100%);
        -ms-transform: translateX(100%);
        -o-transform: translateX(100%);
        transform: translateX(100%)
    }
    to {
        -webkit-transform: translateX(-100%);
        -moz-transform: translateX(-100%);
        -ms-transform: translateX(-100%);
        -o-transform: translateX(-100%);
        transform: translateX(-100%)
    }
}
.cloud1 {
    -webkit-animation: animCloud 20s infinite linear;
    -moz-animation: animCloud 20s infinite linear;
    animation: animCloud 20s infinite linear
}
.cloud2 {
    -webkit-animation: animCloud 40s infinite linear;
    -moz-animation: animCloud 40s infinite linear;
    animation: animCloud 40s infinite linear
}
.cloud3 {
    -webkit-animation: animCloud 60s infinite linear;
    -moz-animation: animCloud 60s infinite linear;
    animation: animCloud 60s infinite linear
}
.cloud4 {
    -webkit-animation: animCloud 80s infinite linear;
    -moz-animation: animCloud 80s infinite linear;
    animation: animCloud 80s infinite linear
}

</style>
