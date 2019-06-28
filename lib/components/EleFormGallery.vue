<template>
  <ele-gallery
    :class="desc.class"
    :source="newValue"
    :style="desc.style"
    v-bind="attrs"
    v-on="desc.on"
  />
</template>

<script>
import EleGallery from 'vue-ele-gallery'
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormGallery',
  mixins: [formMixin],
  components: {
    EleGallery
  },
  data () {
    return {
      defaultAttrs: {
        title: this.desc.label
      }
    }
  }
}
</script>
