<template>
  <div>
    <span v-if="field===linkfield">
      <a href="#">{{ val }}</a>
    </span>
    <span v-else-if="field==='avatar'">
      <q-avatar>
        <q-img v-if="!val" src="/statics/no-avatar.jpg" />
        <q-img v-else-if="val" :src="val" />
        <q-badge v-if="row.superuser" dense round color="orange" floating transparent>
          <q-icon
            name="mdi-crown"
          />
        </q-badge>
      </q-avatar>
    </span>
    <span v-else-if="field==='disabled'">
      <q-icon v-if="val==='false'" name="verified_user" style="color: green;font-size: 2em;" />
      <q-icon v-else-if="val==='true'" name="mdi-account-cancel" style="color: red;font-size: 2em;" />
    </span>
    <span v-else-if="field==='superuser'">
      <q-icon v-if="val==='true'" name="mdi-crown" style="color: orange;font-size: 2em;" />
    </span>

    <span v-else>{{ val }} </span>
  </div>
</template>

<script>
export default {
  name: 'MyCell',
  data () {
    return {
    }
  },
  props: {
    field: {
      type: String,
      default: ''
    },
    val: {
      type: String,
      default: ''
    },
    linkfield: {
      type: String,
      default: 'name'
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
  }
}
</script>
