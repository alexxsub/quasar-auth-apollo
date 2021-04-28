<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
<div>
      <q-table
      v-if="render"
      virtual-scroll
      :title="$t(title)"
      :data="this.data"
      :columns="i18ncolumns"
      row-key="_id"
    >
    <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="(val,key) in props.row" :props="props" :key="key">
            <my-cell
              :val="String(val)"
              :field="key"
              :linkfield="linkfield"
              :row="props.row"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>
</template>

<script>

import MyCell from 'src/components/MyCell'
import { GET_COLUMNS } from 'src/queries'
export default {
  name: 'MyTable',
  components: {
    MyCell
  },
  data () {
    return {
      model: 'users',
      globalprops: {}, // previos expanded tr of table
      enabled: false, // value of enabled field expanded record
      row_id: '', // id of current expanded record
      render: false, // flag of render page
      Columns: [], // list of columns
      hiddenTitle: ['avatar', 'enabled']// hidden  title of columns
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title:
    {
      type: String,
      default: ''
    },
    table:
    {
      type: String,
      default: ''
    },
    linkfield:
    {
      type: String,
      default: ''
    }
  },
  apollo: {
    getColumns: {
      query: GET_COLUMNS,
      variables: {
        model: 'User'
      },
      update: function (data) {
        const cols = data.getColumns
        if (cols !== undefined) {
          this.Columns = cols.map(el => {
            el.field = el.name
            el.align = 'left'
            return el
          })
        }
        this.render = true
      }
    }
  },
  methods: {
  },
  computed: {
    getModel () {
      return 'users'
    },
    i18ncolumns () {
      return this.Columns.map(el => {
        if (!this.hiddenTitle.includes(el.name)) { el.label = this.$t(el.name) }
        return el
      })
    }
  }
}
</script>
