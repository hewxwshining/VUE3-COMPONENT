<template>
  <div :class="bem.b()">
    <div :class="bem.e('content')"
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
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from '@fc/utils/create'
import { computed } from 'vue'
import Loading from './icon/Loading.vue'
import Switcher from './icon/Switcher.vue'
import { treeNodeEmits, treeNodeProps } from './tree'
const bem = createNamespace('tree-node')
const { node, expanded, loadingKeysRef } = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

function handleExpand() {
  emit('toggle', node)
}

const isLoading = computed(() => {
  return loadingKeysRef.has(node.key)
})
</script>
