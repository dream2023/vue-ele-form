<template>
  <div>
    <app-header />
    <div class="ele-form-demo-list" style="margin-top: 80px">
      <vue-run-sfc
        title="vue-ele-form 初体验"
        :open="true"
        :style="{ marginBottom: '20px' }"
        :code="simple"
      />
      <vue-run-sfc title="vue-ele-form 全部类型" :code="type" />
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import typeDemo from './demos/type.js'
import simpleDemo from './demos/simple.js'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      simple: simpleDemo,
      type: typeDemo
    }
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}
.ele-form-demo-list {
  margin: 20px 50px;
}
</style>
