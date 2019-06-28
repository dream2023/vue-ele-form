<template>
  <ele-form
    :formData="formData"
    :formDesc="formDesc"
  ></ele-form>
</template>

<script>
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
        input: {
          label: '普通输入框',
          type: 'custom-url'
        },
        password: {
          label: '密码框',
          type: 'password'
        }
      }
    }
  },
  methods: {

  },
  mounted () {}
}
</script>
