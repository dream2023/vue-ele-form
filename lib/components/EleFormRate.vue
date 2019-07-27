<template>
  <el-rate
    :class="desc.class"
    :style="desc.style"
    style="margin-top: 10px"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormRate',
  mixins: [formMixin],
  data () {
    return {
      type: 'Number'
    }
  }
}
</script>
