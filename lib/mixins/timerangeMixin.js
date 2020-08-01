import dayjs from 'dayjs'

export default {
  data () {
    return {
      type: 'Array',
      newValue: []
    }
  },
  methods: {
    handleChange (value) {
      let newVal = value
      if (newVal && Array.isArray(value) && !(this.attrs.valueFormat || this.attrs['value-format'])) {
        newVal = newVal.map(date => {
          return dayjs(date).unix()
        })
      }

      this.$emit('input', newVal)
    },
    // 获取值: 数字(秒 -> 毫秒) / 字符串
    getValue (value) {
      if (Array.isArray(value) && !(this.attrs.valueFormat || this.attrs['value-format'])) {
        value = value.map(date => {
          return typeof date === 'number' ? date * 1000 : date
        })
      }
      return value
    },
    // 自定义值, 在 formMixin 中使用到
    customInit (value) {
      return this.getValue(value)
    }
  }
}
