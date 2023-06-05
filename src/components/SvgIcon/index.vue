<template>
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  // 属性前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  // 图标名称
  name: String,
  // 填充颜色
  color: {
    type: String,
    default: 'black'
  },
  width: {
    type: String,
    defalut: '16px'
  },
  height: {
    type: String,
    defalut: '16px'
  }
})
</script>