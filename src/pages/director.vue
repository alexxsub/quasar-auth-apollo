<template>
  <q-page  padding>
    {{$t('directorctx')}}
  </q-page>
</template>

<script>
import { CHECK_ACCESS } from 'src/queries'
export default {
  name: 'Director',
  data () {
    return {

    }
  },
  apollo: {
    checkAccess: {
      query: CHECK_ACCESS,
      variables: { res: 'director' }
    }
  }
}
</script>
