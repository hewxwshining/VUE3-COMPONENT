import { createNamespace } from "@fc/utils/create";
import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue";

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
  setup(props, { slots }) {
    const bem = createNamespace('vl')

    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()

    const state = reactive({
      start: 0,
      end: props.remain
    })

    const prev = computed(() => {
      return Math.min(state.start, props.remain)
    })
    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })
    // 这里应该多展示上8条和下8条，保证用户在滚动时不会留白
    const visibleData = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })

    const offset = ref(0)
    const handleScroll = () => {
      const scrollTop = wrapperRef.value!.scrollTop
      state.start = Math.floor(scrollTop / props.size)
      state.end = state.start + props.remain
      offset.value = state.start * props.size - props.size * prev.value
    }

    function initWrapper() {
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      barRef.value!.style.height = props.items.length * props.size + 'px'
    }
    watch(() => props.items, initWrapper)

    onMounted(() => {
      initWrapper()
    })
    return () => {
      return (<div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
        {/* 模拟总长度，看上去有很多数据 */}
        <div class={bem.e('scroll-bar')} ref={barRef}></div>
        {/* 更新列表从哪显示到那里，一直只展示 8 条数据 */}
        <div class={bem.e('scroll-list')} style={{ transform: `translate3d(0, ${offset.value}px, 0)` }}>{
          visibleData.value.map((node, idx) => {
            return slots.default!({ node })
          })
        }</div>
      </div>)
    }
  }
})
