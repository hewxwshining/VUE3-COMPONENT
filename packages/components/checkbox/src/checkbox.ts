import { ExtractPropTypes, PropType } from "vue";


export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number, undefined] as PropType<boolean | string | number | undefined>
  },
  indeterminate: Boolean,
  disabled: Boolean,
  label: {
    type: String as PropType<string>
  }
} as const

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>

export const checkboxEmits = {
  'update:modelValue': (value: boolean | string | number | undefined) => {
    return typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number' || value === undefined;
  },
  change: (value: boolean) => typeof value === 'boolean'
}

export type CheckboxEmits = typeof checkboxEmits
