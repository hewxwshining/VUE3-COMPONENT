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
        <input :type="type"
               v-bind="attrs"
               :class="bem.e('inner')">
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
import { createNamespace } from '@fc/utils/create'
import { useAttrs, useSlots } from 'vue'
import { inputProps } from './input'

defineOptions({
  name: 'f-input',
  inheritAttrs: false
})

const slots = useSlots()
defineProps(inputProps)
const attrs = useAttrs()

const bem = createNamespace('input')
</script>
