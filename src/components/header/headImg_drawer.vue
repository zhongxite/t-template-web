<template>
  <div class="userBox">
    <el-scrollbar height="calc(100vh - 200px)">
      <el-form ref="form" :model="fixForm" label-width="auto">
        <el-form-item label="头像" class="formItem">
          <el-image :close-on-press-escape="false" :preview-src-list="[fixForm.avatar ? fixForm.avatar : defaultImg]"
            class="headImg" :src="fixForm.avatar ? fixForm.avatar : defaultImg" fit="cover" />
          <el-upload v-show="ifFixStatus" v-model:file-list="fileList" action="http://localhost/api/common/uploadOss"
            multiple :before-upload="beforeUpload" :show-file-list="false" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF,"
            :on-success="onSuccessUploadFile">
            <el-button text plain bg type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name" class="formItem">
          <el-input :disabled="!ifFixStatus" v-model="fixForm.name" type="text" maxlength="10" show-word-limit
            clearable />
        </el-form-item>
        <el-form-item label="性别" prop="sex" class="formItem">
          <el-radio-group v-model="fixForm.sex" :disabled="!ifFixStatus">
            <el-radio border :label="1">男</el-radio>
            <el-radio border :label="2">女</el-radio>
            <el-radio border :label="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" class="formItem">
          <el-input v-model="fixForm.phone" type="text" :disabled="!ifFixStatus" placeholder="请更新手机号" maxlength="11"
            show-word-limit clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="formItem">
          <el-input v-model="fixForm.email" type="text" :disabled="!ifFixStatus" placeholder="请更新邮箱" show-word-limit
            clearable />
        </el-form-item>
        <el-form-item label="登录账号名" prop="accountName" class="formItem">
          <el-input disabled v-model="fixForm.accountName" type="text" />
        </el-form-item>
        <el-form-item label="所属角色" prop="role" class="formItem">
          <el-select :disabled="!ifFixStatus" v-model="fixForm.role" placeholder="请选择所属角色" clearable>
            <el-option v-for="(options, optionIndex) in roleList" :label="options.name" :value="options.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <div class="btnBox">
      <div class="fixBtn" v-if="!ifFixStatus">
        <el-button class="btn" type="warning" @click="changeFixStatus('fix')">修改信息</el-button>
      </div>
      <div class="subBtn" v-else>
        <el-button class="btn" :icon="submitFormRes ? Check : ''" type="success" :loading="loadingStatus"
          @click="submitUserFormData">{{
            !loadingStatus && !submitFormRes
            ? "确认"
            : submitFormRes
              ? "修改成功"
              : "正在提交"
          }}</el-button>
        <el-button class="btn" @click="changeFixStatus('fix')">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Check } from "@element-plus/icons-vue";
import img from "@/static/image/defaultImg.png";
import { init } from "@/common/init";
import { ElNotification } from "element-plus";
import { updateUserInfo, getUserInfo } from "@/api/user";
import { getRoleList } from '@/api/role';
import { onActivated } from "vue";
let defaultImg = ref(img);
let { userInfo } = storeToRefs(init());
let roleList = ref([])
let fixForm = ref({
  ...userInfo.value,
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
  fixForm.value.avatar = res.data.url;
};
let ifFixStatus = ref(false);
const changeFixStatus = (type, data) => {
  if (type == "fix") {
    fixForm.value = { ...userInfo.value };
  } else {
    userInfo.value = {
      ...fixForm.value,
    };
  }
  ifFixStatus.value = !ifFixStatus.value;
  loadingStatus.value = false;
  submitFormRes.value = false;
};
let loadingStatus = ref(false);
let submitFormRes = ref(false);
const submitUserFormData = () => {
  loadingStatus.value = true;
  updateUserInfo(fixForm.value).then((res) => {
    if (res.code == 200) {
      getUserInfo().then((res) => {
        if (res.code == 200) {
          userInfo.value = res.data;
          setTimeout(() => {
            loadingStatus.value = false;
            submitFormRes.value = true;
            setTimeout(() => {
              changeFixStatus();
            }, 1000);
          }, 1000);
        }
      });
    } else {
      loadingStatus.value = false;
    }
  }).catch(() => {
    loadingStatus.value = false
  });
};
getRoleList().then(roleRes => {
  if (roleRes.code == 200) {
    roleList.value = roleRes.data
  }
})
onActivated(() => {
  fileList.value = []
})
</script>
<style scoped lang="scss">
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

  .btnBox {
    width: 100%;
    display: flex;

    .fixBtn {
      width: 100%;

      .btn {
        width: 100%;
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
  }
}
</style>
