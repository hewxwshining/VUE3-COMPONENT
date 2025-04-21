
//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _FormItem from './src/form-item.vue';


const FormItem = withInstall(_FormItem)

export default FormItem;

export * from './src/form-item.vue';

declare module "vue" {
  export interface GlobalComponents {
    FFormItem: typeof FormItem
  }
}

