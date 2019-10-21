<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <template v-for="(render, key) of desc.slots" v-slot:[key]>
      <extend-slot
        :data="{
          options: desc.options
        }"
        :key="key"
        :render="render"
      />
    </template>
    <el-option
      :key="option.value"
      :label="option.text"
      :value="option.value"
      v-bind="option.attrs"
      v-for="option in options"
    ></el-option>
  </el-select>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormSelect',
  mixins: [formMixin],
  data () {
    return {
      mockRule: 'radio',
      type: ['Boolean', 'Number', 'String', 'Array']
    }
  },
  computed: {
    defaultAttrs () {
      return {
        placeholder: this.t('ele-form.select') + this.desc.label
      }
    }
  }
}
</script>
