<template>
  <el-card class="demo-card" header="form-desc 简单示例" shadow="never">
    <div class="form-desc-demo">
      <div style="width: 600px">
        <ele-form
          :formData="formData"
          :formDesc="formDesc"
          :request-fn="handleSubmit"
          :rules="rules"
          @request-success="handleSuccess"
        />
      </div>
      <div style="margin-left: 50px;width: 500px;">
        <codemirror @input="handleCodeChange" v-model="code" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        title: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formDesc: {},
      code: `{
  author: {
    children: {
      first: {
        type: 'input',
        label: '姓',
        layout: 6,
        required: true
      },
      second: {
        type: 'input',
        label: '名',
        layout: 18,
        required: true,
        disabled: data => !data.author.first
      }
    }
  },
  title: {
    type: 'input',
    label: '标题',
    rules: [
      { required: true, message: '请输入标题', trigger: 'blur' }
    ]
  },
  content: {
    type: 'textarea',
    label: '内容',
    required: true,
    attrs: {
      autosize: { minRows: 4, maxRows: 10 }
    }
  },
  original: {
    type: 'radio',
    label: '是否为原创',
    options: [
      { text: '原创', value: 1 },
      { text: '转载', value: 0 }
    ]
  },
  reprinted: {
    type: 'switch',
    label: '是否可转载',
    vif (data) {
      return data.original === 1
    }
  },
  sourceUrl: {
    type: 'input',
    label: '来源地址',
    vif (data) {
      return data.original === 0
    },
    slots: {
      prepend (h) {
        return h('span', 'http://')
      },
      append (h) {
        return h('span', '.com')
      }
    }
  }
}`,
      formData: {}
    }
  },
  methods: {
    handleSubmit(data) {
      /* eslint-disable */
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess() {
      this.$message.success('创建成功')
    },
    handleCodeChange(code) {
      try {
        /* eslint-disable */
        const codeData = eval('(' + code + ')')
        this.formDesc = codeData
      } catch {}
    }
  },
  created() {
    this.handleCodeChange(this.code)
  }
}
</script>

<style>
.form-desc-demo {
  display: flex;
  justify-content: center;
}
.form-desc-demo .CodeMirror {
  height: 700px !important;
}
</style>
