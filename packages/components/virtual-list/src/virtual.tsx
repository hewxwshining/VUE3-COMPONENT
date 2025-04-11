import { createNamespace } from "@fc/utils/create";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'FVirtualList',
  props: {
    size: {
      type: Number,
      default: 35
    },
    remain: {
      type: Number,
      default: 10 // 修复 props 定义错误
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const bem = createNamespace('vl')
    return () => {
      return (<div class={bem.b()}>Virtual List</div>)
    }
  }
})