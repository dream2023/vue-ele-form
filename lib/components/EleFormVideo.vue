<template>
  <ele-upload-video
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import EleUploadVideo from 'vue-ele-upload-video'
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormVideo',
  mixins: [formMixin],
  components: {
    EleUploadVideo
  }
}
</script>
