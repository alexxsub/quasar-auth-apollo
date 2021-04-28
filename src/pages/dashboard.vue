<template>
  <q-page>
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
                <div class="text-h6">Data Center Assets</div>
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
              <div class="col-10">
                <div class="text-h6">Supports</div>
                <div class="text-h5">140</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" class="my-icon"  name="fas fa-medkit"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

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
