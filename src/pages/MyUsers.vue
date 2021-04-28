<template>
   <q-page padding>
    <div class="q-pa-md">
    <my-table
      title="userstable"
      table="User"
      :data="getUsers"
      linkfield="username"
    />
    </div>
  </q-page>
</template>
<style>
</style>
<script>
import MyTable from '../components/MyTable'
import { USERS } from 'src/queries'
export default {
  name: 'Usesrs',
  components: {
    MyTable
  },
  data () {
    return {
      render: false
    }
  },
  apollo: {
    getUsers: {
      query: USERS
    }
  }
}
</script>
