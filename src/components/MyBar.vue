<template>

<div class="bar-chart" :style="barStyle">
    <div class="bar-chart--parent" :style="barStyle1">
        <div class="bar-chart--parent" :style="barStyle2"/>
    </div>
</div>

</template>
<script>
export default {
  name: 'MyBar',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: Array,
      default: () => [100, 0]
    },
    height: {
      type: Number,
      default: 5
    }
  },
  computed: {
    barStyle () {
      return `height: ${this.height}px;background: green;`
    },
    barStyle1 () {
      return `background: rgb(0,255,0,.7);width:${this.value[1] + this.value[0]}%`
    },
    barStyle2 () {
      return `background: red;width:${this.value[1]}%`
    }
  }
}
</script>
<style>
.bar-chart {
  border-radius:2px;
}
.bar-chart .bar-chart--parent {
  height: 100%;
  float:right;
  border-radius:0 2px 2px 0;
}
</style>
