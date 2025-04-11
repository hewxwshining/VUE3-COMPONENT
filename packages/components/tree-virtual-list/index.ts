//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _FTreeVirtualList from './src/tree.vue';


const FTreeVirtualList = withInstall(_FTreeVirtualList)

export default FTreeVirtualList;

export * from './src/tree.vue';

declare module "vue" {
  export interface GlobalComponents {
    FTreeVirtualList: typeof FTreeVirtualList
  }
}

