<template>
  <el-dialog
    :title="title"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :width="width"
    @closed="$emit('closed')"
    @open="$emit('open')"
    @opened="$emit('opened')"
    class="ele-form-dialog"
    v-bind="dialogAttrs"
  >
    <!-- title 插槽 -->
    <template v-slot:title>
      <slot :title="title" name="title"></slot>
    </template>
    <ele-form
      :formDesc="formDesc"
      :formData="formData"
      @input="$emit('input', $event)"
      :isShowBackBtn="isShowBackBtn"
      :isShowCancelBtn="isShowCancelBtn"
      @update:visible="$emit('update:visible', $event)"
      ref="ele-form"
      :visible="visible"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 默认插槽 -->
      <template v-slot:default>
        <slot></slot>
      </template>

      <!-- 作用域插槽 -->
      <template
        v-for="(formItem, field, props) of formDesc"
        v-slot:[field]="{ formData }"
      >
        <slot
          :data="formData[field]"
          :desc="formItem"
          :field="field"
          :formData="formData"
          :name="field"
          :disabled="props.disabled || formItem._disabled"
          :type="formItem._type"
          :options="formItem._options"
        >
          <component
            :disabled="props.disabled || formItem._disabled"
            :desc="formItem"
            :is="formItem._type"
            :options="formItem._options"
            :ref="field"
            :field="field"
            :value="getValue(field)"
            @input="setValue(field, $event)"
          />
        </slot>
      </template>

      <!-- 按钮插槽 -->
      <template v-slot:form-btn="{ btns }">
        <slot :btns="btns" name="form-btn">
          <el-button
            :key="index"
            @click="btn.click"
            v-bind="btn.attrs"
            v-for="(btn, index) of getBtns(btns)"
            >{{ btn.text }}</el-button
          >
        </slot>
      </template>
    </ele-form>

    <!-- footer插槽 -->
    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'EleFormDialog',
  model: {
    prop: 'formData',
    event: 'input'
  },
  props: {
    // 表单数据
    formData: {
      type: Object,
      required: true
    },
    // 弹窗是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // 弹框标题
    title: String,
    // 弹窗标题
    width: {
      type: String,
      default: '50%'
    },
    // 弹窗其它属性
    dialogAttrs: Object,
    // 是否显示返回按钮, 这里是 false
    isShowBackBtn: {
      type: Boolean,
      default: false
    },
    // 是否显示取消按钮, 这里是 true
    isShowCancelBtn: {
      type: Boolean,
      default: true
    },
    // 表单项
    formDesc: {
      type: Object,
      required: true
    }
    // ... 其它属性同 vue-ele-form 组件
  },
  methods: {
    getValue(val) {
      if (this.$refs['ele-form']) {
        return this.$refs['ele-form'].getValue(val)
      }
    },
    setValue(field, $event) {
      this.$refs['ele-form'].setValue(field, $event)
    },
    getBtns(btns) {
      return btns
        .map(item => {
          item.click.bind(this.$refs.form)
          return item
        })
        .reverse()
    }
  }
}
</script>

<style>
.ele-form-dialog .el-dialog__body {
  padding: 10px 20px;
}
.ele-form-dialog .ele-form-btns {
  float: right;
  margin-top: 10px;
}
</style>
