//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _Input from './src/input.vue';


const Input = withInstall(_Input)

export default Input;

export * from './src/input.vue';

declare module "vue" {
  export interface GlobalComponents {
    FInput: typeof Input
  }
}

