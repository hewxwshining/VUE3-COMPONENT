<template>
  <div class="wrapper">
    <f-icon :color="'#f00'"
            :size="16">
      <AddCircle></AddCircle>
    </f-icon>
    <f-icon :color="'#ff0'"
            :size="16">
      <AddCircle></AddCircle>
    </f-icon>
    <f-tree :data="data"
            label-field="label"
            key-field="key"
            children-field="children"
            :default-expanded-keys="[]"
            :on-load='handleLoad'
            v-model:selectedKeys="value"
            selectable
            multiple
            :show-checkbox="true"
            :default-checked-keys="['40']">
      <template #default="scope">
        {{ scope.node.key }}-{{ scope.node.label }} 44
      </template>

      <template #one="scope">
        5 {{ scope.node.key }}-{{ scope.node.label }} 66
      </template>
    </f-tree>
    <!-- selectable 表示可以选择节点， multiple表示可以选择多个节点 -->
  </div>
  {{ check }}
  <F-checkbox v-model="check"
              :disabled="false"
              :indeterminate="true"
              label='测试'
              @change="handleChange"></F-checkbox>

  <f-button type="primary"
            @click="handleClick"
            iconPlacement="right">
    <template #icon>
      <f-icon :size="16">
        <AddCircle></AddCircle>
      </f-icon>
    </template>
    button
  </f-button>
  <br />
  <f-input>
    <template #prepend>珠峰</template>
    <template #prefixIcon>
      <f-icon :size="16">
        <AddCircle></AddCircle>
      </f-icon>
    </template>
    <template #subfixIcon>
      <f-icon :size="16">
        <AddCircle></AddCircle>
      </f-icon>
    </template>
    <template #append>珠峰</template>
</f-input>
</template>
<script setup lang="ts">
import type { Key, TreeOption } from '@fc/components/tree/src/tree'
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'

function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
      disabled: key === '4130' ? true : false
    }
  })
}

function createLabel(level: number): string {
  if (level == 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false //false,代表点击的时候动态加载子节点
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false //false,代表点击的时候动态加载子节点
//     }
//   ]
// }

function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  if (currentLabel === '三生万物') return '道生一'
  return ''
}

const data = ref(createData())
const data1 = ref<TreeOption[]>([
  {
    key: '0',
    label: '0',
    children: [
      {
        key: '0-0',
        label: '0-0'
      },
      {
        disabled: true,
        key: '0-1',
        label: '0-1',
        children: [
          {
            key: '0-1-0',
            label: '0-1-0'
          },
          {
            key: '0-1-1',
            label: '0-1-1'
          }
        ]
      }
    ]
  }
])

console.log(data)

const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}

const value = ref<Key[]>(['40'])

const check = ref(false)
function handleChange(value: boolean) {
  console.log(value)
}

function handleClick(e: MouseEvent) {
  console.log(e)
}
</script>

<style scoped></style>
