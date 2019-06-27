<template>
  <div
    class="ele-form"
    ref="wrapper"
  >
    <!-- layout布局 -->
    <el-row
      justify="center"
      type="flex"
    >
      <el-col :span="formSpan">
        <!-- 表单 -->
        <el-form
          :label-position="formLabelPosition"
          :model="formData"
          :rules="rules"
          @submit.native.prevent="handleValidateForm"
          label-width="120px"
          ref="form"
        >
          <!-- 默认插槽作为表单项 -->
          <slot/>

          <el-row :gutter="20">
            <!-- 表单项 -->
            <template v-for="(formItem, field) of formDesc">
              <el-col
                :key="field"
                :md="formItem.layout || 24"
                :xs="24"
                v-if="formItem.type !== 'hide'"
              >
                <el-form-item
                  :error="formError ? formError[field] : null"
                  :label="formItem.label"
                  :prop="field"
                >
                  <!-- 具名 作用域插槽(用于用户自定义显示) -->
                  <slot
                    :data="formData[field]"
                    :desc="formItem"
                    :name="field"
                  >
                    <!-- 特殊组件 -->
                    <!-- <easy-special
                      :desc="formItem"
                      :type="formItem.type"
                      v-if="isSpecialComponent(formItem.type)"
                      v-model="formData[field]"
                    />-->
                    <!-- 普通组件 -->
                    <!-- <easy-common
                      :desc="formItem"
                      v-else
                      :type="formItem.type"
                      v-model="formData[field]"
                    />-->
                  </slot>
                  <div
                    class="ele-form-tip"
                    v-if="formItem.tip"
                  >{{formItem.tip}}</div>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
          <!-- 操作按钮去 -->
          <el-form-item v-if="isShowSubmitBtn || isShowBackBtn">
            <el-button
              :loading="isLoading"
              native-type="submit"
              type="primary"
              v-if="isShowSubmitBtn"
            >{{submitBtnText}}</el-button>
            <el-button
              @click="goBack"
              v-if="isShowBackBtn"
            >{{backBtnText}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'EleForm',
  props: {
    // 表单描述
    formDesc: {
      type: Object,
      required: true
    },
    // 表单数据
    formData: {
      type: Object,
      required: true
    },
    // 校检规则
    rules: Object,
    // 提交状态
    isLoading: {
      type: Boolean,
      default: false
    },
    // 表单错误信息
    formError: Object,
    // 提交函数
    requestFn: Function,
    // 是否显示submit按钮
    isShowSubmitBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示back按钮
    isShowBackBtn: {
      type: Boolean,
      default: true
    },
    // 提交按钮文本
    submitBtnText: {
      type: String,
      default: '提交'
    },
    // 返回按钮
    backBtnText: {
      type: String,
      default: '返回'
    },
    // 标签位置
    labelPosition: String,
    // 不填则响应式, 填则固定
    span: Number
  },
  data () {
    return {
      // 是否正在请求中
      isSubmitting: false,
      // 表单标签位置
      formLabelPosition: 'right',
      // 表单宽度
      formSpan: this.span || 22
    }
  },
  methods: {
    // 验证表单
    handleValidateForm () {
      if (this.formRules) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.handleSubmitForm()
          } else {
            this.$message.error('表填填写错误, 请检查')
          }
        })
      } else {
        this.handleSubmitForm()
      }
    },

    // 提交表单
    async handleSubmitForm () {
      if (this.requestFn) {
        // 在内部请求
        if (this.isSubmitting) return
        this.isSubmitting = true
        try {
          const data = await this.requestFn(this.formData)
          this.$nextTick(() => {
            this.$emit('request-success', data)
          })
        } catch (formError) {
          this.formError = formError
          this.$emit('request-error')
        } finally {
          this.isSubmitting = false
          this.$emit('request-end')
        }
      } else {
        // 在外部请求
        if (this.isLoading) return
        this.$emit('request')
      }
    },

    // 返回按钮
    goBack () {
      this.$router.go(-1)
    },
    // 重置表单
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
.ele-form-tip {
  color: #909399;
  line-height: 2em;
  margin-top: 10px;
}
</style>
