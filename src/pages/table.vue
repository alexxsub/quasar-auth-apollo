<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-table
      :title="$t('datatable')"
      :data="data"
      :columns="i18ncolumns"
      row-key="name"
    />
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
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
  computed: {
    i18ncolumns () {
      const columns = [
        {
          name: 'name',
          required: true,
          label: this.$t('name'),
          align: 'left',
          field: 'name',
          sortable: true
        },
        { name: 'admin', label: this.$t('admin'), field: 'admin' },
        { name: 'director', label: this.$t('director'), field: 'director' },
        { name: 'manager', label: this.$t('manager'), field: 'manager' }
      ]
      return columns
    }
  }

}
</script>
