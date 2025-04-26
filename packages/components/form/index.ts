
//用来整合组件，最终实现导出组件

import { withInstall } from '@fc/utils/with-install';
import _FormItem from './src/form-item.vue';
import _Form from './src/form.vue';

const FormItem = withInstall(_FormItem)
const Form = withInstall(_Form)

export { Form, FormItem };

export default {}

export * from './src/form-item.vue';
export * from './src/form.vue';

export type { FormProps } from './src/form';
export type { FormItemProps } from './src/form-item';

export type FormInstance = InstanceType<typeof Form>

declare module "vue" {
  export interface GlobalComponents {
    FFormItem: typeof FormItem,
    FForm: typeof Form
  }
}

