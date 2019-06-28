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
  watch: {
    // 当值发生变化时
    value (newVal) {
      this.initValue = newVal
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
      initValue: this.value
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
          this.initValue = this.desc.default
          this.handleChange(this.initValue)
        }
      }
    }
  }
}
