<template>
  <ele-form
    :formData="formData"
    :formDesc="formDesc"
    :request-fn="handleRequest"
    @request-success="handleRequestSuccess"
  ></ele-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      formError: {},
      formData: {
        username: 'zhang'
      },
      formDesc: {
        id: {
          type: 'hide'
        },
        username: {
          label: '用户名',
          type: 'input'
        },
        password: {
          label: '密码',
          type: 'input'
        }
      },
      isLoading: false,
      rules: {
        username: [
          { required: true, message: '必填，可由英文字母、数字组成' }
        ],
        password:
        [{ required: true, message: '必填,2-6位数字' }]
      }
    }
  },
  methods: {
    handleRequest (data) {
      // 1.必须返回一个Promise对象
      // 2.当出现异常的时候, 返回的错误信息, 必须是这样的格式: { name: '用户名不存在', password: '密码错误' }
      return new Promise(async (resolve, reject) => {
        try {
          await axios.post('https://jsonplaceholder.typicode.com/posts1', data)
          resolve()
        } catch {
          // eslint-disable-next-line prefer-promise-reject-errors
          // reject({ username: '用户名不正确', password: '密码不正确' })
          reject(new Error(JSON.stringify({ username: '用户名不正确', password: '密码不正确' })))
        }
      })
    },
    handleRequestSuccess () {
      this.$message.success('添加成功')
      // this.$router.back()
    }
  },
  mounted () {}
}
</script>
