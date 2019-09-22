<template>
  <div
    class="ele-form"
    ref="wrapper"
  >
    <!-- inline模式 -->
    <template v-if="inline">
      <el-form
        :inline="true"
        :label-position="labelPosition || 'right'"
        :label-width="computedLabelWidth"
        :model="formData"
        :rules="rules"
        @submit.native.prevent="handleValidateForm"
        ref="form"
        v-bind="formAttrs"
      >
        <!-- 默认插槽作为表单项 -->
        <slot />
        <template v-for="(formItem, field) of formDesc">
          <slot :name="field + '-wrapper'">
            <el-form-item
              :error="formErrorObj ? formErrorObj[field] : null"
              :key="field"
              :label="formItem.label"
              :prop="field"
              v-if="formItem.type !== 'hide' && formItem._vif"
            >
              <!-- 具名 作用域插槽(用于用户自定义显示) -->
              <slot
                :data="formData[field]"
                :desc="formItem"
                :name="field"
              >
                <component
                  :_disabled="formItem._disabled"
                  :desc="formItem"
                  :is="getComponentName(formItem.type)"
                  :options="formItem._options"
                  v-model="formData[field]"
                />
              </slot>
              <div
                class="ele-form-tip"
                v-if="formItem.tip"
              >{{formItem.tip}}</div>
            </el-form-item>
          </slot>
        </template>
        <!-- 操作按钮区 -->
        <el-form-item
          style="margin-left: 5px;"
          v-if="btns.length"
        >
          <!-- 按钮插槽 -->
          <slot name="form-btn">
            <el-button
              :key="index"
              @click="btn.click"
              v-bind="btn.attrs"
              v-for="(btn, index) of btns"
            >{{btn.text}}</el-button>
          </slot>
        </el-form-item>
      </el-form>
    </template>

    <!-- inline模式和layout模式区别: -->
    <!-- 1.layout模式 labelPosition 和 span 响应式, inline模式 无响应式 -->
    <!-- 2.layout模式 form-item 宽度占满整行, inline模式 只占自身的宽度, 且form-item的layout属性无效 -->

    <!-- layout布局模式 -->
    <template v-else>
      <el-row
        justify="center"
        type="flex"
      >
        <el-col :span="formSpan">
          <!-- 表单 -->
          <el-form
            :label-position="formLabelPosition"
            :label-width="computedLabelWidth"
            :model="formData"
            :rules="rules"
            @submit.native.prevent="handleValidateForm"
            ref="form"
            v-bind="formAttrs"
          >
            <!-- 默认插槽作为表单项 -->
            <slot />

            <el-row :gutter="20">
              <!-- 表单项 -->
              <template v-for="(formItem, field) of formDesc">
                <slot :name="field + '-wrapper'">
                  <el-col
                    :key="field"
                    :md="formItem.layout || 24"
                    :xs="24"
                    v-if="formItem.type !== 'hide' && formItem._vif"
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
                          :_disabled="formItem._disabled"
                          :desc="formItem"
                          :is="getComponentName(formItem.type)"
                          :options="formItem._options"
                          v-model="formData[field]"
                        />
                      </slot>
                      <div
                        class="ele-form-tip"
                        v-if="formItem.tip"
                      >{{formItem.tip}}</div>
                    </el-form-item>
                  </el-col>
                </slot>
              </template>
            </el-row>

            <!-- 操作按钮区 -->
            <el-form-item v-if="btns.length">
              <!-- 按钮插槽 -->
              <slot name="form-btn">
                <el-button
                  :key="index"
                  @click="btn.click"
                  v-bind="btn.attrs"
                  v-for="(btn, index) of btns"
                >{{btn.text}}</el-button>
              </slot>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import responsiveMixin from './mixins/responsiveMixin'
import utils from './utils'
import { throttle } from 'throttle-debounce'
const cloneDeep = require('lodash.clonedeep')
const equal = require('fast-deep-equal')

