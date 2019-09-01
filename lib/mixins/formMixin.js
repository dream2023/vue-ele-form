import ExtendSlot from '../ExtendSlot'
import attrsMixin from './attrsMixin'
import utils from '../utils'

export default {
  inheritAttrs: false,
  components: { ExtendSlot },
  mixins: [attrsMixin],
  props: {
    value: {},
    desc: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    // 如果options不是数组(例如为函数和Promise), 则返回空数组
    options () {
      return this.desc && Array.isArray(this.desc.options)
        ? this.desc.options
        : []
    },
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
    },
    // 检测默认值
    'desc.default': {
      handler () {
        this.triggerDefault()
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
          // 默认值类型检查
          if (this.checkType && !this.checkType(this.desc.default, true)) {
            return
          }

          this.newValue = this.desc.default
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
  }
}
