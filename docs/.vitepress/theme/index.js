import DefaultTheme from 'vitepress/theme'


import FIcon from "@fc/components/icon"
import '@fc/themes-chalk/src/index.scss'
export default {
  ...DefaultTheme,
  enhanceApp({app}){
    app.use(FIcon)  //在vitepress中注册全局组件
  }
}