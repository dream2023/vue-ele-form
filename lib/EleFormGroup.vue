<template>
  <el-tabs
    v-bind="attrs"
    v-model="currentGroupId"
    v-on="tabOn"
  >
    <template v-for="item of computedGroups">
      <el-tab-pane
        :key="item.groupId"
        :label="item.groupLabel"
        :name="item.groupId"
        v-if="getVif(item)"
      >
        <ele-form
          v-bind="item.form"
          v-if="item.groupId === currentGroupId"
          v-on="item.on"
        >
          <template
            v-for="(formItem, key, index) of item.form.formDesc"
            v-slot:[key]="{desc, field}"
          >
            <slot
              :data="item.form.formData[field]"
              :desc="desc"
              :field="field"
              :formData="item.form.formData"
              :name="item.groupId + '-' + key"
            >
              <component
                :_disabled="desc._disabled"
                :desc="desc"
                :is="desc._type"
                :key="index"
                :options="desc._options"
                v-model="item.form.formData[field]"
              />
            </slot>
          </template>

          <!-- 按钮插槽 -->
          <template v-slot:form-btn="{ btns }">
            <slot
              :btns="btns"
              :name="item.groupId + '-form-btn'"
            ></slot>
          </template>
        </ele-form>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
import utils from './tools/utils'

export default {
  name: 'EleFormGroup',
  inheritAttrs: false,
  props: {
    // 自定义tab属性， 具体参考：https://element.eleme.cn/#/zh-CN/component/tabs#tabs-attributes
    tabAttrs: Object,
    // tab的事件, 具体参考：https://element.eleme.cn/#/zh-CN/component/tabs#tabs-events
    tabOn: Object,
    // 分组
    groups: {
      type: Array,
      required: true
    },
    // 默认激活的tab
    activeGroupId: [String, Number]
  },
  computed: {
    // 所有组的表单值
    allFormData () {
      return this.computedGroups.reduce((acc, group) => Object.assign(acc, group.form.formData), {})
    },
    // tabs的属性
    attrs () {
      return Object.assign({}, { type: 'border-card' }, this.tabAttrs)
    },
    // 修改form属性
    computedGroups () {
      return this.groups.map((item) => {
        item.form = Object.assign({}, this.$attrs, item.form)
        item.on = Object.assign({}, this.$listeners, item.on)
        return item
      })
    }
  },
  data () {
    return {
      currentGroupId: ''
    }
  },
  methods: {
    getVif (group) {
      if (typeof group.vif === 'function') {
        return group.vif(this.allFormData)
      } else if (typeof group.vif === 'boolean') {
        return group.vif
      } else {
        return true
      }
    },
    getComponentName (type) {
      if (this.$EleFormBuiltInNames.includes(type)) {
        // 内置组件
        return 'ele-form-' + type
      } else {
        // 外部组件
        return type
      }
    }
  },
  created () {
    // 获取默认激活的分组
    if (utils.isDef(this.activeGroupId)) {
      this.currentGroupId = this.activeGroupId
    } else {
      // 使用groups中的第一个
      if (this.groups.length) {
        this.currentGroupId = this.groups[0].groupId
      }
    }
  }
}
</script>
