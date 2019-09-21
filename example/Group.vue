<template>
  <!-- isShowBackBtn 、formBtns 和 @request 将添加在所有 group 的 form 中 -->
  <ele-form-group
    :formBtns="formBtns"
    :groups="groups"
    :isShowBackBtn="false"
    @request="handleSubmit"
    activeGroupId="password"
    submitBtnText="确定"
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
          // groupId 为分组的 id
          groupId: 'base',
          // groupLabel 为分组的 label
          groupLabel: '基础信息',
          // form 为分组的 ele-form 属性
          form: {
            // 该分组的 ele-form 属性中的 form-desc
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
            // 该分组中 ele-form 属性中 form-data
            formData: {
              name: 'zhang'
            },
            // 会覆盖 ele-form-group 中定义的 submitBtnText
            submitBtnText: '发起'
          },
          // on 为分组的事件
          on: {
            // 会覆盖 ele-form-group中定义的 @request, 实现定制化
            request (data) {
              console.log('点击的第一个', data)
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
          }
        }
      ],
      formBtns: [
        {
          text: '提交并关闭',
          click () {
            console.log('点我了')
          }
        }
      ]
    }
  },
  methods: {
    handleSubmit (data) {
      console.log(data)
      return Promise.resolve()
    }
  }
}
</script>
