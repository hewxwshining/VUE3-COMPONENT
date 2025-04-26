

<template>
  <f-form ref="formRef"
          :model="state"
          :rules="{
      userName:  {
        min: 6, max: 10,
        message:'用户名6-10位',
        trigger:['change', 'blur']
        }
    }">
    <f-form-item prop="userName"
                 label="用户名"
                 :rules="[{required:true,message:'请输入用户名',trigger:'blur'}]">
      <f-input placeholder="请输入用户名"
               :clearable="true"
               v-model="state.userName"></f-input>
    </f-form-item>
    <f-form-item prop='password'
                 label="密码"
                 :rules="[{required:true,message:'请输入密码',trigger:'blur'}]">
      <f-input placeholder="请输入密码"
               :show-password="true"
               :clearable="true"
               v-model="state.password"></f-input>
    </f-form-item>
    <f-button size="medium"
              type="primary"
              :round="true"
              @click="validateForm">
      提交</f-button>
  </f-form>

</template>
<script lang="ts" setup>
import type { FormInstance } from '@fc/components/form'
import { reactive, ref } from 'vue'
defineOptions({
  name: 'FormDiv',
  inheritAttrs: false
})

const state = reactive({ userName: '', password: '' })
const formRef = ref<FormInstance>()
const validateForm = () => {
  const form = formRef.value
  form?.validate((valid, errors) => {
    console.log(valid, errors)
  })
}
</script>
