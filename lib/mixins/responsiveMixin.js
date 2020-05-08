import { throttle } from 'throttle-debounce'
import { getSize } from '../tools/utils'

export default {
  props: {
    // 是否响应式
    isResponsive: {
      type: Boolean,
      default: true
    },
    // 不填则响应式, 填则固定(layout模式为响应式, inline模式无)
    span: Number,
    // 标签位置(layout模式为响应式, inline模式无相应式)
    // 所以暂无默认值
    labelPosition: String
  },
  data () {
    return {
      // 默认标签位置
      defaultLabelPosition: 'right',
      // labelPosition 产生变化的值
      labelPositionBreakPoint: 'xs',
      // 父元素宽度
      parentElWidth: 0,
      // inline模式默认表单宽度
      inlineDefaultSpan: 24,
      // 非inline模式默认表单宽度
      layoutDefaultSpan: 22,
      // 栅格布局枚举值
      colEnum: {
        xs: 24,
        sm: 18,
        md: 16,
        lg: 14,
        xl: 12
      }
    }
  },
  computed: {
    // inline模式 or isResponsive 设定为 false时不是响应式
    computedIsResponsive () {
      return !(this.inline || !this.isResponsive)
    },
    computedLabelPosition () {
      const labelPosition = this.labelPosition

      // 未指定labelPosition & 响应式模式 & 到达临界点
      if (!labelPosition && this.computedIsResponsive && this.colLayout === this.labelPositionBreakPoint) {
        return 'top'
      } else {
        // 非响应式无需计算
        return labelPosition || this.defaultLabelPosition
      }
    },
    // 根据父元素计算出栅格布局
    colLayout () {
      if (this.parentElWidth > 1920) {
        return 'xl'
      } else if (this.parentElWidth > 1200) {
        return 'lg'
      } else if (this.parentElWidth > 992) {
        return 'md'
      } else if (this.parentElWidth > 768) {
        return 'sm'
      } else {
        return 'xs'
      }
    },
    computedSpan () {
      // 如果设置了span, 则使用设置的
      if (this.span) {
        return this.span
        // 如果是响应式, 则使用响应式计算的宽度
      } else if (this.computedIsResponsive) {
        return this.colEnum[this.colLayout]
      } else {
        // 获取时默认值
        return this.inline ? this.inlineDefaultSpan : this.layoutDefaultSpan
      }
    }
  },
  methods: {
    // 监测 window resize, 获取 父元素宽度
    handleWindowResize () {
      if (!this.$refs.wrapper) return
      let { clientWidth } = this.$refs.wrapper
      if (clientWidth === 0 && this.$refs.wrapper instanceof Element) {
        // 隐藏的节点, 宽度为0
        clientWidth = getSize(this.$refs.wrapper).width
      }

      this.parentElWidth = clientWidth
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
    if (this.computedIsResponsive) {
      this.startResponsive()
    }
  },
  beforeDestroy () {
    if (this.computedIsResponsive) {
      this.endResponsive()
    }
  }
}
