<template>
  <div
    class="ele-form"
    ref="wrapper"
  >
    <!-- layout布局 -->
    <el-row
      justify="center"
      type="flex"
    >
      <el-col :span="formSpan">
        <!-- 表单 -->
        <el-form
          :label-position="formLabelPosition"
          :model="formData"
          :rules="rules"
          @submit.native.prevent="handleValidateForm"
          label-width="120px"
          ref="form"
        >
          <!-- 默认插槽作为表单项 -->
          <slot/>

          <el-row :gutter="20">
            <!-- 表单项 -->
            <template v-for="(formItem, field) of formDesc">
              <el-col
                :key="field"
                :md="formItem.layout || 24"
                :xs="24"
                v-if="formItem.type !== 'hide'"
              >
                <el-form-item
                  :error="formErrorObj ? formErrorObj[field] : null"
                  :label="formItem.label"
                  :prop="field"
                >
                  <!-- 具名 作用域插槽(用于用户自定义显示) -->
                  <slot
                    :data="formData[field]"
                    :desc="formItem"
                    :name="field"
                  >
                    <component
                      :desc="formItem"
                      :is="getComponentName(formItem.type)"
                      v-model="formData[field]"
                    />
                  </slot>
                  <div
                    class="ele-form-tip"
                    v-if="formItem.tip"
                  >{{formItem.tip}}</div>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
          <!-- 操作按钮去 -->
          <el-form-item v-if="isShowSubmitBtn || isShowBackBtn">
            <el-button
              :loading="isLoading || innerIsLoading"
              native-type="submit"
              type="primary"
              v-if="isShowSubmitBtn"
            >{{submitBtnText}}</el-button>
            <el-button
              @click="goBack"
              v-if="isShowBackBtn"
            >{{backBtnText}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import responsiveMixin from './mixins/responsiveMixin'
import EleFormInput from './components/EleFormInput'
import EleFormSwitch from './components/EleFormSwitch'
import EleFormPassword from './components/EleFormPassword'
import EleFormButton from './components/EleFormButton'
import EleFormNumber from './components/EleFormNumber'
import EleFormGallery from './components/EleFormGallery'
import EleFormRate from './components/EleFormRate'
import EleFormColor from './components/EleFormColor'
import EleFormDate from './components/EleFormDate'

export default {
  name: 'EleForm',
  components: {
    EleFormInput,
    EleFormDate,
    EleFormColor,
    EleFormGallery,
    EleFormPassword,
    EleFormButton,
    EleFormNumber,
    EleFormRate,
    EleFormSwitch
  },
  mixins: [responsiveMixin],
  props: {
    // 表单描述
    formDesc: {
      type: Object,
      required: true
    },
    // 表单数据
    formData: {
      type: Object,
      required: true
    },
    // 校检规则
    rules: Object,
    // 提交状态
    isLoading: {
      type: Boolean,
      default: false
    },
    // 表单错误信息
    formError: Object,
    // 提交函数
    requestFn: Function,
    // 是否显示submit按钮
    isShowSubmitBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示back按钮
    isShowBackBtn: {
      type: Boolean,
      default: true
    },
    // 提交按钮文本
    submitBtnText: {
      type: String,
      default: '提交'
    },
    // 返回按钮
    backBtnText: {
      type: String,
      default: '返回'
    }
  },
  data () {
    return {
      // 是否正在请求中
      innerIsLoading: false,
      // 内部请求出错
      innerFormError: {},
      // 所有内置组件
      builtInNames: ['hide', 'text', 'input', 'number', 'checkbox', 'radio', 'date', 'time', 'datetime', 'switch', 'json', 'slider', 'password', 'color', 'select', 'cascader', 'transfer', 'image', 'video', 'file', 'rate', 'tags', 'gallery', 'button']
    }
  },
  computed: {
    // 表单错误信息
    formErrorObj () {
      return Object.assign({}, this.innerFormError, this.formError)
    }
  },
  watch: {
    // 处理options参数
    formDesc: {
      handler: function (desc) {
        for (const field in desc) {
          this.changeOptions(desc[field].options, field)
        }
      },
      immediate: true
    },
    formErrorObj (obj) {
      // 后端异常的弹窗警告
      if (obj) {
        try {
          let messageArr = []
          for (const key in obj) {
            const formItem = this.formDesc[key]
            const label = formItem && formItem.label ? formItem.label + ': ' : key + ': '
            messageArr.push(label + obj[key])
          }
          this.showError(messageArr)
        } catch {}
      }
    }
  },
  methods: {
    // 组件名称
    getComponentName (type) {
      if (this.builtInNames.includes(type)) {
        // 内置组件
        return 'ele-form-' + type
      } else {
        // 外部组件
        return type
      }
    },
    // 将四种类型: 字符串数组, 对象数组, Promise对象和函数统一为 对象数组
    changeOptions (options, field) {
      if (options) {
        if (options instanceof Array) {
          // 当options为数组时
          this.formDesc[field].options = options.map((option) => {
            if (typeof option === 'string') {
            // 字符串 转为 对象
            // 例如 ['男', '女'] => [ { text: '男', value: '男' }, { text: '女', value: '女' } ]
              return {
                text: option,
                value: option
              }
            } else {
            // 对象 直接返回
              return option
            }
          })
        } else if (options instanceof Function) {
          // 函数, 递归
          this.changeOptions(options(), field)
        } else if (options instanceof Promise) {
          options.then((options) => {
            this.formDesc[field].options = options
          })
        } else {
          // 其他报错
          throw new TypeError(options, 'options的类型不正确, 支持字符串数组, 对象数组, 函数和Promise四种类型')
        }
      }
    },
    // 验证表单
    async handleValidateForm () {
      if (this.rules) {
        this.$refs['form'].validate((valid, invalidFields) => {
          if (valid) {
            this.handleSubmitForm()
          } else {
            this.processValidError(invalidFields)
          }
        })
      } else {
        this.handleSubmitForm()
      }
    },

    // 显示错误
    showError (messageArr) {
      if (messageArr.length) {
        const h = this.$createElement
        messageArr = messageArr.map(msg => {
          return h('div', { style: { marginBottom: '8px' } }, msg)
        })
        this.$notify.error({
          title: '表单填写错误',
          message: h('div', { style: { minWidth: '300px', marginTop: '12px' } }, messageArr)
        })
      }
    },

    // 处理表单错误
    processValidError (invalidFields) {
      let messageArr = []
      for (const key in invalidFields) {
        const formItem = this.formDesc[key]
        const label = formItem && formItem.label ? formItem.label + ': ' : key + ': '
        invalidFields[key].forEach((item) => {
          messageArr.push(label + item.message)
        })
      }

      this.showError(messageArr)
    },

    // 提交表单
    async handleSubmitForm () {
      // valueFormatter的处理
      const data = Object.assign({}, this.formData)
      for (const field in data) {
        if (this.formDesc[field].valueFormatter) {
          data[field] = this.formDesc[field].valueFormatter(data[field])
        }
      }

      if (this.requestFn) {
        // 在内部请求
        if (this.innerIsLoading) return
        this.innerIsLoading = true
        try {
          const response = await this.requestFn(data)
          this.$nextTick(() => {
            this.$emit('request-success', response)
          })
        } catch (error) {
          // 处理异常情况
          if (error instanceof Error) {
            // 返回的是Error类型, 则进行解析
            try {
              const msg = JSON.parse(error.message)
              if (msg instanceof Object) {
                this.innerFormError = msg
              }
            } catch {}
          } else if (error instanceof Object) {
            // 返回的是对象类型, 则直接设置
            this.innerFormError = error
          }
          this.$emit('request-error')
        } finally {
          this.innerIsLoading = false
          this.$emit('request-end')
        }
      } else {
        // 在外部请求
        if (this.isLoading) return
        this.$emit('request', data)
      }
    },
    // 返回按钮
    goBack () {
      if (this.$router) {
        // vue-router
        this.$router.back()
      } else {
        // 浏览器history API
        history.back()
      }
    },
    // 重置表单
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
.ele-form-tip {
  color: #909399;
  line-height: 2em;
  margin-top: 10px;
}
</style>
