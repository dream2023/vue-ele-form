<template>
  <rich-text
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import RichText from '../packages/RichText'
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormRichText',
  mixins: [formMixin],
  components: { RichText }
}
</script>
