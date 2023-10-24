<template>
  <div class="mainBox">
    <SearchForm v-model:queryFormList="queryFormList" v-model:queryForm="queryForm"
      v-model:operateBtnList="operateBtnList" @clickSearch="receiveSearchForm" />
    <Table v-model="tableTemplate" v-model:tableList="tableList" v-model:tablePage="queryForm.page"
      v-model:tablePageNum="queryForm.pageNum" v-model:tableTotal="tableTotal" v-model:loading="loading"
      @tablePageChange="tablePageChange" />
  </div>
  <Dialog v-model="ifShowUserDataDialogBox" v-model:width="dialogWidth" v-model:title="dialogTitle">
    <el-scrollbar>
      <el-form ref="form" :model="dialogForm" label-width="auto" class="userBox">
        <el-form-item label="头像" class="formItem">
          <el-image :close-on-press-escape="false" :preview-src-list="[
            dialogForm.avatar ? dialogForm.avatar : defaultImg,
          ]" class="headImg" :src="dialogForm.avatar ? dialogForm.avatar : defaultImg" fit="cover" />
          <el-upload v-model:file-list="fileList" action="http://localhost/api/common/uploadOss" multiple
            :before-upload="beforeUpload" :show-file-list="false" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF,"
            :on-success="onSuccessUploadFile">
            <el-button text plain bg type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name" class="formItem">
          <el-input v-model="dialogForm.name" type="text" maxlength="10" show-word-limit clearable />
        </el-form-item>
        <el-form-item label="性别" prop="sex" class="formItem">
          <el-radio-group v-model="dialogForm.sex">
            <el-radio border :label="1">男</el-radio>
            <el-radio border :label="2">女</el-radio>
            <el-radio border :label="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" class="formItem">
          <el-input v-model="dialogForm.phone" type="text" placeholder="请更新手机号" maxlength="11" show-word-limit
            clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="formItem">
          <el-input v-model="dialogForm.email" type="text" placeholder="请更新邮箱" show-word-limit clearable />
        </el-form-item>
        <el-form-item label="登录账号名" prop="accountName" class="formItem">
          <el-input :disabled="ifFixStatus" v-model="dialogForm.accountName" type="text" />
        </el-form-item>
        <el-form-item v-if="!ifFixStatus" label="登录密码" prop="password" class="formItem">
          <el-input show-password v-model="dialogForm.password" type="text" />
        </el-form-item>
        <el-form-item label="所属角色" prop="role" class="formItem">
          <el-select v-model="dialogForm.role" placeholder="请选择所属角色" clearable>
            <el-option v-for="(options, optionIndex) in roleList" :label="options.name" :value="options.id" />
          </el-select>
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
import {
  getUserList,
  deleteUser,
  updateUserInfo,
  createUser,
} from "@/api/user";
import { getRoleList } from '@/api/role';
import { convertTime } from "@/tools/common";
import { ElNotification, ElMessageBox } from "element-plus";
import { Check } from "@element-plus/icons-vue";
import img from "@/static/image/defaultImg.png";
let defaultImg = ref(img);
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
    type: "select",
    label: "状态",
    prop: "status",
    placeholder: "请选择状态",
    defaultData: "",
    option: [
      {
        label: "禁用",
        value: 1,
      },
      {
        label: "启动",
        value: 2,
      },
    ],
  },
  {
    type: "daterange",
    label: "创建时间",
    prop: "createDate",
    format: "x",
    branchValue: {
      start: "createStartTime",
      end: "createEndTime",
    },
  },
  {
    type: "daterange",
    label: "最后登录时间",
    prop: "loginDate",
    format: "x",
    branchValue: {
      start: "loginStartTime",
      end: "loginEndTime",
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
let roleList = ref([])
const getList = () => {
  loading.value = true;
  getUserList({
    ...queryForm.value,
  }).then((res) => {
    getRoleList().then(roleRes => {
      if (roleRes.code == 200) {
        roleList.value = roleRes.data
      }
    })
    if (res.code == 200) {
      res.data.list.forEach((item) => {
        if (item.status == 0) {
          item.status = "启用";
        } else {
          item.status = "禁用";
        }
        if (item.created) {
          item.created = convertTime(item.created);
        }
        if (item.loginTime) {
          item.loginTime = convertTime(item.loginTime);
        }
      });
      tableList.value = res.data.list;
      tableTotal.value = res.data.total;
      loading.value = false;
    }
  });
};
const receiveSearchForm = (form, type) => {
  queryForm.value = {
    ...queryForm.value,
    ...form,
  };
  if (type == "search") {
    getList();
  }
};
// 表格列表表头模板
const tableTemplate = ref([
  {
    type: "text",
    label: "姓名",
    prop: "name",
    width: 100,
    isShowZero: false,
  },
  {
    type: "img",
    label: "头像",
    prop: "avatar",
    width: 100,
    isShowZero: false,
    previewListName: "",
  },
  {
    type: "tag",
    label: "性别",
    prop: "sex",
    isShowZero: false,
    width: 100,
  },
  {
    type: "tag",
    label: "手机号码",
    prop: "phone",
    isShowZero: false,
    width: 200,
  },
  {
    type: "text",
    label: "邮箱",
    prop: "email",
    isShowZero: false,
    width: 200,
  },
  {
    type: "tag",
    label: "状态",
    prop: "status",
    isShowZero: false,
    width: 100,
  },
  {
    type: "tag",
    label: "最后登录ip",
    prop: "loginIp",
    isShowZero: false,
    width: 140,
  },
  {
    type: "text",
    label: "最后登录时间",
    prop: "loginTime",
    isShowZero: false,
    width: 140,
  },
  {
    type: "text",
    label: "创建时间",
    prop: "created",
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
            dialogTitle = "编辑用户";
            dialogForm.value = { ...row };
            fileList.value = [];
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
            ElMessageBox.confirm("是否删除此用户?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                deleteUser({ id: row.id }).then((res) => {
                  if (res.code == 200) {
                    ElNotification({
                      message: "删除成功",
                      type: "success",
                    });
                    getList();
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

// 分页模块
let tableTotal = ref(0);
const tablePageChange = (data) => {
  queryForm.value.pageNum = data;
  getList();
};

let ifShowUserDataDialogBox = ref(false);
let dialogWidth = ref("500");
let dialogTitle = ref("创建用户");
let dialogForm = ref({
  id: "",
  avatar: "",
  name: "",
  sex: "",
  phone: "",
  email: "",
  accountName: "",
  role: "",
});
let fileList = ref([]);
const beforeUpload = (file) => {
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = ["jpg", "jpeg", "png", "gif", "JPG", "JPEG", "GIF"];

  if (whiteList.indexOf(fileSuffix) === -1) {
    ElNotification({
      message: "上传文件只能是 jpg、jpeg、png、gif格式",
      type: "error",
    });
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElNotification({
      message: "上传文件大小不能超过 2MB",
      type: "error",
    });
    return false;
  }
};
const onSuccessUploadFile = (res) => {
  dialogForm.value.avatar = res.data.url;
};

let ifFixStatus = ref(false);
let loadingStatus = ref(false);
let submitFormRes = ref(false);
const changeFixStatus = () => {
  ifShowUserDataDialogBox.value = false;
  loadingStatus.value = false;
  submitFormRes.value = false;
};
const submitUserFormData = () => {
  loadingStatus.value = true;
  if (ifFixStatus.value) {
    updateUserInfo(dialogForm.value).then((res) => {
      if (res.code == 200) {
        setTimeout(() => {
          loadingStatus.value = false;
          submitFormRes.value = true;
          setTimeout(() => {
            changeFixStatus();
            getList();
          }, 1000);
        }, 1000);
      } else {
        loadingStatus.value = false;
      }
    }).catch(() => {
      loadingStatus.value = false
    });
  } else {
    createUser(dialogForm.value).then((res) => {
      if (res.code == 200) {
        setTimeout(() => {
          loadingStatus.value = false;
          submitFormRes.value = true;
          setTimeout(() => {
            changeFixStatus();
            getList();
          }, 1000);
        }, 1000);
      } else {
        loadingStatus.value = false;
      }
    }).catch(() => {
      loadingStatus.value = false
    });
  }
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

    :deep(.el-select) {
      width: 100% !important;
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
