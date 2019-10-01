<template>
  <el-input
    :class="desc.class"
    :show-password="true"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <!-- 组件内部插槽 -->
    <template
      v-for="(render, key) of desc.slots"
      v-slot:[key]
    >
      <extend-slot
        :key="key"
        :render="render"
      />
    </template>
  </el-input>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormPassword',
  mixins: [formMixin],
  data () {
    return {
      type: ['Number', 'String']
    }
  },
  computed: {
    defaultAttrs () {
      return {
        fetchSuggestions (s, cb) {
          const res = []
          cb(res)
        },
        placeholder: this.t('ele-form.input') + this.desc.label
      }
    }
  }
}
</script>
