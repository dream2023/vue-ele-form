<template>
  <ele-upload-image/>
</template>

<script>
import EleUploadImage from 'vue-ele-upload-image/src/index'

export default {
  name: 'EleFormImage',
  props: {
    // 图片链接
    value: {
      type: [String, Array]
    },
    // 是否剪裁
    crop: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: true
    },
    // 多张上传
    multiple: {
      type: [Boolean, Number],
      default: false
    },
    // 显示大小
    size: {
      type: Number,
      default: 150
    },
    // 弹窗标题
    title: String
  },
  components: {
    EleUploadImage
  },
  data () {
    return {
      defaultAttrs: {
        size: 150
      }
    }
  },
  methods: {},
  mounted () {}
}
</script>
