<template>
  <vue-editor
    :editorOptions="editorSettings"
    :editorToolbar="editorToolbar"
    :value="value"
    @imageAdded="handleImageAdded"
    @input="handleInput"
    class="ele-form-rich-text"
    useCustomImageHandler
  ></vue-editor>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'bc-quill-image-resize-module'
import ajax from 'element-ui/packages/upload/src/ajax'
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'RichText',
  props: {
    // 上传地址
    action: String,
    // 值
    value: String,
    // 图片大小限制
    limit: {
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
    // 自定义工具栏
    editorToolbar: {
      type: Array,
      default () {
        return [
          ['bold', 'italic', 'underline'], // toggled buttons
          ['image', 'link'],
          [{ 'size': ['small', true, 'large', 'huge'] }], // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
          ['blockquote'],
          ['clean']
        ]
      }
    },
    // 自定义上传数据
    data: Object,
    // 上传成功的进一步处理
    responseFn: Function
  },
  components: {
    VueEditor
  },
  data () {
    return {
      editorSettings: {
        modules: {
          imageResize: {}
        }
      }
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    },
    // 上传图片
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      if (!file) {
        this.$message.error('上传出错了, 请重试!')
        return
      }
      if (this.limit) {
        const isLt = file.size / 1024 / 1024 < this.limit

        if (!isLt) {
          this.$message.error(`上传头像图片大小不能超过 ${this.limit} MB!`)
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
      ajax({
        action: this.action,
        file: file,
        filename: 'image',
        data: this.data,
        onProgress () { return false },
        onSuccess: (response) => {
          if (this.responseFn) {
            file.url = URL.createObjectURL(file)
            response = this.responseFn(response, file)
          }
          Editor.insertEmbed(cursorLocation, 'image', response)
          resetUploader()
        },
        onError: (error) => {
          this.$message.error('上传失败, 请重试')
          console.log(error)
        }
      })
    }
  }
}
</script>

<style lang="css">
.ele-form-rich-text .ql-toolbar {
  line-height: 1.5 !important;
}

.ele-form-rich-text .ql-picker-label {
  outline: none !important;
}

.ele-form-rich-text .ql-snow .ql-tooltip[data-mode="link"]:before {
  content: "请输入链接地址:" !important;
}
.ele-form-rich-text .ql-snow .ql-tooltip.ql-editing a.ql-action:after {
  border-right: 0px;
  content: "保存" !important;
  padding-right: 0px;
}

.ele-form-rich-text .ql-snow .ql-tooltip[data-mode="video"]:before {
  content: "请输入视频地址:" !important;
}

.ele-form-rich-text .ql-snow .ql-picker.ql-size .ql-picker-label:before,
.ele-form-rich-text .ql-snow .ql-picker.ql-size .ql-picker-item:before {
  content: "14px" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="small"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="small"]:before {
  content: "10px" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="large"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="large"]:before {
  content: "18px" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="huge"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="huge"]:before {
  content: "32px" !important;
}

.ele-form-rich-text .ql-snow .ql-picker.ql-header .ql-picker-label:before,
.ele-form-rich-text .ql-snow .ql-picker.ql-header .ql-picker-item:before {
  content: "文本" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="1"]:before,
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]:before {
  content: "标题1" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="2"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="2"]:before {
  content: "标题2" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="3"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="3"]:before {
  content: "标题3" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="4"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="4"]:before {
  content: "标题4" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="5"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="5"]:before {
  content: "标题5" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="6"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="6"]:before {
  content: "标题6" !important;
}

.ele-form-rich-text .ql-snow .ql-picker.ql-font .ql-picker-label:before,
.ele-form-rich-text .ql-snow .ql-picker.ql-font .ql-picker-item:before {
  content: "标准字体" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="serif"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="serif"]:before {
  content: "衬线字体" !important;
}
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="monospace"]:before,
.ele-form-rich-text
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="monospace"]:before {
  content: "等宽字体" !important;
}
</style>
