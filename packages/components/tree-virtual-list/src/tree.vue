<template>
  <div :class="bem.b()">
    <f-virtual-list :items="flattenTree"
                    :remain="8"
                    :size='35'>
      <template #default="{node}">
        <f-tree-node :key="node.key"
                     :node="node"
                     :expanded="isExpanded(node)"
                     :loadingKeysRef="loadingKeysRef"
                     @toggle="toggleExpand"
                     :selectedKeys='selectKeysRef'
                     @select="handleSelect"></f-tree-node>
      </template>
    </f-virtual-list>
  </div>
</template>
<script setup lang="ts">
import FVirtualList from '@fc/components/virtual-list'
import { createNamespace } from '@fc/utils/create'
import { computed, provide, ref, useSlots, watch } from 'vue'
import { Key, treeEmits, treeInjectKey, TreeNode, TreeOption, treeProps } from './tree'
import FTreeNode from './treeNode.vue'
defineOptions({
  name: 'f-tree-virtual-list',
  inheritAttrs: false
})

const bem = createNamespace('tree')

const props = defineProps(treeProps)
//有了props要对用户的数据进行格式化，格式化一个固定的结果
//label、key、children
//将props.data 格式化后放入到tree中
const tree = ref<TreeNode[]>([])

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string
    },
    getLabel(node: TreeOption) {
      return node[label] as string
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[]
    }
  }
}
const treeOptions = createOptions(props.keyField, props.labelField, props.childrenField)

function createTree(data: TreeOption[], parent: TreeNode | null = null): any {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map((node) => {
      let children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], //默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        disabled: !!node.disabled,
        //判断节点是否自带isLeaf如果自带了 以自带的为准，如果没有自带的则看一下有没有children
        //对 ｜｜ 的增强操作
        isLeaf: typeof node.isLeaf === 'boolean' ? node.isLeaf : children.length === 0
      }
      //有children再去递归，将其格式化成treeNode 类型
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data, parent)
  return result
}

watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
  },
  { immediate: true }
)

//将一颗数据拍平、点击还能实现展示操作
//默认展开那些

//需要展开的 key 有哪些
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))
const flattenTree = computed(() => {
  let expandedKeys = expandedKeysSet.value

  //最终拍平的数据
  let flattenNodes: TreeNode[] = []

  const nodes = tree.value || [] //用户传递的格式化后的数据
  const stack: TreeNode[] = [] //用于遍历树的栈

  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }

  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(node.children[i])
        }
      }
    }
  }

  return flattenNodes
})

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}

//折叠功能
function collpase(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}
//展开功能
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
  //实现异步加载的数据
  triggerLoading(node)
}
//切换
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  // 如果当前这个节点正在加载，不允许收取
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}
//正在展开的key
const loadingKeysRef = ref(new Set<Key>())
function triggerLoading(node: TreeNode) {
  if (!node.children.length && !node.isLeaf) {
    // 如果没有加载这个节点，就加载这个节点
    const loadingKeys = loadingKeysRef.value
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key)
      const onLoad = props.onLoad
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          // 修改原来的节点
          node.rawNode.children = children
          //更新新的数据
          node.children = createTree(children, node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}

//实现选中节点
const emit = defineEmits(treeEmits)
const selectKeysRef = ref<Key[]>([])
watch(
  () => props.selectedKeys,
  (value) => {
    if (value) {
      selectKeysRef.value = value
    }
  },
  { immediate: true }
)

//处理选中的节点
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectKeysRef.value)
  if (!props.selectable) return
  if (props.multiple) {
    let index = keys.findIndex((key) => key === node.key)
    if (index > -1) {
      keys.splice(index)
    } else {
      keys.push(node.key)
    }
  } else {
    if (keys.includes(node.key)) {
      keys = []
    } else {
      keys = [node.key]
    }
  }

  emit('update:selectedKeys', keys)
}

provide(treeInjectKey, {
  slots: useSlots()
})
</script>
