import ExtendSlot from '../ExtendSlot'
import attrsMixin from './attrsMixin'
import utils from '../tools/utils'
import localMixin from './locale'

export default {
  inheritAttrs: false,
  components: { ExtendSlot },
  inject: {
    mockFn: { default: null },
    randomFn: { default: null }
  },
  mixins: [attrsMixin, localMixin],
  props: {
    value: {},
    _disabled: Boolean,
    options: {
      type: Array,
      default () {
        return []
      }
    },
    desc: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    onEvents () {
      return Object.assign({}, this.defaultOn, this.desc.on)
    }
  },
  watch: {
    // 当值发生变化时
    value: {
      handler (value) {
        this.handleValueChanged(value)
      },
      immediate: true
    }
  },
  data () {
    return {
      // 默认事件
      defaultOn: {
        input: this.handleChange
      },
      // 新值, 因为Vue不能修改props传递过来的值, 所以借助新的值进行传递
      newValue: this.value
    }
  },
  methods: {
    // 模拟数据
    mockData () {
      if (this.desc.mock === true && this.mockRule !== false) {
        if (this.mockRule === 'custom') {
          // 自定义mock数据
          this.handleChange(this.getCustomMockData())
        } else if (this.mockRule === 'checkbox' || this.mockRule === 'radio') {
          // checkbox 和 radio 类型, 需要传递 options 参数
          this.handleChange(this.randomFn[this.mockRule](this.options))
        } else if (this.mockRule) {
          this.handleChange(this.mockFn(this.mockRule))
        } else {
          console.error(this.componentName + ' 类型组件没有mock规则, 请手动配置mock规则, 例如: mock: \'@float\', 详细参考: http://mockjs.com/examples.html#DPD')
        }
      } else if (typeof this.desc.mock === 'string') {
        this.handleChange(this.mockFn(this.desc.mock))
      } else if (typeof this.desc.mock === 'function') {
        this.handleChange(this.desc.mock(this.mockFn, this.randomFn))
      }
    },

    // 变化处理
    handleChange (value) {
      this.$emit('input', value)
    },

    // 检查类型
    checkType (val, isDefault = false) {
      if (this.type && utils.isDef(val)) {
        const isOk = utils.is(val, this.type)
        if (!isOk) {
          // eslint-disable-next-line
          console.error(
            `[vue-ele-form warn]: ${this.desc.label} 的${
              isDefault ? '默认' : ''
            }值类型错误, 期望 [${this.type}] 类型, 但`,
            val,
            '不是该类型, 请检查'
          )
        }
        return isOk
      } else {
        return true
      }
    },

    // 触发默认值
    triggerDefault () {
      const value = this.value
      const isArr = Array.isArray(value)
      // 值为空
      if (
        utils.isUnDef(value) ||
        value === '' ||
        (isArr && value.length === 0)
      ) {
        // 默认值不为空
        if (utils.isDef(this.desc.default)) {
          let defaultValue = this.desc.default
          // 判断是否有格式化函数
          if (this.desc.displayFormatter) {
            defaultValue = this.desc.displayFormatter(defaultValue)
          }

          // 默认值类型检查
          if (this.checkType && !this.checkType(defaultValue, true)) {
            return
          }

          this.newValue = defaultValue
          this.handleChange(this.newValue)
        }
      }
    },

    // 初始化数据
    handleValueChanged (value) {
      if (this.desc.displayFormatter) {
        value = this.desc.displayFormatter(value)
      }

      if (this.checkType(value)) {
        if (this.customInit) {
          value = this.customInit(value)
        }
        this.newValue = value
      }
    }
  },
  created () {
    this.triggerDefault()
  }
}
