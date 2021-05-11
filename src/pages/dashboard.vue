<template>
  <q-page>
 <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="fas fa-gem"
        label="Assets"
      >
  <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'blue_dark':'bg-blue-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-server"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Data Center</div>
              </div>
                <div class="col-1"/>
                <div class="col-8">1 730 055 000  <i class="fas fa-ruble-sign"></i></div>
                <div class="col-2 text-h5 text-right">1264</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-print"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Back Office</div>
              </div>
                <div class="col-1"/>
                <div class="col-8">30 760 000  <i class="fas fa-ruble-sign"></i></div>
               <div class="col-2 text-h5 text-right">120</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'purple_dark':'bg-purple-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-laptop"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Front Office</div>
              </div>
                <div class="col-9"/>
               <div class="col-2 text-h5 text-right">160</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'pink_dark':'bg-pink-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-network-wired"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Network</div>
              </div>
                <div class="col-9"/>
               <div class="col-2 text-h5 text-right">100 000</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
         <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'teal_dark':'bg-teal-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fab fa-microsoft"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Software</div>
              </div>
                <div class="col-9"/>
               <div class="col-2 text-h5 text-right">160</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'yellow_dark':'bg-yellow-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-tint"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Cunsumables</div>
              </div>
                <div class="col-9"/>
               <div class="col-2 text-h5 text-right">160</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'grey_dark':'bg-grey-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-handshake"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Contracts</div>
              </div>
                <div class="col-9"/>
               <div class="col-2 text-h5 text-right">160</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-medkit"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Supports</div>
              </div>
                <div class="col-9"/>
               <div class="col-2 text-h5 text-right">160</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'orange_dark':'bg-orange-8'" class="text-white">
               <div class="row">
              <div class="col-9"/>
              <div class="col-2">
                <q-icon class="my-icon" size="50px" name="fas fa-file-contract"/>
              </div>
              <div class="col-1"/>
            </div>
            <div class="absolute-full">
            <div class="row">
                <div class="col-1"/>
              <div class="col-11">
                <div class="text-h6">Licences</div>
              </div>
                <div class="col-9"/>
               <div class="col-2 text-h5 text-right">570</div>
               <div class="col-1"/>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>

    </q-expansion-item>
      </q-list>
       </div>
  </q-page>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {

    }
  }
}
</script>
<style lang="sass" scoped>
.my-icon
    opacity: 0.2
.my-card
    width: 100%
</style>
<!-- https://asset.mgmt.tensor.ru/
https://github.com/mayank091193/quasar-admin-crm
https://fontawesome.com/
-->
