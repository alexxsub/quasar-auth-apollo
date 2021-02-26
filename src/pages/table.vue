<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-table
      :title="$t('datatable')"
      :data="getData"
      :columns="i18ncolumns"
      row-key="name"
    />
  </div>
  </q-page>
</template>

<script>
import { DATA } from 'src/queries'
export default {
  name: 'Table',
  data () {
    return {
      columns: [
        { name: 'name' },
        { name: 'admin' },
        { name: 'director' },
        { name: 'manager' }
      ],

      data: [
        {
          name: 'Строка 1',
          admin: 159,
          director: 6.0,
          manager: 24
        },
        {
          name: 'Строка 2',
          admin: 159,
          director: 6.0,
          manager: 24
        },
        {
          name: 'Строка 3',
          admin: 159,
          director: 6.0,
          manager: 24
        }
      ]
    }
  },
  apollo: {
    getData: {
      query: DATA
    }
  },
  computed: {
    i18ncolumns () {
      return this.columns.map(el => {
        el.label = this.$t(el.name)
        el.field = el.name
        return el
      })
    }
  }

}
</script>
