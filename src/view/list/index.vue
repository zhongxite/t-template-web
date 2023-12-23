<template>
  <div class="mainBox">
    <SearchForm
      v-model:queryFormList="queryFormList"
      v-model:queryForm="queryForm"
      v-model:operateBtnList="operateBtnList"
      @clickSearch="receiveSearchForm"
    />
    <Table
      v-model="tableTemplate"
      v-model:tableList="tableList"
      v-model:tablePage="queryForm.page"
      v-model:tablePageNum="queryForm.pageNum"
      v-model:tableTotal="tableTotal"
      v-model:loading="loading"
      @tablePageChange="tablePageChange"
      @selectionChangeStatus="selectionChangeStatus"
    />
  </div>
  <Dialog
    v-model="ifShowUploadDialogBox"
    v-model:width="dialogWidth"
    v-model:title="dialogTitle"
  >
    <el-upload
      v-model:file-list="fileList"
      action="http://localhost/api/common/importFile"
      multiple
      drag
      :before-upload="beforeUpload"
      :show-file-list="false"
      accept=".xlsx"
      :on-success="onSuccessUploadFile"
      :on-error="onErrorUploadFile"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件到此处或者<em>点击上传</em><br />
        <span style="display: block; margin-top: 10px">仅支持xlsx文件格式</span>
      </div>
    </el-upload>
  </Dialog>
</template>
<script setup>
import { ElNotification } from "element-plus";
import { getUserList } from "@/api/user";
import { exportFile } from "@/api/common";
import { exportXlsxFile } from "@/tools/common";
import { UploadFilled } from "@element-plus/icons-vue";
import { init } from "@/common/init";
import { useRouter } from "vue-router";
const router = useRouter();
let { isShowLoadingBox } = storeToRefs(init());
const SearchForm = defineAsyncComponent(() => {
  return import("@/components/searchForm/index.vue");
});
const Table = defineAsyncComponent(() => {
  return import("@/components/table/index.vue");
});
const Dialog = defineAsyncComponent(() => {
  return import("@/components/dialog/index.vue");
});
let queryForm = ref({
  pageNum: 1,
  page: 10,
}); // 搜索表单数据
// 搜索表单
const queryFormList = ref([
  {
    type: "input",
    label: "姓名",
    prop: "name",
    placeholder: "请输入名称",
    defaultData: "",
  },
  {
    type: "select",
    label: "性别",
    prop: "sex",
    placeholder: "请选择性别",
    defaultData: "",
    option: [
      {
        label: "男",
        value: 1,
      },
      {
        label: "女",
        value: 2,
      },
      {
        label: "未知",
        value: 0,
      },
    ],
  },
  {
    type: "daterange",
    label: "时间选择",
    prop: "date",
    branchValue: {
      start: "startTime",
      end: "endTime",
    },
  },
]);
// 按钮列表
const operateBtnList = ref({
  left: [
    {
      name: "创建",
      type: "",
      color: "#626aef",
      listeners: {
        click: () => {
          let name = "view/demo/index";
          router.addRoute("redirectName", {
            name: "demo",
            path: "/demo",
            meta: {
              title: "demo",
            },
            component: modules[`/src/${name}.vue`], //路由按需加载
          });
        },
      },
    },
    {
      name: "导入",
      type: "",
      color: "#626aef",
      listeners: {
        click: () => {
          ifShowUploadDialogBox.value = true;
        },
      },
    },
    {
      name: "导出",
      type: "",
      color: "#626aef",
      listeners: {
        click: () => {
          isShowLoadingBox.value = true;
          exportFile({
            exportName: "user",
            ...queryForm.value,
          })
            .then((res) => {
              exportXlsxFile(res, "用户列表");
            })
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
let ifShowUploadDialogBox = ref(false);
let dialogWidth = ref("500");
let dialogTitle = ref("导入数据");
let fileList = ref([]);
const beforeUpload = (file) => {
  ifShowUploadDialogBox.value = false;
  isShowLoadingBox.value = true;
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = ["xlsx"];

  if (whiteList.indexOf(fileSuffix) === -1) {
    ElNotification({
      message: "上传文件只能是xlsx格式",
      type: "error",
    });
    isShowLoadingBox.value = false;
    return false;
  }
};
const onSuccessUploadFile = (res) => {
  if (res.code == 200) {
    ElNotification({
      message: res.msg,
      type: "success",
    });
  } else {
    ElNotification({
      message: res.msg,
      type: "error",
    });
  }
  isShowLoadingBox.value = false;
  getList();
};
const onErrorUploadFile = (res) => {
  ElNotification({
    message: "导入失败",
    type: "error",
  });
  isShowLoadingBox.value = false;
};
const getList = () => {
  loading.value = true;
  getUserList({
    ...queryForm.value,
  }).then((res) => {
    if (res.code == 200) {
      tableList.value = res.data.list;
      tableTotal.value = res.data.total;
      nextTick();
      loading.value = false;
    }
  });
};
const receiveSearchForm = (form, type) => {
  queryForm.value = {
    ...queryForm.value,
    ...form,
  };
  console.log("数据改变时===>", queryForm.value);
  if (type == "search") {
    getList();
  }
};
// 表格列表表头模板
const tableTemplate = ref([
  {
    type: "selection",
    width: 55,
  },
  {
    type: "text",
    label: "姓名",
    prop: "name",
    width: 100,
  },
  {
    type: "img",
    label: "头像",
    prop: "avatar",
    width: 100,
    previewListName: "",
  },
  {
    type: "tag",
    label: "手机号码",
    prop: "phone",
    width: 100,
  },
  {
    type: "text",
    label: "邮箱",
    prop: "email",
    width: 200,
  },
  {
    type: "btn",
    label: "操作",
    // width: 200,
    list: (row) => [
      {
        name: "创建",
        type: "",
        color: "#626aef",
        show: true,
        listeners: {
          click: () => {
            console.log("点击事件获取当前子项数据===>", row);
          },
        },
      },
      {
        name: "创建",
        type: "",
        color: "#626aef",
        show: row.tag != "3",
        listeners: {
          click: () => {
            console.log("点击事件获取当前子项数据===>", row);
          },
        },
      },
    ],
  },
]);
// 表格列表数据
let tableList = ref([]);
let loading = ref(false); //表格加载
const selectionChangeStatus = (data) => {
  console.log("选择状态的数据===>", data);
};

// 分页模块
let tableTotal = ref(0);
const tablePageChange = (data) => {
  queryForm.value.pageNum = data;
  getList();
  console.log("分页数据改变时===>", data);
};
getList();
</script>
<style scoped lang="scss">
.mainBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
