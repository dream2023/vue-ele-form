<template>
  <el-transfer
    :class="desc.class"
    :data="options"
    :options="desc.options"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  ></el-transfer>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormTransfer',
  mixins: [formMixin]
}
</script>
