<template>
  <el-button
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="desc.on"
  >{{desc.title}}</el-button>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormButton',
  mixins: [formMixin]
}
</script>
