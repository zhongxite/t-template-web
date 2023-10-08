<template>
  <div class="darkBox" @click="changeDrakValue">
    <i :class="drakValue == 'n' ? 'ri-sun-line' : 'ri-moon-fill'"></i>
  </div>
</template>
<script setup>
const drakValue = ref(localStorage.getItem("drakValue"));
const changeDrakValue = () => {
  if (drakValue.value == "y" || drakValue.value == null) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("drakValue", "n");
    drakValue.value = "n";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("drakValue", "y");
    drakValue.value = "y";
  }
};

if (drakValue.value == "y" || drakValue.value == null) {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}
</script>
<style scoped lang="scss">
.darkBox {
  border: 1px solid var(--el-menu-text-color);
  background-color: var(--el-bg-color);
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
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
