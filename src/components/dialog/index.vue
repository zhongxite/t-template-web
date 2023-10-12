<template>
  <el-dialog :model-value="props.modelValue" @close="closeDrawer" :show-close="false" :width="props.width" align-center
    :close-on-press-escape="false">
    <template #header>
      <div class="dialogBox">
        <h1 style="color: var(--el-menu-text-color)">{{ props.title }}</h1>
        <el-button type="danger" @click="closeDrawer">
          <el-icon class="el-icon--center"><i class="ri-close-circle-line"></i></el-icon>
        </el-button>
      </div>
    </template>
    <slot />
  </el-dialog>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "auto",
  },
  title: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["update:modelValue"]);
const closeDrawer = () => {
  emits("update:modelValue", false);
};
</script>
<style scoped lang="scss">
.dialogBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
