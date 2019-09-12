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
    tabAttrs: Object,
    tabOn: Object,
    activeName: String,
    formDesc: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default () { return {} }
    },
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
