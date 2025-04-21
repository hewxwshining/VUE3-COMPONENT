import { createApp } from 'vue'
import App from './App.vue'

import FButton from '@fc/components/button'
import FCheckbox from '@fc/components/checkbox'
import FFormItem from '@fc/components/form'
import FIcon from '@fc/components/icon'
import FInput from '@fc/components/input'
import FTree from '@fc/components/tree'
import FTreeVirtualList from '@fc/components/tree-virtual-list'

import "@fc/themes-chalk/src/index.scss"

const plugins = [
  FIcon,
  FTree,
  FTreeVirtualList,
  FCheckbox,
  FButton,
  FInput,
  FFormItem
]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))//将组件设置成全局组件


app.mount('#app')
