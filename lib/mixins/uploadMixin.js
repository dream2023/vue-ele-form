// 用于上传类的组件工具mixin
import ajax from '../tools/ajax'
import { t } from '../locale'

export default {
  data() {
    return {
      // 标识: 用于注入全局的 upload 参数
      // Vue.use(EleForm, { upload: { action: '' } })
      isUploadComponent: true
    }
  },
  methods: {
    // 上传图片
    handleImageUpload(file, callback) {
      const attrs = this.attrs
      if (!file) {
        this.$message.error(t('ele-form.upload.error'))
        return
      }
      if (attrs.fileSize) {
        const isLt = file.size / 1024 / 1024 < attrs.fileSize

        if (!isLt) {
          this.$message.error(
            t('ele-form.upload.size') + ` ${attrs.fileSize} MB!`
          )
          return
        }
      }
      const isImg = file.type.includes('image')
      if (!isImg) {
        this.$message.error(t('ele-form.upload.imageType'))
        return
      }
      if (!attrs.action) {
        this.$message.error(t('ele-form.upload.action'))
        return
      }

      ajax({
        action: attrs.action,
        file: file,
        headers: attrs.headers,
        filename: attrs.name,
        data: attrs.data,
        onProgress() {
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
          this.$message.error(t('ele-form.upload.error'))
          console.error(error)
        }
      })
    }
  }
}
