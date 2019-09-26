<template>
  <div>
    <app-header />
    <div
      class="ele-form-demo-list"
      style="margin-top: 80px"
    >
      <form-desc-demo />
      <form-desc-props />
      <form-group />
      <form-desc-type />
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import FormDescDemo from './FormDescDemo'
import FormDescProps from './FormDescProps'
import FormGroup from './FormGroup'
import FormDescType from './FormDescType'

export default {
  name: 'App',
  provide: {
    // 检查类型是否合法
    checkType (data) {
      return Object.keys(data).every(key =>
        this.$EleFormBuiltInNames.includes(data[key].type)
      )
    }
  },
  components: {
    AppHeader,
    FormDescDemo,
    FormDescProps,
    FormGroup,
    FormDescType
  },
  data () {
    return {}
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
