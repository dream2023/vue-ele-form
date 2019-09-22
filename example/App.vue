<template>
  <div>
    <form-desc-demo />
    <!-- <form-desc-props /> -->
  </div>
</template>

<script>
import FormDescDemo from './FormDescDemo'
// import FormDescProps from './FormDescProps'
export default {
  name: 'App',
  components: {
    FormDescDemo
    // FormDescProps
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
}
</style>
