<template>
  <el-autocomplete
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  >
    <template
      v-if="slots.default"
      v-slot:default="data"
    >
      <extend-slot
        :data="data"
        :render="slots.default"
      />
    </template>
    <template
      v-if="slots.prefix"
      v-slot:prefix
    >
      <extend-slot :render="slots.prefix" />
    </template>
    <template
      v-if="slots.suffix"
      v-slot:suffix
    >
      <extend-slot :render="slots.suffix" />
    </template>
    <template
      v-if="slots.append"
      v-slot:append
    >
      <extend-slot :render="slots.append" />
    </template>
    <template
      v-if="slots.append"
      v-slot:append
    >
      <extend-slot :render="slots.append" />
    </template>
  </el-autocomplete>
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormAutocomplete',
  mixins: [formMixin],
  data () {
    return {
      defaultAttrs: {
        placeholder: '请输入' + this.desc.label
      }
    }
  },
  computed: {
    slots () {
      return this.desc && this.desc.slots ? this.desc.slots : {}
    }
  }
}
</script>
