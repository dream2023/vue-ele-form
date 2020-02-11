declare module 'vue-ele-form' {
  import Vue, { PluginFunction, PluginObject } from 'vue';
  class EleForm implements PluginObject<{}> {
    [key: string]: any;
    public install: PluginFunction<{}>;
  }

  const VuePlugin: EleForm;

  export default VuePlugin;
}
