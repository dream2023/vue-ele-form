import ExtendSlot from '../ExtendSlot'
import attrsMixin from './attrsMixin'
import { is, isDef } from '../tools/utils'
import localMixin from './locale'
import mock from '../tools/mock'

export default {
  inheritAttrs: false,
  components: { ExtendSlot },
  mixins: [attrsMixin, localMixin],
  props: {
    value: {},
    disabled: Boolean,
    readonly: Boolean,
    options: {
      type: Array,
      default() {
        return []
      }
    },
    formData: Object,
    desc: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    slots() {
      return this.desc.slots || {}
    },
    scopedSlots() {
      return this.desc.scopedSlots || {}
    },
    onEvents() {
      return Object.assign({}, this.defaultOn, this.desc.on)
    }
  },
  watch: {
    // 当值发生变化时
    value: {
      handler(value) {
        this.handleValueChanged(value)
      },
      immediate: true
    }
  },
  data() {
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
    mockData() {
      const Mock = mock()
      if (Mock) {
        if (this.desc.mock === true && this.mockRule !== false) {
          if (this.mockRule === 'custom') {
            // 自定义mock数据
            this.handleChange(this.getCustomMockData())
          } else if (this.mockRule === 'checkbox' || this.mockRule === 'radio') {
            // checkbox 和 radio 类型, 需要传递 options 参数
            this.handleChange(Mock.Random[this.mockRule](this.options))
          } else if (this.mockRule) {
            this.handleChange(Mock.mock(this.mockRule))
          } else {
            console.error(this.componentName + ' 类型组件没有mock规则, 请手动配置mock规则, 例如: mock: \'@float\', 详细参考: http://mockjs.com/examples.html#DPD')
          }
        } else if (typeof this.desc.mock === 'string') {
          this.handleChange(Mock.mock(this.desc.mock))
        } else if (typeof this.desc.mock === 'function') {
          this.handleChange(this.desc.mock(Mock.mock, Mock.Random))
        }
      }
    },

    // 变化处理
    handleChange(value) {
      this.$emit('input', value)
    },

    // 检查类型
    checkType(val, isDefault = false) {
      if (this.type && isDef(val)) {
        const isOk = is(val, this.type)
        if (!isOk) {
          // eslint-disable-next-line
          console.error(
            `[vue-ele-form warn]: ${this.desc.label} 的${
            // eslint-disable-next-line indent
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

    // 初始化数据
    handleValueChanged(value) {
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
  }
}
