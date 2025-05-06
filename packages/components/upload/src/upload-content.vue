<template>
  <div @click="handleClick"
       :class="[bem.b()]">
    <slot></slot>
    <input type="file"
           ref="inputRefs"
           :name="name"
           :accept="accept"
           :multiple="multiple"
           @change="handleChange">
  </div>

</template>
<script lang="ts" setup>
import { createNamespace } from '@fc/utils/create'
import { ref } from 'vue'
import { httpRequest } from './ajax'
import { genId, UploadRawFile } from './upload'
import { uploadContentProps } from './upload-content'

defineOptions({
  name: 'FUpload'
})
const bem = createNamespace('upload')

const props = defineProps(uploadContentProps)

const inputRefs = ref<HTMLInputElement>()

async function upload(rawfile: UploadRawFile) {
  console.log('contentProps = ', props)
  console.log('current rawfile =', rawfile)
  inputRefs.value!.value = ''
  let result = await props.beforeUpload(rawfile)
  console.log(result)
  if (result === false) return props.onRemove(rawfile)

  const { method, name, action, headers, data } = props
  httpRequest({
    method,
    name,
    file: rawfile,
    action,
    headers,
    data,
    onError: (e) => {
      props.onError(e, rawfile)
    },
    onsuccess: (res) => {
      props.onSuccess(res, rawfile)
    },
    onProgress: (e) => {
      props.onProgress(e)
    }
  })
}

const handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files!
  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i] as UploadRawFile
    rawFile.uid = genId()
    props.onStart(rawFile)
    upload(rawFile)
  }
}

const handleClick = () => {
  inputRefs.value!.value = ''
  inputRefs.value!.click()
}
</script>
