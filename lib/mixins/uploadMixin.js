import ajax from 'element-ui/packages/upload/src/ajax'

export default {
  props: {
    // 上传地址
    action: String,
    // 图片大小限制
    fileSize: {
      type: Number
    },
    // 文件名
    name: {
      type: String,
      default: 'file'
    },
    // 上传图片的头部
    headers: Object,
    // 是否需要带cookie
    withCredentials: Boolean,
    // 自定义上传数据
    data: Object,
    // 上传成功的进一步处理
    responseFn: Function
  },
  methods: {
    // 上传图片
    handleImageUpload (file, callback) {
      if (!file) {
        this.$message.error('上传出错了, 请重试!')
        return
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize

        if (!isLt) {
          this.$message.error(`上传头像图片大小不能超过 ${this.fileSize} MB!`)
        }
      }
      const isImg = file.type.indexOf('image') > -1
      if (!isImg) {
        this.$message.error('上传文件格式不正确, 请上传图片文件!')
        return
      }
      if (!this.action) {
        this.$message.error('请传入请求地址 action 属性!')
        return
      }

      const self = this
      ajax({
        action: this.action,
        file: file,
        filename: this.name,
        data: this.data,
        onProgress () {
          return false
        },
        onSuccess: response => {
          if (self.responseFn) {
            file.url = URL.createObjectURL(file)
            response = self.responseFn(response, file)
          }
          callback(response)
        },
        onError: error => {
          self.$message.error('上传失败, 请重试')
          console.log(error)
        }
      })
    }
  }
}
