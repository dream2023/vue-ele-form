<template>
  <ele-form-group
    :groups="groups"
    :isShowBackBtn="false"
    @request="handleSubmit"
    activeGroupId="password"
  ></ele-form-group>
</template>

<script>
export default {
  name: 'Group',
  data () {
    return {
      // 分组
      groups: [
        {
          groupId: 'base',
          groupLabel: '基础信息',
          form: {
            formDesc: {
              name: {
                type: 'input',
                label: '姓名'
              },
              age: {
                type: 'number',
                label: '年龄'
              }
            },
            formData: {
              name: 'zhang'
            }
          }
        },
        {
          groupId: 'password',
          groupLabel: '密码',
          form: {
            formDesc: {
              oldPassword: {
                type: 'password',
                label: '旧密码'
              },
              newPassword: {
                type: 'password',
                label: '新密码'
              },
              confirmPassword: {
                type: 'password',
                label: '确认密码'
              }
            },
            formData: {
              oldPassword: '123'
            }
          },
          on: {
            request (data) {
              console.log(data, 13)
            }
          }
        }
      ],
      formData: {
      }
    }
  },
  methods: {
    handleSubmit (data) {
      console.log(data)
      return Promise.resolve()
    },
    handleSuccess () {
      this.$message.success('创建成功')
    }
  }
}
</script>
