<template>
  <el-drawer
    :model-value="props.modelValue"
    @close="closeDrawer"
    :show-close="false"
    :size="props.size"
    :close-on-press-escape="false"
  >
    <template #header>
      <h1 style="color: var(--el-menu-text-color)">{{ props.title }}</h1>
      <el-button type="danger" @click="closeDrawer">
        <el-icon class="el-icon--center"
          ><i class="ri-close-circle-line"></i
        ></el-icon>
      </el-button>
    </template>
    <slot />
  </el-drawer>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "auto",
  },
  title:{
    type: String,
    default: "",
  }
});
const emits = defineEmits(["update:modelValue"]);
const closeDrawer = () => {
  emits("update:modelValue", false);
};
</script>
<style scoped lang="scss"></style>
