<template>
  <div class="menuBox">
    <el-menu
      router
      :default-active="menuName"
      :collapse="menuCollapse"
      unique-opened
    >
      <template v-for="(item, index) in routerList">
        <el-sub-menu index="2" v-if="item.children">
          <template #title>
            <Icon :icon="item.icon" class="myIcon" />
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="(items, index) in item.children"
            :index="item.path + '/' + items.path"
            >
            <Icon :icon="items.icon" class="myIcon" />
            <span>{{ items.meta.title }}</span>
            </el-menu-item
          >
        </el-sub-menu>
        <el-menu-item :index="item.path" v-else>
          <Icon :icon="item.icon" class="myIcon" />
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div @click="changeMenuStatus" class="indentBox">
      <i class="ri-indent-decrease" v-show="!menuCollapse"></i>
      <i class="ri-indent-increase" v-show="menuCollapse"></i>
    </div>
  </div>
</template>
<script setup>
import { init } from "@/common/init";
let { routerList } = storeToRefs(init());
const router = useRouter();
let menuName = ref("");
console.log(routerList.value);
watch(
  [() => router.currentRoute.value.path],
  (to, from) => {
    menuName.value = to[0];
  },
  {
    deep: true,
    immediate: true,
  }
);
let menuCollapse = ref(false);
const changeMenuStatus = () => {
  menuCollapse.value = !menuCollapse.value;
};
</script>
<style lang="scss">
.myIcon {
   width: 18px;
   margin-right: 8px;
}
.menuBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-menu {
    border-right: 0 !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px !important;
  }
  .indentBox {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;

    i {
      transition: 0.3s;
      display: inline-block;
      padding: 6px;
      border-radius: 4px;
      background-color: var(--dark-color);
      font-size: 24px;
      color: var(--el-menu-text-color);
      transition: 0.3s;
      &:hover {
        background-color: var(--com-drak-Bgcolor);
        color: var(--com-drak-color);
      }
    }
  }
}
</style>
