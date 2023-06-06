<template>
  <div class="content">
    <SvgIcon name="snow" color="pink"></SvgIcon>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { reqLogin } from './api/user'
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' })
})
</script>

<style scoped lang="scss">
.content {
  background: hotpink;
}
</style>
