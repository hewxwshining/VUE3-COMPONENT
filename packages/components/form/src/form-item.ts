import type { RuleItem } from 'async-validator';
import { ExtractPropTypes, InjectionKey, PropType } from 'vue';

export type ArrayAble<T> = T | T[]

export interface FormItemRule extends RuleItem {
  trigger?: string | string[]
}

export const formItemValidateState = ['success', 'error', ''] as const

export type FormItemValidateState = typeof formItemValidateState[number]

export const formItemProps = {
  prop: String,
  label: String,
  rules: [Object, Array] as PropType<ArrayAble<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true
  }
}

export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>

export interface FormItemContext extends FormItemProps {
  validate: (trigger: string, callback?: (isValid: boolean) => void) => Promise<void>
}

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('')
