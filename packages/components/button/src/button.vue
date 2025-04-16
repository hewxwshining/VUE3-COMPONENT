<template>
  <button :class="[bem.b(),bem.m(type),bem.m(size), bem.is('round',round),bem.is('loading',loading), bem.is('disabled', disabled)]"
          :type="nativeType"
          :disabled="disabled ||loading"
          @click="emitClick">
    <template v-if="iconPlacement === 'left' ">

      <f-icon>
        <loading v-if="loading"></loading>
        <template v-else-if="slots.icon">
          <Component :is="slots.icon"></Component>
        </template>
      </f-icon>
    </template>

    <slot></slot>
    <template v-if="iconPlacement === 'right' ">
      <f-icon>
        <loading v-if="loading"></loading>
        <template v-else-if="slots.icon">
          <Component :is="slots.icon"></Component>
        </template>
      </f-icon>
    </template>
  </button>
</template>
<script lang="ts" setup>
import Loading from '@fc/components/internal-icon/Loading.vue'
import { createNamespace } from '@fc/utils/create'
import { useSlots } from 'vue'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'FButton',
  inheritAttrs: false
})

const bem = createNamespace('button')
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const slots = useSlots()

function emitClick(e: MouseEvent) {
  emit('click', e)
}
</script>
