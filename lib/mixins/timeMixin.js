import dayjs from 'dayjs'

export default {
  watch: {
    // 当值发生变化时
    value (newVal) {
      if (dayjs(newVal).isValid()) {
        this.newValue = this.getValue()
      } else {
        this.newValue = newVal
      }
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
    getValue () {
      const value =
        typeof this.value === 'number' ? this.value * 1000 : this.value
      return dayjs(value).format()
    },
    customInit () {
      this.newValue = this.getValue
    }
  }
}
