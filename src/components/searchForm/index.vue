<template>
  <el-form
    :inline="true"
    ref="searchRef"
    :model="props.queryForm"
    label-width="auto"
    class="searchFormBox"
    :class="showSearchForm ? '' : 'searchFormBoxHide'"
    :style="searchRefHight"
  >
    <div
      class="formBox"
      v-if="props.queryFormList && props.queryFormList.length != 0"
    >
      <el-form-item
        v-for="(item, index) in props.queryFormList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        class="formItem"
      >
        <el-input
          v-model="props.queryForm[item.prop]"
          :placeholder="item.placeholder"
          clearable
          v-if="item.type == 'input'"
        />
        <el-select
          v-model="props.queryForm[item.prop]"
          :placeholder="item.placeholder"
          clearable
          v-else-if="item.type == 'select'"
        >
          <el-option
            v-for="(options, optionIndex) in item.option"
            :label="options.label"
            :value="options.value"
          />
        </el-select>
        <el-date-picker
          v-model="props.queryForm[item.prop]"
          type="daterange"
          format="YYYY/MM/DD"
          :value-format="props.queryForm[item.format]"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="changeDatePickerData"
          v-else-if="item.type == 'daterange'"
        />
      </el-form-item>
      <div class="btnBox">
        <el-button
          class="btn"
          text
          bg
          type="primary"
          plain
          @click="onSubmit('search')"
          >搜索</el-button
        >
        <el-button class="btn" text bg type="danger" plain @click="resetForm"
          >重置</el-button
        >
      </div>
    </div>
  </el-form>
  <div class="operateBtnList">
    <div class="left">
      <el-button
        v-for="(item, index) in props.operateBtnList.left"
        :key="index"
        class="btn"
        text
        bg
        :type="item.type"
        :color="item.color"
        plain
        v-on="item.listeners"
        >{{ item.name }}</el-button
      >
    </div>
    <div class="right">
      <el-button
        v-for="(item, index) in props.operateBtnList.right"
        :key="index"
        class="btn"
        :color="item.color"
        text
        bg
        :type="item.type"
        plain
        v-on="item.listeners"
        >{{ item.name }}</el-button
      >
      <el-button
        v-if="props.queryFormList && props.queryFormList.length != 0"
        class="btn"
        text
        bg
        type="warning"
        plain
        @click="changFormStatusBtn"
        >{{ showSearchForm ? "收缩" : "展开" }}表单</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const emit = defineEmits(["clickSearch"]);
const props = defineProps({
  queryFormList: {
    type: Array,
    default: [],
  },
  operateBtnList: {
    type: Object,
    default: {},
  },
  queryForm: {
    type: Object,
    default: {},
  },
});
const searchRef = ref(null);
let showSearchForm = ref(true);
let searchRefHight = ref({
  height: "auto",
});
if (props.queryFormList) {
  props.queryFormList.forEach((item, index) => {
    if (item.type == "daterange") {
      props.queryForm[item.prop] = item.defaultData ? item.defaultData : [];
      props.queryForm[item.format] = item.format;
    } else {
      props.queryForm[item.prop] = item.defaultData ? item.defaultData : "";
    }
  });
}

const changeDatePickerData = (i) => {
  onSubmit("change");
};
const resetForm = () => {
  searchRef.value.resetFields();
  onSubmit("search");
};
const onSubmit = (type) => {
  let form = {};
  props.queryFormList.forEach((item, index) => {
    if (item.type == "daterange") {
      if (props.queryForm[item.prop] && item.branchValue) {
        form[item.branchValue.start] = props.queryForm[item.prop][0];
        form[item.branchValue.end] = props.queryForm[item.prop][1];
      }
    } else {
      form[item.prop] = props.queryForm[item.prop];
    }
  });
  emit("clickSearch", form, type);
};
const changFormStatusBtn = () => {
  showSearchForm.value = !showSearchForm.value;
};
onMounted(() => {
  searchRefHight.value = {
    height: searchRef.value.$el.clientHeight + "px",
  };
});
</script>

<style scoped lang="scss">
.searchFormBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  transition: 0.3s;
  .formBox {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;

    .formItem {
      width: 33.333333%;
    }
  }
  :deep(.el-input) {
    width: 100% !important;
  }
  :deep(.el-select) {
    width: 100% !important;
  }
  :deep(.el-form-item__content) {
    padding-right: 10px;
  }

  :deep(.el-form-item) {
    margin-right: 0 !important;
  }
  .btnBox {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-bottom: 18px;
  }
}
.searchFormBoxHide {
  transition: 0.3s;
  height: 0 !important;
  border: 0;
  border-color: #f6f6f6;
  margin: 0;
}
.operateBtnList {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 18px;
}
</style>
