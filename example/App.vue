<template>
  <div>
    <ele-form :formDesc="formDesc" :rules="rules" :formData="formData" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      formDesc: {
        name: {
          type: 'input',
          label: '姓名',
          required: true,
          rules: [
            { len: '4', message: '长度不能小于4' }
          ]
        },
        age: {
          type: 'number',
          label: '年龄'
        }
      },
      rules: {
        name: [{ max: '5', message: '长度不能小于4' }]
      },
      formData: {}
    }
  },
  methods: {},
  mounted () {}
}
</script>
