<template>
  <el-card
    class="demo-card"
    header="ele-form-dialog 示例"
    shadow="never"
  >
    <div style="margin-bottom: 20px">
      <el-button
        @click="dialogFormVisible = true"
        type="primary"
      >新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        :key="desc.prop"
        :label="desc.label"
        :prop="desc.prop"
        :width="desc.width"
        v-for="desc of tableDesc"
      ></el-table-column>
    </el-table>
    <ele-form-dialog
      :formData="formData"
      :formDesc="formDesc"
      :request-fn="handleSubmit"
      :rules="rules"
      :visible.sync="dialogFormVisible"
      @request-success="handleSuccess"
      title="新增用户信息"
    ></ele-form-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'FormDialog',
  data () {
    return {
      dialogFormVisible: false,
      tableDesc: [
        {
          label: '日期',
          prop: 'date',
          width: 180
        },
        {
          label: '姓名',
          prop: 'name',
          width: 180
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      formData: {},
      formDesc: {
        name: {
          type: 'input',
          label: '姓名'
        },
        date: {
          type: 'date',
          label: '年龄',
          valueFormatter (value) {
            const date = new Date(value * 1000)
            return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()
          }
        },
        address: {
          type: 'input',
          label: '地址'
        }
      },
      rules: {
        name: { required: true, message: '姓名必填' },
        date: { required: true, message: '日期必填' },
        address: { required: true, message: '地址必填' }
      }
    }
  },
  methods: {
    handleSubmit (data) {
      return new Promise((resolve) => {
        resolve(data)
      })
    },
    handleSuccess (data) {
      this.tableData.push(data)
      this.dialogFormVisible = false
      this.formData = {}
      this.$message.success('创建成功')
    }
  },
  mounted () { }
}
</script>
