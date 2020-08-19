<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    :remote-method="changeOptions"
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
  inject: ['EleForm'],
  props: {
    field: String
  },
  data() {
    return {
      mockRule: 'radio',
      type: ['Boolean', 'Number', 'String', 'Array']
    }
  },
  computed: {
    remoteMethod() {
      return this.attrs['remote-method'] || this.attrs.remoteMethod
    },
    defaultAttrs() {
      return {
        placeholder: this.t('ele-form.select') + this.desc._label
      }
    }
  },
  methods: {
    changeOptions(q) {
      if (this.remoteMethod) {
        this.remoteMethod(q, options => {
          this.EleForm.changeOptions(options, this.desc.prop, this.field)
        })
      }
    }
  }
}
</script>
