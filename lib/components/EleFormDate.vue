<template>
  <el-date-picker
    :class="desc.class"
    :style="desc.style"
    placeholder="选择日期"
    type="date"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormDate',
  mixins: [formMixin],
  methods: {

  }
}
</script>
