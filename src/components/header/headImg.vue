<template>
  <el-popover width="auto">
    <template #reference>
      <el-image
        class="headImg"
        :src="userInfo.avatar ? userInfo.avatar : defaultImg"
        fit="cover"
      />
    </template>
    <div class="btnList">
      <el-button type="primary" @click="showHeadImgDrawe">个人信息</el-button>
      <el-button type="danger" @click="exitUser">退出</el-button>
    </div>
  </el-popover>
  <drawerRight
    v-model="ifShowHeadImgDrawe"
    v-model:size="drawerSize"
    v-model:title="drawerTitle"
  >
    <HeadImgDrawer />
  </drawerRight>
</template>
<script setup>
import img from "@/static/image/defaultImg.png";
import { init } from "@/common/init";
import { ElMessageBox, ElNotification } from "element-plus";
const drawerRight = defineAsyncComponent(() => {
  return import("@/components/drawer/right.vue");
});
const HeadImgDrawer = defineAsyncComponent(() => {
  return import("@/components/header/headImg_drawer.vue");
});
const router = useRouter();
let defaultImg = ref(img);
let { userInfo,token,routerList } = storeToRefs(init());
let ifShowHeadImgDrawe = ref(false);
const showHeadImgDrawe = () => {
  ifShowHeadImgDrawe.value = !ifShowHeadImgDrawe.value;
};
const drawerSize = ref("50%");
const drawerTitle = ref("个人信息");

const exitUser = () => {
  ElMessageBox.confirm("是否退出系统？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      token.value = ""
      routerList.value = []
      ElNotification({
        message: "退出成功",
        type: "success",
      });
      router.replace({ name: "login" });
    })
    .catch(() => {});
};
</script>
<style scoped lang="scss">
.headImg {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  .btnList {
    display: flex;
    align-items: center;
  }
}
</style>
