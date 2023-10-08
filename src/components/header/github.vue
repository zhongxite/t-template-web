<template>
  <div class="githubBox" @click="openUrl">
    <i class="ri-github-line"></i>
  </div>
</template>
<script setup>
const openUrl = () => {
  open("https://github.com/zhongxite");
};
</script>
<style scoped lang="scss">
.githubBox {
  border: 1px solid var(--el-menu-text-color);
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  margin-right: 10px;
  transition: 0.3s;
  i {
    transition: 0.3s;
    width: 100%;
    color: var(--el-menu-text-color);
  }
  &:hover {
    border-color: var(--com-head-Bgcolor);
    background-color: var(--com-head-Bgcolor);
    i {
      color: var(--com-head-color);
    }
  }
}
</style>
