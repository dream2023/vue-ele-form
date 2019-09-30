<template>
  <div
    class="ele-form-image"
    v-if="Array.isArray(newValue)"
  >
    <el-image
      :class="desc.class"
      :key="image"
      :preview-src-list="attrs.isShowPreview === false ? null : previewList(image)"
      :src="image"
      :style="styles"
      v-bind="attrs"
      v-for="image of newValue"
      v-on="onEvents"
    ></el-image>
  </div>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormImage',
  mixins: [formMixin],
  data () {
    return {
      type: ['Array', 'String'],
      defaultStyle: {
        width: '150px',
        height: '150px'
      },
      defaultAttrs: {
        fit: 'cover'
      }
    }
  },
  computed: {
    styles () {
      return Object.assign({}, this.defaultStyle, this.desc.style)
    }
  },
  methods: {
    previewList (image) {
      if (Array.isArray(this.newValue)) {
        const list = this.newValue.filter(item => item !== image)
        list.unshift(image)
        return list
      } else {
        return []
      }
    },
    customInit (val) {
      if (typeof val === 'string') {
        val = [val]
      }
      return val
    }
  }
}
</script>

<style>
.ele-form-image {
  line-height: 1em;
}

.ele-form-image .el-image {
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
