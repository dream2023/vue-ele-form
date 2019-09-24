<template>
  <div>
    <app-header />
    <div class="ele-form-demo-list">
      <form-desc-demo />
      <form-desc-props />
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import FormDescDemo from './FormDescDemo'
import FormDescProps from './FormDescProps'
export default {
  name: 'App',
  components: {
    AppHeader,
    FormDescDemo,
    FormDescProps
  },
  data () {
    return {
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
.ele-form-demo-list .demo-card {
  margin: 20px 50px;
}
.ele-form-demo-list .CodeMirror {
  font-size: 18px !important;
}
</style>
