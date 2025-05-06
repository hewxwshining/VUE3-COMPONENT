//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _Upload from './src/upload.vue';


const Upload = withInstall(_Upload)

export default Upload;


declare module "vue" {
  export interface GlobalComponents {
    FUpload: typeof Upload
  }
}

export * from './src/upload.vue';
