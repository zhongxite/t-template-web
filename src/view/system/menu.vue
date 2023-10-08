<template>
  <div class="mainBox">
    <SearchForm v-model:operateBtnList="operateBtnList" />
    <Table
      v-model="tableTemplate"
      v-model:tableList="tableList"
      v-model:loading="loading"
    >
    </Table>
  </div>
</template>
<script setup>
const SearchForm = defineAsyncComponent(() => {
  return import("@/components/searchForm/index.vue");
});
const Table = defineAsyncComponent(() => {
  return import("@/components/table/index.vue");
});
// 按钮列表
const operateBtnList = ref({
  left: [
    {
      name: "创建",
      type: "",
      color: "#626aef",
      listeners: {
        click: () => {
          dialogTitle = "创建用户";
          dialogForm.value = {};
          fileList.value = [];
          ifFixStatus.value = false;
          ifShowUserDataDialogBox.value = true;
        },
      },
    },
  ],
  right: [
    {
      name: "刷新",
      type: "info",
      listeners: {
        click: () => {
          getList();
        },
      },
    },
  ],
});
// 表格列表表头模板
const tableTemplate = ref([
  {
    type: "text",
    label: "名称",
    prop: "name",
    width: 150,
    isShowZero: false,
  },
  {
    type: "icon",
    label: "图标",
    prop: "icon",
    width: 100,
    isShowZero: false,
  },
  {
    type: "text",
    label: "地址",
    prop: "router",
    width: 200,
    isShowZero: false,
  },

  {
    type: "switch",
    label: "状态",
    prop: "status",
    width: 100,
    isShowZero: false,
  },
  {
    type: "text",
    label: "修改时间",
    prop: "updateTime",
    isShowZero: false,
    minWidth:140
  },
  {
    type: "btn",
    label: "操作",
    width: 200,
    list: (row) => [
      {
        name: "编辑",
        type: "",
        color: "#626aef",
        show: true,
        listeners: {
          click: () => {},
        },
      },
    ],
  },
]);
// 表格列表数据
let tableList = ref([
  {
    id: 1,
    name: "wangxiaohu",
    icon: "StarFilled",
    router: "/index",
    updateTime: "2023-01-01",
    status: true,
    children: [
      {
        id: 2,
        name: "wangxiaohu",
        icon: "Avatar",
        router: "/index",
        updateTime: "2023-01-01",
        status: true,
      },
    ],
  },
]);
let loading = ref(false); //表格加载
</script>
<style scoped lang="scss">
.mainBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .formItem {
    display: flex;
    align-items: center;
    .headImg {
      width: 140px;
      height: 140px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
}
.subBtn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn {
    width: 48%;
  }
}
</style>
