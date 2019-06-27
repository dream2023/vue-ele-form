<template>
  <div></div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      formData: {},
      formDesc: {
        id: {
          type: 'hide'
        },
        username: {
          label: '用户名',
          type: 'input',
          attrs: {
            'prefix-icon': 'el-icon-edit',
            placeholder: '请输入用户名'
          }
        },
        password: {
          label: '密码',
          type: 'input',
          attrs: {
            'prefix-icon': 'el-icon-view',
            placeholder: '请输入密码'
          }
        },
        role: {
          label: '角色',
          type: 'select',
          attrs: {
            filterable: true
          },
          options: [],
          slots: {
            'prefix': function (h) {
              return h('i', {
                class: ['iconfont', 'icon-user']
              })
            }
          }
        },
        nickname: {
          label: '昵称',
          type: 'input',
          attrs: {
            'prefix-icon': 'el-icon-edit',
            placeholder: '请输入昵称'
          }
        },
        email: {
          label: '邮箱',
          type: 'input',
          attrs: {
            'prefix-icon': 'el-icon-edit',
            placeholder: '请输入邮箱'
          }
        },
        mobile: {
          label: '手机号',
          type: 'input',
          attrs: {
            'prefix-icon': 'el-icon-edit',
            placeholder: '请输入手机号'
          }
        },
        avatar: {
          label: '头像',
          type: 'image'
        },
        status: {
          label: '状态',
          type: 'radio',
          default: 1,
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        }
      },
      rules: {
        username: [
          { required: true, message: '必填，可由英文字母、数字组成' }
        ],
        nickname: [
          { required: true, message: '请输入昵称' }
        ],
        password:
        [{ required: true, message: '必填,2-6位数字' }]
      }
    }
  },
  methods: {
  },
  mounted () {}
}
</script>
