<template>
  <div>
    <el-card
      header="ele-form演示"
      shadow="never"
      style="max-width: 1250px;margin: 20px auto;"
    >
      <dev v-if="isDev" />
      <demo v-else />
    </el-card>

    <!-- <el-button
      @click="isDev = !isDev"
      style="margin-top: 50px"
    >切换模式</el-button>-->
  </div>
</template>

<script>
import Dev from './Dev'
import Demo from './Demo'

export default {
  name: 'App',
  components: {
    Dev,
    Demo
  },
  data () {
    return {
      isDev: true
    }
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
}
</style>
