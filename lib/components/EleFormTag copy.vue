<template>
  <div>
    <el-tag
      :disable-transitions="false"
      :key="index"
      @close="handleDelete(index)"
      closable
      v-for="(tag, index) in newValue"
    >{{tag}}</el-tag>
    <!-- <el-input
      @blur.prevent.stop="handleInputConfirm"
      @keyup.prevent.stop.enter.native="handleInputConfirm"
      class="input-new-tag"
      id="tag"
      ref="saveTagInput"
      size="small"
      v-if="inputVisible"
      v-model="inputValue"
    ></el-input>
    <el-button
      @click="showInput"
      class="button-new-tag"
      size="small"
      v-else
    >+ 新增</el-button>-->
  </div>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormTag',
  mixins: [formMixin],
  props: {
    value: Array
  },
  data () {
    return {
      newValue: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleDelete (index) {
      this.newValue.splice(index, 1)
      this.handleChange(this.newValue)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.newValue.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      // this.handleChange(this.newValue)
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
