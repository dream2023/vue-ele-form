<template>
  <el-card
    class="demo-card"
    header="ele-form-section 示例"
  >
    <div class="form-desc-section">
      <div style="width: 600px">
        <ele-form-section
          :formData="formData"
          :request-fn="handleSubmit"
          :sections="sections"
          @request-success="handleSuccess"
        ></ele-form-section>
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
  name: 'App',
  data () {
    return {
      formData: {},
      code:
        `[
  {
    title: '基本信息',
    icon: 'el-icon-user',
    formDesc: {
      name: {
        type: 'input',
        label: '姓名'
      },
      age: {
        label: '年龄',
        type: 'number'
      }
    }
  },
  {
    title: '密码',
    formDesc: {
      oldPassword: {
        type: 'password',
        label: '旧密码'
      },
      newPassword: {
        type: 'password',
        label: '新密码'
      },
      confirmPassword: {
        type: 'password',
        label: '确认密码'
      }
    }
  }
]
`,
      sections: []
    }
  },
  methods: {
    handleSubmit (data) {
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess () {
      this.$message.success('创建成功')
    },
    handleCodeChange (code) {
      try {
        /* eslint-disable */
        const codeData = eval('(' + code + ')')
        this.sections = codeData
      } catch { }
    }
  },
  created () {
    this.handleCodeChange(this.code)
  }
}
</script>

<style>
.form-desc-section {
  display: flex;
  justify-content: center;
}
.form-desc-section .CodeMirror {
  height: 600px !important;
}
</style>
