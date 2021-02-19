<template>
<div>
<div v-if="roles.length > 0" >
    <q-chip v-for="role in roles" :key="role"

            :removable="removable"
            class="q-ma-none"
            @remove="scope.removeAtIndex(scope.index)"
            :tabindex="scope.tabindex"
            :color="colors[role]"
            text-color="white"
            dense
            :icon="icons[role]">{{$t(role)}}</q-chip>
</div>
       <q-chip
            v-else-if="roles.length==0"
            dense>{{$t('norole')}}</q-chip>

</div>
</template>
<script>
export default {
  name: 'RoleChips',
  props: {
    scope: {
      type: Object,
      default: () => {}
    },
    roles:
    {
      type: Array,
      default: () => []
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      colors: {
        admin: 'orange',
        manager: 'green',
        director: 'blue'
      },
      icons: {
        admin: 'mdi-crown',
        manager: 'mdi-account-hard-hat',
        director: 'mdi-account-cowboy-hat'
      }
    }
  }
}
</script>
