<template>
  <div class="fullscreenBox">
    <i
      :class="screenState ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"
      @click="handlerScreenFull"
    ></i>
  </div>
</template>
<script setup>
import screenfull from "screenfull";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";
let screenState = ref(false);
const changeScreenState = () => {
  screenState.value = screenfull.isFullscreen; // 更新状态
};
const handlerScreenFull = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle(); // 切换全屏状态
  } else {
    ElMessage.error("当前浏览器暂不支持全屏模式");
  }
};
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on("change", changeScreenState); // 监听状态
  }
});
</script>
<style scoped lang="scss">
.fullscreenBox {
  border: 1px solid var(--el-menu-text-color);
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  margin-right: 10px;
  transition: .3s;
  i {
  transition: .3s;
    width: 100%;
    color: var(--el-menu-text-color);
  }
  &:hover{
    border-color: var(--com-head-Bgcolor);
    background-color: var(--com-head-Bgcolor);
    i{
      color: var(--com-head-color);
    }
  }
}
</style>
