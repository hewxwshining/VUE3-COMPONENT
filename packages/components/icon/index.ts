//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _Icon from './src/icon.vue';


const Icon = withInstall(_Icon)

export default Icon;

export * from './src/icon';

declare module "vue" {
  export interface GlobalComponents {
    FIcon: typeof Icon
  }
}

