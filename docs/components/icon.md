# Icon 图标

fc-ui 推荐使用 xicons 作为图标库

```
$ pnpm install @vicons/ionicons5
```

## 使用图标

- 如何你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目里使用

<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5';
</script>

<f-icon :color="'#ff0'"
            :size="16">
<AddCircle></AddCircle>
</f-icon>
<f-icon :color="'#f00'"
            :size="16">
<AddCircle></AddCircle>
</f-icon>

```
<template>
  <div class="wrapper">
    <f-icon :color="'#f00'"
            :size="16">
      <AddCircle></AddCircle>
    </f-icon>
    <f-icon :color="'#ff0'"
            :size="16">
      <AddCircle></AddCircle>
    </f-icon>
  </div>

</template>
<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5';
</script>
```

## API

### Icon Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| color | string         | undefined | 图标颜色 |
| size  | number\|string | undefined | 图片大小 |
