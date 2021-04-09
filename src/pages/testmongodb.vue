<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 500px">
<q-input
          square
          clearable
          v-model="count"
          lazy-rules
          :label="$t('countiteration')">
        </q-input>
        <q-input
        :label="$t('starttime')"
        v-model="time"
        mask="time"
        :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="time">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
          square
          readonly
          v-model="total"
          :label="$t('total')">
        </q-input>
         <q-linear-progress size="25px" :value="progress" color="accent">
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="progressLabel" />
      </div>
    </q-linear-progress>
         <div class="row">
           <div class="col">
        <q-btn
              unelevated
              size="md"
              color="secondary"
              @click="start"
              class="full-width text-white"
              :label="$t('start')"
            />
      </div>
           </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'TestMongoDB',
  data () {
    return {
      count: 0,
      time: this.getTime(),
      total: 0,
      progress: 37,
      progressLabel: '37%'
    }
  },
  methods: {
    getTime () {
      var date = new Date()
      return `${date.getHours()}:${date.getMinutes()}`
    },
    start () {

    }
  }

}
</script>
