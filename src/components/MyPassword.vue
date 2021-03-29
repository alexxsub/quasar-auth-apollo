<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
<div>
        <q-input
                ref="password"
                autocomplete="on"
                square
                clearable
                v-model="password"
                :type="passwordFieldType"
                lazy-rules
                :rules="!single?[this.required,this.short]:null"
                :label="computedLabel"
                @input="handleInput"
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
                v-if="!single"
                square
                clearable
                v-model="repassword"
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
</div>
</template>
<script>

export default {
  name: 'MyPassword',
  props: {
    value:
    {
      type: String,
      default: ''
    },
    single:
    {
      type: Boolean,
      default: false
    },
    password_label:
    {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visibility: false,
      password: this.value,
      repassword: ''
    }
  },

  methods: {
    handleInput (e) {
      this.$emit('input', this.password)
    },
    switchVisibility () {
      this.visibility = !this.visibility
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
    }

  },
  computed: {
    computedLabel () {
      return this.password_label === '' ? this.$t('auth.password') : this.password_label
    },
    visibilityIcon () {
      return this.visibility ? 'visibility_off' : 'visibility'
    },
    passwordFieldType () {
      return this.visibility ? 'text' : 'password'
    }

  }
}
</script>
