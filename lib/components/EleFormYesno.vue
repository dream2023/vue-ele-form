<template>
  <el-checkbox
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    {{desc.title}}
    <template
      v-if="desc.slots && desc.slots.default"
      v-slot:default
    >
      <extend-slot :render="desc.slots.default" />
    </template>
  </el-checkbox>
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormYesno',
  mixins: [formMixin],
  data () {
    return {
      type: ['Boolean', 'String', 'Number']
    }
  },
  methods: {
    customInit (val) {
      return Boolean(val)
    }
  }
}
</script>
