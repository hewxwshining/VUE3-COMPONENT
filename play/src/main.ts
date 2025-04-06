import { createApp } from 'vue'
import App from './App.vue'

import FIcon from '@fc/components/icon'
import FTree from '@fc/components/tree'

import "@fc/themes-chalk/src/index.scss"

const plugins = [
  FIcon,
  FTree
]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))//将组件设置成全局组件


app.mount('#app')
