<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input type="checkbox"
             v-model="model"
             ref="inputRef"
             :disabled="disabled"
             :value="label"
             @change="handleChange">
    </span>
    <span v-if="$slots.default || label"
          :calss="bem.e('label')">
      <slot>
        <template v-if="!$slots.default">{{ label }}</template>
      </slot>
    </span>
  </label>
</template>
<script lang="ts" setup>
import { createNamespace } from '@fc/utils/create'
import { computed, onMounted, ref, watch } from 'vue'
import { checkboxEmits, checkboxProps } from './checkbox'

defineOptions({
  name: 'FCheckbox',
  inheritAttrs: false
})

const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})

const inputRef = ref<HTMLInputElement>()
function handleIndeterminate(value: boolean) {
  console.log(props.indeterminate)
  console.log(inputRef)
  inputRef.value!.indeterminate = value
}
function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.checked ? true : false
  emit('change', value)
}

watch(() => props.indeterminate, handleIndeterminate)

onMounted(() => {
  handleIndeterminate(props.indeterminate)
})
</script>
