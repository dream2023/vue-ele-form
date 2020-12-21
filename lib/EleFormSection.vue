<template>
  <ele-form
    :formDesc="formDesc"
    class="ele-form-section"
    ref="ele-form"
    v-bind="$attrs"
    :formData="formData"
    @input="$emit('input', $event)"
    v-on="$listeners"
  >
    <!-- 默认插槽 -->
    <template v-slot:default>
      <slot />
    </template>
    <template v-slot:form-content="{ props, formDesc, formData, formErrorObj }">
      <slot
        :formData="formData"
        :formDesc="formDesc"
        :props="props"
        :formErrorObj="formErrorObj"
        name="form-content"
      >
        <div
          :key="index"
          class="ele-form-section-content"
          v-for="(section, index) of sections"
        >
          <slot
            :icon="section.icon"
            :title="section.title"
            name="section-header"
          >
            <div class="ele-form-section-header">
              <i
                :class="section.icon"
                style="padding-right: 10px;"
                v-if="section.icon"
              ></i>
              <span>{{ section.title }}</span>
            </div>
          </slot>
          <div class="ele-form-section-body">
            <el-row :gutter="20">
              <template v-for="(v, field) of section.formDesc">
                <slot
                  :name="field + '-wrapper'"
                  :data="formData[field]"
                  :desc="formDesc[field]"
                  :field="field"
                  :props="props"
                  :formData="formData"
                  :disabled="formDesc[field]._disabled"
                  :type="formDesc[field]._type"
                  :options="formDesc[field]._options"
                >
                  <el-col
                    :key="field"
                    v-bind="formDesc[field]._colAttrs"
                    v-if="formDesc[field]._vif"
                    :class="{ 'ele-form-col--break': formDesc[field].break }"
                  >
                    <el-form-item
                      :error="formErrorObj ? formErrorObj[field] : null"
                      :label-width="formDesc[field].labelWidth || null"
                      :label="
                        props.isShowLabel &&
                        formDesc[field].isShowLabel !== false
                          ? formDesc[field]._label
                          : null
                      "
                      :prop="field"
                    >
                      <!-- 具名 作用域插槽(用于用户自定义显示) -->
                      <slot
                        ::data="formData[field]"
                        :desc="formDesc[field]"
                        :props="props"
                        :field="field"
                        :formData="formData"
                        :name="field"
                        :disabled="formDesc[field]._disabled"
                        :type="formDesc[field]._type"
                        :options="formDesc[field]._options"
                      >
                        <component
                          :disabled="formDesc[field]._disabled"
                          :desc="formDesc[field]"
                          :is="formDesc[field]._type"
                          :options="formDesc[field]._options"
                          :ref="field"
                          :formData="formData"
                          :readonly="props.readonly"
                          :field="field"
                          :value="getValue(field)"
                          @input="setValue(field, $event)"
                        />
                      </slot>
                      <div
                        class="ele-form-tip"
                        v-if="formDesc[field]._tip"
                        v-html="formDesc[field]._tip"
                      ></div>
                    </el-form-item>
                  </el-col>
                </slot>
              </template>
            </el-row>
          </div>
        </div>
      </slot>
    </template>

    <!-- 按钮区插槽 -->
    <template v-slot:form-btn="{ btns }">
      <slot :btns="getBtns(btns)" name="form-btn">
        <el-button
          :key="index"
          @click="btn.click"
          v-bind="btn.attrs"
          v-for="(btn, index) of btns"
          >{{ btn.text }}</el-button
        >
      </slot>
    </template>
  </ele-form>
</template>

<script>
export default {
  name: 'EleFormSection',
  inheritAttrs: false,
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
    sections: {
      type: Array,
      required: true
    }
  },
  computed: {
    formDesc() {
      return this.sections.reduce(
        (acc, cur) => Object.assign(acc, cur.formDesc),
        {}
      )
    }
  },
  data() {
    return {
      getDeepFormDesc: null
    }
  },
  methods: {
    getValue(val) {
      if (this.$refs['ele-form']) {
        return this.$refs['ele-form'].getValue(val)
      }
    },
    setValue(field, $event) {
      if (this.$refs['ele-form']) {
        this.$refs['ele-form'].setValue(field, $event)
      }
    },
    getBtns(btns) {
      return btns.map(item => {
        item.click = item.click.bind(this.$refs['ele-form'])
        return item
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDeepFormDesc = this.$refs['ele-form'].getDeepFormDesc
    })
  }
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
  margin-bottom: 15px;
}
</style>