export default {
  name: 'EleForm',
  // 响应式单独抽离出来作为mixin, 具体实现请到 responsiveMixin 中查看
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
    // 行内模式
    inline: {
      type: Boolean,
      default: false
    },
    // 表单自身属性
    formAttrs: Object,
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
    // 自定义表单按钮
    formBtns: Array,
    // 表单按钮大小
    formBtnSize: String,
    // 是否显示submit按钮
    isShowSubmitBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示back按钮
    // 默认值: 当 inline 为true时, 不显示; inline 为 false时, 显示. 具体请看计算属性: computedIsShowBackBtn
    isShowBackBtn: {
      type: Boolean,
      default: null
    },
    // 是否显示reset按钮
    isShowResetBtn: {
      type: Boolean,
      default: false
    },
    // 提交按钮文本
    // 默认值: 当 inline 为true时, 值为 '查询'; inline 为 false 时,  值为 '提交'. 具体请看计算属性: computedSubmitBtnText
    submitBtnText: {
      type: String,
      default: null
    },
    // 返回按钮
    backBtnText: {
      type: String,
      default: '返回'
    },
    // 重置按钮
    resetBtnText: {
      type: String,
      default: '重置'
    },
    // 标签宽度
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // 标签位置(layout模式为响应式, inline模式无)
    labelPosition: String,
    // 不填则响应式, 填则固定(layout模式为响应式, inline模式无)
    span: Number
  },
  data () {
    return {
      // 表单标签位置
      formLabelPosition: 'right',
      // 表单宽度
      formSpan: 22,
      // 是否正在请求中
      innerIsLoading: false,
      // 内部请求出错
      innerFormError: {},
      // 所有内置组件
      builtInNames: []
    }
  },
  computed: {
    // 按钮
    btns () {
      const formBtnSize = this.formBtnSize
      let btns = []
      // 提交按钮
      if (this.isShowSubmitBtn) {
        btns.push({
          attrs: {
            type: 'primary',
            size: formBtnSize,
            loading: this.isLoading || this.innerIsLoading,
            'native-type': 'submit'
          },
          text: this.computedSubmitBtnText,
          click () {}
        })
      }

      // 自定义按钮
      if (this.formBtns) {
        const customBtns = this.formBtns.map((btn) => ({
          attrs: {
            type: btn.type,
            size: formBtnSize
          },
          text: btn.text,
          click: btn.click
        }))
        btns = [...btns, ...customBtns]
      }

      // 返回按钮
      if (this.computedIsShowBackBtn) {
        btns.push({
          attrs: {
            size: formBtnSize
          },
          text: this.backBtnText,
          click: this.goBack
        })
      }

      // 重置按钮
      if (this.isShowResetBtn) {
        btns.push({
          attrs: {
            size: formBtnSize
          },
          text: this.resetBtnText,
          click: this.resetForm
        })
      }
      return btns
    },
    // 是否显示返回按钮(inline和layout模式下不同)
    computedIsShowBackBtn () {
      if (utils.is(this.isShowBackBtn, 'Boolean')) {
        return this.isShowBackBtn
      } else {
        return !this.inline
      }
    },
    // 提交按钮默认值(inline和layout模式下不同)
    computedSubmitBtnText () {
      if (utils.is(this.submitBtnText, 'String')) {
        return this.submitBtnText
      } else {
        return this.inline ? '查询' : '提交'
      }
    },
    // 标签宽度(数字和字符串两种处理)
    computedLabelWidth () {
      if (isNaN(Number(this.labelWidth))) {
        return this.labelWidth
      } else {
        return this.labelWidth + 'px'
      }
    },
    // 表单错误信息
    formErrorObj () {
      return Object.assign({}, this.innerFormError, this.formError)
    }
  },
  watch: {
    // 处理options参数
    formDesc: {
      handler (desc) {
        if (desc) {
          // 检查联动
          this.checkLinkage()
          // 设置 options
          Object.keys(desc).forEach(field => {
            this.changeOptions(desc[field].options, field)
          })
        }
      },
      immediate: true
    },
    formErrorObj (obj) {
      // 后端异常的弹窗警告
      if (obj) {
        this.processError(obj)
      }
    },
    formData: {
      handler (formData) {
        if (formData) {
          // 联动属性检测
          this.checkLinkage()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 检测联动
    checkLinkage () {
      if (this.checkVifFn) {
        this.checkLinkageFn()
      } else {
        this.checkLinkageFn = throttle(300, () => {
          const formDesc = this.formDesc
          const formData = this.formData
          Object.keys(formDesc).forEach((field) => {
            const formItem = formDesc[field]
            // 1.触发显示 / 隐藏
            if (typeof formItem.vif === 'function') {
              const vif = formItem.vif(formData)
              this.formDesc[field]._vif = vif
              if (!vif) {
                // 如果隐藏, 则删除值
                this.formData[field] = null
              }
            } else {
              this.formDesc[field]._vif = true
            }
            // 兼容处理
            if (typeof formItem.vif === 'boolean') {
              this.formDesc[field]._vif = formItem.vif
            }

            // 2.触发禁用 / 启用
            if (typeof formItem.disabled === 'function') {
              this.formDesc[field]._disabled = formItem.disabled(formData)
            }

            // 兼容处理
            if (typeof formItem.disabled === 'boolean') {
              this.formDesc[field]._disabled = formItem.disabled
            }

            // 3.触发 options
            if (formItem.isReloadOptions && typeof formItem.options === 'function') {
              this.changeOptions(formItem.options, field, true)
            }
          })
        })
        this.checkLinkageFn()
      }
    },
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
    // 将options转为对象数组
    getObjArrOptions (options) {
      return options.map((option) => {
        if (utils.is(option, ['Number', 'String', 'Boolean'])) {
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
    },
    // 将四种类型: 字符串数组, 对象数组, Promise对象和函数统一为 对象数组
    changeOptions (options, field, resetValue = false) {
      if (options) {
        if (options instanceof Array) {
          // 当options为数组时: 直接获取
          this.setOptions(options, field, resetValue)
        } else if (options instanceof Function) {
          // 当options为函数: 执行函数并递归
          this.changeOptions(options(this.formData), field, resetValue)
        } else if (options instanceof Promise) {
          // 当options为Promise时: 等待Promise结束, 并获取值
          options.then((options) => {
            this.changeOptions(options, field, resetValue)
          })
        } else {
          // 其他报错
          throw new TypeError('options的类型不正确, options及options请求结果类型可为: 字符串数组, 对象数组, 函数和Promise, 当前值为: ' + options + ', 不属于以上四种类型')
        }
      }
    },
    // 设置options
    setOptions (options, field, resetValue) {
      options = this.getObjArrOptions(options)
      const _options = this.formDesc[field]._options
      this.formDesc[field]._options = options

      // 原 _options 存在 且和原来不相等, 则重置 value 值
      if (resetValue && _options && !equal(options, _options)) {
        this.formData[field] = []
      }
    },
    // 验证表单
    async handleValidateForm () {
      if (this.rules) {
        // 当传递了验证规则
        this.$refs['form'].validate((valid, invalidFields) => {
          if (valid) {
            // 提交
            this.handleSubmitForm()
          } else {
            // 显示错误
            this.processError(invalidFields)
          }
        })
      } else {
        // 提交
        this.handleSubmitForm()
      }
    },

    // 处理错误
    processError (errObj) {
      try {
        const messageArr = Object.keys(errObj).reduce((acc, key) => {
          const formItem = this.formDesc[key]
          const label = formItem && formItem.label ? formItem.label + ': ' : key + ': '
          if (errObj[key] instanceof Array) {
            // errorObj: { name: [ { filed: 'name',  message: 'name is required' }] }
            // 内部校检结果返回的错误信息样式
            errObj[key].forEach((item) => {
              acc.push(label + item.message)
            })
          } else {
            // errorObj: { name: 'name is required' }
            // 外部校检返回的错误信息
            acc.push(label + errObj[key])
          }

          return acc
        }, [])
        this.showError(messageArr)
      // eslint-disable-next-line
      } catch {}
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

    // 提交表单
    async handleSubmitForm () {
      // 为了不影响原值, 这里进行 clone
      let data = cloneDeep(this.formData)
      // valueFormatter的处理
      for (const field in data) {
        const formItem = this.formDesc[field]
        if (formItem && formItem.valueFormatter) {
          data[field] = formItem.valueFormatter(data[field], data)
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
            // eslint-disable-next-line
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

      // 调用内部方法进行值的重置
      this.$refs.form.fields.forEach((field) => {
        this.formData[field.prop] = field.initialValue
      })
    }
  },
  created () {
    this.builtInNames = this.$EleFormBuiltInNames
  }
}
</script>

<style>
.ele-form-tip {
  color: #909399;
  line-height: 1.5em;
  margin-top: 3px;
}

.ele-form-full-line.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.ele-form-full-line.el-date-editor--daterange.el-input__inner,
.ele-form-full-line.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
.ele-form-full-line.el-cascader,
.ele-form-full-line.el-select,
.ele-form-full-line.el-autocomplete {
  width: 100%;
}
</style>
