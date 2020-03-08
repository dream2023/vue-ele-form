declare module 'vue-ele-form' {
  import Vue, { PluginFunction, PluginObject } from 'vue';
  class EleForm implements PluginObject<{}> {
    [key: string]: any;
    public install: PluginFunction<{}>;
  }
  interface AnyObj {
    [key: string]: any;
    [key: number]: any;
  }

  // 任意函数
  interface AnyFunction {
    (...args: any[]): any;
  }

  interface LinkageFunction {
    (data: AnyObj): boolean;
  }

  // 格式化函数
  interface FormatterFunction {
    (val: any, data: AnyObj): any;
  }

  // options参数
  type ArrayOptions = Array<string | number | boolean | object>;
  type FunctionOptions = (
    data: AnyObj
  ) => ArrayOptions | Promise<any> | ArrayOptions;

  export interface FormDescData {
    type?: string | LinkageFunction;
    label?: string;
    default?: any;
    attrs?: AnyObj | LinkageFunction;
    title?: string;
    isShowLabel?: boolean;
    labelWidth?: string;
    isTypeChangeReloadValue?: boolean;
    layout?: number;
    tip?: string;
    vif?: boolean | LinkageFunction;
    disabled?: boolean | LinkageFunction;
    children?: FormDesc;
    isReloadOptions?: boolean;
    options?: ArrayOptions | FunctionOptions | PromiseConstructor;
    prop?: {
      text: string;
      value: string;
    };
    required?: boolean;
    rules?: AnyObj | any[];
    displayFormatter?: FormatterFunction;
    valueFormatter?: FormatterFunction;
    class?: string | string[] | object;
    style?: string | string[] | object;
    on?: {
      [key: string]: AnyFunction;
    };
    slots?: {
      [key: string]: AnyFunction;
    };
    scopedSlots?: {
      [key: string]: AnyFunction;
    };
  }

  export interface FormDesc {
    [key: string]: FormDescData;
  }

  const VuePlugin: EleForm;
  export default VuePlugin;
}
