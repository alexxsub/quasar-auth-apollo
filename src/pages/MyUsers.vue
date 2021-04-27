<template>
  <q-page class="flex flex-center">
Тест
    <my-table
      v-if="render"
      title="users"
      table="users"
      :data="getUsers"
      linkfield="username"
    />
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
