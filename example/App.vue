<template>
  <div>
    <el-card
      header="ele-form演示"
      shadow="never"
      style="max-width: 1250px;margin: 20px auto;"
    >
      <dev v-if="show === 'dev'" />
      <demo v-if="show === 'demo'" />
      <group v-if="show === 'group'" />
    </el-card>
  </div>
</template>

<script>
import Dev from './Dev'
import Demo from './Demo'
import Group from './Group'

export default {
  name: 'App',
  components: {
    Dev,
    Demo,
    Group
  },
  data () {
    return {
      show: 'group'
    }
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
}
</style>
