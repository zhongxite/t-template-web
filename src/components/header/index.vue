<template>
  <div class="headerBox">
    <HeadImg />
    <Github />
    <Fullscreen />
    <Drak />
  </div>
</template>
<script setup>
const HeadImg = defineAsyncComponent(() => {
  return import("@/components/header/headImg.vue");
});
const Drak = defineAsyncComponent(() => {
  return import("@/components/header/drak.vue");
});
const Fullscreen = defineAsyncComponent(() => {
  return import("@/components/header/fullscreen.vue");
});
const Github = defineAsyncComponent(() => {
  return import("@/components/header/github.vue");
});
</script>
<style scoped lang="scss">
.headerBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
