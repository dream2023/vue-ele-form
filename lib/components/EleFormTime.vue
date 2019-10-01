<template>
  <el-time-select
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
import { t } from '../locale'

export default {
  name: 'EleFormTime',
  mixins: [formMixin],
  data () {
    return {
      type: ['String', 'Number', 'Date'],
      defaultAttrs: {
        placeholder: t('ele-form.time')
      }
    }
  }
}
</script>
