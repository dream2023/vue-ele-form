<template>
  <el-button
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="desc.on"
  >
    {{desc.title || newValue}}
    <template
      v-if="desc.slots && desc.slots.default"
      v-slot:default
    >
      <extend-slot :render="desc.slots.default" />
    </template>
  </el-button>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormButton',
  mixins: [formMixin],
  data () {
    return {
      mockRule: false
    }
  }
}
</script>
