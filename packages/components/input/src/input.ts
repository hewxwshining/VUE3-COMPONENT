
// eslint-disable-next-line vue/prefer-import-from-vue
import { isString } from '@vue/shared';
import { ExtractPropTypes, PropType } from "vue";

//定义属性
export const inputProps = {
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [Number, String] as PropType<string | number>,
    default: ''
  },
  placeholder: {
    type: String
  },
  clearable: {
    type: Boolean
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  }
}

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string | number) => isString(value) || typeof value === 'number',
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  clear: () => true  //清空事件
}

export type InputEmits = typeof inputEmits
