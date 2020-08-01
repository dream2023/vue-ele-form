import dayjs from 'dayjs'

export default {
  watch: {
    // 当值发生变化时
    value (newVal) {
      if (dayjs(newVal).isValid()) {
        newVal = this.getValue(newVal)
      }

      this.newValue = newVal
    }
  },
  data () {
    return {
      newValue: this.value ? dayjs(this.value).format() : this.value
    }
  },
  methods: {
    // 覆盖 formMixin 中的 handleChange, 将值转为 unix 时间戳
    handleChange (value) {
      let newVal = value
      if (value && !(this.attrs.valueFormat || this.attrs['value-format'])) {
        newVal = dayjs(value).unix()
      }

      this.$emit('input', newVal)
    },

    // 获取值: 数字(秒 -> 毫秒) / 字符串
    getValue (value) {
      if (value && !(this.attrs.valueFormat || this.attrs['value-format'])) {
        value = typeof value === 'number' ? value * 1000 : value
        return dayjs(value).format()
      } else {
        return value
      }
    },

    // 自定义值处理
    customInit (value) {
      return this.getValue(value)
    }
  }
}
