<template>
  <div class="mainBox">
    <SearchForm v-model:operateBtnList="operateBtnList" />
    <Table v-model="tableTemplate" v-model:tableList="tableList" v-model:loading="loading">
    </Table>
  </div>
  <Dialog v-model="ifShowUserDataDialogBox" v-model:width="dialogWidth" v-model:title="dialogTitle"
    @click="showIconList = false">
    <el-scrollbar>
      <el-form ref="form" :model="dialogForm" label-width="auto" class="userBox">
        <el-form-item label="名称" prop="name" class="formItem">
          <el-input v-model="dialogForm.name" type="text" show-word-limit clearable placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="类型" prop="type" class="formItem">
          <el-radio-group v-model="dialogForm.type">
            <el-radio class="formRadio" border label="0">菜单目录</el-radio>
            <el-radio class="formRadio" border label="1">菜单项</el-radio>
            <el-radio class="formRadio" border label="2">页面按钮</el-radio>
            <el-radio class="formRadio" border label="3">外链</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid" class="formItem" v-if="ifShowUserDataDialogBox">
          <el-cascader width="100%" v-model="dialogForm.pid" :options="options" ref="classifyRef"
            :props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name' }" clearable placeholder="点击选择"
            @change="classifyChange" />
        </el-form-item>
        <el-form-item v-if="dialogForm.type == 1" label="页面标题" prop="title" class="formItem">
          <el-input v-model="dialogForm.title" type="text" placeholder="请输入页面标题" show-word-limit clearable />
        </el-form-item>
        <el-form-item v-if="dialogForm.type == 0 || dialogForm.type == 1" label="页面标识" prop="mark" class="formItem">
          <el-input v-model="dialogForm.mark" type="text" placeholder="请输入页面标识" show-word-limit clearable />
        </el-form-item>
        <el-form-item label="图标" prop="icon" class="formItem">
          <el-popover :visible="showIconList" placement="right" width="auto" trigger="click">
            <template #reference>
              <el-button text plain bg type="primary" @click.stop="showIconList = true" v-if="!dialogForm.icon">点击选择Icon
              </el-button>
              <el-button text plain bg type="primary" @click.stop="showIconList = true" v-else>
                <Icon :icon="dialogForm.icon" class="icons" />
                <span>{{ dialogForm.icon }}</span>
              </el-button>
            </template>
            <el-scrollbar>
              <div class="iconList">
                <div v-for="item in iconsList" @click="dialogForm.icon = item; showIconList = false">
                  <Icon :icon="item" class="icons" />
                </div>
              </div>
            </el-scrollbar>

          </el-popover>
        </el-form-item>
        <el-form-item label="访问路径" prop="path" class="formItem">
          <el-input v-model="dialogForm.path" type="text" placeholder="请输入访问路径，如:/demo，demo或者https://xx.com"
            show-word-limit clearable />
        </el-form-item>
        <el-form-item v-if="dialogForm.type != 3 && dialogForm.type != 0" label="组件路径" prop="component" class="formItem">
          <el-input v-model="dialogForm.component" type="text" placeholder="请输入组件路径，如:view/demo/index" show-word-limit
            clearable />
        </el-form-item>
        <el-form-item label="是否启动" prop="status" class="formItem">
          <el-switch v-model="dialogForm.status" inline-prompt :active-icon="Check" :inactive-icon="Close"
            active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div class="subBtn">
      <el-button class="btn" :icon="submitFormRes ? Check : ''" type="success" :loading="loadingStatus"
        @click="submitUserFormData">{{
          !loadingStatus && !submitFormRes
          ? "确认"
          : submitFormRes
            ? ifFixStatus
              ? "修改成功"
              : "创建成功"
            : "正在提交"
        }}</el-button>
      <el-button class="btn" @click="changeFixStatus">取消</el-button>
    </div>
  </Dialog>
