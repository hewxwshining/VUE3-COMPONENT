//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _Virtual from './src/virtual.vue';


const Virtual = withInstall(_Virtual)

export default Virtual;

export * from './src/virtual.vue';

declare module "vue" {
  export interface GlobalComponents {
    FVirtualList: typeof Virtual
  }
}

