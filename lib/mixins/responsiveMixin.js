import { throttle } from 'throttle-debounce'
export default {
  props: {
    // 是否响应式
    isResponsive: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    labelPosition: {
      handler (val) {
        if (val) {
          this.formLabelPosition = val
        } else {
          this.handleWindowResize()
        }
      },
      immediate: true
    },
    span: {
      handler (val) {
        if (val) {
          this.formSpan = val
        } else {
          this.handleWindowResize()
        }
      },
      immediate: true
    }
  },
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

      // resize 和 处理 resize的 handleChangeResponsive 通过 $emit 和 $on进行通信
      this.$emit('responsive', val)
    },

    // 处理响应式
    handleChangeResponsive (val) {
      // span 响应式处理
      if (!this.span) {
        let span
        switch (val) {
          case 'xs':
            span = 24
            break
          case 'sm':
            span = 18
            break
          case 'md':
            span = 16
            break
          case 'lg':
            span = 14
            break
          case 'xl':
            span = 12
            break
        }
        this.formSpan = span
      }

      // labelPosition 处理
      if (!this.labelPosition) {
        let labelPosition
        if (val === 'xs') {
          labelPosition = 'top'
        } else {
          labelPosition = 'right'
        }
        this.formLabelPosition = labelPosition
      }
    },

    // 开始响应式
    startResponsive () {
      // 确保dom渲染完毕
      this.$nextTick(() => {
        // 监听事件
        this.$on('responsive', this.handleChangeResponsive)

        // 先触发一次, 进行初始化判定
        this.handleWindowResize()

        // 检测浏览器窗口变化, 进行响应式处理
        this.resizeFn = throttle(150, this.handleWindowResize)
        window.addEventListener('resize', this.resizeFn, false)
      })
    },

    // 结束响应式
    endResponsive () {
      window.removeEventListener('resize', this.resizeFn, false)
      this.$off('responsive', this.handleChangeResponsive)
    }
  },
  mounted () {
    if (this.isResponsive) {
      this.startResponsive()
    }
  },
  beforeDestroy () {
    if (this.isResponsive) {
      this.endResponsive()
    }
  }
}
