<template>
  <div :class="bem.b()">
    <f-tree-node v-for="node in flattenTree"
                 :key="node.key"
                 :node="node"
                 :expanded="isExpanded(node)"
                 :loadingKeysRef="loadingKeysRef"
                 @toggle="toggleExpand"
                 :selectedKeys='selectKeysRef'
                 @select="handleSelect"
                 :show-checkbox="showCheckbox"
                 :checked="isChecked(node)"
                 :disabled="isDisabled(node)"
                 :indeterminate="isIndeterminate(node)"
                 @check=toggleCheck></f-tree-node>
  </div>
</template>
<script setup lang="ts">
import { createNamespace } from '@fc/utils/create'
import { computed, onMounted, provide, ref, useSlots, watch } from 'vue'
import { Key, treeEmits, treeInjectKey, TreeNode, TreeOption, treeProps } from './tree'
import FTreeNode from './treeNode.vue'

defineOptions({
  name: 'f-tree',
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
        isLeaf: typeof node.isLeaf === 'boolean' ? node.isLeaf : children.length === 0,
        parentKey: parent?.key
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

const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys))
function isChecked(node: TreeNode) {
  return checkedKeysRefs.value.has(node.key)
}

function isDisabled(node: TreeNode) {
  return !!node.disabled
}

const indeterminateRefs = ref<Set<Key>>(new Set())
function isIndeterminate(node: TreeNode) {
  return indeterminateRefs.value.has(node.key)
}

function toggle(node: TreeNode, checked: boolean) {
  if (!node) return
  let checkedKeys = checkedKeysRefs.value
  if (checked) {
    // 选中的时候，去掉半选状态
    indeterminateRefs.value.delete(node.key)
  }
  // 维护当前的Key列表
  checkedKeys[checked ? 'add' : 'delete'](node.key)
  let children = node.children
  if (children) {
    children.forEach((childNode) => {
      if (!childNode.disabled) {
        toggle(childNode, checked)
      }
    })
  }
}

function findNode(key: Key) {
  return flattenTree.value.find((node) => node.key === key)
}
function updateCheckedKeys(node: TreeNode) {
  if (node.parentKey) {
    const parentNode = findNode(node.parentKey)
    if (parentNode) {
      let allChecked = true
      let hasChecked = false

      let nodes = parentNode.children
      for (const node of nodes) {
        if (checkedKeysRefs.value.has(node.key)) {
          hasChecked = true
        } else if (indeterminateRefs.value.has(node.key)) {
          allChecked = false
          hasChecked = true
        } else {
          allChecked = false
        }
      }
      if (allChecked) {
        checkedKeysRefs.value.add(parentNode.key)
        indeterminateRefs.value.delete(parentNode.key)
      } else if (hasChecked) {
        checkedKeysRefs.value.delete(parentNode.key)
        indeterminateRefs.value.add(parentNode.key)
      }

      updateCheckedKeys(parentNode)
    }
  }
}
function toggleCheck(node: TreeNode, checked: boolean) {
  toggle(node, checked)

  updateCheckedKeys(node)
}
onMounted(() => {
  console.log('checkedKeysRefs', checkedKeysRefs.value)
  checkedKeysRefs.value.forEach((key) => {
    console.log(key)
    toggleCheck(findNode(key)!, true)
  })
})
</script>
