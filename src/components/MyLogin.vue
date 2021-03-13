<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
  <div class="fullscreen row justify-evenly items-center"
       style="z-index: 5000; background-color: rgba(0, 0, 255, 0.35); padding: 0px; margin: 0px;"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card
          square
          class="shadow-24"
          style="width:400px;height:560px;"
        >
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">
              {{ title }}
            </h4>
             <q-img
              width="32px"
              :src="langImg(this.lang)"
              class="absolute"
              style="top: 5px; right: 12px; cursor:pointer;"
            >
             <q-menu
                content-class="bg-deep-purple-2"
                anchor="top right"
                self="top left"
              >
          <q-list style="min-width: 100px">
            <q-item v-for="{id,name} in languages"
            :key="id"
            clickable
             @click="lang = id"
            v-close-popup>
               <q-item-section avatar>
                  <img
                    width="32px"
                    :src="langImg(id)"/>
                </q-item-section>
              <q-item-section>{{name}}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
            </q-img>
          </q-card-section>
          <q-card-section>
            <q-fab
              color="primary"
              @click="signup = !signup"
              icon="add"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            >
            </q-fab>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                ref="email"
                v-if="signup"
                square
                clearable
                v-model="form.email"
                type="email"
                lazy-rules
                :rules="[this.required,this.isEmail,this.short]"
                :label="$t('auth.email')"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                ref="username"
                square
                clearable
                v-model="form.username"
                lazy-rules
                :rules="[this.required,this.short]"
                type="username"
                :label="$t('auth.username')"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                ref="password"
                autocomplete="on"
                square
                clearable
                v-model="form.password"
                :type="passwordFieldType"
                lazy-rules
                :rules="signup?[this.required,this.short]:null"
                :label="$t('auth.password')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                ref="repassword"
                autocomplete="on"
                v-if="signup"
                square
                clearable
                v-model="form.repassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="[this.required,this.short,this.match]"
                :label="$t('auth.repassword')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="secondary"
              @click="submit"
              class="full-width text-white"
              :label="btnLabel"
            />
          </q-card-actions>
          <q-card-section
            v-if="!signup"
            class="text-center q-pa-sm"
          >
            <p class="text-grey-6">
              {{this.$t('auth.forgotpass')}}
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SIGNIN, SIGNUP } from 'src/queries'
import { showError, showMsg } from '../front-lib'
import { langs } from '../i18n'
export default {
  name: 'MyLogin',
  data: function () {
    return {
      languages: langs,
      overlay: true,
      form: {
        username: '',
        email: '',
        password: '',
        repassword: ''
      },
      signup: false,
      visibility: false,
      lang: this.$i18n.locale

    }
  },
  watch: {
    lang (val) {
      this.$i18n.locale = val
      import('quasar/lang/' + val).then(language => {
        this.$q.lang.set(language.default)
      })
      // have to revalidate to change lang
      Object.keys(this.form).forEach(el => {
        if (this.$refs[el] !== undefined) {
          if (this.$refs[el].hasError) {
            this.$refs[el].validate()
          }
        }
      })
    }
  },
  computed: {
    visibilityIcon () {
      return this.visibility ? 'visibility_off' : 'visibility'
    },
    passwordFieldType () {
      return this.visibility ? 'text' : 'password'
    },
    title () {
      return this.signup ? this.$t('auth.newuser') : this.$t('auth.auth')
    },
    btnLabel () {
      return this.signup ? this.$t('auth.signup') : this.$t('auth.signin')
    },
    langImg: (app) => (lang) => {
      return require('assets/' + lang + '.png')
    }
  },

  methods: {
    signUp () {
      this.$apollo
        .mutate({
          mutation: SIGNUP,
          variables: {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          }
        })
        .then(data => {
          showMsg(this.$t('signuped'))
          this.signup = false
        })
        .catch(error => showError(error.message))
    },
    signIn () {
      this.$apollo
        .mutate({
          mutation: SIGNIN,
          variables: {
            username: this.form.username,
            password: this.form.password
          }
        }).then(data => {
          localStorage.setItem('token', data.data.signIn.token)
          this.$router.push('/home')
        }).catch(error => showError(error.message))
    },
    required (val) {
      return ((val && (val.length > 0)) || this.$t('validate.required'))
    },
    match (reval) {
      const val = this.$refs.password.value
      return ((reval && (val === reval)) || this.$t('validate.match'))
    },
    short (val) {
      return ((val && (val.length > 3)) || this.$t('validate.short'))
    },
    isEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return (emailPattern.test(val) || this.$t('validate.isemail'))
    },
    submit () {
      if (this.signup) {
      // fire validate each field
        Object.keys(this.form).forEach(el => {
          if (this.$refs[el] !== undefined) { this.$refs[el].validate() }
        })
        // check error of validation

        if (this.$refs.email.hasError || this.$refs.username.hasError || this.$refs.password.hasError) {
          showError(this.$t('checkfields'))
        } else this.signUp()
      } else this.signIn()
    },
    switchVisibility () {
      this.visibility = !this.visibility
    }
  }
}
</script>

<style>
</style>
