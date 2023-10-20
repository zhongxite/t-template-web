<template>
  <el-table class="tabBox" stripe border highlight-current-row :data="props.tableList"
    @selection-change="handleSelectionChange" :header-cell-style="{ background: 'var(--el-border-color)' }" row-key="id"
    table-layout="fixed">
    <template v-for="item in props.modelValue">
      <el-table-column v-if="item.type == 'selection'" :type="item.type" :width="item.width">
      </el-table-column>
      <el-table-column v-else align="center" :show-overflow-tooltip="item.type == 'text' ? true : false"
        :label="item.label" :width="item.width" :min-width="item.minWidth" :fixed="item.type == 'btn' ? 'right' : false"
        fit :prod="item.prod">
        <template #default="scope" v-if="item.type == 'text'">
          {{
            scope.row[item.prop]
            ? scope.row[item.prop]
            : item.isShowZero
              ? scope.row[item.prop]
              : "-"
          }}
        </template>
        <template #default="scope" v-if="item.type == 'textTime'">
          {{
              scope.row[item.prop]
              ? convertTime(scope.row[item.prop])
              : item.isShowZero
                ? convertTime(scope.row[item.prop])
                : "-"
            }}
        </template>
        <template #default="scope" v-if="item.type == 'img'">
          <div class="tabImgBox">
            <el-image class="tabImg" :src="scope.row[item.prop]" preview-teleported :preview-src-list="scope.row[item.previewListName]
              ? scope.row[item.previewListName]
              : [scope.row[item.prop]]
              " />
          </div>
        </template>
        <template #default="scope" v-if="item.type == 'tag'">
          <el-tag>
            {{
              scope.row[item.prop]
              ? scope.row[item.prop]
              : item.isShowZero
                ? scope.row[item.prop]
                : "-"
            }}
          </el-tag>
        </template>
        <template #default="scope" v-if="item.type == 'switch'">
          <el-switch v-model="scope.row[item.prop]" inline-prompt :active-icon="Check" :inactive-icon="Close"
            :disabled="item.isDisabled" :active-value="1" :inactive-value="0" />
        </template>
        <template #default="scope" v-if="item.type == 'icon'">
          <div class="tableIconBox">
            <Icon :icon="scope.row[item.prop]" class="tabIcon" />
          </div>
        </template>
        <template #default="scope" v-if="item.type == 'btn'">
          <el-button v-for="(btnItem, btnIndex) in item.list(scope.row)" v-show="btnItem.show" :key="btnIndex" class="btn"
            text bg :type="btnItem.type" :color="btnItem.color" plain v-on="btnItem.listeners">{{ btnItem.name
            }}</el-button>
        </template>
      </el-table-column>
    </template>

    <template v-slot:empty>
      <el-empty :image-size="200" description="暂无数据" />
    </template>
  </el-table>
  <el-pagination v-if="props.tablePage && props.tablePageNum" background layout="prev, pager, next"
    :default-page-size="props.tablePage" :current-page="props.tablePageNum" :total="props.tableTotal"
    @current-change="handleCurrentChange" />
  <Loading />
</template>
<script setup>
import { Check, Close } from "@element-plus/icons-vue";
import { init } from "@/common/init";
import { convertTime } from "@/tools/common";
let { isShowLoadingBox } = storeToRefs(init());
const Loading = defineAsyncComponent(() => {
  return import("@/components/loading/index.vue");
});
const emit = defineEmits(["selectionChangeStatus", "tablePageChange"]);
const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  tableList: {
    type: Array,
    default: [],
  },
  tablePage: {
    type: [Number, String],
    default: "",
  },
  tablePageNum: {
    type: [Number, String],
    default: "",
  },
  tableTotal: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  showHeaer: {
    type: Boolean,
    default: true,
  },
});
watch(
  () => props.loading,
  (to, from) => {
    isShowLoadingBox.value = to;
  },
  {
    deep: true,
    immediate: true,
  }
);
const handleSelectionChange = (val) => {
  emit("selectionChangeStatus", val);
};
const handleCurrentChange = (val) => {
  emit("tablePageChange", val);
};
</script>
<style scoped lang="scss">
.tabBox {
  flex: 1;

  :deep(.el-table__expanded-cell) {
    padding: 0;
  }

  :deep(.el-scrollbar__view) {
    height: 100%;
  }

  .tabImgBox {
    display: flex;
    align-items: center;
    justify-content: center;

    .tabImg {
      border-radius: 4px;
    }
  }

  .tableIconBox {
    display: flex;
    align-items: center;
    justify-content: center;

    .tabIcon {
      width: 30px;
    }
  }
}
</style>
