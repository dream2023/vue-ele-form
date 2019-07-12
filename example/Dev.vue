<template>
  <ele-form
    :formData="formData"
    :formDesc="formDesc"
    :request-fn="handleSubmit"
    @request-success="handleSuccess"
  ></ele-form>
</template>

<script>
export default {
  data () {
    return {
      formError: {},
      formData: {
        number: 10,
        text: 1,
        tag: [1, 3, 3],
        // cascader: [17, 18, 20],
        date: '2019-10-20'
      },
      formDesc: {
        text: {
          label: '文本类型',
          type: 'text',
          options: [
            { text: '正常', value: 1 },
            { text: '异常', value: 0 }
          ]
        },
        image: {
          label: '上传图片',
          type: 'image',
          attrs: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            responseFn (response, file, fileList) {
              // 根据响应结果, 设置 URL
              return file.url
            }
          }
        },
        video: {
          label: '上传视频',
          type: 'video',
          attrs: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            responseFn ({ id }) {
              // 根据响应结果, 设置 URL
              return 'https://s3.pstatp.com/aweme/resource/web/static/image/index/tvc-v2_30097df.mp4?id=' + id
            }
          }
        },
        input: {
          label: '普通输入框',
          type: 'input',
          attrs: {
            placeholder: '请输入内容'
          },
          slots: {
            prefix (h) {
              return h('i', { 'class': 'el-icon-edit el-input__icon' })
            }
          }
        },
        textarea: {
          label: '文本域',
          type: 'textarea',
          attrs: {
            placeholder: '请输入内容'
          }
        },
        password: {
          label: '密码框',
          type: 'password',
          attrs: {
            placeholder: '请输入内容'
          }
        },
        select: {
          label: '选择器',
          type: 'select',
          options: [
            { text: '北京', value: 'beijing' },
            { text: '上海', value: 'shanghai' }
          ],
          slots: {
            default (h) {
              return h('el-option', { attrs: { value: '123', label: '测试' } })
            },
            prefix (h) {
              return h('i', { 'class': 'el-icon-edit el-input__icon' })
            }
          }
        },
        cascader: {
          label: '级联选择器',
          type: 'cascader',
          attrs: {
            props: { expandTrigger: 'hover' }
          },
          slots: {
            default (h, data) {
              return h('span', data['data'].label + '123123')
            }
          },
          options: [{
            value: 1,
            label: '东南',
            disabled: true,
            children: [{
              value: 2,
              label: '上海',
              children: [
                { value: 3, label: '普陀' },
                { value: 4, label: '黄埔' },
                { value: 5, label: '徐汇' }
              ]
            }, {
              value: 7,
              label: '江苏',
              children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' }
              ]
            }, {
              value: 12,
              label: '浙江',
              children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' }
              ]
            }]
          }, {
            value: 17,
            label: '西北',
            children: [{
              value: 18,
              label: '陕西',
              children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' }
              ]
            }, {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' }
              ]
            }]
          }]
        },
        radio: {
          label: '单选框',
          type: 'radio',
          options: [
            { text: '男', value: 0, attrs: { disabled: true } },
            { text: '女', value: 1 }
          ]
        },
        checkbox: {
          label: '多选框',
          type: 'checkbox',
          options: [
            { text: '北京', value: 'beijing' },
            { text: '上海', value: 'shanghai' }
          ]
        },
        'checkbox-button': {
          label: '多选框',
          type: 'checkbox-button',
          options: [
            { text: '北京', value: 'beijing' },
            { text: '上海', value: 'shanghai' }
          ]
        },
        time: {
          label: '时间',
          type: 'time'
        },
        date: {
          label: '日期',
          type: 'date'
        },
        datetime: {
          label: '日期时间',
          type: 'datetime'
        },
        number: {
          label: '数字',
          type: 'number'
        },
        switch: {
          label: '开关',
          type: 'switch'
        },
        transfer: {
          label: '穿梭框',
          type: 'transfer',
          slots: {
            'left-footer' (h) {
              return h('span', '123')
            }
          },
          options () {
            const data = []
            for (let i = 1; i <= 15; i++) {
              data.push({
                key: i,
                label: `备选项 ${i}`,
                disabled: i % 4 === 0
              })
            }
            return data
          }
        },
        tag: {
          label: '标签',
          type: 'tag'
        },
        slider: {
          label: '滑块',
          type: 'slider'
        },
        rate: {
          label: '评分',
          type: 'rate'
        },
        color: {
          label: '取色器',
          type: 'color',
          default: '#409EFF'
        },
        gallery: {
          label: '图片/视频展示',
          type: 'gallery',
          attrs: {
            size: 100
          },
          default: ['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
          slots: {
            default (h, data) {
              return h('img', {
                style: {
                  width: '200px',
                  height: '200px'
                },
                attrs: {
                  src: data.source.src
                }
              })
            }
          }
        },
        button: {
          label: '按钮',
          type: 'button',
          title: '按钮类型',
          attrs: {
            type: 'primary'
          }
        },
        'custom-url': {
          label: '自定义组件',
          type: 'custom-url'
        }
      }
    }
  },
  methods: {
    handleSuccess () {
      this.$message.success('创建成功')
    },
    handleSubmit (data) {
      console.log(data)
      return Promise.resolve()
    }
  },
  mounted () {}
}
</script>
