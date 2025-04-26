<template>
  <div :class="[bem.b()]">
    <div :class="[bem.b('group')]">
      <div v-if="slots.prepend"
           :class="[bem.be('group','prepend')]">
        <slot name="prepend"></slot>
      </div>
      <div :class="[bem.e('wrapper')]">
        <span v-if="slots.prefixIcon"
              :class="bem.e('prefix')">
          <slot name="prefixIcon"></slot>
        </span>
        <input :type="showPassword?(passwordVisible?'text':'password'):type"
               v-bind="attrs"
               :class="bem.e('inner')"
               ref='input'
               autocomplete="off"
               @input='handleInput'
               @change='handleChange'
               @blur='handleBlur'
               @focus="handleFocus"
               :placeholder="placeholder"
               :disabled="disabled"
               :readonly="readonly">
        <f-icon v-if="showClear"
                @click="handleClear"><span @click="handleClear"
                :class="[bem.e('showClear')]">c</span></f-icon>
        <f-icon v-if="showPwdVisible"
                :size="24"><span @click="handlePasswordVisible"
                :class="[bem.e('show_pwd')]">*</span></f-icon>

        <span v-if="slots.suffixIcon"
              :class="bem.e('suffix')">
          <slot name="suffixIcon"></slot>
        </span>

      </div>
      <div v-if="slots.append"
           :class="[bem.be('group', 'append')]">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { formItemContextKey } from '@fc/components/form/src/form-item'
import { createNamespace } from '@fc/utils/create'
import { computed, inject, nextTick, onMounted, ref, useAttrs, useSlots, watch } from 'vue'
import { inputEmits, inputProps } from './input'

const formItemContext = inject(formItemContextKey)

defineOptions({
  name: 'f-input',
  inheritAttrs: false
})

const bem = createNamespace('input')

const slots = useSlots()
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const attrs = useAttrs()

const input = ref<HTMLInputElement | null>(null)
const setNativeInputValue = () => {
  const inputEle = input.value
  if (!inputEle) {
    return
  }
  inputEle.value = String(props.modelValue)
}
watch(
  () => props.modelValue,
  () => {
    formItemContext?.validate('change').catch(() => {})
    setNativeInputValue()
  }
)
const focus = async () => {
  await nextTick()
  input.value?.focus()
}
const passwordVisible = ref(false)
const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  focus()
}

const showPwdVisible = computed(() => {
  return props.modelValue && props.showPassword && !props.disabled && !props.readonly
})

const showClear = computed(() => {
  return props.modelValue && props.clearable && !props.disabled && !props.readonly
})

const handleClear = () => {
  emit('input', '')
  emit('update:modelValue', '')
  emit('clear')
  focus()
}

onMounted(() => {
  nextTick(() => {
    setNativeInputValue()
  })
})

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:modelValue', value)
}

const handleChange = (e: Event) => {
  formItemContext?.validate('change').catch(() => {})
  emit('change', (e.target as HTMLInputElement).value)
}

const handleBlur = (e: Event) => {
  formItemContext?.validate('blur').catch(() => {})
  emit('blur', e as FocusEvent)
}

const handleFocus = (e: Event) => {
  formItemContext?.validate('focus').catch(() => {})
  emit('focus', e as FocusEvent)
}
</script>
