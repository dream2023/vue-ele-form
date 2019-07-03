import ExtendSlot from '../ExtendSlot'

export default {
  components: { ExtendSlot },
  props: {
    value: [String, Number, Boolean, Array, Date],
    desc: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    // 是否展示options
    isShowOptions () {
      return (
        this.desc &&
        Array.isArray(this.desc.options) &&
        this.desc.options.length
      )
    },
    attrs () {
      return Object.assign({}, this.defaultAttrs, this.desc.attrs)
    },
    onEvents () {
      return Object.assign({}, this.defaultOn, this.desc.on)
    }
  },
  watch: {
    // 当值发生变化时
    value (newVal) {
      this.newValue = newVal
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
    // 初始化数据
    initData () {
      this.$nextTick(() => {
        if (this.desc.displayFormatter) {
          this.newValue = this.desc.displayFormatter(this.value)
        }
      })
    }
  },
  mounted () {
    this.initData()
  }
}
