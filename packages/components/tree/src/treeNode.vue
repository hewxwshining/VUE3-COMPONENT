<template>
  <div :class="[bem.b(),bem.is('selected',isSelected),bem.is('disabled', node.disabled)]">
    <div :class="[bem.e('content')]"
         :style="{ paddingLeft: `${node.level * 16}px` }">
      <span :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node.isLeaf },
          bem.is('leaf', node.isLeaf),
        ]"
            @click="handleExpand">
        <f-icon color="#f00"
                size="24">
          <switcher v-if="!isLoading"></switcher>
          <loading v-else></loading>
        </f-icon>
      </span>
      <f-checkbox v-if="showCheckbox"
                  :disabled="disabled"
                  :model-value="checked"
                  :indeterminate="indeterminate"
                  @change="handleCheckChange"></f-checkbox>
      <span @click="handleSelected"
            :class="bem.e('label')">
        <f-tree-node-content :node="node"></f-tree-node-content>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FCheckbox from '@fc/components/checkbox'
import { createNamespace } from '@fc/utils/create'
import { computed } from 'vue'
import Loading from './icon/Loading.vue'
import Switcher from './icon/Switcher.vue'
import { treeNodeEmits, treeNodeProps } from './tree'
import FTreeNodeContent from './tree-node-content'
const bem = createNamespace('tree-node')
const { node, expanded, loadingKeysRef, selectedKeys } = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

function handleExpand() {
  emit('toggle', node)
}

const isLoading = computed(() => {
  return loadingKeysRef.has(node.key)
})

const isSelected = computed(() => {
  return selectedKeys.includes(node.key)
})

function handleSelected() {
  if (node.disabled) return
  emit('select', node)
}

function handleCheckChange(value: boolean) {
  emit('check', node, value)
}
</script>
