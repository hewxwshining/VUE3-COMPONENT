<template>
  <i :class='bem.b()'
     :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { createNamespace } from '@fc/utils/create'
import { iconProps } from './icon'

defineOptions({
  name: 'f-icon',
  inheritAttrs: false
})

const bem = createNamespace('icon')

const props = defineProps(iconProps)

//计算属性，来计算一个样式处理
const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>