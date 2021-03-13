<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
<div>
<div v-if="roles.length > 0" >
    <q-chip v-for="rol in roles" :key="rol"
            dense
            text-color="white"
            :color="role(rol).color"
            :icon="role(rol).icon">
            {{$t(rol)}}
    </q-chip>
</div>
    <q-chip
            v-else-if="roles.length==0"
            dense>
            {{$t('norole')}}
    </q-chip>

</div>
</template>
<script>
import TypeRoles from 'components/TypeRoles'
export default {
  name: 'RoleChips',
  props: {
    roles:
    {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    role (key) {
      return TypeRoles.filter(i => i.value === key)[0]
    }
  }
}
</script>
