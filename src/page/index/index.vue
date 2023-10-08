<template>
  <div class="indexBox">
    <div class="tipsBox">
      <img :src="defaultImg" alt="" />
      <span class="wcText">欢迎来到T-template</span>
      <span class="contText">处境：功能未完善，等待开源~~~</span>
    </div>
    <div class="funcBox">
      <div class="contBox">
        <div class="itemBox">
          <span>已完成</span>
          <el-scrollbar style="width: 100%">
            <div class="item" v-for="item in dataList.fulfillmentList">
              <el-icon :size="20" color="#65ad46">
                <SuccessFilled />
              </el-icon>
              <span class="cont">{{ item }}</span>
            </div>
          </el-scrollbar>
        </div>
        <div class="itemBox">
          <span>未完成</span>
          <el-scrollbar style="width: 100%">
            <div class="item" v-for="item in dataList.unfinishedList">
              <el-icon :size="20" color="#d74326">
                <CircleCloseFilled />
              </el-icon>
              <span class="cont">
                {{ item }}
              </span>
            </div>
          </el-scrollbar>
        </div>
        <div class="itemBox">
          <span>未来规划</span>
          <el-scrollbar style="width: 100%">
            <div class="item" v-for="item in dataList.programList">
              <el-icon :size="20" color="#fcf050">
                <StarFilled />
              </el-icon>
              <span class="cont">
                {{ item }}
              </span>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  SuccessFilled,
  CircleCloseFilled,
  StarFilled,
} from "@element-plus/icons-vue";
import img from "@/static/image/defaultImg.png";
let defaultImg = ref(img);
let dataList = ref({
  fulfillmentList: [
    "登录",
    "注册",
    "全屏放大",
    "暗亮模式",
    "导出/导入",
    "oss传输",
    "个人信息模块(修改)",
    "用户管理模块(创建/编辑/删除/搜索)",
    "列表示例模块",
  ],
  unfinishedList: ["鉴权", "角色模块", "菜单模块"],
  programList: ["低代码平台", "自定义模板", "接入GPT搜索"],
});
</script>
<style scoped lang="scss">
.indexBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tipsBox {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 160px;
    }
    .wcText {
      margin: 20px 0;
      font-size: 30px;
      font-weight: 800;
    }
  }
  .funcBox {
    padding: 30px 0 0;
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    .contBox {
      width: 60%;
      margin: 0 20px;
      display: flex;
      align-items: center;
      height: 100%;
      .itemBox {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        height: 100%;
        overflow: hidden;
        margin-right: 30px;
        border-radius: 10px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background-color: var(--dark-color);
        }
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
        > span {
          margin-bottom: 30px;
          font-size: 24px;
          font-weight: 800;
        }
        .item {
          width: 100%;
          height: 100%;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }
          .cont {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
