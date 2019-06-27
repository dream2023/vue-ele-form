<template>
  <vue-editor
    :editorOptions="editorSettings"
    :editorToolbar="params.editorToolbar"
    :value="value"
    @imageAdded="handleImageAdded"
    @input="handleInput"
    class="ele-form-editor"
    useCustomImageHandler
  ></vue-editor>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'bc-quill-image-resize-module'
import ajax from 'element-ui/packages/upload/src/ajax'
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'EleFormRichText',
  props: {
    // 上传地址
    action: String,
    // 值
    value: String,
    // 图片大小限制
    limit: Number,
    // 自定义工具栏
    editorToolbar: Array,
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
      componentName: 'rich-text',
      defaultParams: {
        limit: 10,
        editorToolbar: [
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
      },
      editorSettings: {
        modules: {
          imageResize: {}
        }
      }
    }
  },
  computed: {
    // 全局参数
    globalParams () {
      return this.$EleFormParams || {}
    },
    // 组件参数
    componentParams () {
      return this.globalParams['rich-text']
    },
    // 上传参数
    uploadParams () {
      return this.globalParams['upload']
    },
    // 参数 默认参数 < 全局上传参数 < 组件参数 < 自定义参数
    params () {
      const customParams = {}
      if (this.action) customParams.action = this.action
      if (this.limit) customParams.limit = this.limit
      if (this.editorToolbar) customParams.editorToolbar = this.editorToolbar
      if (this.responseFn) customParams.responseFn = this.responseFn
      return Object.assign({}, this.defaultParams, this.uploadParams, this.componentParams, customParams)
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    },
    // 上传图片
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const isImg = file.type.indexOf('image') > -1
      const isLt = file.size / 1024 / 1024 < this.params.limit
      if (!isImg) {
        this.$message.error('上传文件格式不正确, 请上传图片文件!')
        return
      }

      if (!isLt) {
        this.$message.error(`上传头像图片大小不能超过 ${this.params.limit} MB!`)
      }

      ajax({
        action: this.params.action,
        file: file,
        data: this.params.data,
        onProgress () { return false },
        onSuccess: (response) => {
          if (this.params.responseFn) {
            response = this.params.responseFn(response)
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
  },
  mounted () {
    console.log(this.$options.name)
  }
}
</script>

<style lang="css">
.ele-form-editor .ql-toolbar {
  line-height: 1.5 !important;
}

.ele-form-editor .ql-picker-label {
  outline: none !important;
}

.ele-form-editor .ql-snow .ql-tooltip[data-mode="link"]:before {
  content: "请输入链接地址:" !important;
}
.ele-form-editor .ql-snow .ql-tooltip.ql-editing a.ql-action:after {
  border-right: 0px;
  content: "保存" !important;
  padding-right: 0px;
}

.ele-form-editor .ql-snow .ql-tooltip[data-mode="video"]:before {
  content: "请输入视频地址:" !important;
}

.ele-form-editor .ql-snow .ql-picker.ql-size .ql-picker-label:before,
.ele-form-editor .ql-snow .ql-picker.ql-size .ql-picker-item:before {
  content: "14px" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="small"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="small"]:before {
  content: "10px" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="large"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="large"]:before {
  content: "18px" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="huge"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="huge"]:before {
  content: "32px" !important;
}

.ele-form-editor .ql-snow .ql-picker.ql-header .ql-picker-label:before,
.ele-form-editor .ql-snow .ql-picker.ql-header .ql-picker-item:before {
  content: "文本" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="1"]:before,
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]:before {
  content: "标题1" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="2"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="2"]:before {
  content: "标题2" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="3"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="3"]:before {
  content: "标题3" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="4"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="4"]:before {
  content: "标题4" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="5"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="5"]:before {
  content: "标题5" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="6"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="6"]:before {
  content: "标题6" !important;
}

.ele-form-editor .ql-snow .ql-picker.ql-font .ql-picker-label:before,
.ele-form-editor .ql-snow .ql-picker.ql-font .ql-picker-item:before {
  content: "标准字体" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="serif"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="serif"]:before {
  content: "衬线字体" !important;
}
.ele-form-editor
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="monospace"]:before,
.ele-form-editor
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="monospace"]:before {
  content: "等宽字体" !important;
}
</style>
