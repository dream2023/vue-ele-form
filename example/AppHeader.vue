<template>
  <div class="app-header-container">
    <div>
      <el-link
      :underline="false"
      href="https://github.com/dream2023/vue-ele-form"
      target="_blank"
      type="primary"
      style="font-size: 20px"
    >
      VUE-ELE-FORM
    </el-link>
    </div>
    <div>
      <el-link
        href="https://dream2023.gitee.io/form/"
        target="_blank"
        type="primary"
      >代码生成器</el-link>&nbsp;&nbsp;
      <el-link
        href="https://github.com/dream2023/vue-ele-form"
        target="_blank"
        type="primary"
      >GitHub</el-link>&nbsp;&nbsp;
      <el-link
        href="https://www.yuque.com/chaojie-vjiel/vbwzgu"
        target="_blank"
        type="primary"
      >文档</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style>
.app-header-container {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  background: white;
  height: 60px;
  line-height: 60px;
}
</style>
