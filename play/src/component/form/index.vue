

<template>
  <f-form :model="state"
          :rules="[{
    userName:  {min: 6, max: 10, message:'用户名6-10位',trigger:['change', 'blur']}
  }]">
    <f-form-item prop="userName"
                 label="用户名"
                 :rules="[{required:true,message:'请输入用户名',trigger:'blur'}]">
      <f-input placeholder="请输入用户名"
               :clearable="true"
               v-model="state.useName"></f-input>
    </f-form-item>
    <f-form-item prop='password'
                 label="密码">
      <f-input placeholder="请输入密码"
               :show-password="true"
               :clearable="true"
               v-model="state.password"></f-input>
    </f-form-item>
    <f-button size="medium"
              type="primary"
              :round="true">
      提交</f-button>
  </f-form>

</template>
<script lang="ts" setup>
import { reactive } from 'vue';
defineOptions({
  name: 'FormDiv',
  inheritAttrs: false
})

const state = reactive({ useName: '', password: '' })
</script>
