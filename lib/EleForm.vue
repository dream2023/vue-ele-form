<template>
  <div class="ele-form" :class="{ 'ele-form--inline': inline }" ref="wrapper">
    <el-row justify="center" type="flex">
      <el-col :span="computedSpan">
        <el-form
          :label-position="computedLabelPosition"
          :label-width="computedLabelWidth"
          :model="formData"
          :rules="computedRules"
          @submit.native.prevent="handleSubmitForm"
          ref="form"
          :disabled="disabled"
          v-bind="formAttrs"
        >
          <!-- 默认插槽作为表单项 -->
          <slot />
          <el-row :gutter="20">
            <slot
              :formData="formData"
              :formDesc="formDesc"
              :formErrorObj="formErrorObj"
              :props="$props"
              name="form-content"
            >
              <template v-for="(formItem, field) of formDesc">
                <slot
                  :name="field + '-wrapper'"
                  :data="formData[field]"
                  :desc="formItem"
                  :field="field"
                  :props="$props"
                  :formData="formData"
                  :disabled="formItem._disabled"
                  :type="formItem._type"
                  :options="formItem._options"
                >
                  <el-col
                    :key="field"
                    v-bind="formItem._colAttrs"
                    v-if="formItem._vif"
                  >
                    <el-form-item
                      :error="formErrorObj ? formErrorObj[field] : null"
                      :label="
                        isShowLabel && formItem.isShowLabel !== false
                          ? formItem.label
                          : null
                      "
                      :label-width="formItem.labelWidth || null"
                      :prop="field"
                    >
                      <!-- 具名 作用域插槽(用于用户自定义显示) -->
                      <slot
                        :data="formData[field]"
                        :desc="formItem"
                        :props="$props"
                        :field="field"
                        :formData="formData"
                        :name="field"
                        :disabled="formItem._disabled"
                        :type="formItem._type"
                        :options="formItem._options"
                      >
                        <component
                          :disabled="formItem._disabled"
                          :readonly="readonly"
                          :desc="formItem"
                          :is="formItem._type"
                          :options="formItem._options"
                          :ref="field"
                          :field="field"
                          @input="handleChange(field, $event)"
                          :value="formData[field]"
                        />
                      </slot>
                      <div
                        class="ele-form-tip"
                        v-if="formItem._tip"
                        v-html="formItem._tip"
                      ></div>
                    </el-form-item>
                  </el-col>
                </slot>
              </template>
            </slot>
            <!-- 操作按钮区 -->
            <el-col class="ele-form-btns" v-if="btns.length">
              <el-form-item :label-width="inline ? '10px' : null">
                <!-- 按钮插槽 -->
                <slot :btns="btns" name="form-btn">
                  <el-button
                    :key="index"
                    @click="btn.click"
                    v-bind="btn.attrs"
                    v-for="(btn, index) of btns"
                    >{{ btn.text }}</el-button
                  >
                </slot>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import responsiveMixin from './mixins/responsiveMixin'
