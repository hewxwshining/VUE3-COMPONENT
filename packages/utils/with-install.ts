

import { App, Plugin } from "vue"

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T extends { name?: string }>(comp: T): SFCWithInstall<T> {
  if (!comp.name) {
    console.warn("组件缺少 name 属性，无法注册为全局组件")
    throw new Error("组件必须包含 name 属性")
  }

  const componentWithInstall = comp as SFCWithInstall<T>
  componentWithInstall.install = (app: App): void => {
    app.component(comp.name!, comp) // 注册全局组件
  }

  return componentWithInstall
}