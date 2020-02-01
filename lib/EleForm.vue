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
          v-bind="formAttrs"
        >
          <!-- 默认插槽作为表单项 -->
          <slot />
          <el-row :gutter="20">
            <slot
              :formData="formData"
              :formDesc="computedFormDesc"
              :formErrorObj="formErrorObj"
              name="form-content"
            >
              <template v-for="(formItem, field) of computedFormDesc">
                <slot
                  :name="field + '-wrapper'"
                  :data="formData[field]"
                  :desc="formItem"
                  :field="field"
                  :formData="formData"
                  :disabled="disabled || formItem._disabled"
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
                      :label="isShowLabel ? formItem.label : null"
                      :prop="field"
                    >
                      <!-- 具名 作用域插槽(用于用户自定义显示) -->
                      <slot
                        :data="formData[field]"
                        :desc="formItem"
                        :field="field"
                        :formData="formData"
                        :name="field"
                        :disabled="disabled || formItem._disabled"
                        :type="formItem._type"
                        :options="formItem._options"
                      >
                        <component
                          :disabled="disabled || formItem._disabled"
                          :desc="formItem"
                          :is="formItem._type"
                          :options="formItem._options"
                          :ref="field"
                          :field="field"
                          :value="getValue(field)"
                          @input="setValue(field, $event)"
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
import utils from './tools/utils'
import { throttle } from 'throttle-debounce'
import localeMixin from 'element-ui/src/mixins/locale'
import { t } from './locale'
import { loadMockJs } from './tools/mock'
import { equal, intersection } from './tools/set'
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
      // 是否正在请求中
      innerIsLoading: false,
      // 内部请求出错
      innerFormError: {}
    }
  },
  computed: {
    isMock() {
      return (
        this.mock ||
        Object.values(this.computedFormDesc).some(item => item.mock)
      )
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
      if (utils.is(this.isShowCancelBtn, 'Boolean')) {
        // 如果指定了, 则使用指定的值
        return this.isShowCancelBtn
      } else {
        // 如果未指定, 根据 isDialog
        return this.isDialog
      }
    },
    // 是否显示返回按钮(inline和layout模式下不同)
    computedIsShowBackBtn() {
      if (utils.is(this.isShowBackBtn, 'Boolean')) {
        return this.isShowBackBtn
      } else {
        return !(this.inline || this.isDialog)
      }
    },
    // 提交按钮默认值(inline和layout模式下不同)
    computedSubmitBtnText() {
      if (utils.is(this.submitBtnText, 'String')) {
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
        let formRules = rules[field] || []
        let formItemRules = this.computedFormDesc[field].rules

        // 转为数组
        if (formRules && !Array.isArray(formRules)) {
          formRules = [formRules]
        }
        if (formItemRules && !Array.isArray(formItemRules)) {
          formItemRules = [formItemRules]
        }

        // 合并
        if (formRules || formItemRules) {
          rules[field] = [...(formItemRules || []), ...(formRules || [])]
        }

        // 如果采用required, 则判断已有的规则有无, 如果没有, 则添加
        if (
          this.computedFormDesc[field].required &&
          !rules[field].some(rule => rule.required)
        ) {
          rules[field].push({
            required: true,
            message: this.computedFormDesc[field].label + t('ele-form.required')
          })
        }
        return rules
      }, this.rules || {})
    },
    // formDesc的key
    formDescKeys() {
      return Object.keys(this.computedFormDesc)
    },
    computedFormDesc() {
      const desc = this.getDeepFormDesc(this.formDesc)
      Object.keys(desc).forEach(field => {
        // 当全局设置mock为true时, 所有子项都标记为true
        if (this.mock && utils.isUnDef(desc[field].mock)) {
          desc[field].mock = true
        }

        // 转换 tip, 内部属性不显示
        if (desc[field].tip) {
          Object.defineProperty(
            desc[field],
            '_tip',
            this.defineUnEnumerableProperty(
              String(desc[field].tip).replace(/`(.+?)`/g, '<code>$1</code>')
            )
          )
        }

        // layout值, 内部属性不显示
        Object.defineProperty(
          desc[field],
          '_colAttrs',
          this.defineUnEnumerableProperty(this.getColAttrs(desc[field].layout))
        )
      })
      return desc
    }
  },
  watch: {
    // 处理options参数
    computedFormDesc: {
      handler(desc) {
        if (desc) {
          this.formDescKeys.forEach(field => {
            // 设置深度边遍历的默认值
            this.setDeepFormDataVal(field)

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
    },
    formData: {
      handler(formData) {
        if (formData) {
          // 联动属性检测
          this.checkLinkage()
        }
      },
      deep: true
    }
  },
  methods: {
    // 获取值, 可容错, 中间无值
    // 'a.b.c' => this.formData.a.b.c
    getValue(field) {
      return field
        .split('.')
        .reduce((acc, key) => (acc ? acc[key] : acc), this.formData)
    },
    // 设置值
    // 例如 ('a.b.c', 'val') => this.formData.a.b.c = 'val'
    setValue(field, value) {
      const fields = field.split('.')
      const dateItem = fields
        .slice(0, -1)
        .reduce((acc, key) => acc[key], this.formData)
      this.$set(dateItem, fields.slice(-1), value)
    },
    // 给需要深度遍历的对象赋值空对象, 以便 v-model 时不出错
    // 例如 formDesc: { info: { children: { name:{ type: 'input', xxx }, nickname: {type: 'input', xxx } } } } => formData => { info: {} }
    setDeepFormDataVal(field) {
      const fields = field.split('.')
      fields.slice(0, -1).reduce((acc, key) => {
        if (acc[key] === undefined) this.$set(acc, key, {})
        return acc[key]
      }, this.formData)
    },
    // 深度遍历 formDesc
    getDeepFormDesc(formDesc, parentField, parent) {
      return Object.keys(formDesc).reduce((acc, field) => {
        // 改为 => a.b.c
        const formField = parentField ? `${parentField}.${field}` : field
        // 合并 vif 和 disabled, children 要合并父的 vif 和 disabled
        let vifs = []
        let disableds = []
        if (formDesc[field].vif !== undefined) {
          vifs.push(formDesc[field].vif)
        }
        if (formDesc[field].disabled !== undefined) {
          disableds.push(formDesc[field].disabled)
        }
        if (parentField) {
          vifs = [...parent._vifs, ...vifs]
          disableds = [...parent._disableds, ...disableds]
        }
        // 隐藏 _vifs 和 _disableds
        Object.defineProperties(formDesc[field], {
          _vifs: this.defineUnEnumerableProperty(vifs),
          _disableds: this.defineUnEnumerableProperty(disableds)
        })

        // 递归
        if (formDesc[field].children) {
          Object.assign(
            acc,
            this.getDeepFormDesc(
              formDesc[field].children,
              formField,
              formDesc[field]
            )
          )
        } else {
          acc[formField] = formDesc[field]
        }

        return acc
      }, {})
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
    // 定义联动属性的descriptor
    defineUnEnumerableProperty(value) {
      return {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
      }
    },
    // 检测联动
    checkLinkage() {
      if (this.checkVifFn) {
        this.checkLinkageFn()
      } else {
        this.checkLinkageFn = throttle(300, () => {
          const formDesc = this.computedFormDesc
          const formData = this.formData
          Object.keys(formDesc).forEach(field => {
            const formItem = formDesc[field]
            // 1.设置 type
            let type = formItem.type
            if (typeof formItem.type === 'function') {
              type = this.getComponentName(formItem.type(formData))
              if (formItem._type && formItem._type !== type) {
                // 类型改变, 则删除原数据
                this.setValue(field, null)
              }
            } else {
              type = this.getComponentName(formItem.type)
            }

            // 2.触发 v-if 显示 / 隐藏
            const vif = formItem._vifs.every(vif =>
              typeof vif === 'function' ? vif(this.formData) : vif
            )

            // 如果隐藏, 则删除值
            if (!vif) {
              this.setValue(field, null)
            }

            // 3.触发 disabled 禁用 / 启用
            const disabled = formItem._disableds.some(disabled =>
              typeof disabled === 'function' ? disabled(formData) : disabled
            )

            Object.defineProperties(formItem, {
              _type: this.defineUnEnumerableProperty(type),
              _vif: this.defineUnEnumerableProperty(vif),
              _disabled: this.defineUnEnumerableProperty(disabled)
            })

            // 4.重新获取 options
            if (
              formItem._vif &&
              formItem.isReloadOptions &&
              typeof formItem.options === 'function'
            ) {
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
          text: option[prop.text],
          value: option[prop.value]
        }))
      } else {
        return options
      }
    },
    // 将options转为对象数组
    getObjArrOptions(options) {
      return options.map(option => {
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
    changeOptions(options, prop, field, resetValue = false) {
      if (options) {
        if (options instanceof Array) {
          // 当options为数组时: 直接获取
          this.setOptions(options, prop, field, resetValue)
        } else if (options instanceof Function) {
          // 当options为函数: 执行函数并递归
          this.changeOptions(options(this.formData), prop, field, resetValue)
        } else if (options instanceof Promise) {
          // 当options为Promise时: 等待Promise结束, 并获取值
          options.then(options => {
            this.changeOptions(options, prop, field, resetValue)
          })
        } else if (typeof options === 'string' && this.optionsFn) {
          // options为url地址
          this.changeOptions(this.optionsFn(options), prop, field, resetValue)
        } else {
          // 其他报错
          throw new TypeError(
            'options的类型不正确, options及options请求结果类型可为: 字符串数组, 对象数组, 函数和Promise或者URL地址, 当前值为: ' +
              options +
              ', 不属于以上四种类型'
          )
        }
      } else {
        if (this.computedFormDesc[field]._options) {
          // 如果new options为null / undefined, 且 old Options 存在, 则设置
          this.setOptions([], prop, field, resetValue)
        }
      }
    },
    // 设置options
    setOptions(options, prop, field, resetValue) {
      // 将options每一项转为对象
      let newOptions = this.getObjArrOptions(options)
      // 改变prop为规定的prop
      newOptions = this.changeProp(newOptions, prop)
      this.$set(this.computedFormDesc[field], '_options', newOptions)

      // 是否需要重置值
      const oldOptions = this.computedFormDesc[field]._options
      if (resetValue && oldOptions !== undefined) {
        const newOptionValues = new Set(
          Array.isArray(newOptions) ? newOptions.map(item => item.value) : []
        )
        const oldOptionValues = new Set(
          Array.isArray(oldOptions) ? oldOptions.map(item => item.value) : []
        )

        // 1.没并集 & 2.原 oldOptions 且和 newOptions 不相等, 则重置 value 值
        const isIntersection = intersection(newOptionValues, oldOptionValues)
          .size
        const isEqual = equal(newOptionValues, oldOptionValues)

        if (!isIntersection && !isEqual) {
          this.setValue(field, null)
        }
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
          const formItem = this.computedFormDesc[key]
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
          const formItem = this.computedFormDesc[field]
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
      this.$emit('update:visible', false)
    },
    // 重置表单
    resetForm() {
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
