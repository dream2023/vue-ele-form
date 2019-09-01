// 用于上传类的组件工具mixin
import ajax from 'element-ui/packages/upload/src/ajax'

export default {
  data () {
    return {
      // 标识: 用于注入全局的 upload 参数
      // Vue.use(EleForm, { upload: { action: '' } })
      isUploadComponent: true
    }
  },
  methods: {
    // 上传图片
    handleImageUpload (file, callback) {
      const attrs = this.attrs
      if (!file) {
        this.$message.error('上传出错了, 请重试!')
        return
      }
      if (attrs.fileSize) {
        const isLt = file.size / 1024 / 1024 < attrs.fileSize

        if (!isLt) {
          this.$message.error(`上传头像图片大小不能超过 ${attrs.fileSize} MB!`)
          return
        }
      }
      const isImg = file.type.includes('image')
      if (!isImg) {
        this.$message.error('上传文件格式不正确, 请上传图片文件!')
        return
      }
      if (!attrs.action) {
        this.$message.error('请传入请求地址 action 属性!')
        return
      }

      ajax({
        action: attrs.action,
        file: file,
        filename: attrs.name,
        data: attrs.data,
        onProgress () {
          return false
        },
        onSuccess: response => {
          if (attrs.responseFn) {
            file.url = URL.createObjectURL(file)
            response = attrs.responseFn(response, file)
          }
          callback(response)
        },
        onError: error => {
          this.$message.error('上传失败, 请重试')
          console.error(error)
        }
      })
    }
  }
}
