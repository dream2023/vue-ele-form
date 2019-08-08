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
        date: '2019-10-20',
        datetimerange: [1562601600, 1565539200]
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
        input: {
          label: '普通输入框',
          type: 'input',
          attrs: {
            placeholder: '请输入内容',
            maxlength: 10,
            test: 123
          },
          slots: {
            prefix (h) {
              return h('i', { 'class': 'el-icon-edit el-input__icon' })
            }
          }
        },
        autocomplete: {
          label: '输入建议',
          type: 'autocomplete',
          attrs: {
            'fetchSuggestions' (queryString, cb) {
              // var restaurants = this.restaurants
              // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
              // 调用 callback 返回建议列表的数据
              const arr = [
                { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
                { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
                { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' }
              ]
              cb(arr)
            }
          },
          on: {
            select (item) {
              console.log(item)
            }
          },
          slots: {
            suffix (h) {
              return h('span', {
                class: 'el-icon-edit el-input__icon'
              })
            },
            default (h, data) {
              return h('div', {}, [
                h('div', data.item.value),
                h('span', data.item.address)
              ])
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
            default (h, data) {
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
            },
            empty (h) {
              return h('div', 'test')
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
        daterange: {
          label: '日期范围',
          type: 'daterange'
        },
        datetime: {
          label: '日期时间',
          type: 'datetime'
        },
        datetimerange: {
          label: '日期时间范围',
          type: 'datetimerange'
        },
        number: {
          label: '数字',
          type: 'number'
        },
        switch: {
          label: '开关',
          type: 'switch'
        },
        yesno: {
          label: '开关',
          type: 'yesno'
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
