import { defineComponent, inject } from "vue";
import { treeInjectKey, treeNodeContentProps } from "./tree";

export default defineComponent({
  name: 'FTreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey)
    console.log(treeContext)
    const { node } = props
    return () => {
      if (node?.key != 1) {
        return treeContext?.slots.default ? treeContext?.slots.default({ node }) : node?.label
      } else {
        return treeContext?.slots.one ? treeContext?.slots.one({ node }) : node?.label
      }
    }
  }
})
