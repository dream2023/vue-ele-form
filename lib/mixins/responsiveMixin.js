import { throttle } from 'throttle-debounce'
export default {
  methods: {
    // window resize
    handleWindowResize () {
      if (!this.$refs.wrapper) return
      const { clientWidth } = this.$refs.wrapper
      if (clientWidth === 0) return

      let val = ''
      if (clientWidth > 1920) {
        val = 'xl'
      } else if (clientWidth > 1200) {
        val = 'lg'
      } else if (clientWidth > 992) {
        val = 'md'
      } else if (clientWidth > 768) {
        val = 'sm'
      } else {
        val = 'xs'
      }

      this.$emit('responsive', val, clientWidth)
    }
  },
  // 处理响应式
  handleChangeResponsive (val) {
    let labelPosition = 'right'
    let span = 22

    if (val === 'xs') {
      labelPosition = 'top'
      span = 24
    } else {
      labelPosition = 'right'
      if (val === 'xl') {
        span = 12
      } else if (val === 'lg') {
        span = 14
      } else if (val === 'md') {
        span = 16
      } else {
        span = 18
      }
    }

    if (!this.labelPosition) {
      this.formLabelPosition = labelPosition
    }

    if (!this.span) {
      this.formSpan = span
    }
  },
  mounted () {
    // 确保dom渲染完毕
    this.$nextTick(() => {
      // 先触发一次
      this.handleWindowResize()

      // 检测浏览器窗口变化, 进行响应式处理
      window.addEventListener(
        'resize',
        throttle(100, () => {
          this.handleWindowResize()
        }),
        false
      )

      // 监听事件
      this.$on('responsive', this.handleChangeResponsive)
    })
  }
}
