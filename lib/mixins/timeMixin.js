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
    handleChange (value) {
      let newVal = value
      if (value) {
        newVal = dayjs(value).unix()
      }

      this.$emit('input', newVal)
    },
    getValue (value) {
      value = typeof value === 'number' ? value * 1000 : value
      return dayjs(value).format()
    },
    customInit (value) {
      return this.getValue(value)
    }
  }
}
