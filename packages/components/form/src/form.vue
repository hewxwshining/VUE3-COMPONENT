<template>
  <form action=""
        :class="bem.b()">
    <slot></slot>
  </form>
</template>
<script lang="ts" setup>
import { createNamespace } from '@fc/utils/create'
import { Values } from 'async-validator'
import { provide } from 'vue'
import { FormContext, FormContextKey, formProps } from './form'
import { FormItemContext } from './form-item'
defineOptions({
  name: 'FForm',
  inheritAttrs: false
})
const bem = createNamespace('form')

const props = defineProps(formProps)

const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (context) => {
  fields.push(context)
  setTimeout(() => {
    console.log(fields)
  }, 1000)
}
const validate = async (callback?: (valid: boolean, fields?: Values) => void) => {
  let errors: Values = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (error) {
      console.log('ddddddddddd')
      console.dir(error)
      errors = {
        ...errors,
        ...(error as Values).fields
      }
    }
  }
  if (Object.keys(errors).length === 0) {
    return callback?.(true)
  } else {
    if (callback) {
      callback?.(false, errors)
    } else {
      return Promise.reject(errors)
    }
  }
}

defineExpose({
  validate
})

const context: FormContext = {
  ...props,
  addField
}
provide(FormContextKey, context)
</script>
