import ExtendSlot from '../ExtendSlot'
import attrsMixin from './attrsMixin'

export default {
  inheritAttrs: false,
  components: { ExtendSlot },
  mixins: [attrsMixin],
  props: {
    value: [String, Number, Boolean, Array, Date, Object],
    desc: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    // options
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
      defaultOn: {
        input: this.handleChange
      },
      newValue: this.value
    }
  },
  methods: {
    // 变化处理
    handleChange (value) {
      this.$emit('input', value)
    },
    // 触发默认值
    triggerDefault () {
      const value = this.value
      const isArr = Array.isArray(value)

      // eslint-disable-next-line eqeqeq
      if (value == undefined || value === '' || (isArr && value.length === 0)) {
        // 值为空
        // eslint-disable-next-line eqeqeq
        if (this.desc.default != undefined) {
          // 默认值不为空
          this.newValue = this.desc.default
          this.handleChange(this.newValue)
        }
      }
    },

    // 自定义初始化
    customInit () {},

    // 初始化数据
    handleValueChanged (value) {
      if (this.desc.displayFormatter) {
        this.newValue = this.desc.displayFormatter(value)
      } else {
        this.newValue = value
      }
      if (this.customInit) this.customInit()
    }
  },
  mounted () {
    // this.initData()
  }
}
