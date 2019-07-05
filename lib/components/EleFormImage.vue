<template>
  <ele-upload-image
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import EleUploadImage from 'vue-ele-upload-image/src/index'
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormImage',
  mixins: [formMixin],
  components: {
    EleUploadImage
  },
  data () {
    return {
      defaultAttrs: {
        size: 150
      }
    }
  }
}
</script>
