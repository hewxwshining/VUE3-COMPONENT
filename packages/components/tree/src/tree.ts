

import { ExtractPropTypes, PropType } from "vue"

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number,
  rawNode: TreeOption,
  children: TreeNode[],
  isLeaf: boolean,
}


export interface TreeOption {
  label?: Key,
  key?: Key,
  children?: TreeOption[],
  [key: string]: unknown //任意接口

}
export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: []
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: []
  },
  labelField: {
    type: String,
    default: 'label',
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>
  },
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
}

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    default: {},
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true
  },
  loadingKeysRef: {
    type: Object as PropType<Set<Key>>,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  }
} as const


export type treeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

export const treeEmits = {
  "update:selectedKeys": (keys: Key[]) => keys
}
