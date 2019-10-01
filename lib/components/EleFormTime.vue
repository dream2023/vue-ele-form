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

export default {
  name: 'EleFormTime',
  mixins: [formMixin],
  data () {
    return {
      type: ['String', 'Number', 'Date']
    }
  },
  computed: {
    defaultAttrs () {
      return {
        placeholder: this.t('ele-form.time')
      }
    }
  }
}
</script>
