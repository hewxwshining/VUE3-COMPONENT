


<template>
  <br />
  {{ useName }}
  <br />
  <f-input v-model="useName"
           @blur="handleBlur"
           @focus="handleFocus"
           @clear="handleClear"
           placeholder="请输入112233"
           :show-password="true"
           :clearable="true">
    <template #prepend>珠峰</template>
    <template #prefixIcon>
      <f-icon :size="16">
        <AddCircle></AddCircle>
      </f-icon>
    </template>
    <template #suffixIcon>
      <f-icon :size="16">
        <AddCircle></AddCircle>
      </f-icon>
    </template>
    <template #append>珠峰</template>
  </f-input>
</template>
<script lang="ts" setup>
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'
defineOptions({
  name: 'inputDiv',
  inheritAttrs: false
})

const useName = ref('gdfgfdgdf')
const handleBlur = (e: Event) => {
  console.log('dfd')
  console.log(e)
}

const handleFocus = (e: Event) => {
  console.log('fdf')
  console.log(e)
}

const handleClear = () => {
  console.log('Clear')
}
</script>
