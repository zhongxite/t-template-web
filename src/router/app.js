import { createRouter, createWebHistory } from "vue-router";
import routerPage from "./page";
import { init } from "@/common/init";
const routes = [...routerPage];
const router = createRouter({
  history: createWebHistory("/admin/"),
  routes,
});
router.beforeEach(async (to, from, next) => {
  let { isShowLoadingBox } = storeToRefs(init());
  isShowLoadingBox.value = false
  next();
});
router.afterEach((to) => {
  to.meta.title && (window.document.title = to.meta.title);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
export default router;