import { isUnDef, is, castArray, isEmpty } from './tools/utils'
import { throttle } from 'throttle-debounce'
import localeMixin from 'element-ui/src/mixins/locale'
import { t } from './locale'
import { loadMockJs } from './tools/mock'
// import { equal } from './tools/set'
const isNumber = require('is-number')
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'EleForm',
  // 响应式单独抽离出来作为mixin, 具体实现请到 responsiveMixin 中查看
  mixins: [responsiveMixin, localeMixin],
  model: {
    prop: 'formData',
    event: 'input'
  },
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
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    // 模拟数据
    mock: {
      type: Boolean,
      default: false
    },
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
    // 是否显示 cancel 取消按钮
    // 默认值: isDialog = true 时, 默认值为 true, 具体查看: computedIsShowCancelBtn
    isShowCancelBtn: {
      type: Boolean,
      default: null
    },
    // 是否显示back按钮
    // 默认值: 当 inline = true OR isDialog = true, 默认值为 false; 其它情况true. 具体请看计算属性: computedIsShowBackBtn
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
    backBtnText: String,
    // 重置按钮
    resetBtnText: String,
    // 取消按钮
    cancelBtnText: String,
    // 是否显示标签
    isShowLabel: {
      type: Boolean,
      default: true
    },
    // 标签宽度
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // 全局禁用表单
    disabled: {
      type: Boolean,
      default: false
    },
    // 全局的readonly
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否为弹窗
    isDialog: {
      type: Boolean,
      default: false
    },
    // 弹窗变量控制
    visible: {
      type: Boolean,
      default: false
    },
    // options 的请求方法
    optionsFn: Function
  },
  data() {
    return {
      oldFormData: {},
      // 是否正在请求中
      innerIsLoading: false,
      // 内部请求出错
      innerFormError: {}
    }
  },
  computed: {
    isMock() {
      return this.mock || Object.values(this.formDesc).some(item => item.mock)
    },
    // 按钮
    btns() {
      const formBtnSize = this.formBtnSize
      let btns = []
      // 模拟数据
      if (this.isMock) {
        btns.push({
          attrs: {
            type: 'primary',
            size: formBtnSize
          },
          text: t('ele-form.mockBtnText'),
          click: this.reMockData
        })
      }

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
          click() {}
        })
      }

      // 自定义按钮
      if (this.formBtns) {
        const customBtns = this.formBtns.map(btn => ({
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
          text: this.backBtnText || t('ele-form.backBtnText'),
          click: this.goBack
        })
      }

      // 取消按钮
      if (this.computedIsShowCancelBtn) {
        btns.push({
          attrs: {
            size: formBtnSize
          },
          text: this.cancelBtnText || t('ele-form.cancelBtnText'),
          click: this.handleCancelClick
        })
      }

      // 重置按钮
      if (this.isShowResetBtn) {
        btns.push({
          attrs: {
            size: formBtnSize
          },
          text: this.resetBtnText || t('ele-form.resetBtnText'),
          click: this.resetForm
        })
      }
      return btns
    },
    computedIsShowCancelBtn() {
      if (is(this.isShowCancelBtn, 'Boolean')) {
        // 如果指定了, 则使用指定的值
        return this.isShowCancelBtn
      } else {
        // 如果未指定, 根据 isDialog
        return this.isDialog
      }
    },
    // 是否显示返回按钮(inline和layout模式下不同)
    computedIsShowBackBtn() {
      if (is(this.isShowBackBtn, 'Boolean')) {
        return this.isShowBackBtn
      } else {
        return !(this.inline || this.isDialog)
      }
    },
    // 提交按钮默认值(inline和layout模式下不同)
    computedSubmitBtnText() {
      if (is(this.submitBtnText, 'String')) {
        return this.submitBtnText
      } else {
        return this.inline
          ? t('ele-form.submitBtnTextInline')
          : t('ele-form.submitBtnText')
      }
    },
    // 标签宽度(数字和字符串两种处理)
    computedLabelWidth() {
      if (isNumber(this.labelWidth)) {
        return this.labelWidth + 'px'
      } else {
        return this.labelWidth
      }
    },
    // 表单错误信息
    formErrorObj() {
      return Object.assign({}, this.innerFormError, this.formError)
    },
    // 校检规则 (支持局部定义和全局定义)
    // 即: rules: { rules: { a: [xxx, xxx], b:{ xxx } } } 和 formDesc: { name: { rules: {xxx} }, age: { rules: [xxx] } }
    // 此函数即将局部定义转为全局定义
    computedRules() {
      return this.formDescKeys.reduce((rules, field) => {
        // 合并 (全局 和 局部) 的rules
        let formRules = castArray(this.rules[field])
        let formItemRules = castArray(this.formDesc[field].rules)
        rules[field] = [...formRules, ...formItemRules]

        // 如果采用required, 则判断已有的规则有无, 如果没有, 则添加
        if (
          this.formDesc[field].required &&
          !rules[field].some(rule => rule.required)
        ) {
          rules[field].push({
            required: true,
            message: this.formDesc[field].label + t('ele-form.required')
          })
        }
        return rules
      }, {})
    },
    // formDesc的key
    formDescKeys() {
      return Object.keys(this.formDesc)
    }
  },
  watch: {
    disabled(val) {
      if (val) {
        this.$refs.form.clearValidate()
      }
    },
    // 处理options参数
    formDesc: {
      handler(desc) {
        if (desc) {
          Object.keys(desc).forEach(field => {
            // 当全局设置mock为true时, 所有子项都标记为true
            if (this.mock && isUnDef(desc[field].mock)) {
              desc[field].mock = true
            }

            // 转换 tip, 内部属性不显示
            if (desc[field].tip) {
              desc[field]._tip = String(desc[field].tip).replace(
                /`(.+?)`/g,
                '<code>$1</code>'
              )
            }
            // 关联属性
            desc[field]._optionLinkageFields = castArray(
              desc[field].optionLinkageFields
            )

            // layout值, 内部属性不显示
            desc[field]._colAttrs = this.getColAttrs(desc[field].layout)

            // 老数据, 用于options切换不同类型和type切换不懂类型时, 保留旧数据
            // 例如 原type为 switch, 后改为 input, 出现类型和值不兼容情况, 就需要保留原数据
            if (!desc[field]._oldValue) {
              desc[field]._oldValue = {}
            }

            // 设置 options
            this.changeOptions(desc[field].options, desc[field].prop, field)
          })

          // 检查联动
          this.checkLinkage()
        }
      },
      immediate: true
    },
    formErrorObj(obj) {
      // 后端异常的弹窗警告
      if (obj) {
        this.processError(obj)
      }
    }
  },
  methods: {
    handleChange(field, val) {
      this.oldFormData = cloneDeep(this.formData)
      this.$set(this.formData, field, val)
      this.$emit('input', this.formData)
      this.checkLinkage()
    },
    // 获取col的属性(是否为inline模式)
    getColAttrs(layout) {
      return this.inline ? { span: layout || 6 } : { md: layout || 24, xs: 24 }
    },
    // 重新模拟数据
    reMockData() {
      this.formDescKeys.forEach(field => {
        this.$refs[field][0].mockData()
      })
    },
    // 检测联动
    checkLinkage() {
      if (this.checkVifFn) {
        this.checkLinkageFn()
      } else {
        this.checkLinkageFn = throttle(300, () => {
          const formDesc = this.formDesc
          const formData = this.formData
          Object.keys(formDesc).forEach(field => {
            const formItem = formDesc[field]
            // 设置 type
            let type = formItem.type
            if (typeof formItem.type === 'function') {
              type = this.getComponentName(formItem.type(formData))
              if (formItem._type && formItem._type !== type) {
                // 获取此类型的以前值
                const newVal = formItem['_oldValue']['type-' + type] || null
                // 保存现在的数据作为老数据
                this.formDesc[field]['_oldValue']['type-' + formItem._type] =
                  formData[field]
                // 类型改变, 则删除原数据
                this.formData[field] = newVal
              }
            } else {
              type = this.getComponentName(formItem.type)
            }

            // 4.默认值
            let defaultValue =
              typeof formItem.default === 'function'
                ? formItem.default(formData)
                : formItem.default
            // 默认值不为空  & (值为空 || 老值和当前值)
            if (
              !isEmpty(defaultValue) &&
              (isEmpty(formData[field]) ||
                formItem._defaultValue === formData[field])
            ) {
              // 判断是否有格式化函数
              if (formItem.displayFormatter) {
                defaultValue = formItem.displayFormatter(defaultValue, formData)
              }
              this.formData[field] = defaultValue
            }

            // 1.触发 v-if 显示 / 隐藏
            let vif = true
            if (typeof formItem.vif === 'function') {
              vif = Boolean(formItem.vif(formData))

              if (!vif) {
                // 如果隐藏, 则删除值
                this.formData[field] = defaultValue || null
              }
            } else if (typeof formItem.vif === 'boolean') {
              vif = formItem.vif
            }

            // 3.触发 disabled 禁用 / 启用
            let disabled = null
            if (typeof formItem.disabled === 'function') {
              disabled = formItem.disabled(formData)
            } else if (typeof formItem.disabled === 'boolean') {
              disabled = formItem.disabled
            }

            let attrs =
              typeof formItem.attrs === 'function'
                ? formItem.attrs(formData)
                : formItem.attrs

            this.$set(formItem, '_type', type)
            this.$set(formItem, '_vif', vif)
            this.$set(formItem, '_disabled', disabled)
            this.$set(formItem, '_attrs', attrs)

            // 4.重新获取 options
            if (formItem._vif && typeof formItem.options === 'function') {
              this.changeOptions(formItem.options, formItem.prop, field, true)
            }
          })
        })
        this.checkLinkageFn()
      }
    },
    // 组件名称
    getComponentName(type) {
      if (this.$EleFormBuiltInNames.includes(type)) {
        // 内置组件
        return 'ele-form-' + type
      } else {
        // 外部组件
        return type
      }
    },
    // 转对象的key
    // 例如 option: { label: '女', val: 1 }, prop: { text: 'label', value: 'val' }
    // 转换后 -> option: { text: '女', value: 1 }
    changeProp(options, prop) {
      if (prop) {
        return options.map(option => ({
          text: option[prop.text || 'text'],
          value: option[prop.value || 'value']
        }))
      } else {
        return options
      }
    },
    // 将options转为对象数组
    getObjArrOptions(options) {
      return options.map(option => {
        if (is(option, ['Number', 'String', 'Boolean'])) {
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
    changeOptions(options, prop, field) {
      if (options) {
        if (options instanceof Array) {
          // 当options为数组时: 直接获取
          this.setOptions(options, prop, field)
        } else if (options instanceof Function) {
          // 当options为函数: 执行函数并递归
          this.changeOptions(options(this.formData), prop, field)
        } else if (options instanceof Promise) {
          // 当options为Promise时: 等待Promise结束, 并获取值
          const canRefetch = () => {
            // 第一次进入 _options 为 false
            const formItem = this.formDesc[field]
            if (!formItem._options) return true
            // 如果关联字段不存在，则直接返回 false
            if (!formItem._optionLinkageFields.length) return false
            // 判断关联字段的值有无更新
            return formItem._optionLinkageFields.some(
              field => this.formData[field] !== this.oldFormData[field]
            )
          }
          if (!canRefetch()) {
            return
          }
          options.then(options => {
            this.changeOptions(options, prop, field)
          })
        } else if (typeof options === 'string' && this.optionsFn) {
          // options为url地址
          this.changeOptions(this.optionsFn(options), prop, field)
        } else {
          if (typeof options === 'string') {
            throw new TypeError(
              `options值为: ${options}, 为字符串, 但是未配置options-fn参数, 具体请参考: https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav#ZVYtf`
            )
          } else {
            // 其他报错
            throw new TypeError(
              'options的类型不正确, options及options请求结果类型可为: 字符串数组, 对象数组, 函数和Promise或者URL地址, 当前值为: ' +
                options +
                ', 不属于以上四种类型, 具体请参考: https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav'
            )
          }
        }
      } else {
        if (this.formDesc[field]._options) {
          // 如果new options为null / undefined, 且 old Options 存在, 则设置
          this.setOptions([], prop, field)
        }
      }
    },
    // 设置options
    setOptions(options, prop, field) {
      // 将options每一项转为对象
      let newOptions = this.getObjArrOptions(options)
      const oldOptionsValues = (this.formDesc[field]._options || [])
        .map(item => item.value)
        .join(',')
      // 改变prop为规定的prop
      newOptions = this.changeProp(newOptions, prop)
      const newOptionsValues = newOptions.map(item => item.value).join(',')
      this.$set(this.formDesc[field], '_options', newOptions)

      // 新 options 和老 options 不同时，触发值的改变
      if (newOptionsValues !== oldOptionsValues) {
        this.handleChange(field, null)
      }
    },
    // 验证表单
    validateForm() {
      return new Promise((resolve, reject) => {
        if (this.computedRules) {
          // 当传递了验证规则
          this.$refs['form'].validate((valid, invalidFields) => {
            if (valid) {
              // 验证通过
              resolve()
            } else {
              // 显示错误
              reject(invalidFields)
            }
          })
        } else {
          resolve()
        }
      })
    },

    // 验证所有组件的内置验证方法
    validateComponent() {
      const validators = this.formDescKeys
        .map(key =>
          this.$refs[key] && this.$refs[key][0]
            ? this.$refs[key][0].validate
            : null
        )
        .filter(Boolean)

      return Promise.all(validators.map(fn => fn()))
    },

    // 处理错误
    processError(errObj) {
      try {
        const messageArr = Object.keys(errObj).reduce((acc, key) => {
          const formItem = this.formDesc[key]
          const label =
            formItem && formItem.label ? formItem.label + ': ' : key + ': '
          if (errObj[key] instanceof Array) {
            // errorObj: { name: [ { filed: 'name',  message: 'name is required' }] }
            // 内部校检结果返回的错误信息样式
            errObj[key].forEach(item => {
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
    showError(messageArr) {
      if (messageArr.length) {
        const h = this.$createElement
        messageArr = messageArr.map(msg => {
          return h('div', { style: { marginBottom: '8px' } }, msg)
        })
        this.$notify.error({
          title: t('ele-form.formError'),
          message: h(
            'div',
            { style: { minWidth: '300px', marginTop: '12px' } },
            messageArr
          )
        })
      }
    },

    // 提交表单
    async handleSubmitForm() {
      try {
        // 验证表单
        await this.validateForm()
        await this.validateComponent()

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
      } catch (error) {
        return this.processError(error)
      }
    },
    // 返回按钮
    goBack() {
      this.$emit('back')
      if (this.$router) {
        // vue-router
        this.$router.back()
      } else {
        // 浏览器history API
        history.back()
      }
    },
    // 点击取消按钮
    handleCancelClick() {
      this.$emit('close')
      this.$emit('cancel')
      this.$emit('update:visible', false)
    },
    // 重置表单
    resetForm() {
      this.$emit('reset')
      this.$refs.form.resetFields()

      // 调用内部方法进行值的重置
      this.$refs.form.fields.forEach(field => {
        this.formData[field.prop] = field.initialValue
      })
    }
  },
  mounted() {
    if (this.isMock && !window.Mock) {
      loadMockJs()
    }
  }
}
</script>

<style>
.ele-form--inline .ele-form-btns {
  width: auto;
}

.ele-form-tip {
  color: #909399;
  line-height: 1.5em;
  margin-top: 3px;
}
.ele-form-tip code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}

.ele-form-full-line.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.ele-form-full-line.el-date-editor--daterange.el-input__inner,
.ele-form-full-line.el-date-editor--datetimerange.el-input__inner,
.ele-form-full-line.el-date-editor--timerange.el-input__inner,
.ele-form-full-line.el-date-editor--monthrange.el-input__inner,
.ele-form-full-line.el-cascader,
.ele-form-full-line.el-select,
.ele-form-full-line.el-autocomplete {
  width: 100%;
}
</style>
