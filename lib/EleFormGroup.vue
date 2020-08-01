<template>
  <el-tabs v-bind="attrs" v-model="currentGroupId" v-on="tabOn">
    <template v-for="item of computedGroups">
      <el-tab-pane
        :key="item.groupId"
        :label="item.groupLabel"
        :name="item.groupId"
        v-if="getVif(item)"
      >
        <ele-form
          v-bind="item.form"
          ref="ele-form"
          v-if="item.groupId === currentGroupId"
          v-on="item.on"
        >
          <template
            v-for="(formItem, key, index) of item.form.formDesc"
            v-slot:[key]="{ desc, props, field, formData }"
          >
            <slot
              :data="formData[field]"
              :desc="desc"
              :props="props"
              :field="field"
              :formData="formData"
              :name="item.groupId + '-' + field"
              :disabled="desc._disabled"
              :type="desc._type"
              :options="desc._options"
            >
              <component
                :disabled="desc._disabled"
                :desc="desc"
                :is="desc._type"
                :options="desc._options"
                :ref="field"
                :readonly="props.readonly"
                :field="field"
                :value="getValue(field)"
                @input="setValue(field, $event)"
                :_disabled="desc._disabled"
                :key="index"
              />
            </slot>
          </template>

          <!-- 按钮插槽 -->
          <template v-slot:form-btn="{ btns }">
            <slot :btns="btns" :name="item.groupId + '-form-btn'"></slot>
          </template>
        </ele-form>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
import { isDef } from './tools/utils'

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
    allFormData() {
      return this.computedGroups.reduce(
        (acc, group) => Object.assign(acc, group.form.formData),
        {}
      )
    },
    // tabs的属性
    attrs() {
      return Object.assign({}, { type: 'border-card' }, this.tabAttrs)
    },
    // 修改form属性
    computedGroups() {
      return this.groups.map(item => {
        if (this.getDeepFormDesc) {
          item.form.formDesc = this.getDeepFormDesc(item.form.formDesc)
        }
        item.form = Object.assign({}, this.$attrs, item.form)
        item.on = Object.assign({}, this.$listeners, item.on)
        return item
      })
    }
  },
  data() {
    return {
      getDeepFormDesc: null,
      currentGroupId: ''
    }
  },
  methods: {
    getValue(val, index) {
      if (this.$refs['ele-form'] && this.$refs['ele-form'][0]) {
        return this.$refs['ele-form'][0].getValue(val)
      }
    },
    setValue(field, $event) {
      this.$refs['ele-form'][0].setValue(field, $event)
    },
    getVif(group) {
      if (typeof group.vif === 'function') {
        return group.vif(this.allFormData)
      } else if (typeof group.vif === 'boolean') {
        return group.vif
      } else {
        return true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDeepFormDesc = this.$refs['ele-form'].getDeepFormDesc
    })
    // 获取默认激活的分组
    if (isDef(this.activeGroupId)) {
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
