<script>
export default {
  props: {
    desc: Object,
    value: [String, Array, Date, Boolean, Object]
  },
  data: function () {
    return {
      newValue: this.value || this.desc.default
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>
