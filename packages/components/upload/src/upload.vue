<template>
  <UploadContent v-bind="uploadContentProps">
    <slot></slot>
  </UploadContent>

</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { uploadProps } from './upload'
import { UploadContentProps } from './upload-content'
import UploadContent from './upload-content.vue'
defineOptions({
  name: 'FUpload'
})

const props = defineProps(uploadProps)

const uploadContentProps = computed<UploadContentProps>(() => ({
  ...props,
  onStart: (rawFile) => {
    console.log('onStart', rawFile)
  },
  onProgress: (e) => {
    console.log('onProgress', e)
  },
  onSuccess: (rawFile) => {
    console.log('onSuccess', rawFile)
  },
  onError: (err) => {
    console.log('onError', err)
  },
  onRemove: (res) => {
    console.log('onRemove', res)
  }
}))
</script>
