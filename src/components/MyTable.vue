<template>
<q-layout view="lhh LpR lff" container style="height: 1080px" class="shadow-1 rounded-borders">
    <div class="row justify-center q-mt-md">
      <q-input
      v-model.number="pagination.rowsPerPage"
      type="number"
      dense
      style="max-width: 50px"
    />
      <q-pagination
        v-model="pagination.page"
        :max="pagesNumber"
        :boundary-numbers="true"
        size="md">
      </q-pagination>
     </div>
     <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination.sync="pagination"
      :loading="loading"
      hide-pagination
      :no-data-label="$t('nodata')"
      :no-results-label = "$t('noresult')"
    >
     <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
    <template v-slot:body="props">
    <q-tr :props="props" @click="props.expand = !props.expand">
         <q-td key="phone" :props="props">
             <a href="#" @click="editItem(props.row)"> {{ props.row.phone }}</a>
        </q-td>
         <q-td key="name" :props="props">
              {{ props.row.name }}
        </q-td>
         <q-td key="actions" :props="props">
              <q-btn size="sm" color="red" round icon="delete" @click="deleteItem(props.row)"></q-btn>
            </q-td>
         </q-tr>
         <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">{{ props.row.address }}.</div>
          </q-td>
        </q-tr>
    </template>

    </q-table>
  </q-layout>
</template>

<script>
import bus from '../event-bus'
export default {
  name: 'MyTable',
  data () {
    return {
      loading: false,
      editedItem: {
        id: '',
        username: '',
        email: ''
      },
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: this.rowsNumber
      }
    }
  },
  computed: {
    rowsNumber () {
      return this.data.length
    },
    pagesNumber () {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
    editItem (row) {
      event.stopPropagation()
      this.editedItem = Object.assign({}, row)
      bus.$emit('editRecord', this.editedItem)
    },
    deleteItem (row) {
      event.stopPropagation()
      bus.$emit('deleteRecord', row.id)
    }
  },

  props: {
    filter: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }

  }
}
</script>
