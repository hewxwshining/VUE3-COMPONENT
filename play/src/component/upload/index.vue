<template>
  <f-upload multiple
            :before-upload="handleBeforeUpload"
            action="http://localhost:4000/upload">
    <f-button>点我上传</f-button>
  </f-upload>
</template>
<script lang="ts" setup>
import type { UploadRawFile } from '@fc/components/upload/src/upload'

defineOptions({
  name: 'UploadDiv'
})

const handleBeforeUpload = (rawFile: UploadRawFile) => {
  console.log('this is app =', rawFile)
  return true
}
</script>
