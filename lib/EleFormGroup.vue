<template>
  <el-tabs
    v-bind="attrs"
    v-model="currentName"
    v-on="tabOn"
  >
    <el-tab-pane
      :key="key"
      :label="item.label"
      :name="key"
      v-for="(item, key) of formDesc"
    >
      <ele-form
        :form-data="formData[key]"
        :form-desc="item.desc"
        :formBtns="formBtns[key]"
        :rules="rules[key]"
        v-bind="$attrs"
        v-if="key === currentName"
        v-on="$listeners"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'EleFormGroup',
  props: {
    // 自定义tab属性， 具体参考：https://element.eleme.cn/#/zh-CN/component/tabs#tabs-attributes
    tabAttrs: Object,
    // tab的事件, 具体参考：https://element.eleme.cn/#/zh-CN/component/tabs#tabs-events
    tabOn: Object,
    // 默认激活的tab
    activeName: String,
    /**
      * formDesc: {
      *   groupKey1: {
      *     label: '分组1',
      *     desc: {
      *       // 表单项1
      *       name: {
      *         type: 'input',
      *         label: '姓名'
      *       },
      *       // 表单项2
      *       job: {
      *         type: 'input',
      *         label: '工作'
      *       }
      *     }
      *   },
      *   groupKey2: {
      *     label: '分组2',
      *     desc: {
      *       // 表单项1
      *       oldPassword: {
      *         type: 'password',
      *         label: '旧密码'
      *       },
      *       // 表单项2
      *       newPassword: {
      *         type: 'password',
      *         label: '新密码'
      *       },
      *       // 表单项3
      *       confirmPassword: {
      *         type: 'password',
      *         label: '确定新密码'
      *       }
      *     }
      *   }
     */
    formDesc: {
      type: Object,
      required: true
    },
    /**
     * formData: {
     *    groupKey1: {
     *       name: '张xx',
     *       job: '前端'
     *    },
     *    groupKey2: {
     *       oldPassword: '123',
     *       newPassword: null,
     *       confirmPassword: null
     *    }
     * }
     */
    formData: {
      type: Object,
      required: true
    },
    /**
     * rules: {
     *    groupKey1: {
     *       // ...
     *    },
     *    groupKey2: {
     *       // ...
     *    }
     * }
     */
    rules: {
      type: Object,
      default () { return {} }
    },
    /**
     * formBtns: {
     *    groupKey1: {
     *       // ...
     *    },
     *    groupKey2: {
     *       // ...
     *    }
     * }
     */
    formBtns: {
      type: Object,
      default () { return {} }
    }
  },
  computed: {
    attrs () {
      return Object.assign({}, { type: 'border-card' }, this.tabAttrs)
    }
  },
  data () {
    return {
      currentName: ''
    }
  },
  created () {
    this.currentName = this.activeName || Object.keys(this.formDesc)[0]
  }
}
</script>
