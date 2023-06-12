<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form :ref="loginFormRef" class="login_form" :model="loginForm" :rules="rules">
          <h1 class="login_title">Welcome</h1>
          <el-form-item prop="username">
            <el-input size="large" :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="large" type="password" :prefix-icon="Lock" v-model="loginForm.password"
              show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="primary" class="login_btn" color="#eb7887" plain
              @click="submitForm(loginFormRef)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/modules/users'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

let $router = useRouter()

let userStore = useUserStore()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 10, message: '长度范围为4-10位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度范围为6-15位', trigger: 'blur' },
  ],
})
const handleLogin = async () => {
  try {
    await userStore.userLogin(loginForm)
    $router.push('./')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(formEl)

  if (!formEl) return
  console.log(2)
  await formEl.validate((valid, fields) => {
    console.log(3)

    if (valid) {
      handleLogin()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: #000;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_title {
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    padding-bottom: 30px;
  }

  .login_form {
    position: relative;
    width: 60%;
    top: 30vh;
    padding: 30px 60px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 10px #e4ddde33;
    background-color: rgba($color: #e7e078b2, $alpha: 0.4);
    background-size: cover;

    .login_btn {
      width: 100%;
    }
  }
}
</style>