</template>
<script setup>
import { Check, Close } from "@element-plus/icons-vue";
import { ElMessageBox, ElNotification } from "element-plus";
import { iconsList } from '@/static/icon/iconList';
import { menusAddOrModify, getMenusList, deleteMenus } from '@/api/menu';
import { onActivated, watch } from 'vue';
import { init } from "@/common/init";
const router = useRouter();
const SearchForm = defineAsyncComponent(() => {
  return import("@/components/searchForm/index.vue");
});
const Table = defineAsyncComponent(() => {
  return import("@/components/table/index.vue");
});
const Dialog = defineAsyncComponent(() => {
  return import("@/components/dialog/index.vue");
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
          dialogTitle = "创建";
          dialogForm.value = { isChange: 0 };
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
    prop: "path",
    width: 200,
    isShowZero: false,
  },

  {
    type: "switch",
    label: "状态",
    prop: "status",
    width: 100,
    isShowZero: false,
    isDisabled: true
  },
  {
    type: "textTime",
    label: "创建时间",
    prop: "created",
    isShowZero: false,
    minWidth: 140
  },
  {
    type: "textTime",
    label: "修改时间",
    prop: "updated",
    isShowZero: false,
    minWidth: 140
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
          click: () => {
            dialogTitle = "编辑";
            dialogForm.value = { ...row, isChange: 1 };
            ifFixStatus.value = true;
            ifShowUserDataDialogBox.value = true;
          },
        },
      },
      {
        name: "删除",
        type: "",
        color: "#e47470",
        show: true,
        listeners: {
          click: () => {
            ElMessageBox.confirm("确定是否删除?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                deleteMenus({ id: row.id }).then((res) => {
                  if (res.code == 200) {
                    ElNotification({
                      message: "删除成功",
                      type: "success",
                    });
                    getList(init().getRouter(router));
                  }
                });
              })
              .catch(() => { });
          },
        },
      },
    ],
  },
]);
// 表格列表数据
let tableList = ref([]);
let loading = ref(false); //表格加载
let ifShowUserDataDialogBox = ref(false);
let dialogWidth = ref("500");
let dialogTitle = ref("创建");
let showIconList = ref(false)
let dialogForm = ref({
  id: "",
  name: "",
  pid: "",
  type: "",
  mark: "",
  title: "",
  icon: "",
  path: "",
  component: "",
  status: "",
  isChange: 0
});
let ifFixStatus = ref(false);
let loadingStatus = ref(false);
let submitFormRes = ref(false);
const changeFixStatus = () => {
  ifShowUserDataDialogBox.value = false;
  loadingStatus.value = false;
  submitFormRes.value = false;
  showIconList.value = false
};
const submitUserFormData = () => {
  loadingStatus.value = true;
  menusAddOrModify(dialogForm.value).then(res => {
    if (res.code == 200) {
      setTimeout(() => {
        loadingStatus.value = false
        submitFormRes.value = true;
        setTimeout(() => {
          changeFixStatus();
          getList();
          init().getRouter(router);
        }, 1000);
      }, 1000);
    } else {
      loadingStatus.value = false
    }
  }).catch(() => {
    loadingStatus.value = false
  })
};
watch(ifShowUserDataDialogBox, (n, o) => {
  if (!n) {
    changeFixStatus()
  }
})
let options = ref([{
  id: 0,
  name: '控制台',
  children: []
}])
let classifyRef = ref()
const classifyChange = (value) => {
  dialogForm.value.pid = value
  classifyRef.value.togglePopperVisible();
}
const getList = (init) => {
  getMenusList().then(res => {
    if (res.code == 200) {
      options.value[0].children = res.data
      tableList.value = res.data
      init && init()
    }
  })
}
getList()
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

    .formIcon {
      width: 20px;
      cursor: pointer;
    }

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

.userBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .formItem {
    display: flex;
    align-items: center;

    :deep(.el-cascader) {
      width: 100% !important;
    }

    .formRadio {
      margin-right: 10px;
    }

    .headImg {
      width: 140px;
      height: 140px;
      margin-right: 10px;
      border-radius: 50%;
    }

    .icons {
      width: 20px;
      margin-right: 6px;
    }

    span {
      font-size: 14px;
    }
  }
}

.iconList {
  width: 500px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  >div {
    width: 50px;
    height: 50px;
    // background-color: green;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: background-color .3s;
    cursor: pointer;

    &:nth-of-type(10n+1) {
      border-left: 1px solid #dcdfe6;
    }

    &:nth-of-type(-n+10) {
      border-top: 1px solid #dcdfe6;
    }

    &:hover {
      background-color: #f2f6fc;
    }

    .icons {
      width: 20px;
    }
  }
}
</style>
