<!--© 2021 Alexx Sub, https://github.com/alexxsub/-->
<template>
  <q-item
    active-class="tab-active"
    class="q-ma-sm navigation-item"
    clickable
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label class="text-grey" caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MyMenu',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
  .navigation-item {
    border-radius: 5px !important;
  }
  .tab-active {
    background-color:rgb(74, 94, 137) !important;
  }
</style>
