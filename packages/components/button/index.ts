//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _Button from './src/button.vue';


const Button = withInstall(_Button)

export default Button;

export * from './src/button';

declare module "vue" {
  export interface GlobalComponents {
    FButton: typeof Button
  }
}

