//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _Checkbox from './src/checkbox.vue';


const Checkbox = withInstall(_Checkbox)

export default Checkbox;

export * from './src/checkbox.vue';

declare module "vue" {
  export interface GlobalComponents {
    FCheckbox: typeof Checkbox
  }
}

