<template>
  <el-autocomplete
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <!-- 作用域插槽 -->
    <template v-if="scopedSlots.default" v-slot:default="data">
      <extend-slot :data="data" :render="scopedSlots.default" />
    </template>

    <!-- 非作用域插槽 -->
    <template v-for="(render, key) of desc.slots" v-slot:[key]>
      <extend-slot :key="key" :render="render" />
    </template>
  </el-autocomplete>
</template>

<script>

import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormAutocomplete',
  mixins: [formMixin],
  data () {
    return {
      type: ['String'],
      mockRule: '@string'
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
    },
    slots () {
      return this.desc && this.desc.slots ? this.desc.slots : {}
    }
  }
}
</script>
