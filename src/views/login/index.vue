<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1 class="login_title">Welcome</h1>
          <el-form-item>
            <el-input size="large" :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="large" type="password" :prefix-icon="Lock" v-model="loginForm.password"
              show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="primary" class="login_btn" color="#eb7887" plain
              @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { useUserStore } from '@/store/modules/users'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

let $router = useRouter()

let userStore = useUserStore()

let loginForm = reactive({
  username: 'admin',
  password: '111111',
})

const handleLogin = async () => {
  try {
    await userStore.userLogin(loginForm)
    $router.push('./')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}



</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: #000;
  background: url("@/assets/images/background.jpg") no-repeat;
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
    background-color: rgba($color: #eb78875d, $alpha: 0.7);
    background-size: cover;

    .login_btn {
      width: 100%;
    }
  }
}
</style>
