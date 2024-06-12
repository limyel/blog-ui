<template>
    <div class="grid grid-cols-2 h-screen">
        <!-- 左边栏 -->
        <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900">
            <div class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInLeft animate__fast">
                <h2 class="font-bold text-4xl mb-7 text-white">Blog 博客登录</h2>
                <p class="text-white">一个简单的博客系统。</p>
                <img src="@/assets/developer.png" class="w-1/2" />
            </div>
        </div>
        <!-- 右侧登录栏 -->
        <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
            <div class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast">
                <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
                <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
                    <!-- 横线 -->
                    <span class="h-[1px] w-16 bg-gray-200" />
                    <span>账号密码登录</span>
                    <span class="h-[1px] w-16 bg-gray-200" />
                </div>
                <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="form" >
                    <el-form-item prop="username">
                        <el-input v-model="form.username" size="large" placeholder="请输入用户名" :prefix-icon="User" clearable />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" size="large" placeholder="请输入密码" :prefix-icon="Lock" clearable type="password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onSubmit" :loading="loading" class="w-full" size="large" type="primary">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {login} from "@/api/admin/user.js";
import {useRouter} from "vue-router";
import {showMessage} from "@/composables/util.js";
import {setToken} from "@/composables/auth.js";

const router = useRouter()

const formRef = ref(null);
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      tigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      tigger: 'blur'
    }
  ]
}

// 登录按钮加载
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      console.log('表单验证不通过')
      return false
    }

    loading.value = true

    login(form.username, form.password).then(resp => {
      console.log(resp);
      if (resp.data.code === 'Success') {
        showMessage('登录成功')

        // 存储 Token
        let token = resp.data.data.token
        setToken(token)

        // 跳转到后台首页
        router.push("/admin/index")
      } else {
        let msg = resp.data.msg
        showMessage(msg, 'error')
      }
    }).finally(() => {
      loading.value = false
    })
  })
}

function onKeyUp(e) {
  if (e.key === 'Enter') {
    onSubmit()
  }
}

onMounted(() => {
  // 添加键盘监听
  document.addEventListener('keyup', onKeyUp)
})

onBeforeUnmount(() => {
  // 移除键盘监听
  document.removeEventListener('keyup', onKeyUp)
})

</script>