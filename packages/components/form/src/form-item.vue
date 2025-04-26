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
import AsyncValidator, { Values } from 'async-validator'
import { computed, inject, onMounted, provide, reactive, ref, toRefs } from 'vue'
import { FormContext, FormContextKey } from './form'
import { ArrayAble, FormItemContext, formItemContextKey, formItemProps, FormItemRule, FormItemValidateState } from './form-item'

defineOptions({
  name: 'FFormItem',
  inheritAttrs: false
})

const formContext = inject<FormContext>(FormContextKey)
console.log(formContext)

const props = defineProps(formItemProps)

const bem = createNamespace('form-item')

const validateState = ref<FormItemValidateState>('')

const validateMessage = ref('')

const converArray = (rules: ArrayAble<FormItemRule> | undefined): FormItemRule[] => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}

const _rules = computed(() => {
  const myRules = converArray(props.rules)
  const formRules = formContext?.rules
  if (formRules && props.prop) {
    const _temp = formRules[props.prop]
    if (_temp) {
      myRules.push(...converArray(_temp))
    }
  }
  return myRules
})

const getRuleFiltered = (trigger: string) => {
  const rules = _rules.value
  return rules.filter((rule: FormItemRule) => {
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}
const onValidationSuccess = () => {
  validateState.value = 'success'
  validateMessage.value = ''
}
const onValidationFailed = (error: Values) => {
  validateState.value = 'error'
  const { errors } = error
  validateMessage.value = errors ? errors[0].message : ''
}

const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  const rules = getRuleFiltered(trigger)
  const modeName = props.prop!
  const validator = new AsyncValidator({
    [modeName]: rules
  })
  const model = formContext?.model || {}
  return validator
    .validate({
      [modeName]: model[modeName]
    })
    .then(() => {
      onValidationSuccess()
    })
    .catch((err: Values) => {
      onValidationFailed(err)
      return Promise.reject(err)
    })
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate
})
provide(formItemContextKey, context)

onMounted(() => {
  formContext?.addField(context)
})
</script>
