<template>
  <div>
    <el-card shadow="never">
      <el-form ref="formRef" :model="form" label-width="160px" :rules="rules">
        <el-form-item label="博客名称" prop="name">
          <el-input v-model="form.name" clearable />
        </el-form-item>
        <el-form-item label="关于" prop="about">
          <el-input v-model="form.about" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getSetting, updateSetting} from "@/api/admin/setting.js";
import {showMessage} from "@/composables/util.js";

const form = ref({
  name: '',
  about: ''
})
const formRef = ref(null)

const btnLoading = ref(false)

const rules = {
  name: [
      {
        required: true,
        message: '请输入博客名称',
        trigger: 'blur'
      }
  ],
  about: [
    {
      required: true,
      message: '请输入关于',
      trigger: 'blur'
    }
  ]
}

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }

    btnLoading.value = true
    updateSetting(form.value).then(resp => {
      if (resp.code === 'Success') {
        showMessage('更新成功')
        initSetting()
      } else {
        showMessage(resp.msg, 'error')
      }
    }).finally(() => {
      btnLoading.value = false
    })
  })
}


function initSetting() {
  getSetting().then(resp => {
    if (resp.code === 'Success') {
      form.value = resp.data
    }
  })
}
initSetting()
</script>

<style>
/* 解决 textarea :focus 状态下，边框消失的问题 */
.el-textarea__inner:focus {
  outline: 0 !important;
  box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
}
</style>