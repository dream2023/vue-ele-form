<template>
  <ele-form
    :formDesc="formDesc"
    class="ele-form-section"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:form-content="{ formDesc, formData, formErrorObj }">
      <div
        :key="index"
        class="ele-form-section-content"
        v-for="(section, index) of sections"
      >
        <slot
          :icon="section.icon"
          :title="section.title"
          name="header"
        >
          <div class="ele-form-section-header">
            <i
              :class="section.icon"
              style="padding-right: 10px;"
              v-if="section.icon"
            ></i>
            <span>{{section.title}}</span>
          </div>
        </slot>
        <div class="ele-form-section-body">
          <el-row :gutter="20">
            <template v-for="(formItem, field) of section.formDesc">
              <slot :name="field + '-wrapper'">
                <el-col
                  :key="field"
                  :md="formItem.layout || 24"
                  :xs="24"
                  v-if="formItem.type !== 'hide' && formItem._vif"
                  v-show="formItem._vshow"
                >
                  <el-form-item
                    :error="formErrorObj ? formErrorObj[field] : null"
                    :label="formItem.label"
                    :prop="field"
                  >
                    <!-- 具名 作用域插槽(用于用户自定义显示) -->
                    <slot
                      :data="formData[field]"
                      :desc="formItem"
                      :field="field"
                      :formData="formData"
                      :name="field"
                    >
                      <component
                        :_disabled="formItem._disabled"
                        :desc="formItem"
                        :is="formItem.type"
                        :options="formItem._options"
                        v-model="formData[field]"
                      />
                    </slot>
                    <div
                      class="ele-form-tip"
                      v-if="formItem.tip"
                    >{{ formItem.tip }}</div>
                  </el-form-item>
                </el-col>
              </slot>
            </template>
          </el-row>
        </div>
      </div>
    </template>
  </ele-form>
</template>

<script>
export default {
  name: 'EleFormSection',
  inheritAttrs: false,
  props: {
    card: {
      type: Boolean,
      default: false
    },
    sections: {
      type: Array,
      required: true
    }
  },
  computed: {
    formDesc () {
      return this.sections.reduce((acc, cur) => {
        return Object.assign(acc, cur.formDesc)
      }, {})
    }
  },
  data () {
    return {}
  },
  methods: {},
  mounted () { }
}
</script>

<style>
.ele-form-section .el-form {
  border: 1px solid #ebeef5;
  padding: 0 20px;
}
.ele-form-section-header {
  padding: 18px 0;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
