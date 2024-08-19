<template>
  <!-- 根据菜单的宽度动态计算宽度 -->
  <div class="fixed z-10 bg-white h-[64px] flex pr-4 border-b border-slate-100"
       :style="{width: `calc(100vw - ${menuStore.menuWidth})`}">
    <!-- 左边栏收缩、展开 -->
    <!-- 套一层 div，避免 Element Plus 内部样式覆盖 Tailwind -->
    <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
         @click="handleMenuWidth">
      <el-icon>
        <Fold v-if="menuStore.menuWidth === '250px'"/>
        <Expand v-else/>
      </el-icon>
    </div>

    <div class="ml-auto flex">
      <!-- 点击刷新页面 -->
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
             @click="handleRefresh">
          <el-icon>
            <Refresh/>
          </el-icon>
        </div>
      </el-tooltip>

      <!-- 点击跳转前台首页 -->
      <el-tooltip class="box-item" effect="dark" content="跳转前台" placement="bottom">
        <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
             @click="router.push('/')">
          <el-icon>
            <Monitor />
          </el-icon>
        </div>
      </el-tooltip>

      <!-- 全屏展示 -->
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom" auto-close="2000">
        <div
            class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200"
            @click="toggle">
          <el-icon>
            <FullScreen v-if="!isFullscreen"/>
            <Aim v-else/>
          </el-icon>
        </div>
      </el-tooltip>

      <!-- 登录用户头像 -->
      <el-dropdown class="flex items-center justify-center" @command="handleCommand">
        <span class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs">
          <el-avatar class="mr-2" :size="25"
                     src="https://img.quanxiaoha.com/quanxiaoha/f97361c0429d4bb1bc276ab835843065.jpg"/>
          {{ userStore.userInfo.username }}
          <el-icon class="el-icon--right">
              <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>


  <!-- 修改密码 -->
  <el-dialog v-model="dialogVisible" title="修改密码" width="40%" :draggable="true" :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="用户名" prop="username" label-width="120px">
        <el-input size="large" v-model="form.username" placeholder="请输入用户名" clearable disabled/>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="120px">
        <el-input size="large" type="password" v-model="form.password" placeholder="请输入密码"
                  clearable show-password/>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" label-width="120px">
        <el-input size="large" type="password" v-model="form.rePassword" placeholder="请确认密码"
                  clearable show-password/>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">
                    提交
                </el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {useMenuStore} from "@/stores/menu.js";
import {useFullscreen} from "@vueuse/core";
import {useUserStore} from "@/stores/user.js";
import {showMessage, showModel} from "@/composables/util.js";
import router from "@/router/index.js";
import {ref, computed} from "vue";
import {updatePassword} from "@/api/admin/user.js";

const menuStore = useMenuStore()
const userStore = useUserStore()

// 处理菜单收缩、展开
const handleMenuWidth = () => {
  menuStore.handleMenuWidth()
}

const handleRefresh = () => location.reload()

// 全屏
const {isFullscreen, toggle} = useFullscreen()

// 下拉菜单事件处理
const dialogVisible = ref(false)
const handleCommand = command => {
  if (command === 'updatePassword') {
    dialogVisible.value = true
  } else if (command === 'logout') {
    logout()
  }
}

function logout() {
  showModel('是否确认退出登录？').then(() => {
    userStore.logout()
    showMessage('退出登录成功！')
    router.push('/login')
  })
}

const formRef = ref(null)
// todo
const username = computed(() => userStore.userInfo.username)
const form = ref({
  username: username,
  password: '',
  rePassword: ''
})
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
      trigger: 'blur',
    },
  ],
  rePassword: [
    {
      required: true,
      message: '确认密码不能为空',
      trigger: 'blur',
    },
  ]
}
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    if (form.value.password !== form.value.rePassword) {
      showMessage('两次密码不一致！')
    }

    updatePassword(form.value).then(resp => {
      if (resp.code === 0) {
        showMessage('密码重置成功，请重新登录！')
        userStore.logout()
        dialogVisible.value = false
        router.push('/login')
      } else {
        let msg = resp.msg
        showMessage(msg, 'error')
      }
    })
  })
}
</script>