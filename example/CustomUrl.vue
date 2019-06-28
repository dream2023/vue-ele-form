<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    @input="handleChange"
    placeholder="请输入URL"
    v-bind="desc.attrs"
    v-model="newValue"
    v-on="desc.on"
  >
    <template slot="prepend">Http://</template>
    <template slot="append">.com</template>
  </el-input>
</template>

<script>
import formMixin from '../lib/mixins/formMixin'
export default {
  name: 'custom-url', // name 属性必须填写, 在使用时, 需要和这里定义的 name 一致
  mixins: [formMixin] // 其实 mixin 做事很简单, 可以参考下面图片
}
</script>
