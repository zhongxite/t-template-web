<template>
  <el-container>
    <el-aside class="aside">
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.name" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
import { getUserInfo } from "@/api/user";
import { init } from "@/common/init";
let { userInfo } = storeToRefs(init());
const Menu = defineAsyncComponent(() => {
  return import("@/components/menu/index.vue");
});
const Header = defineAsyncComponent(() => {
  return import("@/components/header/index.vue");
});
getUserInfo().then((res) => {
  if (res.code == 200) {
    userInfo.value = res.data;
  }
});
</script>
<style scoped lang="scss">
.aside {
  margin: 16px;
  width: auto;
  height: calc(100vh - 32px);
  background-color: var(--el-bg-color);
  border-radius: 10px;
}
.header {
  margin: 16px;
  padding: 20px;
  margin-left: 0;
  width: calc(100% - 16px);
  background-color: var(--el-bg-color);
  border-radius: 10px;
}
.main {
  position: relative;
  width: calc(100% - 16px);
  padding: 20px;
  margin-bottom: 16px;
  margin-right: 16px;
  background-color: var(--el-bg-color);
  border-radius: 10px;
  max-height: calc(100vh - 60px - 32px - 16px);
  overflow: hidden;
}
</style>
