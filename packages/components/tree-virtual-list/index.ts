//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _Tree from './src/tree.vue';


const Tree = withInstall(_Tree)

export default Tree;

export * from './src/tree.vue';

declare module "vue" {
  export interface GlobalComponents {
    FTreeVirtualList: typeof Tree
  }
}

