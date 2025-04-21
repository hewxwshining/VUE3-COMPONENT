<template>
  <div :class="[bem.b(), bem.is('success', validateState=='success'),bem.is('error', validateState=='error')]">
    <label :class="[bem.e('label')]">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="[bem.e('content')]">
      <slot></slot>
      <div :class="bem.e('error')">
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from '@fc/utils/create'
import { computed, provide, reactive, ref, toRefs } from 'vue'
import { FormItemContext, formItemContextKey, formItemProps, FormItemRule, FormItemValidateState } from './form-item'

defineOptions({
  name: 'FFormItem',
  inheritAttrs: false
})

const props = defineProps(formItemProps)

const bem = createNamespace('form-item')

const validateState = ref<FormItemValidateState>('')

const validateMessage = ref('校验失败')

const _rules = computed(() => {
  const rules: FormItemRule[] = props.rules ? (Array.isArray(props.rules) ? props.rules : [props.rules]) : []
  return rules
})

const getRuleFiltered = (trigger: string) => {
  console.log(_rules)
  const rules = _rules.value
  return rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}
const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  const rules = getRuleFiltered(trigger)

  console.log('trigger', trigger, rules)
  console.log('callback', callback)
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate
})

provide(formItemContextKey, context)
</script>
