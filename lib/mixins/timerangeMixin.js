import dayjs from 'dayjs'

export default {
  props: {
    value: Array
  },
  watch: {
    // 当值发生变化时
    value (newVal) {
      if (Array.isArray(newVal)) {
        this.newValue = this.getValue()
      } else {
        this.newValue = newVal
      }
    }
  },
  data () {
    return {
      newValue: this.value
    }
  },
  methods: {
    handleChange (value) {
      let newVal = value
      if (newVal && Array.isArray(value)) {
        newVal = newVal.map(date => {
          return dayjs(date).unix()
        })
      }

      this.$emit('input', newVal)
    },
    getValue () {
      let value = this.value
      if (Array.isArray(value)) {
        value = value.map(date => {
          return typeof date === 'number' ? date * 1000 : date
        })
      }
      return value
    },
    customInit () {
      this.newValue = this.getValue()
    }
  }
}
