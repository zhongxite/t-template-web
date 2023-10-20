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
                <el-form-item label="路由列表" prop="regMenusList" class="formItem" v-if="ifShowUserDataDialogBox">
                    <el-cascader width="100%" v-model="dialogForm.regMenusList" :options="options"
                        :props="{ multiple: true, value: 'id', label: 'name' }" clearable placeholder="点击选择"
                        @change="changeList" />
                </el-form-item>
                <el-form-item label="是否启动" prop="status" class="formItem">
                    <el-switch v-model="dialogForm.status" inline-prompt :active-icon="Check" :inactive-icon="Close"
                        :active-value="1" :inactive-value="0" />
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
import { roleAddOrModify, getRoleList, deleteMenus } from '@/api/role';
import { onActivated, watch } from 'vue';
import { init } from "@/common/init";
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
let ifShowUserDataDialogBox = ref(false);
let dialogWidth = ref("500");
let dialogTitle = ref("创建");
let showIconList = ref(false)
let dialogForm = ref({
    id: "",
    name: "",
    status: "",
    isChange: 0,
    regMenusList: null,
    menusList: null
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
const changeList = (e) => {
    let arr = []
    e.forEach(item => {
        item.forEach(ee => {
            arr.push(ee)
        })
    })
    dialogForm.value.menusList = String([...new Set(arr)])
}
const submitUserFormData = () => {
    loadingStatus.value = true;
    roleAddOrModify({...dialogForm.value,regMenusList:JSON.stringify(dialogForm.value.regMenusList)}).then(res => {
        if (res.code == 200) {
            setTimeout(() => {
                loadingStatus.value = false
                submitFormRes.value = true;
                setTimeout(() => {
                    changeFixStatus();
                    getList();
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
let { routerList } = storeToRefs(init());
const getList = () => {
    getRoleList().then(res => {
        if (res.code == 200) {
            options.value[0].children = routerList.value
            res.data.forEach(item=>{
                item.regMenusList = JSON.parse(item.regMenusList)
            })
            tableList.value = res.data
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
  