<template>
  <el-tabs
    v-bind="attrs"
    v-model="currentGroupId"
    v-on="tabOn"
  >
    <el-tab-pane
      :key="item.groupId"
      :label="item.groupLabel"
      :name="item.groupId"
      v-for="item of computedGroups"
    >
      <ele-form
        v-bind="item.form"
        v-if="item.groupId === currentGroupId"
        v-on="item.on"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import utils from './utils'

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
  methods: {},
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
