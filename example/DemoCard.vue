<template>
  <el-card
    :header="title"
    class="demo-card"
    shadow="never"
  >
    <div class="demo-card-wrapper">
      <div style="width: 600px">
        <ele-form
          :formData="formData"
          v-bind="attrs"
          v-if="attrs"
          v-on="listeners"
        />
      </div>
      <div style="margin-left: 50px;width: 500px;">
        <codemirror
          @input="handleCodeChange"
          v-model="code"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DemoCard',
  inheritAttrs: false,
  props: {
    // 显示标题
    title: String,
    // 类型: on / attr
    type: String,
    // 字段的key, $attrs[field] / $listeners[field]
    field: String,
    // 代码
    initCode: String
  },
  data () {
    return {
      attrs: null,
      listeners: {},
      code: '',
      formData: {}
    }
  },
  methods: {
    handleCodeChange (code) {
      try {
        /* eslint-disable */
        const codeData = eval('(' + code + ')')
        if (this.type === 'attr') {
          this.attrs = Object.assign({}, this.$attrs, { [this.field]: codeData })
        } else {
          this.listeners = Object.assign({}, this.$listeners, { [this.field]: codeData })
        }
      } catch {}
    }
  },
  created () {
    this.code = this.initCode
    this.$nextTick(() => {
      this.handleCodeChange(this.code)
    })
  }
}
</script>

<style>
.demo-card {
  margin: 20px auto;
}
.demo-card-wrapper {
  display: flex;
  justify-content: center;
}
.demo-card .CodeMirror {
  height: 700px !important;
  font-size: 20px !important;
}
</style>
