<template>
  <ele-form
    :formData="formData"
    :formDesc="formDesc"
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
      },
      formDesc: {
        id: {
          type: 'hide'
        },
        sex: {
          label: '用户名',
          type: 'select',
          options: ['男', '女']
        },
        name: {
          label: '用户名',
          type: 'select',
          options: [ { text: '男', value: 0 }, { text: '女', value: 1 } ]
        },
        avatar: {
          label: 'avatar',
          type: 'select',
          options: function () {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([{ text: '张', value: 'zhang' }])
              }, 1000)
            })
          }
        }
      }
    }
  },
  methods: {

  },
  mounted () {}
}
</script>
