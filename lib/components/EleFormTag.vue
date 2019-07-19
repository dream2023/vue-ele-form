<template>
  <div>
    <div>
      <el-tag
        :disable-transitions="false"
        :key="index"
        @close="handleDelete(index)"
        closable
        style="margin-right: 10px;"
        v-for="(tag, index) in newValue"
      >{{tag}}</el-tag>

      <el-button
        @click="showInput"
        size="small"
        style="margin-right: 10px"
        v-if="!inputVisible"
      >+ 新增</el-button>
    </div>
    <div v-if="inputVisible">
      <el-input
        @keydown.native.enter.prevent="handleAddTag"
        autofocus
        id="ele-form-tag"
        ref="saveTagInput"
        size="small"
        v-model="inputValue"
      ></el-input>
      <el-button
        @click="handleAddTag"
        size="small"
        type="primary"
      >添加</el-button>
      <el-button
        @click="handleCancel"
        size="small"
        type="success"
      >完成</el-button>
    </div>
  </div>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormTag',
  mixins: [formMixin],
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    // 删除
    handleDelete (index) {
      this.newValue.splice(index, 1)
      this.handleChange(this.newValue)
    },

    showInput () {
      // 展示输入框
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 取消添加
    handleCancel () {
      this.inputVisible = false
      this.inputValue = ''
    },
    // 添加tag
    handleAddTag () {
      let inputValue = this.inputValue
      if (inputValue) {
        if (Array.isArray(this.newValue)) {
          this.newValue.push(inputValue)
        } else {
          this.newValue = [inputValue]
        }
        this.handleChange(this.newValue)
      }
      this.inputValue = ''
      this.$refs.saveTagInput.$refs.input.focus()
    }
  }
}
</script>
